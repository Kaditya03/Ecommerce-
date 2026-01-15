"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ShoppingBag, Heart, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
  category: string;
  minOrderQty?: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const MIN_QTY = product.minOrderQty ?? 50;
  const STEP = 10;

  const [qty, setQty] = useState<number>(MIN_QTY);
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 180 }}
      className="relative bg-white rounded-2xl border shadow-sm hover:shadow-xl transition flex flex-col"
    >
      {/* IMAGE */}
      <div className="relative h-44 overflow-hidden bg-gray-50 rounded-t-2xl">
        <Link href={`/products/${product.slug}`}>
          <motion.img
            src={product.images?.[0]}
            alt={product.name}
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
        </Link>

        {/* CATEGORY */}
        <span className="absolute top-3 left-3 bg-white/90 px-3 py-1 text-[11px] rounded-full shadow capitalize">
          {product.category.replace(/-/g, " ")}
        </span>

        {/* WISHLIST */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:scale-110 transition"
        >
          <Heart
            size={16}
            className={
              isWishlisted(product._id)
                ? "fill-red-500 text-red-500"
                : "text-gray-400"
            }
          />
        </button>

        {/* QUICK VIEW */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-3 left-3 right-3 hidden md:block"
            >
              <Link
                href={`/products/${product.slug}`}
                className="w-full py-2 bg-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow"
              >
                View Details <ArrowRight size={14} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CONTENT */}
      <div className="px-4 py-3 flex flex-col flex-1">
        <h3 className="text-sm font-semibold line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-1">
          <p className="text-indigo-600 font-bold">
            ₹{product.price}
          </p>
          <span className="text-[11px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
            MOQ {MIN_QTY}
          </span>
        </div>

        {/* QTY */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
            <button
              onClick={() =>
                setQty((q: number) =>
                  Math.max(MIN_QTY, q - STEP)
                )
              }
              className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow"
            >
              <Minus size={12} />
            </button>

            <span className="min-w-[36px] text-center text-sm font-medium">
              {qty}
            </span>

            <button
              onClick={() =>
                setQty((q: number) => q + STEP)
              }
              className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow"
            >
              <Plus size={12} />
            </button>
          </div>

          <span className="text-[10px] text-gray-400">
            +{STEP}
          </span>
        </div>

        {/* ADD TO CART */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className={`mt-3 h-9 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition ${
            added
              ? "bg-green-600 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          <ShoppingBag size={14} />
          {added ? "Added" : `Add ${qty}`}
        </motion.button>
      </div>
    </motion.div>
  );
}
