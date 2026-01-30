"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  slug: string;
  image: string;
  description?: string;
}

export default function CategoryCard({
  title,
  slug,
  image,
  description,
}: CategoryCardProps) {
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link href={`/categories/${slug}`} className="block perspective-1000">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className="relative h-[320px] w-full rounded-[2rem] bg-stone-100 group cursor-pointer transition-shadow duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]"
      >
        {/* INNER 3D LAYER: IMAGE */}
        <div 
          style={{ transform: "translateZ(20px)" }}
          className="absolute inset-2 overflow-hidden rounded-[1.6rem] bg-stone-200"
        >
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* PREMIUM GRADIENT MASK */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-80" />
        </div>

        {/* TOP LAYER: FLOATING CONTENT */}
        <div 
          style={{ transform: "translateZ(50px)" }}
          className="absolute inset-0 flex flex-col justify-end p-8 text-white"
        >
          <div className="overflow-hidden">
             <motion.p className="text-[10px] uppercase tracking-[0.4em] text-stone-300 mb-2 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                Collection
             </motion.p>
          </div>
          
          <h3 className="text-2xl font-light tracking-tight capitalize mb-2 font-serif italic">
            {title}
          </h3>

          <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-in-out">
            {description && (
              <p className="text-xs text-stone-300 font-light leading-relaxed line-clamp-2 max-w-[80%]">
                {description}
              </p>
            )}
          </div>

          {/* UNIQUE UI: FLOATING BUTTON CIRCLE */}
          <div className="absolute top-6 right-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:bg-white group-hover:text-black">
              <ArrowUpRight size={20} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* DECORATIVE LIGHTING EFFECT */}
        <motion.div
          style={{
            transform: "translateZ(60px)",
            opacity: useTransform(mouseYSpring, [-0.5, 0.5], [0.1, 0.4]),
          }}
          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"
        />
      </motion.div>
    </Link>
  );
}