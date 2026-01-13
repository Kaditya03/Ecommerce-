"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductTable from "@/components/admin/ProductTable";
import { motion } from "framer-motion";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products", { cache: "no-store" });
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-semibold">Products</h1>

        <Link href="/admin/products/add">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700"
          >
            + Add Product
          </motion.button>
        </Link>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : (
        <ProductTable
          products={products}
          refresh={fetchProducts}
        />
      )}
    </div>
  );
}
