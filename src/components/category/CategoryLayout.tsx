"use client";

import { motion, AnimatePresence } from "framer-motion";
import DesktopFilters from "@/components/filters/DesktopFilters";
import MobileFilters from "@/components/filters/MobileFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { useState, useMemo } from "react";
import BackButton from "@/components/ui/BackButton";

const collectionsData: any = {
  "bathroom-accessories": { title: "Bathroom Accessories", items: ["Hooks", "Handle", "Laundry Basket", "Soap Dispenser", "Soap Dish"] },
  "home-decor": { title: "Home Decor", subItems: [{ name: "Vases" }, { name: "Wall Art" }, { name: "Mirrors" }] },
  "furniture": { title: "Furniture", items: ["Dining Table", "Console Table", "Center Table", "Side Table", "Bookshelf", "Shoe Rack", "Ottoman"] },
  "kitchen-accessories": { title: "Kitchen Accessories", items: ["Utensil Holders", "Storage Container", "Dish Rack"] },
  "garden-accessories": { title: "Garden Accessories", items: ["Water Cans", "Tree Decor", "Bird Table", "Garden Wall Art", "Wind Chimes", "Wind Spinners", "Bird Bath", "Garden Urm"] },
  "pots-and-planters": { title: "Pots and Planters" },
  "lighting-candles": { title: "Lighting & Candle Holders", items: ["Lanterns", "Candelabrum", "T-Light Holder", "Hurricane Holder", "Moroccan Holder", "Pillar Holder"] },
  "figurines-sculptures": { title: "Figurines & Sculptures" }
};

export default function CategoryLayout({
  category = "",
  products = [],
}: {
  category: string;
  products: any[];
}) {
  const [availability, setAvailability] = useState("");
  const [selectedSubItems, setSelectedSubItems] = useState<string[]>([]);
  const [sort, setSort] = useState("latest");

  const activeCollection = collectionsData[category] || { title: category.replace(/-/g, " ") };

  // --- REFINED FILTERING LOGIC ---
  const filtered = useMemo(() => {
    const safeProducts = Array.isArray(products) ? products : [];

    let result = safeProducts.filter((p) => {
      const matchAvailability = availability ? p.availability === availability : true;
      const matchSubItem = selectedSubItems.length > 0 
        ? (p.subCategory && selectedSubItems.includes(p.subCategory)) || 
          (p.type && selectedSubItems.includes(p.type))
        : true;

      return matchAvailability && matchSubItem;
    });

    if (sort === "price-asc") result.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sort === "price-desc") result.sort((a, b) => (b.price || 0) - (a.price || 0));
    
    return result;
  }, [products, availability, selectedSubItems, sort]);

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-stone-900 selection:bg-stone-900 selection:text-white">
      <div className="fixed top-6 left-6 z-50">
        <BackButton />
      </div>

      <header className="relative h-[40vh] flex items-center justify-center overflow-hidden border-b border-stone-100 bg-white">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
           <h1 className="text-[20vw] font-bold uppercase tracking-tighter">
             {category ? category.split('-')[0] : "Collection"}
           </h1>
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] uppercase tracking-[0.5em] text-stone-400 mb-4 block">
            Artisan Collection
          </motion.span>
          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl font-light capitalize tracking-tight font-serif">
            {category.replace(/-/g, " ")}
          </motion.h1>
          <div className="h-[1px] bg-stone-300 w-16 mx-auto mt-6" />
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto px-6 lg:px-12 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          <aside className="hidden lg:block w-80">
            <div className="sticky top-32">
              <DesktopFilters
                activeCollection={activeCollection}
                selectedSubItems={selectedSubItems}
                setSelectedSubItems={setSelectedSubItems}
                availability={availability}
                setAvailability={setAvailability}
                sort={sort}
                setSort={setSort}
              />
            </div>
          </aside>

          <MobileFilters
            activeCollection={activeCollection}
            selectedSubItems={selectedSubItems}
            setSelectedSubItems={setSelectedSubItems}
            availability={availability}
            setAvailability={setAvailability}
            sort={sort}
            setSort={setSort}
          />

          <div className="flex-1">
            <div className="flex justify-between items-end mb-10 border-b border-stone-100 pb-4">
              <p className="text-[10px] uppercase tracking-widest text-stone-400">
                {filtered.length} results
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${availability}-${selectedSubItems.join('-')}-${sort}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ProductGrid products={filtered} />
                {filtered.length === 0 && (
                   <div className="py-20 text-center text-stone-400 italic font-serif">
                     No masterpieces found matching these criteria.
                   </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}