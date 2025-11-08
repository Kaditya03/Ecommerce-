import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
   
<section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] px-6 pt-24 overflow-hidden">
  
  {/* TEXT CONTENT */}
  <h1 className="text-5xl md:text-6xl font-semibold text-indigo-700 mb-4 z-10">
    Discover Handcrafted Elegance
  </h1>
  <p className="text-gray-600 max-w-2xl text-lg md:text-xl mb-8 z-10">
    Experience the artistry of handmade creations that bring warmth, culture, and craftsmanship into your home.
  </p>

  <div className="flex gap-4 z-10">
    <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition">
      Explore Collection
    </button>
    <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-50 transition">
      Learn More
    </button>
  </div>

  {/* ✅ BACKGROUND IMAGE */}
  <div className="absolute inset-0 -z-10">
    <Image
      src="/images/hero.webp"
      alt="Hero background"
      fill
      className="object-cover opacity-40"
      priority
    />
  </div>

  {/* ✅ OPTIONAL OVERLAY for better text contrast */}
  <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/10 -z-10"></div>
</section>

  )
}

export default Hero;
