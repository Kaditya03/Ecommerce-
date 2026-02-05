import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    // ✅ cookies() returns Promise in your Next version
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const products = await Product.countDocuments({
      $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
    });

    const orders = await Order.countDocuments();
    const revenue = 0;

    return NextResponse.json({
      products,
      orders,
      revenue,
      chart: [],
    });
  } catch (error) {
    console.error("DASHBOARD API ERROR:", error);
    return NextResponse.json(
      { message: "Failed to load dashboard" },
      { status: 500 }
    );
  }
}
