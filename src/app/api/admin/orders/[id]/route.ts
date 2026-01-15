import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

/* ================= UPDATE ORDER STATUS ================= */
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // ✅ IMPORTANT: await params
    const { id } = await context.params;
    const body = await req.json();

    const order = await Order.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ORDER UPDATE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update order" },
      { status: 500 }
    );
  }
}
