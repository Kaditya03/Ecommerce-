"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import ProductGallery from "@/components/ProductGallery";
import { Playfair_Display, Montserrat } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import BackButton from "@/components/BackButton";
import { ArrowRight, Info, Layers, Sparkles } from "lucide-react";
import { Share2, ShoppingBag, Heart ,Check} from "lucide-react";


const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export default function ProductClient({ product }: any) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const MIN_QTY = product.minOrderQty || 50;
  const [qty, setQty] = useState(MIN_QTY);
  const [added, setAdded] = useState(false);

  return (
    <div className={`min-h-screen bg-[#FBFBFA] ${montserrat.className}`}>
      <div className="fixed top-8 left-8 z-50"><BackButton /></div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LEFT: GALLERY (LIFTED CARD) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 sticky top-24"
          >
            <div className="bg-white rounded-[3rem] p-4 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.1)] border border-stone-100">
              <ProductGallery images={product.images} />
            </div>
          </motion.div>

          {/* RIGHT: INFO (STAGGERED ANIMATION) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-10"
          >
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold"
              >
                <Sparkles size={12} /> Masterpiece Collection
              </motion.div>
              <h1 className={`${playfair.className} text-5xl md:text-7xl leading-tight text-stone-900 italic`}>
                {product.name}
              </h1>
            </div>

            {/* SPECS GRID */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Layers size={14} />, label: "Material", val: product.material || "Artisan Clay" },
                { icon: <Info size={14} />, label: "MOQ", val: `${MIN_QTY} Units` }
              ].map((spec, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm">
                  <div className="flex items-center gap-2 text-stone-400 mb-1">{spec.icon} <span className="text-[9px] uppercase tracking-widest">{spec.label}</span></div>
                  <div className="text-xs font-bold text-stone-800">{spec.val}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">Description</h2>
              <p className="text-stone-600 leading-relaxed font-serif italic text-lg">
                {product.description || "A testament to centuries-old craftsmanship, designed for modern elegance."}
              </p>
            </div>

            {/* CALL TO ACTION BOX */}
            <div className="bg-stone-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400">Select Quantity</span>
                  <div className="flex items-center gap-6 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                    <button onClick={() => qty > MIN_QTY && setQty(qty - 10)} className="text-xl hover:text-stone-400 transition">-</button>
                    <span className="text-lg font-mono font-bold w-12 text-center">{qty}</span>
                    <button onClick={() => setQty(qty + 10)} className="text-xl hover:text-stone-400 transition">+</button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { addToCart(product, qty); setAdded(true); setTimeout(()=>setAdded(false), 2000); }}
                    className="flex-1 bg-white text-stone-900 h-16 rounded-full font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-colors"
                  >
                    {added ? <Check size={20} /> : <>Add to Collection <ArrowRight size={16} /></>}
                  </motion.button>

                  <button 
                    onClick={() => toggleWishlist(product)}
                    className={`w-16 h-16 rounded-full border flex items-center justify-center transition-all ${isWishlisted(product._id) ? "bg-red-500 border-red-500" : "border-white/20 hover:bg-white/10"}`}
                  >
                    <Heart size={20} fill={isWishlisted(product._id) ? "white" : "none"} />
                  </button>
                </div>
              </div>
              
              {/* DECORATIVE GRADIENT */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}