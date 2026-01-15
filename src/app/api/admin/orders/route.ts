import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

/* ================= UPDATE ORDER STATUS ================= */

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { message: "Missing id or status" },
        { status: 400 }
      );
    }

    await Order.findByIdAndUpdate(id, { status });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ORDER UPDATE ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
