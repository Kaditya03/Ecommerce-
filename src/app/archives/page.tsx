"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
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
  History,
  CheckCircle2,
  Box,
  Truck,
  Verified,
  Navigation,
  ArrowUpRight
} from "lucide-react";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "600"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

// --- DATA ---
const milestones = [
  {
    date: "Feb 24, 2025",
    title: "Legal Incorporation",
    desc: "Puriva Industries Private Limited was formally incorporated, establishing a corporate bridge for traditional Indian art.",
    icon: <FileCheck className="w-5 h-5" />,
  },
  {
    date: "July 2025",
    title: "The Birth of Aurindel",
    desc: "Launch of our flagship brand, Aurindel, dedicated to high-end decorative exports and artisan welfare.",
    icon: <Award className="w-5 h-5" />,
  },
  {
    date: "Sept 2025",
    title: "Regulatory Licensing",
    desc: "Successfully attained IEC (Import Export Code) and EPCH (Handicraft RCMC) certifications for global trade.",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    date: "Oct 2025",
    title: "Global Trade Commencement",
    desc: "Commencement of international operations, delivering Indian craftsmanship to European and North American partners.",
    icon: <Ship className="w-5 h-5" />,
  },
];

const tradeExpertise = [
  { title: "Direct Sourcing", desc: "Sourcing directly from artisan clusters from accross the country to ensure price competitiveness and delivering best export quality." },
  { title: "Quality Assurance", desc: "Multi-stage QC before any shipment leaves Indian shores." },
  { title: "Custom Branding", desc: "Private labeling and custom packaging solutions for global boutique retailers." },
  { title: "Legal Transparency", desc: "100% compliant with all Export documentation and compliances." },
];

export default function ArchivesPage() {
  const containerRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // --- NEURAL NETWORK ANIMATION ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    const particleCount = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; vx: number; vy: number;
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(168, 162, 158, 0.5)";
      ctx.strokeStyle = "rgba(168, 162, 158, 0.15)";
      
      particles.forEach((p, i) => {
        p.update();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 180) {
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize(); init(); animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div ref={containerRef} className={`bg-[#FBFBFA] min-h-screen ${poppins.className} text-[#1A1A18] selection:bg-stone-200 overflow-x-hidden`}>
      <Navbar />

      {/* --- HERO: TRADE NETWORK ANIMATION --- */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-white">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FBFBFA]" />

        <div className="relative z-10 text-center px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <span className="text-[10px] uppercase tracking-[1em] text-stone-400 mb-8 block font-black">
              Puriva Industries Pvt. Ltd.
            </span>
            <h1 className={`${cormorant.className} text-6xl md:text-[10rem] text-stone-900 font-light leading-none mb-8 tracking-tighter`}>
              Aurinde<span className="italic text-stone-300">l</span> Archives
            </h1>
            <p className="text-[11px] uppercase tracking-[0.4em] text-stone-500 max-w-2xl mx-auto leading-loose font-medium">
              Best Trusted Exporter of Handicraft & Premium Indian Handicraft Exporter. <br/>
              Bridging Heritage Clusters to the Global Marketplace.
            </p>
            <div className="mt-12 flex justify-center gap-6">
                <Link href="/contact" className="px-10 py-4 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-black transition-all flex items-center gap-2">
                    Request Catalogue <ArrowRight size={14} />
                </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 1: THE EXPORT ADVANTAGE (SEO RICH) --- */}
      <section className="max-w-[1400px] mx-auto px-8 py-32 border-b border-stone-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
                <div className="flex items-center gap-3 text-stone-400">
                    <Globe2 size={18} />
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold">The Export Standard</span>
                </div>
                <h2 className={`${cormorant.className} text-5xl md:text-7xl leading-tight italic text-stone-800`}>
                    Your Premier <br/> Indian Handicraft Partner.
                </h2>
                <div className="space-y-6 text-stone-500 text-sm md:text-base leading-relaxed font-light">
                    <p>
                        As a **best trusted exporter of handicraft**, Puriva Industries specializes in the formalization of India’s unorganized artisan clusters. India leads the world in handicrafts due to the sheer diversity of materials—brass, wood, iron, and ceramics.
                    </p>
                    <p>
                        Through our brand **Aurindel**, we ensure that international buyers receive consistent quality, timely delivery, and ethical production..
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-6">
                    {tradeExpertise.map((item, i) => (
                        <div key={i} className="p-6 bg-stone-50 rounded-2xl border border-stone-100">
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-stone-800">{item.title}</h4>
                            <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative">
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl z-10">
                    <Image src="/images/hero1.jpg" alt="Indian Handicraft Export" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-stone-100 rounded-full -z-0" />
            </div>
        </div>
      </section>
      
      

      {/* --- SECTION 2: COMPLIANCE VAULT --- */}
      <section className="bg-stone-900 py-32 text-white">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
            <div className="max-w-2xl space-y-4 text-left">
              <span className="text-stone-500 text-[10px] uppercase tracking-[0.5em] font-bold">Trade Integrity</span>
              <h3 className={`${cormorant.className} text-5xl italic`}>Verified Provenance.</h3>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                Puriva Industries (Aurindel) is fully compliant with the Government of India's export regulations.
              </p>
            </div>
            <Link href="/contact" className="px-10 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-stone-200 transition-all flex items-center gap-3">
               Trade Inquiry <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <ComplianceCard title="IEC License" id="Import-Export Code" desc="Registered with DGFT for international commerce operations." icon={<ShieldCheck size={24}/>} />
             <ComplianceCard title="EPCH Member" id="RCMC Certified" desc="Official member of Export Promotion Council for Handicrafts." icon={<Award size={24}/>} />
             <ComplianceCard title="GST Registered" id="Tax Compliance" desc="Fully compliant tax entity under Indian law." icon={<FileCheck size={24}/>} />
             <ComplianceCard title="Global Shipping" id="Direct Export" desc="Logistics hub in Noida servicing 40+ countries." icon={<Ship size={24}/>} />
          </div>
        </div>
      </section>

      {/* --- SECTION 3: TIMELINE --- */}
      <section className="py-40 bg-[#F5F5F2]/40 relative">
        <div className="max-w-[1000px] mx-auto px-8 relative">
           <div className="text-center mb-32 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.6em] text-stone-400 font-bold">Journey of Excellence</span>
              <h2 className={`${cormorant.className} text-5xl md:text-7xl italic text-stone-900`}>Puriva Industries Growth</h2>
           </div>

           <div className="absolute left-1/2 -translate-x-1/2 top-[400px] bottom-0 w-px bg-stone-200 hidden lg:block" />

           <div className="space-y-32">
             {milestones.map((item, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className={`relative flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12`}
               >
                 <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 bg-white border border-stone-100 rounded-full items-center justify-center z-10 shadow-sm text-stone-400">
                   {item.icon}
                 </div>
                 <div className="w-full lg:w-1/2 p-10 bg-white border border-stone-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
                    <span className={`${cormorant.className} text-2xl italic text-stone-300 mb-2 block font-medium`}>{item.date}</span>
                    <h3 className="text-xl font-bold uppercase tracking-widest text-stone-900 mb-4">{item.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed font-light">{item.desc}</p>
                 </div>
                 <div className="w-full lg:w-1/2" />
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* --- FULL-WIDTH PREMIUM FOOTER --- */}
      <footer className="bg-stone-900 text-stone-400 pt-32 pb-12 w-full">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-24 border-b border-white/5">
            <div className="lg:col-span-5 space-y-10 text-left">
              <Link href="/" className="relative block w-[200px] h-[60px]">
                <Image src="/images/AurindelLogo.png" alt="handicraft exporter" fill className="object-contain object-left brightness-0 invert" />
              </Link>
              <p className="text-sm leading-relaxed max-w-sm font-light">
                Puriva Industries Private Limited: A corporate standard in Indian artisan exports and trade compliance. 
                Bridging heritage craftsmanship with modern global retail.
              </p>
              <div className="flex gap-6">
                <Link href="https://www.instagram.com/theabhinavanand" target="_blank" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Instagram size={18}/>
                </Link>
                <Link href="https://in.linkedin.com/in/abhinavanandofficial" target="_blank" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Linkedin size={18}/>
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-8 text-left">
              <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Trade Desk</h4>
              <ul className="space-y-4 text-xs font-light tracking-wide">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/archives" className="text-white">Trade Archives</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Bulk Catalog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Office</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-8 text-left">
              <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Connect</h4>
              <ul className="space-y-4 text-xs font-light">
                <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><Mail size={14} /> abhinav.purivaindustries@gmail.com</li>
                <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><Phone size={14} /> +91 8340220161</li>
                <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><Globe size={14} /> www.aurindel.com</li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-8 text-left">
              <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Headquarters</h4>
              <p className="text-xs font-light leading-loose flex items-start gap-3">
                <MapPin size={14} className="mt-1 flex-shrink-0 text-stone-600" />
                <span>8th Floor 8125, Gaur City Mall Office Space, <br/>Greater Noida (201318) UP, INDIA</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 gap-8 text-[9px] uppercase tracking-[0.6em] font-medium">
            <p>© 2026 PURIVA INDUSTRIES PVT. LTD. (AURINDEL STUDIO)</p>
            <div className="flex gap-8 opacity-60">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Trade Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function ComplianceCard({ icon, title, id, desc }: any) {
  return (
    <div className="p-10 border border-white/5 rounded-3xl bg-white/[0.02] flex flex-col gap-6 hover:bg-white/[0.05] transition-all group text-left">
       <div className="text-stone-500 group-hover:text-stone-300 transition-colors">{icon}</div>
       <div>
         <span className="text-[9px] font-bold text-stone-500 uppercase tracking-widest block mb-2">{id}</span>
         <h4 className="text-white font-medium mb-3 tracking-wide">{title}</h4>
         <p className="text-stone-500 text-[11px] leading-relaxed font-light">{desc}</p>
       </div>
    </div>
  );
}