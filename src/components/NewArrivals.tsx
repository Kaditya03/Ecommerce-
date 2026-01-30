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
  old: string;
  off: string;
};

type ProductCardProps = {
  p: Product;
};

/* ================= DATA ================= */

const products: Product[] = [
  { id: "01", name: "Forest Canopy Ceramic Plates", sub: "Hand Glazed Dinnerware", img: "/images/n1.jpg", price: "Rs. 999", old: "Rs. 1,749", off: "43% Off" },
  { id: "02", name: "Brass Rose Candle Holders", sub: "Handcrafted Exclusive", img: "/images/n2.webp", price: "Rs. 1,599", old: "Rs. 3,499", off: "54% Off" },
  { id: "03", name: "Brass Roots Curio Bowl", sub: "Large Decorative Piece", img: "/images/n3.jpg", price: "Rs. 899", old: "Rs. 1,375", off: "35% Off" },
  { id: "04", name: "Mehr-e-Bagh Stone Painting", sub: "Hand-rendered Art", img: "/images/n4.jpg", price: "Rs. 1,199", old: "Rs. 2,415", off: "50% Off" },
  { id: "05", name: "Dancing Couple Candle Holder", sub: "Exclusive Brass Art", img: "/images/n5.webp", price: "Rs. 949", old: "Rs. 1,750", off: "46% Off" },
];

/* ================= PRODUCT CARD ================= */

const ProductCard = ({ p }: ProductCardProps) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleTouch = () => {
    setIsTouched(true);
    setTimeout(() => setIsTouched(false), 3000);
  };

  return (
    <div className="group relative flex flex-col bg-white transition-all duration-500" onClick={handleTouch}>
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F8F8F8] rounded-sm shadow-sm">
        <img
          src={p.img}
          alt={p.name}
          className={`h-full w-full object-cover transition-transform duration-[1.5s]
          ${isTouched ? "scale-110" : "md:group-hover:scale-110"}`}
        />

        {/* Discount */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md px-2 py-1 text-[9px] font-black uppercase tracking-widest text-gray-900 shadow-sm">
            {p.off}
          </span>
        </div>

        {/* Wishlist */}
        <button
          className={`absolute top-4 right-4 h-9 w-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md transition-all duration-500
          ${isTouched ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0"}`}
        >
          <Heart size={15} />
        </button>

        {/* CTA */}
        <button
          className={`absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 bg-gray-900 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-transform duration-500
          ${isTouched ? "translate-y-0" : "translate-y-full md:group-hover:translate-y-0"}`}
        >
          <Plus size={14} /> Add to Collection
        </button>
      </div>

      {/* Info */}
      <div className="mt-6 flex flex-col items-center text-center px-2">
        <p className="text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-1 font-bold">
          {p.sub}
        </p>

        <h3 className="text-md md:text-lg font-medium tracking-tight text-gray-800 leading-tight h-12 overflow-hidden px-4">
          {p.name}
        </h3>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-sm font-black text-gray-900">{p.price}</span>
          <span className="text-xs text-gray-400 line-through">{p.old}</span>
        </div>

        <div
          className={`mt-4 h-[1px] bg-gray-200 transition-all duration-700
          ${isTouched ? "w-12 bg-blue-600" : "w-6 md:group-hover:w-12 md:group-hover:bg-blue-600"}`}
        />
      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */

const NewArrivals = () => {
  return (
    <section className="w-full bg-[#FAFAFA] py-20 px-6 md:px-12 overflow-hidden">
      <div className="mx-auto max-w-[1440px]">

        {/* HEADER */}
        <div className="relative mb-28 flex flex-col items-center text-center">
          <span className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[70px] md:text-[130px] font-black text-gray-100/50 select-none uppercase">
            Fresh
          </span>

          <h2 className="text-5xl md:text-8xl font-serif tracking-tighter text-gray-900">
            New <span className="italic text-gray-400">Arrivals</span>
          </h2>

          <div className="mt-14">
            <Link href="/new-arrivals" className="group flex flex-col items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em]">
              <span>View Full Gallery</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border">
                <ArrowRight size={18} />
              </span>
            </Link>
          </div>
        </div>

        {/* GRID */}
        <div className="hidden md:grid grid-cols-5 gap-10">
          {products.map((p, i) => (
            <div key={p.id} className={i % 2 ? "mt-16" : ""}>
              <ProductCard p={p} />
            </div>
          ))}
        </div>

        {/* MOBILE */}
        <div className="md:hidden -mx-6">
          <Swiper spaceBetween={20} slidesPerView={1.25} centeredSlides>
            {products.map((p) => (
              <SwiperSlide key={p.id}>
                <ProductCard p={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
