"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Heart, Minus, Plus, 
  Sparkles, ShieldCheck, Globe, ArrowRight, Check 
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductGallery from "@/components/ProductGallery";

export default function ProductDetailView({ product, isOpen, onClose }: any) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Initialize with 1 to avoid crash; useEffect will update this when product is clicked
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Update quantity whenever a new product is selected
  useEffect(() => {
    if (product?.minOrderQty) {
      setQty(product.minOrderQty);
    }
  }, [product]);

  // Prevent rendering if no product is selected, but hooks have already run
  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, qty);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden">
          {/* BACKGROUND OVERLAY: Glassmorphism */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-950/60 backdrop-blur-xl"
          />

          {/* MAIN 3D CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: "10deg" }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: "0deg" }}
            exit={{ opacity: 0, scale: 0.9, y: 40, rotateX: "-10deg" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-7xl h-full max-h-[90vh] bg-[#FBFBFA] rounded-[3rem] overflow-hidden shadow-[0_100px_100px_-50px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col lg:flex-row shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* CLOSE BUTTON */}
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 z-[110] p-3 bg-stone-900 text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl"
            >
              <X size={20} />
            </button>

            {/* LEFT SIDE: LARGE GALLERY (Lifts slightly on Z-axis) */}
            <div 
              className="w-full lg:w-[55%] h-[40%] lg:h-full bg-stone-100 relative"
              style={{ transform: "translateZ(20px)" }}
            >
              <ProductGallery images={product.images} />
              
              {/* Premium Floating Certification */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-8 hidden lg:flex items-center gap-4 bg-white/90 backdrop-blur-md p-5 rounded-[2rem] border border-white/50 shadow-2xl"
              >
                <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center text-white shadow-lg">
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Authenticity</p>
                  <p className="text-sm font-serif italic text-stone-900">Certified Artisan Creation</p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDE: PREMIUM DETAILS */}
            <div className="w-full lg:w-[45%] h-[60%] lg:h-full p-8 lg:p-16 flex flex-col justify-between overflow-y-auto bg-white custom-scrollbar">
              <div className="space-y-12">
                {/* Product Identity */}
                <div className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-[1px] w-8 bg-stone-300" />
                    <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold">
                      {product.category?.replace(/-/g, " ") || "Collection"}
                    </span>
                  </motion.div>
                  <h1 className="text-4xl lg:text-7xl font-serif italic text-stone-900 leading-[1.1]">
                    {product.name}
                  </h1>
                </div>

                {/* Narrative Info */}
                <div className="space-y-6">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-stone-900 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-stone-900" /> 
                    Description
                  </h2>
                  <p className="text-stone-500 leading-relaxed font-light text-lg lg:text-xl italic font-serif">
                    {product.description || "A masterfully crafted piece reflecting the soul of traditional heritage. Each detail is finished to perfection for the discerning collector."}
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-8 py-8 border-y border-stone-50">
                  <div className="flex items-center gap-4">
                    <ShieldCheck size={20} className="text-stone-400" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600">Export Quality</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Globe size={20} className="text-stone-400" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600">Global Shipping</span>
                  </div>
                </div>
              </div>

              {/* ACTION SECTION: 3D Control Panel */}
              <div className="mt-12 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-stone-50 p-6 rounded-[2rem] border border-stone-100 shadow-inner">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-1">Curation Quantity</p>
                      <p className="text-[9px] text-stone-400 uppercase tracking-tighter">Minimum {product.minOrderQty} Pcs required</p>
                   </div>
                   <div className="flex items-center gap-8 bg-white px-6 py-3 rounded-2xl shadow-sm border border-stone-100">
                      <button 
                        onClick={() => setQty(q => Math.max(product.minOrderQty, q - 10))} 
                        className="text-stone-300 hover:text-stone-900 transition-colors text-xl"
                      > − </button>
                      <span className="text-lg font-bold font-mono min-w-[3ch] text-center">{qty}</span>
                      <button 
                        onClick={() => setQty(q => q + 10)} 
                        className="text-stone-300 hover:text-stone-900 transition-colors text-xl"
                      > + </button>
                   </div>
                </div>

                <div className="flex gap-4">
                <motion.button
  whileHover={{ 
    y: -5, 
    boxShadow: "0 30px 60px -15px rgba(0,0,0,0.3)" 
  }}
  whileTap={{ scale: 0.98 }}
  onClick={handleAdd}
  className={`flex-1 h-20 rounded-[2rem] flex items-center justify-center gap-4 font-black uppercase tracking-[0.3em] text-[11px] transition-all duration-700 ${
    isAdded ? "bg-stone-900 text-white" : "bg-white text-stone-900"
  }`}
>

                    {isAdded ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                        <Check size={20} /> Request Received
                      </motion.div>
                    ) : (
                      <>Add to Cart <ArrowRight size={18} /></>
                    )}
                  </motion.button>

                  <button 
                    onClick={() => toggleWishlist(product)}
                    className={`w-20 h-20 rounded-[2rem] border flex items-center justify-center transition-all duration-500 ${
                      isWishlisted(product._id) 
                      ? "bg-red-50 border-red-100 text-red-500 shadow-xl shadow-red-50" 
                      : "border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    <Heart size={24} fill={isWishlisted(product._id) ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}