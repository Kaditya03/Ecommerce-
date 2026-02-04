"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/admin/ImageUploader";
import { motion } from "framer-motion";

export default function EditProduct({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `/api/admin-auth/products/${params.id}`,
          {
            credentials: "include",   // ✅ FIX
            cache: "no-store",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  // 🔹 UPDATE PRODUCT
  const saveChanges = async () => {
    const res = await fetch(
      `/api/admin-auth/products/${params.id}`,
      {
        method: "PUT",
        credentials: "include",  // ✅ FIX
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Failed to update product");
      return;
    }

    alert("Product updated successfully");
    router.push("/admin/products");
  };

  // 🔹 DELETE PRODUCT
  const deleteProduct = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    const res = await fetch(
      `/api/admin-auth/products/${params.id}`,
      {
        method: "DELETE",
        credentials: "include", // ✅ already correct
      }
    );

    if (!res.ok) {
      const data = await res.json();
      alert(data.message || "Delete failed");
      return;
    }

    alert("Product deleted successfully");
    router.push("/admin/products");
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl space-y-6"
    >
      <h1 className="text-3xl font-semibold">Edit Product</h1>

      <ImageUploader
        onUpload={(urls) =>
          setProduct((prev: any) => ({
            ...prev,
            images: [...prev.images, ...urls],
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
          placeholder="Product name"
        />

        <input
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct({
              ...product,
              price: Number(e.target.value),
            })
          }
          className="h-12 border px-4 rounded-xl"
          placeholder="Price"
        />
      </div>

      <textarea
        value={product.description}
        onChange={(e) =>
          setProduct({
            ...product,
            description: e.target.value,
          })
        }
        className="h-32 border px-4 py-3 rounded-xl"
        placeholder="Description"
      />

      <div className="flex gap-4">
        <button
          onClick={saveChanges}
          className="bg-indigo-600 text-white h-12 px-8 rounded-xl"
        >
          Save Changes
        </button>

        <button
          onClick={deleteProduct}
          className="bg-red-600 text-white h-12 px-8 rounded-xl"
        >
          Delete Product
        </button>
      </div>
    </motion.div>
  );
}
