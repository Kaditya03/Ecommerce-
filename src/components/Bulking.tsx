"use client";

import React from "react";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import { ArrowRight, Mail } from "lucide-react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const Bulking = () => {
  return (
    <div className="w-full bg-[#fdfdfb] py-20 md:py-32 relative overflow-hidden">
      
      {/* Decorative Background Element - Luxury Texture */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f3f3f0] -skew-x-12 translate-x-1/2 -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* IMAGE SECTION - With a floating effect */}
          <div className="relative group order-2 lg:order-1">
            <div className="absolute inset-0 bg-stone-200 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
            <img
              src="/images/bulking.png"
              alt="Bespoke Bulk Orders"
              className="relative w-full h-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* TEXT CONTENT */}
          <div className="flex flex-col justify-center order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-stone-400" />
              <p className={`${poppins.className} text-[10px] uppercase tracking-[0.4em] text-stone-500 font-semibold`}>
                Global Wholesale & Custom
              </p>
            </div>

            <h1 className={`${cormorant.className} text-5xl md:text-7xl font-medium leading-[1.1] text-[#1a1a14]`}>
              Scale Your Vision <br /> 
              <span className="italic text-stone-400">With Us.</span>
            </h1>

            <p className={`${poppins.className} text-stone-600 text-base md:text-lg mt-8 leading-relaxed max-w-lg font-light`}>
              From exclusive artisanal boutiques to large-scale corporate gifting, we specialize in 
              <span className="text-stone-900 font-medium"> tailored craft solutions</span>. Our artisans are ready 
              to bring your custom requirements to life with precision and heritage.
            </p>

            {/* ACTION BUTTONS */}
            <div className="mt-12 flex flex-col sm:flex-row gap-5">
              <button className={`${poppins.className} group flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1a14] text-white text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-all duration-300 shadow-xl shadow-stone-200`}>
                Get in Touch
                <Mail size={16} className="transition-transform group-hover:translate-y-[-2px]" />
              </button>

              <button className={`${poppins.className} group flex items-center justify-center gap-3 px-8 py-4 border border-stone-300 text-stone-800 text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition-all duration-300`}>
                Wholesale Deck
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Subtle Trust Indicator */}
            <p className="mt-10 text-[10px] text-stone-400 uppercase tracking-widest font-medium border-t border-stone-100 pt-6">
              Verified Artisan Network  •  Custom Branding Available  •  Global Logistics
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Bulking;