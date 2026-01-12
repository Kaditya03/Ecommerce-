"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminProducts() {
  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [sections, setSections] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  /* ================= SAVE PRODUCT ================= */

 const saveProduct = async () => {
  if (!name || !price || !category || !images.length) {
    alert("Please fill all required fields");
    return;
  }

  setSaving(true);

  const res = await fetch("/api/admin/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      price,
      description,
      images,
      category,
      sections,
      minOrderQty: 50,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error(data);
    alert(data.message || "Failed to save product");
    setSaving(false);
    return;
  }

  alert("Product saved successfully!");

  setImages([]);
  setName("");
  setPrice("");
  setDescription("");
  setCategory("");
  setSections([]);
  setSaving(false);
};


  /* ================= UI ================= */

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl space-y-10"
    >
      <h1 className="text-3xl font-semibold tracking-wide">
        Add New Product
      </h1>

      {/* ================= IMAGE UPLOAD ================= */}
      <ImageUploader
        onUpload={(urls) =>
          setImages((prev) => [...prev, ...urls])
        }
      />

      {/* IMAGE PREVIEW */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative h-40 rounded-xl overflow-hidden border bg-white shadow-sm"
            >
              <img
                src={img}
                alt="Product"
                className="w-full h-full object-cover"
              />

              <button
                onClick={() =>
                  setImages((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow text-sm flex items-center justify-center hover:bg-red-500 hover:text-white transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= PRODUCT INFO ================= */}
      <div className="grid md:grid-cols-2 gap-6">
        <input
          placeholder="Product Name"
          className="h-12 border rounded-xl px-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="h-12 border rounded-xl px-4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          placeholder="Product Description"
          className="md:col-span-2 h-32 border rounded-xl px-4 py-3 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="h-12 border rounded-xl px-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="pottery">Pottery</option>
          <option value="handlooms">Handlooms</option>
          <option value="brass-art">Brass Art</option>
          <option value="wood-craft">Wood Craft</option>
          <option value="paintings">Paintings</option>
          <option value="home-decor">Home Decor</option>
        </select>
      </div>

      {/* ================= SECTIONS ================= */}
      <div className="flex gap-4 flex-wrap">
        {["best-sellers", "new-arrivals", "bulking"].map(
          (section) => (
            <button
              key={section}
              onClick={() =>
                setSections((prev) =>
                  prev.includes(section)
                    ? prev.filter((s) => s !== section)
                    : [...prev, section]
                )
              }
              className={`px-5 py-2 rounded-full border transition ${
                sections.includes(section)
                  ? "bg-indigo-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {section.replace("-", " ")}
            </button>
          )
        )}
      </div>

      {/* ================= SAVE ================= */}
      <button
        onClick={saveProduct}
        disabled={saving}
        className="h-12 w-36 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Product"}
      </button>
    </motion.div>
  );
}
