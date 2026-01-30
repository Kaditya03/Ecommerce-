"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Filters from "@/components/Filters";
import { Inter, Playfair_Display } from "next/font/google";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import BackButton from "@/components/BackButton";
import { SlidersHorizontal, X, LayoutGrid } from "lucide-react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["500", "600", "700"] });

type Product = {
  id: string;
  price: number;
  size?: string;
};

type Props = {
  title: string;
  products: Product[];
};

export default function CategoryClient({ title, products = [] }: Props) {
  const [price, setPrice] = useState(6000);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

  let filteredProducts = products
    .filter((p) => p.price <= price)
    .filter((p) => (size ? p.size === size : true));

  if (sort === "price-asc") filteredProducts.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filteredProducts.sort((a, b) => b.price - a.price);

  return (
    <main className={`${inter.className} bg-[#FAF9F6] min-h-screen selection:bg-stone-200`}>
      <BackButton />

      {/* HERO */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-stone-200 bg-white">
        <motion.div style={{ y: y1, opacity: opacityHero }} className="relative z-10 text-center px-6">
          
          {/* FIXED: tracking ➜ letterSpacing */}
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase font-bold text-stone-400 block mb-4"
          >
            Artisan Collection
          </motion.span>

          <h1 className={`${playfair.className} text-5xl md:text-7xl lg:text-8xl text-stone-900 tracking-tight`}>
            {title}
          </h1>

          <p className="mt-6 text-stone-500 max-w-xl mx-auto text-sm md:text-base font-light italic">
            "Every piece tells a story of heritage, sculpted by hands that bridge generations."
          </p>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
          <h2 className="text-[25vw] font-black tracking-tighter uppercase leading-none">
            {title.split(" ")[0]}
          </h2>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-20">
        <div className="flex flex-col md:flex-row gap-16">

          {/* SIDEBAR */}
          <aside className="hidden md:block w-[300px] sticky top-32 h-fit">
            <div className="p-8 rounded-[2rem] bg-white/50 backdrop-blur-xl border border-white shadow-sm">
              <div className="flex items-center gap-3 mb-10">
                <SlidersHorizontal size={18} />
                <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold">
                  Refine Search
                </h2>
              </div>
              <Filters
                price={price}
                setPrice={setPrice}
                size={size}
                setSize={setSize}
                sort={sort}
                setSort={setSort}
              />
            </div>
          </aside>

          {/* PRODUCTS */}
          <div className="flex-1">
            <div className="flex justify-between items-end mb-12 border-b pb-6">
              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                Showing {filteredProducts.length} Creations
              </p>
              <LayoutGrid size={18} />
            </div>

            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <p className="text-stone-400 italic text-lg">
                  No treasures found.
                </p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
              >
                <AnimatePresence>
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-[85%] bg-white z-[70] p-10"
            >
              <div className="flex justify-between mb-8">
                <h3 className="uppercase tracking-widest text-xs font-bold">
                  Refine
                </h3>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <Filters
                price={price}
                setPrice={setPrice}
                size={size}
                setSize={setSize}
                sort={sort}
                setSort={setSort}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
