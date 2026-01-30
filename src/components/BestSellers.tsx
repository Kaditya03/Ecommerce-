"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Plus, ArrowRight, Heart } from "lucide-react";
import "swiper/css";

/* ================= TYPES ================= */

type Product = {
  id: string;
  name: string;
  sub: string;
  img: string;
  price: string;
  off: string;
};

/* ================= DATA ================= */

const products: Product[] = [
  { id: "01", name: "Spice Box With Spoon", sub: "Sheesham Wood", img: "/images/p1.jpg", price: "On Request", off: "43% Off" },
  { id: "02", name: "Moroccan Flame Lamp", sub: "Hand-etched Brass", img: "/images/p2.webp", price: "On Request", off: "54% Off" },
  { id: "03", name: "Mughal Roots Planter", sub: "Ceramic Art", img: "/images/p3.webp", price: "On Request", off: "35% Off" },
  { id: "04", name: "Pyramid Table Lamp", sub: "Geometric Wood", img: "/images/p4.webp", price: "On Request", off: "50% Off" },
  { id: "05", name: "Mughal Cylindrical Jars", sub: "Handcrafted Glass", img: "/images/p5.jpg", price: "On Request", off: "46% Off" },
];

/* ================= PRODUCT CARD ================= */

const ProductCard = ({ p }: { p: Product }) => {
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const handleTouch = () => {
    setIsTouched(true);
    setTimeout(() => setIsTouched(false), 3000);
  };

  return (
    <div className="group relative flex flex-col bg-white" onClick={handleTouch}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F5F3] rounded-sm shadow-sm">
        <img
          src={p.img}
          alt={p.name}
          className={`h-full w-full object-cover transition-transform duration-[1.5s] ease-out ${
            isTouched ? "scale-110" : "md:group-hover:scale-110"
          }`}
        />

        <div className="absolute top-4 left-4 md:top-5 md:left-5">
          <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            {p.id} // {p.off}
          </span>
        </div>

        <button
          className={`absolute top-4 right-4 h-9 w-9 md:h-10 md:w-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all duration-500 ${
            isTouched
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0"
          }`}
        >
          <Heart size={16} className="text-gray-900" />
        </button>

        <button
          className={`absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 bg-black py-4 md:py-5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-transform duration-500 ease-out ${
            isTouched ? "translate-y-0" : "translate-y-full md:group-hover:translate-y-0"
          }`}
        >
          <Plus size={14} /> Add to Collection
        </button>
      </div>

      <div className="mt-5 md:mt-6 flex flex-col items-center text-center px-2">
        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1 font-semibold">
          {p.sub}
        </span>

        <h3 className="text-base md:text-xl font-light tracking-tight text-gray-900 font-serif italic leading-tight">
          {p.name}
        </h3>

        <div
          className={`mt-2 md:mt-3 h-[1px] bg-gray-200 transition-all duration-700 ${
            isTouched
              ? "w-12 bg-blue-600"
              : "w-5 md:group-hover:w-12 md:group-hover:bg-blue-600"
          }`}
        />

        <p className="mt-3 text-xs md:text-sm font-bold text-gray-900 tracking-widest">
          {p.price}
        </p>
      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */

const BestSellers = () => {
  return (
    <section className="w-full bg-[#FCFCFB] pt-16 pb-24 px-4 md:px-12 overflow-hidden">
      <div className="mx-auto max-w-[1440px]">

        {/* HEADER */}
        <div className="relative mb-20 md:mb-28 flex flex-col items-center text-center">
          <span className="absolute top-[-10px] md:top-[-20px] left-1/2 -translate-x-1/2 text-[50px] md:text-[140px] font-black text-gray-100/60 select-none leading-none -z-10 tracking-tighter uppercase">
            Timeless
          </span>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-serif tracking-tighter text-gray-900 leading-tight">
              The <span className="italic text-gray-400 font-light">Curated</span>
            </h2>

            <div className="mt-6 md:mt-8 flex flex-col items-center">
              <div className="h-[1.5px] w-12 md:w-16 bg-blue-600 mb-6 md:mb-8" />
              <p className="max-w-2xl text-[9px] md:text-xs uppercase tracking-[0.4em] text-gray-600 font-bold">
                Handpicked treasures.{" "}
                <span className="text-black">Timeless craftsmanship.</span>
              </p>
            </div>
          </div>

          <div className="mt-10 md:mt-14">
            <Link
              href="/all"
              className="group flex flex-col items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-gray-900"
            >
              <span className="transition-all md:group-hover:tracking-[0.6em]">
                View Entire Edit
              </span>
              <span className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-gray-200 transition-all duration-500 md:group-hover:bg-black md:group-hover:text-white">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>

        {/* GRID */}
        <div className="hidden md:grid grid-cols-5 gap-8 lg:gap-12">
          {products.map((p, i) => (
            <div key={p.id} className={i % 2 !== 0 ? "mt-20" : ""}>
              <ProductCard p={p} />
            </div>
          ))}
        </div>

        {/* MOBILE SLIDER */}
        <div className="md:hidden -mx-4">
          <Swiper spaceBetween={20} slidesPerView={1.3} centeredSlides>
            {products.map((p) => (
              <SwiperSlide key={p.id} className="py-4">
                <ProductCard p={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
