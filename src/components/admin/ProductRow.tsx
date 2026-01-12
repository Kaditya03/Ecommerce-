"use client";

import { motion } from "framer-motion";

export default function ProductRow({ product, refresh }: any) {
  const deleteProduct = async () => {
    await fetch(`/api/admin/products/${product._id}`, {
      method: "DELETE",
    });
    refresh();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="flex items-center gap-4 p-4 border rounded-xl bg-white"
    >
      <img
        src={product.images[0]}
        className="h-16 w-16 rounded-lg object-cover"
      />

      <div className="flex-1">
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-gray-500">
          {product.category}
        </p>
      </div>

      <button
        onClick={deleteProduct}
        className="text-red-500 text-sm"
      >
        Delete
      </button>
    </motion.div>
  );
}
