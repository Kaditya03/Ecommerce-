"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useMenu } from "@/context/MenuContext";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import { ArrowLeft, ArrowRight } from "lucide-react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const slides = [
  {
    image: "/images/hero3.jpg",
    tag: "Collection 2026",
    title: "New Arrivals",
    desc: "Discover handcrafted elegance made for you.",
  },
  {
    image: "/images/hero2.jpg",
    tag: "The Artisan Way",
    title: "Handmade With Love",
    desc: "Exclusive artisan creations crafted by skilled hands.",
  },
  {
    image: "/images/hero1.jpg",
    tag: "Limited Edition",
    title: "Premium Designs",
    desc: "Elevate your space with our limited-edition decor.",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const { menuOpen } = useMenu();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  // --- SMOOTH SCROLL LOGIC ---
  const scrollToCategories = () => {
    const element = document.getElementById("categories");
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }
  };

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] lg:h-[100vh] bg-[#FBFBFA] overflow-hidden">
      
      {/* BACKGROUND 3D TEXT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <motion.h1 
          key={`bg-${index}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 2 }}
          className={`${cormorant.className} text-[30vw] font-bold text-stone-900 whitespace-nowrap`}
        >
          {slides[index].title.split(" ")[0]}
        </motion.h1>
      </div>

      <div className="relative w-full h-full flex flex-col md:flex-row items-center max-w-[1800px] mx-auto z-10">
        
        {/* IMAGE SECTION */}
        <div className="w-full md:w-1/2 h-full relative p-6 md:p-12 lg:p-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[index].image}
              initial={{ opacity: 0, x: -50, rotateY: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: 50, rotateY: -10 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
              className="relative w-full h-full shadow-[30px_50px_80px_rgba(0,0,0,0.15)] rounded-sm overflow-hidden border border-stone-100"
            >
              <motion.div 
                animate={{ scale: [1, 1.1] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                className="w-full h-full"
              >
                <Image
                  src={slides[index].image}
                  alt="Handicraft"
                  fill
                  priority
                  className="object-cover grayscale-[20%]"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CONTENT SECTION */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-12 lg:pr-32">
          <AnimatePresence mode="wait">
            <motion.div key={slides[index].title} className="flex flex-col items-start">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${poppins.className} text-[10px] uppercase tracking-[0.8em] text-stone-400 mb-6`}
              >
                {slides[index].tag}
              </motion.span>

              <div className="overflow-hidden mb-6">
                <motion.h2 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8 }}
                  className={`${cormorant.className} text-6xl sm:text-7xl lg:text-9xl text-[#1A1A18] leading-[0.9] font-light`}
                >
                  {slides[index].title.split(" ").map((word, i) => (
                    <span key={i} className={i === 1 ? "italic font-light text-stone-400" : ""}>
                      {word}{" "}
                    </span>
                  ))}
                </motion.h2>
              </div>

              <motion.p className={`${poppins.className} text-stone-500 text-sm md:text-lg mb-10 max-w-sm font-light leading-relaxed`}>
                {slides[index].desc}
              </motion.p>

              <div className="flex items-center gap-8">
                {/* TRIGGER ATTACHED HERE */}
                <Button 
                  onClick={scrollToCategories}
                  className="bg-[#1A1A18] text-white rounded-full px-10 py-7 text-[11px] uppercase tracking-[0.3em] hover:bg-stone-800 transition-all shadow-xl cursor-pointer"
                >
                  Shop Collection
                </Button>
                
                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <div key={i} className={`h-[2px] transition-all duration-500 ${i === index ? "w-8 bg-stone-800" : "w-4 bg-stone-200"}`} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* NAVIGATION ARROWS */}
      {!menuOpen && (
        <div className="absolute bottom-12 right-12 z-50 flex gap-4">
          <button onClick={prevSlide} className="group flex items-center justify-center w-12 h-12 rounded-full border border-stone-200 hover:border-stone-800 transition-all">
            <ArrowLeft size={18} className="text-stone-400 group-hover:text-stone-800" />
          </button>
          <button onClick={nextSlide} className="group flex items-center justify-center w-12 h-12 rounded-full bg-[#1A1A18] transition-all">
            <ArrowRight size={18} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Hero;