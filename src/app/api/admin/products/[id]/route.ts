import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  await connectDB();

  // 🔐 Optional: admin auth (recommended)
  // const auth = req.headers.get("authorization");
  // if (!auth) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const products = await Product.find().sort({ createdAt: -1 });

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const product = await Product.create({
    name: body.name,
    slug: body.slug,
    price: body.price,
    description: body.description,
    category: body.category,
    sections: body.sections,
    images: body.images,
    minOrderQty: body.minOrderQty || 50,
  });

  return NextResponse.json(product, { status: 201 });
}
