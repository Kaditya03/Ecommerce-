import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "@/lib/r2";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { fileName, fileType } = await req.json();

    const key = `${Date.now()}-${crypto.randomUUID()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(r2, command, {
      expiresIn: 60,
    });

    const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

    return NextResponse.json({
      signedUrl,
      publicUrl,
    });
  } catch (error) {
    console.error("SIGNED URL ERROR:", error);

    return NextResponse.json(
      { message: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}