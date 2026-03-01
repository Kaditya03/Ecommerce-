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

    try {
      const formData = new FormData();

      // IMPORTANT: must match backend key name "files"
      for (const file of Array.from(e.target.files)) {
        formData.append("files", file);
      }

      const res = await fetch("/api/admin-auth/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Upload failed:", err);
        alert("Upload failed");
        setUploading(false);
        return;
      }

      const data = await res.json();

      // R2 API returns: { urls: [] }
      if (data.urls && Array.isArray(data.urls)) {
        onUpload(data.urls);
      } else {
        console.error("Invalid response format:", data);
      }

    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong while uploading");
    }

    setUploading(false);

    // Reset input so same file can be selected again
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