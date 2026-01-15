import { NextResponse } from "next/server";



export async function POST(req: Request) {
  try {
    const body = await req.json();

    // TODO: integrate Razorpay / Stripe later
    return NextResponse.json({
      success: true,
      message: "Payment endpoint ready",
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Payment failed" },
      { status: 500 }
    );
  }
}
