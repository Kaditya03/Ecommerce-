import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product"; 

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query || query.length < 3) {
      return NextResponse.json([]);
    }

    // Creating a case-insensitive regular expression for partial matching
    const searchRegex = new RegExp(query, "i");

    const products = await Product.find({
      $or: [
        { name: searchRegex },
        { category: searchRegex },
        { tags: searchRegex } // If you have a tags array in your schema
      ],
      // Optional: only show active products
      isAvailable: true 
    })
    .select("name price category image id") // Only fetch what the Navbar needs
    .limit(8)
    .lean(); // Converts to plain JS objects for faster performance

    return NextResponse.json(products);
  } catch (error) {
    console.error("MongoDB Search Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}