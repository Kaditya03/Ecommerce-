"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Instagram, 
  Linkedin, 
  ArrowLeft, 
  Leaf, 
  Award,
  History,
  ArrowUpRight,
  Globe,
  Quote
} from "lucide-react";

export default function AboutPage() {
  const { scrollY } = useScroll();
  const [showBack, setShowBack] = useState(true);
  const containerRef = useRef(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowBack(latest < 80);
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  return (
    <main ref={containerRef} className="bg-[#0A0A0A] text-white min-h-screen selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* 1. TOP NAVIGATION (Logo & Back Button) */}
      <div className="fixed top-0 left-0 w-full z-[150] px-6 py-6 md:px-10 md:py-10 pointer-events-none">
        <div className="max-w-[1800px] mx-auto flex justify-between items-center w-full">
          
          {/* TOP LEFT LOGO */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto"
          >
            <Link href="/" className="block relative w-[120px] h-[40px] md:w-[160px] md:h-[50px] transition-transform hover:scale-105 duration-500">
              <Image 
                src="/images/AurindelLogo.png" 
                alt="Aurindel Logo" 
                fill
                className="object-contain object-left brightness-0 invert" 
              />
            </Link>
          </motion.div>

          {/* FLOATING BACK NAV (Right-aligned in this container for balance) */}
          <AnimatePresence>
            {showBack && (
              <motion.nav 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="pointer-events-auto"
              >
                <Link 
                  href="/" 
                  className="group flex items-center gap-4 bg-white/5 backdrop-blur-2xl border border-white/10 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-700"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-[9px] uppercase tracking-[0.5em] font-bold">Back</span>
                </Link>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/60 to-[#0A0A0A] z-10" />
          <Image src="/images/company-main.jpg" alt="Aurindel" fill className="object-cover brightness-75" priority />
        </motion.div>
        
        <motion.div style={{ y: textY }} className="relative z-20 text-center px-4">
          <div className="overflow-hidden">
            <motion.p 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-stone-500 uppercase tracking-[1.2em] text-[10px] font-bold mb-6"
            >
              Beyond the Surface
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: 200 }} 
              animate={{ y: 0 }} 
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-[14rem] font-serif italic leading-none tracking-tighter"
            >
              Aurindel
            </motion.h1>
          </div>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 1.5 }} className="mt-20 w-24 h-px bg-white/20 mx-auto" />
        </motion.div>
      </section>

      {/* 3. MISSION STATEMENT */}
      <section className="py-32 px-8 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl text-center space-y-8"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-stone-600 font-bold">Our Philosophy</span>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight text-stone-200">
            We believe that an object carries the soul of its maker. In the silence of the hand-woven and the hand-carved, we find our voice.
          </h2>
        </motion.div>
      </section>

      {/* 4. CORE VALUES GRID */}
      <section className="max-w-[1400px] mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
          <VisionCard index={0} icon={<Leaf size={28} />} title="Ethical Soul" desc="Zero-waste cycles and carbon-neutral sourcing for every artifact." />
          <VisionCard index={1} icon={<Award size={28} />} title="Heritage" desc="Reviving forgotten 12th-century techniques for the modern collector." />
          <VisionCard index={2} icon={<History size={28} />} title="Slow Luxury" desc="A rebellion against speed; quality that demands time." />
      </section>

      {/* 5. FOUNDER SECTION */}
      <section className="py-40 bg-stone-100 text-stone-900 rounded-[4rem] md:rounded-[6rem] mx-4 md:mx-12 overflow-hidden shadow-2xl">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold block">The Architect of Vision</span>
              <h2 className="text-6xl md:text-8xl font-serif italic tracking-tight">Abhinav Anand</h2>
            </div>
            <div className="relative">
              <Quote className="absolute -top-10 -left-6 text-stone-200" size={60} />
              <p className="text-2xl md:text-3xl text-stone-600 font-light leading-relaxed font-serif italic relative z-10">
                "True luxury is not found in the machine's precision, but in the artisan's imperfection. At Aurindel, we don't sell products; we safeguard the echoes of human history."
              </p>
            </div>
            <div className="flex gap-8 pt-6">
              <SocialLink href="#" icon={<Instagram size={22} />} label="Instagram" />
              <SocialLink href="#" icon={<Linkedin size={22} />} label="LinkedIn" />
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] md:h-[800px] w-full rounded-[3.5rem] overflow-hidden shadow-2xl group"
          >
            <Image src="/images/founder.jpg" alt="Abhinav Anand" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
          </motion.div>
        </div>
      </section>

      {/* 6. THE COLLECTIVE GALLERY */}
      <section className="py-40 px-8 max-w-[1500px] mx-auto">
        <div className="flex flex-col items-center text-center mb-24 space-y-6">
           <Globe size={32} strokeWidth={1} className="text-stone-700 mb-4 animate-pulse" />
           <h2 className="text-5xl md:text-7xl font-serif italic">The Collective</h2>
           <p className="text-stone-500 uppercase tracking-[0.6em] text-[9px] font-bold italic">Documenting the Hands that Create — Noida 2026</p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative h-[600px] md:h-[850px] group overflow-hidden rounded-[5rem] shadow-3xl"
        >
          <Image 
            src="/images/team-photo.jpg" 
            alt="Aurindel Team" 
            fill 
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-16 left-10 md:left-20">
             <p className="text-3xl md:text-5xl font-serif italic">200+ Master Artisans</p>
             <p className="text-stone-400 text-xs md:text-sm uppercase tracking-[0.3em] mt-4 font-bold">Empowering rural craftsmanship across borders.</p>
          </div>
        </motion.div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-white text-black pt-24 pb-12 rounded-t-[4rem] md:rounded-t-[6rem]">
        <div className="max-w-[1400px] mx-auto px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pb-20 border-b border-stone-100">
            <div className="flex flex-col items-start space-y-10">
              <Link href="/" className="block relative w-[200px] h-[65px] transition-opacity hover:opacity-80">
                <Image 
                  src="/images/AurindelLogo.png" 
                  alt="Aurindel Footer Logo" 
                  fill
                  className="object-contain object-left" 
                />
              </Link>
              <p className="text-stone-400 text-sm max-w-sm font-light leading-relaxed">
                A sanctuary for rare craftsmanship. We bridge the distance between ancestral skill and the modern dwelling.
              </p>
            </div>
            
            <div className="flex flex-col justify-end space-y-8">
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">Join the Private List</p>
              <div className="flex items-center border-b border-stone-200 py-4 group focus-within:border-black transition-colors">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-transparent w-full outline-none text-sm uppercase tracking-widest font-light placeholder:text-stone-300" 
                />
                <button className="hover:translate-x-1 transition-transform p-2">
                  <ArrowUpRight size={24} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center py-12 gap-10">
            <div className="flex gap-12 text-[9px] uppercase tracking-[0.5em] font-black text-stone-400">
              <Link href="/collections" className="hover:text-black transition-colors">Gallery</Link>
              <Link href="/contact" className="hover:text-black transition-colors">Inquiries</Link>
              <Link href="/privacy" className="hover:text-black transition-colors">Legal</Link>
            </div>
            
            <div className="flex flex-col items-center md:items-end text-right">
              <p className="text-[9px] uppercase tracking-[0.6em] text-stone-300">© 2026 Aurindel Studio</p>
              <p className="text-[8px] uppercase tracking-[0.4em] text-stone-200 mt-2 font-serif italic">Rajasthan · London · Paris</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* --- COMPONENTS --- */

function VisionCard({ icon, title, desc, index }: { icon: React.ReactNode, title: string, desc: string, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="p-14 border border-white/5 rounded-[4rem] hover:bg-white hover:text-black transition-all duration-1000 cursor-default group"
    >
      <div className="mb-12 text-stone-700 group-hover:text-black transition-colors scale-125 origin-left">{icon}</div>
      <h3 className="text-3xl font-serif italic mb-6">{title}</h3>
      <p className="text-stone-500 group-hover:text-stone-700 text-lg font-light leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function SocialLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-4 text-stone-400 hover:text-stone-900 group transition-all">
      <div className="p-5 border border-stone-200 rounded-full group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-500">{icon}</div>
      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{label}</span>
    </Link>
  );
}