"use client";

import { useState } from "react";

export default function ProductGallery({ images }: any) {
  const [active, setActive] = useState(images[0]);

  return (
    <div>
      <img
        src={active}
        alt="Modern home decor"
        className="w-full h-[420px] object-cover rounded-lg"
      />

      <div className="flex gap-3 mt-4">
        {images.map((img: string) => (
          <img
            key={img}
            src={img}
            onClick={() => setActive(img)}
            className={`h-20 w-20 object-cover rounded cursor-pointer border ${
              active === img
                ? "border-indigo-500"
                : "border-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
