import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs/promises";

export async function POST(req: Request) {
  try {
    await connectDB();

    const token =
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = "/var/www/uploads/profiles";
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, buffer);

    const imageUrl = `https://yourdomain.com/uploads/profiles/${fileName}`;

    // Save in DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    user.photo = imageUrl;
    await user.save();

    return NextResponse.json({ url: imageUrl });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}