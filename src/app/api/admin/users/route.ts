import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

/* ================= GET ALL USERS (ADMIN) ================= */
export async function GET() {
  try {
    await connectDB();

    const users = await User.find().select("-password");

    return NextResponse.json(users);
  } catch (error) {
    console.error("ADMIN USERS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
