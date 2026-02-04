import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

/* ================= GET PRODUCTS (ADMIN LIST) ================= */
export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

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
function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req: Request) {
  try {
    await connectDB();

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
