import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export const runtime = "nodejs";

/* ================= SLUG HELPER ================= */
function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ================= AUTH HELPER ================= */
async function requireAdmin() {
  const cookieStore = await cookies();              // ✅ MUST await on Vercel
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) };
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decoded.role !== "admin") {
      return { error: NextResponse.json({ message: "Forbidden" }, { status: 403 }) };
    }

    return { decoded };
  } catch {
    return { error: NextResponse.json({ message: "Invalid token" }, { status: 401 }) };
  }
}

/* ================= GET PRODUCTS (ADMIN LIST) ================= */
export async function GET() {
  try {
    await connectDB();

    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const products = await Product.find({
      $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
    }).sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    console.error("ADMIN GET PRODUCTS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

/* ================= ADD PRODUCT ================= */
export async function POST(req: Request) {
  try {
    await connectDB();

    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const {
      name,
      price,
      description,
      images,
      category,
      sections,
      minOrderQty,
    } = await req.json();

    if (!name || !category || !images?.length) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    let baseSlug = createSlug(name);
    let slug = baseSlug;
    let count = 1;

    while (await Product.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    const product = await Product.create({
      name,
      slug,
      price: price || "On Request",
      description: description || "",
      category,
      sections: sections || [],
      images,
      minOrderQty: minOrderQty || 50,
      isDeleted: false,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("PRODUCT SAVE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to save product" },
      { status: 500 }
    );
  }
}
