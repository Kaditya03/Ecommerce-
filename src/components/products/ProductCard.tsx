"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Plus, Minus, Heart, ArrowUpRight, Send, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const MIN_QTY = product.minOrderQty ?? 50;
  const STEP = 10;
  const [qty, setQty] = useState<number>(MIN_QTY);
  const [added, setAdded] = useState(false);

  // --- 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative bg-white rounded-[2.5rem] p-3 transition-all duration-500 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-stone-100"
    >
      {/* IMAGE CONTAINER (Z-20) */}
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="relative h-72 overflow-hidden rounded-[2rem] bg-stone-50"
      >
        <Link href={`/products/${product.slug}`}>
          <motion.img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
          />
        </Link>
        
        {/* TOP OVERLAY UI */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <span className="bg-stone-900/10 backdrop-blur-md px-3 py-1 text-[8px] font-bold uppercase tracking-[0.3em] rounded-full text-stone-800">
            Artisan Piece
          </span>
          <button
            onClick={() => toggleWishlist(product)}
            className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:scale-110 transition-transform"
          >
            <Heart size={14} className={isWishlisted(product._id) ? "fill-red-500 text-red-500" : "text-stone-400"} />
          </button>
        </div>
      </div>

      {/* CONTENT (Z-50) */}
      <div className="px-3 pt-6 pb-2" style={{ transform: "translateZ(60px)" }}>
        <h3 className="text-lg font-serif italic text-stone-900 mb-1">{product.name}</h3>
        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-4">MOQ: {MIN_QTY} Units</p>

        {/* INTERACTIVE CONTROLS */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center justify-between bg-stone-50 rounded-xl p-1 border border-stone-100">
            <button onClick={() => setQty(q => Math.max(MIN_QTY, q - STEP))} className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-900">-</button>
            <span className="text-xs font-bold font-mono">{qty}</span>
            <button onClick={() => setQty(q => q + STEP)} className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-900">+</button>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className={`flex-1 h-10 rounded-xl flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest transition-all ${
              added ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-900 hover:text-white"
            }`}
          >
            {added ? <Check size={14} /> : <><Send size={12} /> Add</>}
          </motion.button>
        </div>
      </div>

      {/* LIGHT SHINE EFFECT */}
      <motion.div
        style={{
          transform: "translateZ(80px)",
          opacity: useTransform(mouseYSpring, [-0.5, 0.5], [0, 0.2]),
        }}
        className="absolute inset-0 bg-gradient-to-tr from-white/60 to-transparent pointer-events-none rounded-[2.5rem]"
      />
    </motion.div>
  );
}