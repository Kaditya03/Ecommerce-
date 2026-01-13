"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import ConfirmDelete from "./ConfirmDelete";

export default function ProductRow({
  product,
  refresh,
}: {
  product: any;
  refresh: () => void;
}) {
  return (
    <tr className="border-t">
      <td className="p-4">
        <img
          src={product.images?.[0]}
          className="w-14 h-14 rounded-lg object-cover"
        />
      </td>

      <td className="font-medium">{product.name}</td>
      <td className="capitalize">{product.category}</td>
      <td>₹{product.price}</td>

      <td className="p-4 text-right">
        <div className="flex justify-end gap-3">
          <Link
            href={`/admin/products/edit/${product._id}`}
            className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600"
          >
            <Pencil size={16} />
          </Link>

          <ConfirmDelete product={product} refresh={refresh} />
        </div>
      </td>
    </tr>
  );
}
