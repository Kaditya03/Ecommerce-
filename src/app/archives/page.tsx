"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  FileCheck, 
  Globe2, 
  Ship, 
  Award,
  ArrowRight,
  ShieldCheck,
  Mail,
  MapPin,
  Globe,
  Phone,
  Instagram,
  Linkedin,
  Clock,
  History
} from "lucide-react";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "600"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

// --- GENUINE BUSINESS TIMELINE DATA ---
const milestones = [
  {
    date: "February 24, 2025",
    title: "Inception & Incorporation",
    desc: "Puriva Industries Private Limited was legally incorporated, establishing the foundation for a premier handicraft export house committed to Indian artistry.",
    icon: <FileCheck className="w-5 h-5" />,
  },
  {
    date: "July 2025",
    title: "Birth of Aurindel",
    desc: "Launch of the 'Aurindel' brand—a curated identity focused on bringing sustainable, handcrafted luxury from Indian artisan clusters to global markets.",
    icon: <Award className="w-5 h-5" />,
  },
  {
    date: "September 2025",
    title: "Compliances & Licensing",
    desc: "Successfully secured Import Export Code (IEC), GST registration, and EPCH (Export Promotion Council for Handicrafts) RCMC, ensuring full regulatory readiness.",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    date: "October 2025",
    title: "Global Trade Commencement",
    desc: "Official rollout of international export operations, successfully dispatching our first consignments of premium handicrafts to global décor partners.",
    icon: <Ship className="w-5 h-5" />,
  },
];

export default function ArchivesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className={`bg-[#FBFBFA] min-h-screen ${poppins.className} text-[#1A1A18] selection:bg-stone-200 overflow-x-hidden`}>
      <Navbar />

      {/* --- HERO SECTION: PREMIUM VIDEO BACKGROUND --- */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-50">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover scale-105"
          >
            {/* Using your provided founder video as a cinematic background loop */}
            <source src="https://res.cloudinary.com/dcgmsnhro/video/upload/v1770226463/video-founder_rg01pp.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#FBFBFA]" />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <span className="text-[10px] uppercase tracking-[1em] text-white/80 mb-8 block font-medium">
              Puriva Industries Legacy
            </span>
            <h1 className={`${cormorant.className} text-6xl md:text-[11rem] text-white font-light leading-none mb-8 tracking-tighter`}>
              Archiv<span className="italic text-white/50">es</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white/70">
              <div className="h-[1px] w-12 bg-white/30 hidden md:block" />
              <p className="text-[11px] uppercase tracking-[0.4em] max-w-lg leading-loose">
                Tracing the evolution of a global handicraft export house
              </p>
              <div className="h-[1px] w-12 bg-white/30 hidden md:block" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- BRAND STORY SECTION --- */}
      <section className="max-w-[1400px] mx-auto px-8 py-32 border-b border-stone-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 text-stone-400">
              <History size={18} />
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Provenance</span>
            </div>
            <h2 className={`${cormorant.className} text-5xl md:text-7xl leading-[1.1] italic text-stone-800`}>
              Bridging Indian Clusters <br/> to Global Spaces.
            </h2>
            <p className="text-stone-500 text-lg font-light leading-relaxed max-w-xl">
              Puriva Industries Pvt. Ltd. was founded with a singular vision: to formalize the bridge between India's unorganized artisan clusters and the world's most discerning luxury markets. Aurindel is the realization of that vision.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                   <Image src="/images/hero1.jpg" alt="Artisan Work" fill className="object-cover" />
                </div>
                <div className="bg-stone-900 p-8 rounded-2xl text-white">
                   <h4 className="text-3xl font-serif italic mb-2">100%</h4>
                   <p className="text-[10px] uppercase tracking-widest text-stone-400">Export Compliant</p>
                </div>
             </div>
             <div className="space-y-4 pt-12">
                <div className="bg-white border border-stone-100 p-8 rounded-2xl">
                   <h4 className="text-3xl font-serif italic mb-2 text-stone-800">EPCH</h4>
                   <p className="text-[10px] uppercase tracking-widest text-stone-400">Certified Member</p>
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                   <Image src="/images/hero2.jpg" alt="Handicraft" fill className="object-cover" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- TIMELINE SECTION --- */}
      <section className="py-40 bg-[#F5F5F2]/30">
        <div className="max-w-[1000px] mx-auto px-8 relative">
          <div className="text-center mb-32">
             <span className="text-[10px] uppercase tracking-[0.6em] text-stone-400 font-bold mb-4 block">Chronicles</span>
             <h2 className={`${cormorant.className} text-5xl md:text-6xl italic`}>The Journey of Puriva</h2>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-[300px] bottom-0 w-px bg-stone-200 hidden lg:block" />

          <div className="space-y-32">
            {milestones.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12`}
              >
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border border-stone-100 rounded-full items-center justify-center z-10 shadow-sm text-stone-400">
                  {item.icon}
                </div>
                
                <div className="w-full lg:w-1/2 flex flex-col px-4 text-center lg:text-left">
                  <span className={`${cormorant.className} text-3xl italic text-stone-300 mb-2 block`}>
                    {item.date}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-widest text-stone-900 mb-4">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
                <div className="w-full lg:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- B2B TRUST & COMPLIANCE --- */}
      <section className="bg-stone-900 py-32">
        <div className="max-w-[1400px] mx-auto px-8">
           <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20 border-b border-white/10 pb-12">
              <div className="max-w-2xl">
                 <h3 className={`${cormorant.className} text-5xl text-white italic mb-4`}>Global Trade Certifications</h3>
                 <p className="text-stone-400 text-sm font-light">Puriva Industries operates with complete transparency and international compliance standards.</p>
              </div>
              <Link href="/contact" className="px-10 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-stone-200 transition-all flex items-center gap-3 mb-4">
                 Partner With Us <ArrowRight size={14} />
              </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ComplianceCard icon={<ShieldCheck size={24}/>} title="IEC License" desc="Registered Import Export Code ensuring legally verified global shipments." />
              <ComplianceCard icon={<FileCheck size={24}/>} title="GST Registered" desc="Tax compliant entity under Indian regulatory frameworks." />
              <ComplianceCard icon={<Award size={24}/>} title="EPCH Member" desc="Handicraft RCMC holder promoting certified Indian craftsmanship." />
              <ComplianceCard icon={<Globe2 size={24}/>} title="Direct Export" desc="B2B focused operations shipping from source to global destination." />
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 bg-stone-900 text-stone-400 pt-32 pb-12 rounded-t-[4rem] md:rounded-t-[6rem]">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 pb-24 border-b border-white/5">
            <div className="lg:col-span-1 space-y-8 text-left">
              <Link href="/" className="relative block w-[180px] h-[50px]">
                <Image src="/images/AurindelLogo.png" alt="Aurindel" fill className="object-contain object-left brightness-0 invert" />
              </Link>
              <p className="text-sm leading-relaxed max-w-xs">A legacy of Indian craftsmanship, exported with contemporary elegance to the world's most discerning spaces.</p>
            </div>
            
            <div className="space-y-8 text-left">
              <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Navigation</h4>
              <ul className="space-y-4 text-sm font-light">
                <li><Link href="/about" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"/> About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"/> Contact Us</Link></li>
                <li><Link href="/archives" className="text-white flex items-center gap-2"><ArrowRight size={12} /> Archives</Link></li>
              </ul>
            </div>

            <div className="space-y-8 text-left">
              <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Inquiries</h4>
              <ul className="space-y-4 text-sm font-light">
                <li className="flex items-center gap-3"><Mail size={16} /> abhinav.purivaindustries@gmail.com</li>
                <li className="flex items-center gap-3"><Phone size={16} /> +91 8340220161</li>
                <li className="flex items-center gap-3"><Globe size={16} /> www.aurindel.com</li>
              </ul>
            </div>

            <div className="space-y-8 text-left">
              <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Atelier Studio</h4>
              <ul className="space-y-4 text-sm font-light">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <span>8th Floor 8125, Gaur City Mall Office Space, <br/>Greater Noida (201318) UP, INDIA</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 gap-8 text-[9px] uppercase tracking-[0.6em]">
            <p>© 2026 Aurindel Studio by Puriva Industries Pvt. Ltd.</p>
            <div className="flex gap-8">
              <Link href="https://www.instagram.com/theabhinavanand" target="_blank" className="hover:text-white transition-colors"><Instagram size={14}/></Link>
              <Link href="https://in.linkedin.com/in/abhinavanandofficial" target="_blank" className="hover:text-white transition-colors"><Linkedin size={14}/></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function ComplianceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 border border-white/5 rounded-3xl bg-white/[0.02] flex flex-col gap-5 hover:bg-white/[0.04] transition-all">
       <div className="text-stone-500">{icon}</div>
       <div>
         <h4 className="text-white font-medium mb-2">{title}</h4>
         <p className="text-stone-500 text-[11px] leading-relaxed">{desc}</p>
       </div>
    </div>
  );
}