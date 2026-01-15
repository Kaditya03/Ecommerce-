"use client";

import Link from "next/link";
import { Trash2, Pencil } from "lucide-react";

export default function ProductRow({
  product,
  refresh,
}: {
  product: any;
  refresh: () => void;
}) {
  const deleteProduct = async () => {
    if (!confirm("Delete this product?")) return;

    await fetch(`/api/admin/products/${product._id}`, {
      method: "DELETE",
    });

    refresh(); // realtime update
  };

  return (
    <tr className="border-t">
      <td className="p-4">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-12 h-12 rounded-lg object-cover border"
        />
      </td>

      <td className="p-4 font-medium">{product.name}</td>

      <td className="p-4 capitalize">
        {product.category?.replace(/-/g, " ")}
      </td>

      <td className="p-4 font-semibold">₹{product.price}</td>

      <td className="p-4 text-right space-x-4">
        <Link
          href={`/admin/products/edit/${product._id}`}
          className="inline-flex items-center gap-1 text-indigo-600 hover:underline"
        >
          <Pencil size={16} /> Edit
        </Link>

        <button
          onClick={deleteProduct}
          className="inline-flex items-center gap-1 text-red-600 hover:underline"
        >
          <Trash2 size={16} /> Delete
        </button>
      </td>
    </tr>
  );
}
