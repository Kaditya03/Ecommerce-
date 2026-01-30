import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST() {
  try {
    await connectDB();

    const email = "admin@gmail.com";
    const password = "admin123";

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
      isEmailVerified: true,
    });

    return NextResponse.json({
      message: "Admin created successfully",
      email,
      password,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create admin" },
      { status: 500 }
    );
  }
}
