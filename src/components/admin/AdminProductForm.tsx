"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ImageUploader from "@/components/admin/ImageUploader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const categories = [
  "pottery",
  "handlooms",
  "brass-art",
  "wood-craft",
  "paintings",
  "home-decor",
];

const sectionsList = [
  { label: "Best Sellers", value: "best-sellers" },
  { label: "New Arrivals", value: "new-arrivals" },
  { label: "Bulking Items", value: "bulking" },
];

export default function AdminProductForm() {
  const router = useRouter();

  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [sections, setSections] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleSection = (value: string) => {
    setSections((prev) =>
      prev.includes(value)
        ? prev.filter((s) => s !== value)
        : [...prev, value]
    );
  };

  const saveProduct = async () => {
    if (!name || !price || !category || images.length === 0) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

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

    setLoading(false);

    if (!res.ok) {
      toast.error("Failed to save product");
      return;
    }

    toast.success("Product added successfully");
    router.push("/admin/products");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl p-8 space-y-10"
    >
      {/* IMAGE UPLOAD */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Product Images
        </h2>

        <ImageUploader
          onUpload={(urls) =>
            setImages((prev) => [...prev, ...urls])
          }
        />

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {images.map((img, index) => (
              <div
                key={img}
                className="relative rounded-xl overflow-hidden border"
              >
                <img
                  src={img}
                  className="h-36 w-full object-cover"
                />
                <button
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                  className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 text-xs shadow"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BASIC INFO */}
      <div className="grid md:grid-cols-2 gap-6">
        <input
          placeholder="Product Name"
          className="h-12 border rounded-xl px-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price (₹)"
          className="h-12 border rounded-xl px-4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      {/* DESCRIPTION */}
      <textarea
        placeholder="Product Description"
        className="h-32 border rounded-xl px-4 py-3 resize-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* CATEGORY */}
      <div>
        <h3 className="font-medium mb-2">Category</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full border transition ${
                category === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {cat.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* SECTIONS */}
      <div>
        <h3 className="font-medium mb-2">Sections</h3>
        <div className="flex flex-wrap gap-3">
          {sectionsList.map((s) => (
            <button
              key={s.value}
              onClick={() => toggleSection(s.value)}
              className={`px-5 py-2 rounded-full border transition ${
                sections.includes(s.value)
                  ? "bg-emerald-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* SAVE BUTTON */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        disabled={loading}
        onClick={saveProduct}
        className="w-full h-14 rounded-2xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-lg"
      >
        {loading ? "Saving..." : "Save Product"}
      </motion.button>
    </motion.div>
  );
}
