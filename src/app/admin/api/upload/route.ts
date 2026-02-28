import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: "No files uploaded" },
        { status: 400 }
      );
    }

    const uploadDir = "/var/www/uploads/products";

    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        return `/uploads/products/${fileName}`;
      })
    );

    return NextResponse.json({ urls: uploadedUrls });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}