import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const filter: any = {};
  if (category) filter.category = category;

  const products = await Product.find(filter);

  return NextResponse.json(products);
}
