"use client";

import { motion } from "framer-motion";
import { RotateCcw, Info, ChevronDown, Layers, Clock } from "lucide-react";

export default function Filters({
  material,
  setMaterial,
  availability,
  setAvailability,
  size,
  setSize,
  sort,
  setSort,
}: any) {
  
  const sizeOptions = ["Small", "Medium", "Large"];
  const materialOptions = ["Teak Wood", "Brass", "Ceramic", "Stone"];
  const availabilityOptions = [
    { label: "All Items", value: "" },
    { label: "Ready to Ship", value: "instock" },
    { label: "Made to Order", value: "bespoke" },
  ];
  
  const sortOptions = [
    { label: "Newest Arrivals", value: "newest" },
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
      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-900">
          Refinement
        </h3>
        <motion.button
          whileHover={{ rotate: -180 }}
          transition={{ duration: 0.5 }}
          onClick={() => {
            setMaterial("");
            setAvailability("");
            setSize("");
            setSort("newest");
          }}
          className="p-2 rounded-full hover:bg-stone-100 text-stone-400 transition-colors"
        >
          <RotateCcw size={14} />
        </motion.button>
      </div>

      {/* 1. MATERIAL CATEGORY */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers size={12} className="text-stone-400" />
          <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
            Artisan Material
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          {["", ...materialOptions].map((opt) => (
            <button
              key={opt}
              onClick={() => setMaterial(opt)}
              className={`px-4 py-2 rounded-xl text-[9px] tracking-widest uppercase transition-all duration-300 border ${
                material === opt 
                ? "bg-stone-900 text-white border-stone-900 shadow-md" 
                : "bg-white text-stone-400 border-stone-100 hover:border-stone-300"
              }`}
            >
              {opt === "" ? "Mixed" : opt}
            </button>
          ))}
        </div>
      </div>

      {/* 2. DIMENSION CATEGORY */}
      <div className="space-y-4">
        <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold pl-5">
          Dimension
        </label>
        <div className="flex flex-wrap gap-2">
          {["", ...sizeOptions].map((opt) => (
            <button
              key={opt}
              onClick={() => setSize(opt)}
              className={`px-4 py-2 rounded-xl text-[9px] tracking-widest uppercase transition-all duration-300 border ${
                size === opt 
                ? "bg-stone-900 text-white border-stone-900 shadow-md" 
                : "bg-white text-stone-400 border-stone-100 hover:border-stone-300"
              }`}
            >
              {opt === "" ? "All Sizes" : opt}
            </button>
          ))}
        </div>
      </div>

      {/* 3. AVAILABILITY (Made to Order vs Ready) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-stone-400" />
          <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
            Availability
          </label>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {availabilityOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setAvailability(opt.value)}
              className={`flex items-center justify-between px-5 py-3 rounded-2xl text-[10px] tracking-[0.2em] uppercase transition-all ${
                availability === opt.value 
                ? "bg-stone-50 text-stone-900 font-bold border border-stone-200" 
                : "text-stone-400 hover:text-stone-600"
              }`}
            >
              {opt.label}
              {availability === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />}
            </button>
          ))}
        </div>
      </div>

      {/* 4. ORDERING */}
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
            Bespoke creations may require 4-6 weeks for artisan perfection.
          </p>
        </div>
      </div>
    </motion.div>
  );
}