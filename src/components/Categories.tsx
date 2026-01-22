"use client";
import React from "react";
import Link from "next/link";


const Categories = () => {
  const items = [
    {
      name: "Pottery",
      slug: "pottery",
      img: "/images/categories/pottery.webp",
    },
    {
      name: "Handlooms",
      slug: "handlooms",
      img: "/images/categories/handloom.jpg",
    },
    {
      name: "Brass Art",
      slug: "brass-art",
      img: "/images/categories/brass.jpg",
    },
    {
      name: "Wood Craft",
      slug: "wood-craft",
      img: "/images/categories/wood.webp",
    },
    {
      name: "Paintings",
      slug: "paintings",
      img: "/images/categories/paintings.jpg",
    },
    {
      name: "Home Decor",
      slug: "home-decor",
      img: "/images/categories/decor.webp",
    },
  ];

  return (
    <div className="w-full py-7 bg-white">
        <h2 className="font-bold text-4xl text-center mb-8">Shop By Category</h2>
      
      {/* MOBILE SLIDER */}
     <div className="flex sm:hidden overflow-x-auto gap-8 px-4">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/categories/${item.slug}`}
            className="flex flex-col items-center flex-none"
          >
            <div className="w-55 h-55 rounded-full overflow-hidden border-4 border-gray-300 shadow-md hover:scale-105 transition">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-xl font-bold">{item.name}</p>
          </Link>
        ))}
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden sm:flex justify-center gap-8 px-4">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/categories/${item.slug}`}
            className="flex flex-col items-center"
          >
            <div className="w-55 h-55 rounded-full overflow-hidden border-4 border-gray-300 shadow-md hover:scale-105 transition">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-xl font-bold">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;