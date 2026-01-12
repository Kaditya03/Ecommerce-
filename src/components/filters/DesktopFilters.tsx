"use client";

import { motion } from "framer-motion";

export default function DesktopFilters({
  price,
  setPrice,
  size,
  setSize,
}: {
  price: number;
  setPrice: (v: number) => void;
  size: string;
  setSize: (v: string) => void;
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="
        sticky top-24
        rounded-2xl
        bg-white/90 backdrop-blur
        shadow-xl
        border border-gray-200
        p-6
        space-y-8
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Filters
        </h3>
        <span className="text-xs text-gray-400">
          Refine results
        </span>
      </div>

      {/* PRICE FILTER */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">
          Price Range
        </p>

        <input
          type="range"
          min={500}
          max={20000}
          step={500}
          value={price}
          onChange={(e) =>
            setPrice(Number(e.target.value))
          }
          className="w-full accent-indigo-600 cursor-pointer"
        />

        <div className="flex justify-between text-xs text-gray-500">
          <span>₹500</span>
          <span className="font-medium text-indigo-600">
            ₹{price}
          </span>
          <span>₹20,000+</span>
        </div>
      </div>

      {/* SIZE FILTER */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">
          Size
        </p>

        <div className="grid grid-cols-3 gap-2">
          {["Small", "Medium", "Large"].map((s) => {
            const active = size === s;
            return (
              <button
                key={s}
                onClick={() =>
                  setSize(active ? "" : s)
                }
                className={`
                  h-10 rounded-xl text-sm font-medium transition
                  ${
                    active
                      ? "bg-indigo-600 text-white shadow"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }
                `}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* MOQ FILTER (VISUAL – BULK FOCUS) */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">
          Order Type
        </p>

        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked
              readOnly
              className="accent-indigo-600"
            />
            <span className="text-sm text-gray-600">
              Bulk orders (MOQ ≥ 50)
            </span>
          </label>

          <p className="text-xs text-gray-400 ml-6">
            All products are export-ready bulk items
          </p>
        </div>
      </div>

      {/* TRUST BADGES */}
      <div className="pt-4 border-t space-y-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Why Aurindel?
        </p>

        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            ✅ Handcrafted by artisans
          </li>
          <li className="flex items-center gap-2">
            🚚 Pan-India & export shipping
          </li>
          <li className="flex items-center gap-2">
            🏆 Premium quality assurance
          </li>
        </ul>
      </div>
    </motion.aside>
  );
}
