"use client";

import { useCart } from "@/context/CartContext";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartItem({ item }: any) {
  const { updateQty, removeItem } = useCart();

  // Drag-to-delete logic for a mobile-first premium UX
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0], [0, 1]);
  const scale = useTransform(x, [-100, 0], [0.8, 1]);

  return (
    <motion.div
      layout
      drag="x"
      dragConstraints={{ left: -100, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x < -80) removeItem(item._id);
      }}
      style={{ x, opacity, scale }}
      className="relative group mb-4"
    >
      {/* UNDERLAY DELETE ICON (Revealed on swipe) */}
      <div className="absolute inset-0 bg-red-50 rounded-[2rem] flex items-center justify-end px-8 text-red-500">
        <Trash2 size={24} />
      </div>

      {/* MAIN 3D CARD */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ translateZ: 20 }}
        className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-4 flex gap-6 border border-stone-200/50 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-xl"
      >
        {/* 3D IMAGE CONTAINER */}
        <div className="relative w-28 h-28 shrink-0 perspective-1000">
          <motion.img
            whileHover={{ rotateY: -15, rotateX: 10, scale: 1.1 }}
            src={item.images?.[0]}
            alt={item.name}
            className="w-full h-full rounded-2xl object-cover shadow-md border border-stone-100"
          />
        </div>

        {/* INFO SECTION */}
        <div className="flex-1 py-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-stone-900 tracking-tight font-serif italic">
                {item.name}
              </h3>
              <button 
                onClick={() => removeItem(item._id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-stone-300 hover:text-red-500"
              >
                <Trash2 size={16} strokeWidth={1.5} />
              </button>
            </div>
            <p className="text-xs font-bold text-stone-500 mt-1">
              ₹{item.price.toLocaleString()}
            </p>
          </div>

          {/* QUANTITY CONTROL - 3D PILL */}
          <div className="flex items-center justify-between">
            <div className="flex items-center bg-stone-50 rounded-full p-1 border border-stone-100 shadow-inner">
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => updateQty(item._id, Math.max(item.minOrderQty, item.qty - 5))}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm text-stone-600 hover:text-stone-900"
              >
                <Minus size={12} />
              </motion.button>

              <span className="text-[11px] font-black text-stone-900 min-w-[40px] text-center">
                {item.qty}
              </span>

              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => updateQty(item._id, item.qty + 5)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm text-stone-600 hover:text-stone-900"
              >
                <Plus size={12} />
              </motion.button>
            </div>
            
            <div className="text-right">
                <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-0.5">Subtotal</p>
                <p className="text-xs font-black text-stone-900">₹{(item.price * item.qty).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}