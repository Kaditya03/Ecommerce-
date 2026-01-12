"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/admin/ImageUploader";
import { motion } from "framer-motion";

export default function EditProduct({ params }: any) {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/products?id=${params.id}`)
      .then((res) => res.json())
      .then(setProduct)
      .finally(() => setLoading(false));
  }, []);

  const saveChanges = async () => {
    await fetch(`/api/admin/products/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    router.push("/admin/products");
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl space-y-8"
    >
      <h1 className="text-3xl font-semibold">Edit Product</h1>

      <ImageUploader
        onUpload={(urls) =>
          setProduct((p: any) => ({
            ...p,
            images: [...p.images, ...urls],
          }))
        }
      />

      <div className="grid grid-cols-2 gap-6">
        <input
          value={product.name}
          onChange={(e) =>
            setProduct({ ...product, name: e.target.value })
          }
          className="h-12 border px-4 rounded-xl"
          placeholder="Name"
        />

        <input
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: e.target.value })
          }
          className="h-12 border px-4 rounded-xl"
          placeholder="Price"
        />
      </div>

      <textarea
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
        className="h-32 border px-4 py-3 rounded-xl"
        placeholder="Product description"
      />

      <button
        onClick={saveChanges}
        className="bg-indigo-600 text-white h-12 px-8 rounded-xl"
      >
        Save Changes
      </button>
    </motion.div>
  );
}
