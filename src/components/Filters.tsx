"use client";

import { motion } from "framer-motion";
import { RotateCcw, ChevronDown } from "lucide-react";

interface FiltersProps {
  price: number;
  setPrice: (value: number) => void;
  size: string;
  setSize: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
}

export default function Filters({
  price,
  setPrice,
  size,
  setSize,
  sort,
  setSort,
}: FiltersProps) {
  const sizeOptions = ["Small", "Medium", "Large"];

  const sortOptions = [
    { label: "Newest Arrivals", value: "" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
  ];

  return (
    <div className="space-y-10">

      {/* RESET BUTTON */}
      <div className="flex justify-end">
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
          <RotateCcw size={16} />
        </motion.button>
      </div>

      {/* PRICE FILTER */}
      <div className="space-y-4">
        <label className="text-xs uppercase tracking-widest text-stone-500 font-bold">
          Maximum Price: ₹{price}
        </label>

        <input
          type="range"
          min="1000"
          max="20000"
          step="500"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* SIZE FILTER */}
      <div className="space-y-4">
        <label className="text-xs uppercase tracking-widest text-stone-500 font-bold">
          Size
        </label>

        <div className="flex flex-wrap gap-2">
          {["", ...sizeOptions].map((opt) => (
            <button
              key={opt}
              onClick={() => setSize(opt)}
              className={`px-4 py-2 rounded-xl text-xs uppercase border transition ${
                size === opt
                  ? "bg-stone-900 text-white border-stone-900"
                  : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
              }`}
            >
              {opt === "" ? "All Sizes" : opt}
            </button>
          ))}
        </div>
      </div>

      {/* SORT FILTER */}
      <div className="space-y-4">
        <label className="text-xs uppercase tracking-widest text-stone-500 font-bold">
          Sort By
        </label>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full bg-stone-50 rounded-xl px-4 py-3 text-xs uppercase appearance-none focus:ring-1 focus:ring-stone-200"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
            <ChevronDown size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}