import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

// helper to generate slug
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.name || !body.price || !body.category || !body.images?.length) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔥 Generate base slug
    let baseSlug = slugify(body.name);
    let slug = baseSlug;
    let count = 1;

    // 🔁 Ensure slug uniqueness
    while (await Product.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    const product = await Product.create({
      name: body.name,
      slug,
      price: body.price,
      description: body.description || "",
      category: body.category,
      sections: body.sections || [],
      images: body.images,
      minOrderQty: body.minOrderQty || 50,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("PRODUCT SAVE ERROR:", error);

    return NextResponse.json(
      { message: "Failed to save product" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}
