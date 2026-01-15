import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

/* ================= GET ALL USERS ================= */

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const users = await User.find().select("-password");

    return NextResponse.json(users);
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
