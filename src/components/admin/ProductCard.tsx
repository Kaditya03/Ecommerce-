"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

export default function ProductCard({
  product,
  refresh,
}: any) {
  const deleteProduct = async () => {
    if (!confirm("Delete this product?")) return;

    await fetch(`/api/admin/products/${product._id}`, {
      method: "DELETE",
    });

    refresh();
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 space-y-3">
      <div className="flex gap-4">
        <img
          src={product.images?.[0]}
          className="w-20 h-20 rounded-lg object-cover border"
        />

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500 capitalize">
            {product.category?.replace("-", " ")}
          </p>

          <p className="font-bold mt-1">
            ₹{product.price}
          </p>
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <Link
          href={`/admin/products/edit/${product._id}`}
          className="flex-1 text-center py-2 rounded-lg border text-sm font-medium hover:bg-gray-50"
        >
          Edit
        </Link>

        <button
          onClick={deleteProduct}
          className="flex-1 py-2 rounded-lg border text-sm font-medium text-red-500 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
