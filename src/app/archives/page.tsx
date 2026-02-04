"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  FileText, 
  Newspaper, 
  BarChart3, 
  BookOpen, 
  Instagram, 
  Twitter, 
  Facebook, 
  ExternalLink, 
  Calendar,
  PenTool,
  MapPin,
  Layers,
  Sparkles
} from "lucide-react";
import { Cormorant_Garamond, Poppins } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "600"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "600"] });

// --- DATA ---

const archiveItems = [
  { year: "2023", title: "The Silk Road", category: "Textiles", image: "/images/hero1.jpg", desc: "A journey through ancient weaving techniques and natural dyes." },
  { year: "2024", title: "Ceramic Echoes", category: "Pottery", image: "/images/hero2.jpg", desc: "Exploring the resonance of clay and fire in the heart of the desert." },
  { year: "2025", title: "Golden Hour", category: "Jewelry", image: "/images/hero3.jpg", desc: "Hand-forged brilliance inspired by the transient beauty of the sunset." },
  { year: "2026", title: "Midnight Loom", category: "Apparel", image: "/images/hero4.webp", desc: "Complex patterns woven under the moonlight using recycled fibers." },
];

const pressReleases = [
  { year: "2026", title: "Aurindel Partners with Global Artisans Fund", tag: "Partnership" },
  { year: "2025", title: "Opening of the London Flagship Atelier", tag: "Expansion" },
  { year: "2024", title: "Revolutionizing Ethical Supply Chains", tag: "Innovation" },
  { year: "2023", title: "Series A Funding: Preserving Craft for the Future", tag: "Announcement" },
];

export default function ArchivesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [backHovered, setBackHovered] = useState(false);

  return (
    <div ref={containerRef} className={`bg-[#FBFBFA] min-h-screen ${poppins.className} overflow-x-hidden text-[#1A1A18]`}>
      
      {/* 1. NON-STICKY NAVBAR */}
      <nav className="absolute top-0 left-0 w-full z-[100] px-6 py-10 flex justify-between items-center">
        <Link href="/">
          <Image src="/images/AurindelLogo.png" alt="Logo" width={100} height={35} className="object-contain" />
        </Link>
        
        {/* ENHANCED BACK BUTTON */}
        <Link 
          href="/" 
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
          className="group relative flex items-center justify-center bg-white px-7 py-3 rounded-full border border-stone-200 shadow-sm transition-all overflow-hidden"
        >
          <div className="flex items-center gap-2 relative z-10 transition-colors">
            <ArrowLeft size={14} />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Back</span>
          </div>
          <AnimatePresence>
            {backHovered && (
              <motion.div 
                initial={{ y: "100%" }} 
                animate={{ y: 0 }} 
                exit={{ y: "-100%" }}
                className="absolute inset-0 bg-stone-50 z-0" 
              />
            )}
          </AnimatePresence>
        </Link>
      </nav>

      {/* 2. CINEMATIC HERO */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="z-10">
          <span className="text-[10px] uppercase tracking-[1em] text-stone-400 mb-6 block underline underline-offset-8">Legacy & Lore</span>
          <h1 className={`${cormorant.className} text-7xl md:text-[10rem] font-light leading-none`}>
            Provenanc<span className="italic text-stone-300">e</span>
          </h1>
        </motion.div>
        
        {/* PARALLAX WATERMARK */}
        <motion.div 
          style={{ x: useTransform(scaleProgress, [0, 1], ["0%", "-30%"]) }} 
          className="absolute text-[18vw] font-black text-stone-100 pointer-events-none whitespace-nowrap z-0"
        >
          AURINDEL HOUSE
        </motion.div>
      </section>

      {/* 3. PROVENANCE MAP VISUAL */}
      <section className="max-w-[1400px] mx-auto px-6 py-20 text-center">
          <div className="flex flex-col items-center gap-4 mb-12">
            <MapPin size={20} className="text-stone-300" />
            <h3 className={`${cormorant.className} text-4xl italic`}>Global Footprint</h3>
            <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold">Sourced from 14 regions worldwide</p>
          </div>
          <div className="relative aspect-[21/9] w-full bg-stone-100/50 rounded-3xl flex items-center justify-center overflow-hidden border border-stone-100">
             <span className="text-stone-100 text-[10vw] font-black tracking-tighter select-none">WORLD OF CRAFT</span>
             <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-stone-300 rounded-full animate-ping" />
             <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-stone-300 rounded-full animate-ping" />
          </div>
      </section>

      {/* 4. CASE STUDIES & MARKETING COLLATERAL */}
      <section className="max-w-[1400px] mx-auto px-6 py-32 border-t border-stone-100">
        <div className="max-w-xl mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-4 block">Marketing Intelligence</span>
          <h2 className={`${cormorant.className} text-5xl md:text-6xl font-light italic`}>Case Studies & Success</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <CaseStudyCard title="The 'Soul of Earth' Campaign" category="Global Ad Series" stats="2.4M Reach" image="/images/hero1.jpg" desc="A cinematic digital strategy highlighting artisan origins and sustainable practices." />
            <CaseStudyCard title="Heritage Holiday Brochure" category="Premium Collateral" stats="High Conversion" image="/images/hero4.webp" desc="Our flagship physical and digital seasonal lookbook showcasing past collections." />
        </div>
      </section>

      {/* 5. THE MATERIAL ARCHIVE */}
      <section className="bg-[#1A1A18] text-white py-32">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-16">
            <Layers size={20} className="text-stone-500" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Foundational Materials</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <MaterialItem label="Organic Silk" origin="Kyoto, JP" />
            <MaterialItem label="Pure Earth Clay" origin="Oaxaca, MX" />
            <MaterialItem label="24K Leaf" origin="Florence, IT" />
            <MaterialItem label="Highland Wool" origin="Cusco, PE" />
          </div>
        </div>
      </section>

      {/* 6. PRESS RELEASES BY YEAR */}
      <section className="bg-white py-32 border-y border-stone-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-2 text-stone-400 mb-12">
             <Newspaper size={16} />
             <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Press Archives & Growth</span>
          </div>
          <div className="space-y-0">
            {pressReleases.map((news, idx) => (
              <div key={idx} className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-stone-50 hover:bg-stone-50/50 px-4 transition-all cursor-pointer">
                <div className="flex items-center gap-12">
                  <span className={`${cormorant.className} text-2xl text-stone-300 group-hover:text-black transition-colors`}>{news.year}</span>
                  <div>
                    <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-stone-400 block mb-1">{news.tag}</span>
                    <h4 className="text-lg md:text-xl font-light text-stone-800 tracking-tight group-hover:translate-x-2 transition-transform">{news.title}</h4>
                  </div>
                </div>
                <ExternalLink size={18} className="text-stone-200 group-hover:text-black transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CURATOR'S JOURNAL (BLOG) */}
      <section className="max-w-[1400px] mx-auto px-6 py-32">
        <div className="flex items-center gap-2 text-stone-400 mb-8">
            <PenTool size={16} />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Curator's Journal</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ArticleCard title="The Intelligence of the Hand" excerpt="Exploring why manual craft is the ultimate luxury in a digital-first world." image="/images/hero3.jpg" />
            <ArticleCard title="Sourcing the Sacred" excerpt="A deep dive into our ethical sourcing roadmap and global artisan partnerships." image="/images/hero2.jpg" />
        </div>
      </section>

      {/* 8. VISUAL ARCHIVE GALLERY */}
      <section className="max-w-[1600px] mx-auto px-6 py-40 border-t border-stone-100">
        <h2 className={`${cormorant.className} text-4xl mb-24 text-center italic text-stone-400`}>Visual Archive</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
          {archiveItems.map((item, idx) => (
            <ArchiveEntry key={idx} item={item} index={idx} />
          ))}
        </div>
      </section>

      {/* 9. GRAND FOOTER */}
      <footer className="bg-[#0D0D0C] text-white pt-32 pb-12 px-6 md:px-20 relative overflow-hidden">
        
        {/* CORRECTED WATERMARK: Fully centered and visible */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full opacity-[0.04] pointer-events-none select-none flex justify-center">
          <h2 className="text-[20vw] leading-none font-black tracking-tight uppercase whitespace-nowrap">
            AURINDEL
          </h2>
        </div>

        <div className="max-w-[1800px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 border-b border-stone-800 pb-28">
            {/* Brand */}
            <div className="lg:col-span-6 space-y-10">
              <Image src="/images/AurindelLogo.png" alt="Logo" width={160} height={50} className="brightness-0 invert" />
              <p className={`${cormorant.className} text-3xl text-stone-400 italic max-w-sm`}>
                "The intelligence of the hand, manifested by the heart."
              </p>
              <div className="flex gap-4">
                 <SocialIcon icon={<Instagram size={18}/>} />
                 <SocialIcon icon={<Twitter size={18}/>} />
                 <SocialIcon icon={<Facebook size={18}/>} />
              </div>
            </div>

            {/* Assets */}
            <div className="lg:col-span-3 space-y-8">
              <h5 className="text-stone-600 text-[9px] uppercase tracking-[0.5em] font-bold">Archives & Media</h5>
              <ul className="flex flex-col gap-4 text-xs font-light text-stone-400">
                <li className="hover:text-white cursor-pointer transition-all flex items-center gap-2"><FileText size={12}/> Media Kit 2026</li>
                <li className="hover:text-white cursor-pointer transition-all flex items-center gap-2"><BookOpen size={12}/> Brand Book</li>
                <li className="hover:text-white cursor-pointer transition-all flex items-center gap-2"><BarChart3 size={12}/> Milestone Report</li>
              </ul>
            </div>

            {/* Inquiries */}
            <div className="lg:col-span-3 space-y-8">
              <h5 className="text-stone-600 text-[9px] uppercase tracking-[0.5em] font-bold">Atelier Contact</h5>
              <p className="text-xs text-stone-500 leading-relaxed font-mono">archives@aurindel.house</p>
              <p className="text-[10px] uppercase tracking-widest text-stone-600">London — Paris — Kyoto</p>
            </div>
          </div>
          
          <div className="mt-16 text-center text-[9px] text-stone-600 tracking-[0.4em] uppercase">
            <p>© 2026 Aurindel House. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* SUB-COMPONENTS */

function MaterialItem({ label, origin }: { label: string, origin: string }) {
    return (
        <div className="group border-l border-stone-800 pl-6 py-4 hover:border-stone-500 transition-colors">
            <Sparkles size={12} className="text-stone-700 group-hover:text-stone-300 mb-4 transition-colors" />
            <h4 className="text-lg font-light mb-1">{label}</h4>
            <p className="text-[10px] uppercase tracking-widest text-stone-500">{origin}</p>
        </div>
    );
}

function CaseStudyCard({ title, category, stats, image, desc }: any) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-video overflow-hidden rounded-sm bg-stone-100 mb-6">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-sm">
          <BarChart3 size={10} /> {stats}
        </div>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">{category}</p>
      <h3 className={`${cormorant.className} text-3xl mb-3`}>{title}</h3>
      <p className="text-sm text-stone-500 font-light leading-relaxed">{desc}</p>
    </div>
  );
}

function ArticleCard({ title, excerpt, image }: any) {
    return (
        <div className="group cursor-pointer">
            <div className="relative h-80 w-full overflow-hidden mb-8 bg-stone-100">
                <Image src={image} alt={title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>
            <h3 className={`${cormorant.className} text-4xl mb-4 group-hover:italic transition-all`}>{title}</h3>
            <p className="text-sm text-stone-500 font-light leading-relaxed max-w-md mb-6">{excerpt}</p>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border-b border-black w-fit pb-1 group-hover:text-stone-400 group-hover:border-stone-400 transition-colors">
                Read Article
            </div>
        </div>
    );
}

function ArchiveEntry({ item, index }: { item: any, index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`flex flex-col ${index % 2 !== 0 ? "md:mt-40" : ""}`}>
      <div className="group relative aspect-[3/4] overflow-hidden bg-stone-100 shadow-2xl">
        <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-10">
           <span className="text-white text-[10px] tracking-[0.4em] uppercase mb-2">{item.year}</span>
           <h3 className={`${cormorant.className} text-4xl text-white italic`}>{item.title}</h3>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-3">{item.category}</p>
        <p className="text-sm text-stone-600 font-light leading-relaxed max-w-sm">{item.desc}</p>
      </div>
    </motion.div>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
    return (
        <div className="w-10 h-10 border border-stone-800 rounded-full flex items-center justify-center text-stone-500 hover:text-white hover:border-white transition-all cursor-pointer">
          {icon}
        </div>
    );
}