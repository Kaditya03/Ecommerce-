import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await connectDB();

  const product = await Product.findOne({
    slug: params.slug,
  });

  if (!product) {
    return NextResponse.json(
      { message: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}
