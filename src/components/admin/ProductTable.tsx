"use client";

import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductTable({
  products,
  fetchProducts,
}: any) {
  const deleteProduct = async (product: any) => {
    // Optimistic UI + Undo
    toast("Product deleted", {
      action: {
        label: "Undo",
        onClick: async () => {
          await fetch("/api/admin/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
          });
          fetchProducts();
        },
      },
      duration: 5000,
    });

    await fetch(`/api/admin/products/${product._id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="p-4 text-left">Product</th>
            <th>Price</th>
            <th>Category</th>
            <th className="text-right pr-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p: any) => (
            <motion.tr
              key={p._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-4">{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.category}</td>

              <td className="text-right pr-4 space-x-3">
                <Link
                  href={`/admin/products/${p._id}/edit`}
                  className="text-indigo-600 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteProduct(p)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
