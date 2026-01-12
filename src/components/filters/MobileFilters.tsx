"use client";
import { motion } from "framer-motion";

export default function MobileFilters({
  price,
  setPrice,
  size,
  setSize,
  onClose,
}: any) {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 20 }}
      className="fixed inset-0 bg-white z-50 p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm mb-2">Max Price</p>
          <input
            type="range"
            min="500"
            max="20000"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-sm mt-1">₹{price}</p>
        </div>

        <div>
          <p className="text-sm mb-2">Size</p>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">All</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
      </div>
<br/>
<br/>
<br/>
<div className="space-y-4">
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
      <button
        onClick={onClose}
        className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-xl"
      >
        Apply Filters
      </button>
    </motion.div>
  );
}
