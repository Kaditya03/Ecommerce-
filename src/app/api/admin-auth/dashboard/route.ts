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

    const cookieStore = await cookies(); 
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const products = await Product.countDocuments({
      $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
    });

    const orders = await Order.countDocuments();

    return NextResponse.json({
      products,
      orders,
      revenue: 0,
      chart: [],
    });
  } catch (error) {
    console.error("DASHBOARD API ERROR:", error);
    return NextResponse.json({ message: "Failed to load dashboard" }, { status: 500 });
  }
}
