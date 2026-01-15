import { NextResponse } from "next/server";
import Order from "@/models/Order";
import  dbConnect  from '@/lib/db';

/* GET all orders */
export async function GET() {
  try {
    await dbConnect();

    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

/* CREATE order */
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const order = await Order.create(body);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
