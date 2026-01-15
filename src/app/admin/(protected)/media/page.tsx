"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type MediaUploaderProps = {
  onUpload?: (urls: string[]) => void; // ✅ OPTIONAL
};

export default function MediaUploader({ onUpload }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of Array.from(e.target.files)) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) continue;

      const data = await res.json();
      uploadedUrls.push(data.url);
    }

    setUploading(false);

    // ✅ only call if provided
    onUpload?.(uploadedUrls);
  };

  return (
    <motion.label
      whileHover={{ scale: 1.02 }}
      className="cursor-pointer flex items-center justify-center h-44 rounded-2xl border-2 border-dashed border-indigo-400 bg-indigo-50 hover:bg-indigo-100 transition"
    >
      <input
        type="file"
        hidden
        multiple
        accept="image/*"
        onChange={handleUpload}
      />

      <span className="text-indigo-600 font-medium">
        {uploading ? "Uploading..." : "Click to Upload Images"}
      </span>
    </motion.label>
  );
}
