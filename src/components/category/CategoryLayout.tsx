"use client";

import { motion, AnimatePresence } from "framer-motion";
import DesktopFilters from "@/components/filters/DesktopFilters";
import MobileFilters from "@/components/filters/MobileFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BackButton from "@/components/ui/BackButton";

const collectionsData: any = {
  "bathroom-accessories": { title: "Bathroom Accessories", items: ["Hooks & Handle", "Bath Caddy", "Laundry Basket", "Tooth Brush", "Soap Dispenser", "Soap Dish"] },
  "home-decor": { title: "Home Decor", subItems: [{ name: "Vases" }, { name: "Wall Art" }, { name: "Mirrors" }] },
  "furniture": { title: "Furniture", items: ["Dining Table", "Console Table", "Coffee & Center Table", "Side Table", "Bookshelf", "Shoe Rack", "Ottoman"] },
  "kitchen-accessories": { title: "Kitchen Accessories", items: ["Utensil Holders", "Storage Container", "Dish Rack & Storage"] },
  "garden-accessories": { title: "Garden Accessories", items: ["Water Cans", "Tree Decor", "Bird Table", "Garden Wall Art", "Wind Chimes", "Wind Spinners", "Bird Bath", "Garden Urm"] },
  "pots-and-planters": { title: "Pots and Planters" },
  "lighting-candles": { title: "Lighting & Candle Holders", items: ["Candelabrum", "Christmas", "T-Light", "Hurricane", "Moroccan Holder", "Pillar Holder"] },
  "figurines-sculptures": { title: "Figurines & Sculptures" }
};

function CategoryContent({ category, products }: { category: string, products: any[] }) {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type");

  const [availability, setAvailability] = useState("");
  const [selectedSubItems, setSelectedSubItems] = useState<string[]>([]);
  const [sort, setSort] = useState("latest");

  const activeCollection = collectionsData[category] || { title: category.replace(/-/g, " ") };

  useEffect(() => {
    if (initialType) {
      setSelectedSubItems([initialType]);
    } else {
      setSelectedSubItems([]);
    }
  }, [initialType]);

  const filtered = useMemo(() => {
    const safeProducts = Array.isArray(products) ? products : [];

    let result = safeProducts.filter((p) => {
      // 1. Availability Logic (Matches 'in-stock' or 'custom' against DB status if exists)
      const pStatus = (p.availability || p.availabilityStatus || p.status || "").toLowerCase();
      const normalizedTarget = availability.replace("-", "").toLowerCase();
      const matchAvailability = availability ? pStatus.includes(normalizedTarget) : true;

      // 2. Fuzzy Sub-Item Check (Handles Plurals like Vases vs Vase)
      const matchSubItem = selectedSubItems.length > 0 
        ? selectedSubItems.some(filterValue => {
            const productTitle = (p.name || "").toLowerCase();
            const productCat = (p.category || "").toLowerCase();
            
            // Normalize: remove trailing 's' to match singular/plural (e.g., Vases -> vase)
            const normalizedFilter = filterValue.toLowerCase().replace(/s$/, "");
            
            return (
              productTitle.includes(normalizedFilter) || 
              productCat.includes(normalizedFilter)
            );
          })
        : true;

      return matchAvailability && matchSubItem;
    });

    // 3. Sorting Logic
    if (sort === "price-asc") {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price?.toString().replace(/[^0-9.]/g, '')) || 0;
        const priceB = parseFloat(b.price?.toString().replace(/[^0-9.]/g, '')) || 0;
        return priceA - priceB;
      });
    }
    if (sort === "price-desc") {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price?.toString().replace(/[^0-9.]/g, '')) || 0;
        const priceB = parseFloat(b.price?.toString().replace(/[^0-9.]/g, '')) || 0;
        return priceB - priceA;
      });
    }
    if (sort === "latest") {
      result.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    }
    
    return result;
  }, [products, selectedSubItems, availability, sort]);

  return (
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
            {filtered.length} masterpieces found
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedSubItems.join('-')}-${sort}-${availability}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.length > 0 ? (
              <ProductGrid products={filtered} />
            ) : (
              <div className="py-40 text-center flex flex-col items-center justify-center">
                <p className="text-stone-400 italic font-serif text-2xl mb-4">
                  No masterpieces found matching these criteria.
                </p>
                <button 
                  onClick={() => { setSelectedSubItems([]); setAvailability(""); setSort("latest"); }}
                  className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-stone-900 pb-1 hover:text-stone-500 transition-colors"
                >
                  Clear All Refinements
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function CategoryLayout({
  category = "",
  products = [],
}: {
  category: string;
  products: any[];
}) {
  return (
    <div className="min-h-screen bg-[#FBFBFA] text-stone-900 selection:bg-stone-900 selection:text-white">
      <div className="fixed top-6 left-6 z-50">
        <BackButton />
      </div>

      <header className="relative h-[40vh] flex items-center justify-center overflow-hidden border-b border-stone-100 bg-white">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
           <h1 className="text-[20vw] font-bold uppercase tracking-tighter">
             {category ? category.split('-')[0] : "Artisan"}
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
        <Suspense fallback={<div className="text-center py-20 italic text-stone-400">Loading collection...</div>}>
          <CategoryContent category={category} products={products} />
        </Suspense>
      </main>
    </div>
  );
}