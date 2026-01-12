"use client";

import { useState } from "react";

export default function ImageUploader({
  onUpload,
}: {
  onUpload: (urls: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of Array.from(e.target.files)) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          console.error("Upload failed");
          continue;
        }

        const data = await res.json();

        // ✅ IMPORTANT: Cloudinary secure_url
        uploadedUrls.push(data.url);
      } catch (err) {
        console.error("Upload error:", err);
      }
    }

    // ✅ SEND URLS BACK TO PARENT
    onUpload(uploadedUrls);

    setUploading(false);

    // reset input so same file can be uploaded again
    e.target.value = "";
  };

  return (
    <label className="flex h-48 border-2 border-dashed rounded-2xl cursor-pointer items-center justify-center bg-indigo-50 hover:bg-indigo-100 transition">
      <input
        type="file"
        hidden
        multiple
        accept="image/*"
        onChange={handleUpload}
      />

      <div className="text-center">
        {uploading ? (
          <p className="text-indigo-600 font-medium animate-pulse">
            Uploading...
          </p>
        ) : (
          <>
            <div className="text-4xl text-indigo-600 mb-2">
              +
            </div>
            <p className="text-sm font-medium text-indigo-700">
              Upload Images
            </p>
          </>
        )}
      </div>
    </label>
  );
}
