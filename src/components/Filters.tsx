"use client";

import { motion } from "framer-motion";
import { RotateCcw, Info, ChevronDown, Check } from "lucide-react";

export default function Filters({
  price,
  setPrice,
  size,
  setSize,
  sort,
  setSort,
}: any) {
  
  const sizeOptions = ["Small", "Medium", "Large"];
  const sortOptions = [
    { label: "Default", value: "" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-stone-200/60 p-8 space-y-10 shadow-[20px_20px_60px_#d9d9d9,-20px_-20px_60px_#ffffff]"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-900">
          Refinement
        </h3>
        <motion.button
          whileHover={{ rotate: -180 }}
          transition={{ duration: 0.5 }}
          onClick={() => {
            setPrice(6000);
            setSize("");
            setSort("");
          }}
          className="p-2 rounded-full hover:bg-stone-100 text-stone-400 transition-colors"
        >
          <RotateCcw size={14} />
        </motion.button>
      </div>

      {/* PRICE FILTER - 3D SLIDER */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
            Budget Limit
          </label>
          <span className="text-sm font-serif italic text-stone-900">
            ₹{price.toLocaleString()}
          </span>
        </div>

        <div className="relative h-6 flex items-center">
          <input
            type="range"
            min="1000"
            max="6000"
            step="500"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="absolute w-full h-1.5 bg-stone-100 rounded-full appearance-none cursor-pointer accent-stone-900"
            style={{
              background: `linear-gradient(to right, #1c1917 ${(price - 1000) / 50}%, #f5f5f4 0%)`
            }}
          />
        </div>
        <div className="flex justify-between text-[9px] text-stone-400 font-bold tracking-tighter">
          <span>₹1,000</span>
          <span>₹6,000</span>
        </div>
      </div>

      {/* SIZE FILTER - INTERACTIVE CHIPS */}
      <div className="space-y-4">
        <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
          Dimension
        </label>
        <div className="flex flex-wrap gap-2">
          {["", ...sizeOptions].map((opt) => (
            <button
              key={opt}
              onClick={() => setSize(opt)}
              className={`px-4 py-2 rounded-full text-[10px] tracking-widest uppercase transition-all duration-300 border ${
                size === opt 
                ? "bg-stone-900 text-white border-stone-900 shadow-lg shadow-stone-200" 
                : "bg-white text-stone-400 border-stone-100 hover:border-stone-300"
              }`}
            >
              {opt === "" ? "All" : opt}
            </button>
          ))}
        </div>
      </div>

      {/* SORT FILTER - LUXURY SELECT */}
      <div className="space-y-4">
        <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
          Ordering
        </label>
        <div className="relative group">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full bg-stone-50 border-none rounded-2xl px-5 py-4 text-[11px] uppercase tracking-widest appearance-none focus:ring-1 focus:ring-stone-200 transition-all cursor-pointer"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* MOOD INFO BOX */}
      <div className="relative group overflow-hidden bg-stone-900 rounded-[1.5rem] p-5">
        <div className="absolute -right-4 -top-4 text-white/5 rotate-12">
          <Info size={80} />
        </div>
        <div className="flex gap-3 relative z-10">
          <Info size={14} className="text-stone-400 shrink-0" />
          <p className="text-[9px] leading-relaxed text-stone-300 uppercase tracking-widest">
            Minimum export quantities apply to artisan creations.
          </p>
        </div>
      </div>
    </motion.div>
  );
}