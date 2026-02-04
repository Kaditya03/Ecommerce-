"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
  // --- ADVANCED 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Rotations for the card body
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  // Parallax movement for inner elements
  const innerX = useTransform(mouseXSpring, [-0.5, 0.5], ["15px", "-15px"]);
  const innerY = useTransform(mouseYSpring, [-0.5, 0.5], ["15px", "-15px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link href={`/categories/${slug}`} className="block perspective-1000 group">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className="relative h-[450px] w-full rounded-[2.5rem] bg-[#F5F5F4] border border-stone-200/50 overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]"
      >
        {/* BACKGROUND 3D TEXT (Behind Image) */}
        <motion.div 
          style={{ x: innerX, y: innerY, translateZ: "10px" }}
          className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none"
        >
          <span className="text-[12rem] font-bold uppercase tracking-tighter text-stone-900">
            {title.charAt(0)}
          </span>
        </motion.div>

        {/* IMAGE LAYER (Floating mid-depth) */}
        <motion.div 
          style={{ translateZ: "40px" }}
          className="absolute inset-4 overflow-hidden rounded-[2rem] shadow-2xl"
        >
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
          />
          {/* LUXURY VIGNETTE */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
        </motion.div>

        {/* CONTENT LAYER (Highest floating depth) */}
        <div 
          style={{ transform: "translateZ(80px)" }}
          className="absolute inset-0 flex flex-col justify-end p-10 text-white"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <span className="inline-block text-[9px] uppercase tracking-[0.5em] text-stone-400 font-bold bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
              Explore
            </span>
            
            <h3 className="text-4xl font-serif italic font-light tracking-tight capitalize leading-tight">
              {title}
            </h3>

            <div className="overflow-hidden">
              <p className="text-sm text-stone-300 font-light leading-relaxed max-w-[90%] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out line-clamp-2">
                {description || "Handcrafted masterpieces for refined living spaces."}
              </p>
            </div>
          </motion.div>

          {/* PREMIUM INTERACTIVE INDICATOR */}
          <div className="mt-6 flex items-center gap-4 group/btn">
             <div className="h-[1px] w-0 group-hover:w-12 bg-white/50 transition-all duration-500" />
             <span className="text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               View Gallery
             </span>
             <ArrowRight size={14} className="-translate-x-4 group-hover:translate-x-0 transition-transform duration-500" />
          </div>
        </div>

        {/* DYNAMIC GLOW (Light tracker) */}
        <motion.div
          style={{
            background: useTransform(
              mouseXSpring,
              [-0.5, 0.5],
              [
                "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.15) 0%, transparent 50%)",
              ]
            ),
            translateZ: "100px",
          }}
          className="absolute inset-0 pointer-events-none"
        />
      </motion.div>
    </Link>
  );
}