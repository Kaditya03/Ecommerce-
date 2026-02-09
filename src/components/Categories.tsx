"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cormorant_Garamond, Poppins } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const Categories = () => {
  // UPDATED DATA SOURCE
  const collectionsData = [
    { 
      name: "Bathroom Accessories", 
      slug: "bathroom-accessories", 
      img: "/images/categories/BathroomAccessories.avif" 
    },
    { 
      name: "Home Decor", 
      slug: "home-decor", 
      img: "/images/categories/HomeDecor.webp" 
    },
    { 
      name: "Furniture", 
      slug: "furniture", 
      img: "/images/categories/Furniture.webp" 
    },
    { 
      name: "Kitchen Accessories", 
      slug: "kitchen-accessories", 
      img: "/images/categories/kitchen-accessories.avif" 
    },
    { 
      name: "Garden Accessories", 
      slug: "garden-accessories", 
      img: "/images/categories/GardenAccessories.webp" 
    },
    { 
      name: "Pots and Planters", 
      slug: "pots-and-planters", 
      img: "/images/categories/pots-plants.jpg" 
    },
    { 
      name: "Lighting & Candles", 
      slug: "lighting-candles", 
      img: "/images/categories/lighting-candles.avif" 
    },
    { 
      name: "Sculptures", 
      slug: "figurines-sculptures", 
      img: "/images/categories/sclupures.jpg" 
    },
  ];

  return (
    <section
      id="categories"
      className="w-full pt-16 md:pt-32 pb-24 bg-[#FBFBFA] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* HEADER */}
        <div className="relative mb-24 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center"
          >
            <span
              className={`${poppins.className} text-[9px] uppercase tracking-[0.8em] text-stone-400 mb-6`}
            >
              The Aurindel Archive
            </span>

            <h2
              className={`${cormorant.className} text-5xl md:text-8xl text-[#1A1A18] text-center font-light leading-none`}
            >
              Curated{" "}
              <span className="italic text-stone-400 font-light">
                Collections
              </span>
            </h2>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-[0.5px] w-12 bg-stone-200" />
              <div className="w-1.5 h-1.5 rounded-full border border-stone-300" />
              <div className="h-[0.5px] w-12 bg-stone-200" />
            </div>
          </motion.div>
        </div>

        {/* GRID - Supports 8 items now */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-4 scrollbar-hide snap-x snap-mandatory px-2 md:px-0">
          {collectionsData.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: (index % 4) * 0.1,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className={`flex-none snap-center group ${
                index % 2 === 0 ? "lg:mt-0" : "lg:mt-12"
              }`}
            >
              <Link href={`/categories/${item.slug}`} className="flex flex-col items-center">

                {/* IMAGE */}
                <div className="relative w-72 h-[400px] md:w-full md:h-[350px] lg:h-[450px] overflow-hidden">

                  <div className="absolute inset-0 border border-stone-200 z-20 group-hover:inset-4 transition-all duration-700" />

                  <div className="w-full h-full relative overflow-hidden bg-stone-100">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 
                                 scale-100 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
                    />
                  </div>

                  <div className="absolute inset-0 bg-[#1A1A18]/0 group-hover:bg-[#1A1A18]/5 transition-colors duration-700 flex items-center justify-center">
                    <span
                      className={`${poppins.className} translate-y-full group-hover:translate-y-0 transition-transform duration-700 text-[9px] uppercase tracking-[0.4em] text-white bg-black/40 backdrop-blur-md px-4 py-2`}
                    >
                      Explore
                    </span>
                  </div>
                </div>

                {/* LABEL */}
                <div className="mt-8 text-center px-4 w-full">
                  <h3
                    className={`${cormorant.className} text-2xl lg:text-3xl text-stone-800 font-light tracking-wide group-hover:text-stone-400 transition-colors`}
                  >
                    {item.name}
                  </h3>

                  <div className="h-[1px] w-0 bg-stone-300 group-hover:w-full mx-auto transition-all duration-700 mt-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;