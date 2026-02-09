import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product"; 

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query || query.length < 3) {
      return NextResponse.json([]);
    }

    const searchRegex = new RegExp(query, "i");

    const products = await Product.find({
      $and: [
        {
          $or: [
            { name: searchRegex },
            { category: searchRegex },
          ],
        },
        {
          $or: [
            { isDeleted: false },
            { isDeleted: { $exists: false } },
          ],
        },
      ],
    })
      .select("name price category images _id slug")
      .limit(8)
      .lean();

    return NextResponse.json(products);
  } catch (error) {
    console.error("MongoDB Search Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
