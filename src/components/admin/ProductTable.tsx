"use client";

import Link from "next/link";
import { Trash2, Pencil } from "lucide-react";

export default function ProductTable({
  products,
  refresh,
}: {
  products: any[];
  refresh: () => void;
}) {
  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    await fetch(`/api/admin-auth/products/${id}`, {
      method: "DELETE",
      credentials:"include",
    });

    refresh(); // 🔥 real-time update
  };

  if (!products.length) {
    return (
      <div className="text-center text-gray-500 py-20">
        No products found
      </div>
    );
  }

  return (
    <>
      {/* ================= DESKTOP / TABLET TABLE ================= */}
      <div className="hidden md:block bg-white rounded-xl border overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 flex items-center gap-4">
                  <img
                    src={p.images?.[0]}
                    className="w-14 h-14 rounded-lg object-cover border"
                    alt={p.name}
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      ID: {p._id.slice(-6)}
                    </p>
                  </div>
                </td>

                <td className="p-4 capitalize">
                  {p.category?.replace(/-/g, " ")}
                </td>

                <td className="p-4 font-semibold">
                  ₹{p.price}
                </td>

                <td className="p-4 text-right flex justify-end gap-4">
                  <Link
                    href={`/admin/products/edit/${p._id}`}
                    className="flex items-center gap-1 text-indigo-600 hover:underline"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="flex items-center gap-1 text-red-600 hover:underline"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="grid gap-4 md:hidden">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <div className="flex gap-4">
              <img
                src={p.images?.[0]}
                className="w-20 h-20 rounded-lg object-cover border"
                alt={p.name}
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {p.name}
                </h3>

                <p className="text-sm text-gray-500 capitalize">
                  {p.category?.replace(/-/g, " ")}
                </p>

                <p className="font-bold mt-1">
                  ₹{p.price}
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <Link
                href={`/admin/products/edit/${p._id}`}
                className="flex-1 text-center py-2 rounded-lg border text-sm font-medium hover:bg-gray-50"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteProduct(p._id)}
                className="flex-1 py-2 rounded-lg border text-sm font-medium text-red-500 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
