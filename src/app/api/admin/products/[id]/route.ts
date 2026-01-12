import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import slugify from "slugify";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const body = await req.json();

  const product = await Product.findByIdAndUpdate(
    params.id,
    {
      ...body,
      slug: slugify(body.name, { lower: true }),
    },
    { new: true }
  );

  return NextResponse.json(product);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  await Product.findByIdAndDelete(params.id);

  return NextResponse.json({ success: true });
}
