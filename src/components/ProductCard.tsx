"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Plus, Minus, ShoppingBag, Heart, ArrowUpRight, CheckCircle2 } from "lucide-react";
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
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative bg-[#FAF9F6] rounded-[2.5rem] p-4 transition-shadow duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-stone-200/50"
    >
      {/* IMAGE LAYER (Z-INDEX DEPTH) */}
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="relative h-64 overflow-hidden rounded-[2rem] bg-stone-100 shadow-inner"
      >
        <Link href={`/products/${product.slug}`}>
          <motion.img
            src={product.images?.[0]}
            alt={product.name}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover"
          />
        </Link>

        {/* FLOATING BADGES */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
          <span className="bg-white/80 backdrop-blur-md px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-full text-stone-900 border border-white/50 shadow-sm pointer-events-auto">
            {product.category.replace(/-/g, " ")}
          </span>
          <button
            onClick={() => toggleWishlist(product)}
            className="p-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-all pointer-events-auto"
          >
            <Heart
              size={14}
              className={isWishlisted(product._id) ? "fill-red-500 text-red-500" : "text-stone-400"}
            />
          </button>
        </div>

        {/* Z-LIFTED QUICK VIEW BUTTON */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-stone-900/10 backdrop-blur-[2px]">
           <Link 
            href={`/products/${product.slug}`}
            className="px-6 py-3 bg-white text-stone-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform"
           >
            Explore <ArrowUpRight size={14} />
           </Link>
        </div>
      </div>

      {/* CONTENT LAYER */}
      <div className="px-2 pt-6 pb-2" style={{ transform: "translateZ(50px)" }}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium text-stone-900 tracking-tight font-serif italic">
            {product.name}
          </h3>
          <p className="text-sm font-bold text-stone-900">₹{product.price}</p>
        </div>

        <div className="flex items-center gap-2 mb-6">
           <div className="h-[1px] flex-1 bg-stone-200"></div>
           <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">
            Min. {MIN_QTY} Pcs
           </span>
        </div>

        {/* 3D INTERACTION BAR */}
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center justify-between bg-white border border-stone-200 rounded-2xl p-1 shadow-sm">
            <button
              onClick={() => setQty(q => Math.max(MIN_QTY, q - STEP))}
              className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-stone-50 transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="text-xs font-bold text-stone-900">{qty}</span>
            <button
              onClick={() => setQty(q => q + STEP)}
              className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-stone-50 transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className={`h-10 w-12 flex items-center justify-center rounded-2xl transition-all shadow-lg ${
              added ? "bg-stone-900 text-white shadow-stone-300" : "bg-white text-stone-900 border border-stone-200 hover:bg-stone-900 hover:text-white"
            }`}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <CheckCircle2 size={18} />
                </motion.div>
              ) : (
                <motion.div key="bag" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <ShoppingBag size={18} strokeWidth={1.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* GLOW EFFECT (MOUSE FOLLOW) */}
      <motion.div
        style={{
          transform: "translateZ(60px)",
          opacity: useTransform(mouseYSpring, [-0.5, 0.5], [0, 0.3]),
        }}
        className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none rounded-[2.5rem]"
      />
    </motion.div>
  );
}