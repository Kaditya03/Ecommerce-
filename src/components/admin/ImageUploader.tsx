"use client";

import { useState } from "react";

export default function ImageUploader({
  onUpload,
}: {
  onUpload: (urls: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setUploading(true);

    try {
      const formData = new FormData();

      for (const file of Array.from(e.target.files)) {
        formData.append("files", file);
      }

      const res = await fetch("/api/upload/product-images", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Upload failed");

      onUpload(data.urls);

    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
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
            <div className="text-4xl text-indigo-600 mb-2">+</div>
            <p className="text-sm font-medium text-indigo-700">
              Upload Images
            </p>
          </>
        )}
      </div>
    </label>
  );
}