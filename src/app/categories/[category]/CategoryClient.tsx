"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import DesktopFilters from "@/components/filters/DesktopFilters";
import MobileFilters from "@/components/filters/MobileFilters";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function CategoryClient({
  category,
  products,
}: {
  category: string;
  products: any[];
}) {
  const [price, setPrice] = useState(10000);
  const [size, setSize] = useState("");
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = products
    .filter((p) => p.price <= price)
    .filter((p) => (size ? p.size === size : true));

  return (
    <section className={`${inter.className} bg-[#fafafa] min-h-screen`}>
      {/* HERO */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1
            className={`${playfair.className} text-3xl sm:text-4xl font-semibold capitalize`}
          >
            {category.replace("-", " ")}
          </h1>
          <p className="text-gray-600 mt-2 max-w-xl">
            Discover premium handcrafted products curated for export & bulk orders.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* DESKTOP FILTERS */}
        <div className="hidden lg:block sticky top-24 h-fit">
          <DesktopFilters
            price={price}
            setPrice={setPrice}
            size={size}
            setSize={setSize}
          />
        </div>

        {/* PRODUCTS */}
        <div className="lg:col-span-3">
          {filtered.length === 0 ? (
            <p className="text-gray-500">
              No products found for this selection.
            </p>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filtered.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* MOBILE FILTER BUTTON */}
      <button
        onClick={() => setMobileFilters(true)}
        className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40
                   bg-indigo-600 text-white px-8 py-3 rounded-full shadow-lg"
      >
        Filters
      </button>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {mobileFilters && (
          <MobileFilters
            price={price}
            setPrice={setPrice}
            size={size}
            setSize={setSize}
            onClose={() => setMobileFilters(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
