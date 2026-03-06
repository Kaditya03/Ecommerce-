import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

export const runtime = "nodejs"; // IMPORTANT

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json(
        { message: "No files uploaded" },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${file.name}`;

      await r2.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME!,
          Key: fileName,
          Body: buffer,
          ContentType: file.type,
        })
      );
      
      const imageUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;
      uploadedUrls.push(imageUrl);
    }

    return NextResponse.json({ urls: uploadedUrls });

  } catch (error: any) {
  console.error("UPLOAD ERROR:", error);

  return NextResponse.json(
    { message: error?.message || "Upload failed", error },
    { status: 500 }
  );
}
}