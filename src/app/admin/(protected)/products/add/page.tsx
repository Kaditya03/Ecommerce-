"use client";

import { useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


export default function AddProductPage() {
  const router = useRouter();

  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [sections, setSections] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const saveProduct = async () => {
    if (!name || !price || !category || images.length === 0) {
      alert("Please fill all required fields");
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
      alert("Failed to save product");
      return;
    }

    // Redirect to product list
    router.push("/admin/products");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10"
    >
     {/* HEADER */}
<div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

  <div>
    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
      Add New Product
    </h1>
    <p className="text-gray-500 text-sm mt-1">
      Product will be visible to customers immediately
    </p>
  </div>

  {/* BACK BUTTON */}
  <Link href="/admin/products">
    <motion.button
      whileHover={{ x: -4 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white text-gray-700 hover:bg-gray-50 transition shadow-sm"
    >
      <ArrowLeft size={18} />
      <span className="text-sm font-medium">Back</span>
    </motion.button>
  </Link>
</div>


    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

        {/* IMAGE UPLOAD */}
        <div className="space-y-5">
          <h2 className="font-medium text-gray-800">
            Product Images
          </h2>

          <ImageUploader
            onUpload={(urls) =>
              setImages((prev) => [...prev, ...urls])
            }
          />

          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">

              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden border bg-white"
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt="Uploaded"
                  />
                  <button
                    onClick={() =>
                      setImages((prev) =>
                        prev.filter((_, index) => index !== i)
                      )
                    }
                    className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full shadow text-sm hover:bg-red-500 hover:text-white transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FORM */}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium">
              Product Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full h-11 rounded-xl border px-4"
              placeholder="Brass Diya Lamp"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Price (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 w-full h-11 rounded-xl border px-4"
              placeholder="499"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full min-h-[120px] rounded-xl border px-4 py-3 resize-none"
              placeholder="Handcrafted brass diya ideal for gifting..."
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full h-11 rounded-xl border px-4"
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

          <div>
            <label className="text-sm font-medium">
              Sections
            </label>
           <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">

              {[
                { label: "Best Sellers", value: "best-sellers" },
                { label: "New Arrivals", value: "new-arrivals" },
                { label: "Bulking Items", value: "bulking" },
              ].map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() =>
                    setSections((prev) =>
                      prev.includes(s.value)
                        ? prev.filter((x) => x !== s.value)
                        : [...prev, s.value]
                    )
                  }
                  className={`px-4 py-2 rounded-full text-xs font-medium border transition ${
                    sections.includes(s.value)
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={saveProduct}
            disabled={loading}
            className="w-full h-12 rounded-xl bg-indigo-600 text-white font-medium flex items-center justify-center gap-2 hover:bg-indigo-700 transition disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
