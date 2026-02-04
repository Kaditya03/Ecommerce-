import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import mongoose from "mongoose";

export const runtime = "nodejs";

/* ================= DELETE PRODUCT ================= */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }   // ✅ FIXED TYPE
) {
  try {
    await connectDB();

    const { id } = await context.params;          // ✅ AWAIT params

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
