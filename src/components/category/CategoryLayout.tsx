"use client";

import { motion, AnimatePresence } from "framer-motion";
import DesktopFilters from "@/components/filters/DesktopFilters";
import MobileFilters from "@/components/filters/MobileFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { useState, useMemo } from "react";
import BackButton from "@/components/ui/BackButton";

export default function CategoryLayout({
  category,
  products,
}: {
  category: string;
  products: any[];
}) {
  // --- NEW STATE LOGIC ---
  const [availability, setAvailability] = useState("");
  const [material, setMaterial] = useState<string[]>([]);
  const [sort, setSort] = useState("latest");

  // --- PREMIUM FILTERING LOGIC ---
  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchAvailability = availability ? p.availability === availability : true;
      const matchMaterial = material.length > 0 ? material.includes(p.material) : true;
      return matchAvailability && matchMaterial;
    });

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    
    return result;
  }, [products, availability, material, sort]);

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-stone-900 selection:bg-stone-900 selection:text-white">
      <div className="fixed top-6 left-6 z-50">
        <BackButton />
      </div>

      {/* LUXURY HERO SECTION */}
      <header className="relative h-[40vh] flex items-center justify-center overflow-hidden border-b border-stone-100 bg-white">
        {/* Subtle 3D Watermark Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
           <h1 className="text-[20vw] font-bold uppercase tracking-tighter">
             {category.split('-')[0]}
           </h1>
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.5em] text-stone-400 mb-4 block"
          >
            Artisan Collection
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="text-5xl md:text-7xl font-light capitalize tracking-tight font-serif"
          >
            {category.replace(/-/g, " ")}
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "60px" }}
            className="h-[1px] bg-stone-300 mx-auto mt-6"
          />
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-[1800px] mx-auto px-6 lg:px-12 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* DESKTOP FILTER - 3D GLASS CARD */}
          <aside className="hidden lg:block w-80">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-32"
            >
              <DesktopFilters
                availability={availability}
                setAvailability={setAvailability}
                material={material}
                setMaterial={setMaterial}
                sort={sort}
                setSort={setSort}
              />
            </motion.div>
          </aside>

          {/* MOBILE FILTER TRIGGER */}
          <MobileFilters
            availability={availability}
            setAvailability={setAvailability}
            material={material}
            setMaterial={setMaterial}
            sort={sort}
            setSort={setSort}
          />

          {/* PRODUCT VIEWPORT */}
          <div className="flex-1">
            <div className="flex justify-between items-end mb-10">
              <p className="text-[10px] uppercase tracking-widest text-stone-400">
                Showing {filtered.length} masterpieces
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${availability}-${material.join('-')}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <ProductGrid products={filtered} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}