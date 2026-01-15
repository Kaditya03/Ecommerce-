"use client";

import { useState } from "react";
import MediaUploader from "./MediaUploader";

export default function ProductForm({ refresh }: any) {
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [sections, setSections] = useState<string[]>([]);

  const save = async () => {
    await fetch("/api/admin/products", {
      method: "POST",
      body: JSON.stringify({
        name: "New Product",
        price: 1999,
        images,
        category,
        sections,
        minOrderQty: 50,
      }),
    });
    refresh();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-4">
    <MediaUploader
  onUpload={(urls) =>
    setImages((prev) => [...prev, ...urls])
  }
/>


      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="pottery">Pottery</option>
        <option value="handlooms">Handlooms</option>
      </select>

      <button onClick={save} className="bg-indigo-600 text-white h-12 rounded-xl">
        Save Product
      </button>
    </div>
  );
}
