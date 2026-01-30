"use client";

import React, { useRef, useState, useEffect } from "react";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

/* ================= STAT ITEM ================= */
type StatItemProps = {
  end: string;
  label: string;
  delay?: number;
};

const StatItem = ({ end, label, delay = 0 }: StatItemProps) => {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const endVal = parseInt(end);
      const timer = setInterval(() => {
        start += endVal / 100;
        if (start >= endVal) {
          setCount(endVal);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 20);

      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
      className="flex flex-col items-center lg:items-start"
    >
      <span className={`${cormorant.className} text-5xl md:text-7xl lg:text-8xl font-light text-[#2D2D2A] leading-none`}>
        {count.toLocaleString()}{end.includes("+") ? "+" : ""}
      </span>

      <p className={`${poppins.className} text-[7px] md:text-[9px] tracking-[0.5em] font-medium text-stone-400 uppercase mt-2`}>
        {label}
      </p>
    </motion.div>
  );
};


/* ================= MAIN BANNER ================= */
const Banner = () => {
  const [isMissionOpen, setIsMissionOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const yStats = useTransform(scrollYProgress, [0, 1], [40, -40]);
  
  // CORNER TO CORNER WATERMARK MOTION
  const xWatermarkLeft = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="w-full bg-[#FBFBFA] pt-8 md:pt-12 pb-20 md:pb-32 relative overflow-hidden">
      
      {/* 1. EDGE-TO-EDGE AURINDEL WATERMARK */}
      <motion.div 
        style={{ x: xWatermarkLeft }}
        className="absolute top-[15%] left-0 w-[120%] pointer-events-none select-none opacity-[0.15] z-0"
      >
        <h1 className={`${cormorant.className} text-[14vw] font-light italic text-stone-300 whitespace-nowrap leading-none tracking-[-0.05em]`}>
          Aurindel — Heritage — Impact — Purpose — Craftsmanship — Aurindel
        </h1>
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
          
          {/* CONTENT SECTION */}
          <div className="lg:col-span-7 pt-4 md:pt-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            >
              <span className={`${poppins.className} block text-[9px] uppercase tracking-[0.6em] text-stone-400 font-medium mb-4`}>
                Social Enterprise
              </span>
              
              <h1 className={`${cormorant.className} text-5xl md:text-8xl lg:text-9xl font-light text-[#1A1A18] leading-[1.1] mb-8`}>
                Every choice <br /> 
                <span className="italic font-light text-stone-400/80">sustains a life.</span>
              </h1>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
                <div className="h-[30px] w-[1px] bg-stone-300 hidden md:block" />
                <p className={`${poppins.className} text-stone-500 text-sm md:text-lg leading-relaxed max-w-sm font-light italic`}>
                  Bringing rural mastery into the modern home.
                </p>
              </div>
              
              {/* 2. PREMIUM CAPSULE MISSION BUTTON */}
              <motion.button 
                onClick={() => setIsMissionOpen(true)}
                whileHover="hover"
                initial="initial"
                className="group relative flex items-center gap-6 border border-stone-200 bg-white px-8 py-5 rounded-full overflow-hidden transition-all duration-500 hover:border-stone-800"
              >
                {/* Liquid Fill Background */}
                <motion.div 
                  variants={{
                    initial: { y: "100%" },
                    hover: { y: 0 }
                  }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute inset-0 bg-[#1A1A18] z-0"
                />
                
                <span className={`${poppins.className} relative z-10 text-[10px] uppercase tracking-[0.5em] text-[#1A1A18] group-hover:text-white font-bold transition-colors duration-300`}>
                  The Mission
                </span>
                
                <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-stone-50 group-hover:bg-white/10 transition-colors">
                  <ArrowUpRight size={14} className="text-[#1A1A18] group-hover:text-white transition-colors" />
                </div>
              </motion.button>
            </motion.div>
          </div>

          {/* VISUAL SECTION */}
          <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end mt-12 lg:mt-0">
            <motion.div 
              style={{ y: yImage }}
              className="relative w-[85%] md:w-[70%] lg:w-[90%] aspect-[3/4] overflow-hidden rounded-sm shadow-sm border border-stone-100 bg-[#F5F5F2]"
            >
              <motion.img
                initial={{ scale: 1.05, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="/images/Banner.png"
                alt="Artisan"
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>

            <motion.div 
              style={{ y: yStats }}
              className="mt-[-8%] md:mt-[-5%] lg:mt-0 lg:absolute lg:bottom-[-10%] lg:left-[-25%] z-20 
                         flex flex-row lg:flex-col gap-10 md:gap-16 lg:gap-12 
                         bg-white/80 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-6 lg:p-0 rounded-sm"
            >
              <StatItem end="21+" label="States" delay={0.4} />
              <StatItem end="2000" label="Artisans" delay={0.6} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* MISSION OVERLAY */}
      <AnimatePresence>
        {isMissionOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMissionOpen(false)}
              className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-[90] cursor-pointer"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="fixed top-0 right-0 h-full w-full md:w-[550px] bg-white z-[100] p-12 md:p-24 shadow-2xl flex flex-col"
            >
              <button onClick={() => setIsMissionOpen(false)} className="self-end mb-16 text-stone-300 hover:text-stone-900 transition-colors">
                <X size={32} strokeWidth={1} />
              </button>
              <h2 className={`${cormorant.className} text-6xl text-[#1A1A18] mb-10 leading-none`}>
                The <span className="italic">Aurindel</span> <br /> Manifesto
              </h2>
              <div className="space-y-6">
                <p className={`${poppins.className} text-stone-600 text-lg leading-relaxed font-light`}>
                  We believe that luxury shouldn't come at the cost of heritage. Our mission is to bridge the gap between rural master-craftsmen and the conscious modern lifestyle.
                </p>
                <p className={`${poppins.className} text-stone-600 text-lg leading-relaxed font-light`}>
                  By bypassing intermediaries, we ensure economic dignity for over 2,000 families across 21 Indian states, ensuring that ancient skills thrive in a modern world.
                </p>
              </div>
              <div className="mt-auto pt-10 border-t border-stone-100">
                <p className={`${cormorant.className} text-2xl italic text-stone-400`}>Sustainability through Craft.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Banner;