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
  ArrowUpRight,
  TrendingUp,
  Layers,
  Leaf,
  Navigation,
  X,
  Send,
  BadgeCheck
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
    desc: "Puriva Industries Private Limited was formally established to professionalize Indian handicraft trading.",
    icon: <FileCheck className="w-5 h-5" />,
  },
  {
    date: "July 2025",
    title: "Aurindel Brand Launch",
    desc: "Launch of Aurindel, focused on curating high-end décor for global B2B luxury markets.",
    icon: <Award className="w-5 h-5" />,
  },
  {
    date: "Sept 2025",
    title: "Regulatory Compliance",
    desc: "Secured IEC (Import Export Code) and EPCH registration, ensuring 100% legal export readiness.",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    date: "Oct 2025",
    title: "International Operations",
    desc: "First successful dispatch of premium handicrafts to European and American retail chains.",
    icon: <Ship className="w-5 h-5" />,
  },
];

const clusters = [
  { region: "Moradabad", craft: "Art Metalware & Brass", growth: "+18%" },
  { region: "Saharanpur", craft: "Wood Carving & Inlay", growth: "+12%" },
  { region: "Jaipur", craft: "Textiles & Blue Pottery", growth: "+15%" },
  { region: "Khurja", craft: "Ceramic & Pottery", growth: "+20%" },
];

export default function ArchivesPage() {
  const containerRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- NEURAL NETWORK ANIMATION ---
  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    
    const resize = () => {
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle(canvasEl.width, canvasEl.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      ctx.fillStyle = "rgba(168, 162, 158, 0.4)";
      ctx.strokeStyle = "rgba(168, 162, 158, 0.1)";
      
      particles.forEach((p, i) => {
        p.update(canvasEl.width, canvasEl.height);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 170) {
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
    resize();
    init();
    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div ref={containerRef} className={`bg-[#FBFBFA] min-h-screen ${poppins.className} text-[#1A1A18] selection:bg-stone-900 selection:text-white overflow-x-hidden`}>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-white">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <div className="relative z-10 text-center px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-[10px] uppercase tracking-[1em] text-stone-400 mb-8 block font-black">
              Puriva Industries Pvt. Ltd.
            </span>
            <h1 className={`${cormorant.className} text-6xl md:text-[10rem] text-stone-900 font-light leading-none mb-10 tracking-tighter`}>
              The Archiva<span className="italic text-stone-300">l</span>
            </h1>
            <p className="text-[11px] uppercase tracking-[0.4em] text-stone-500 max-w-2xl mx-auto leading-loose font-medium mb-12">
              Aurindel: Best Trusted Exporter of Handicraft & Indian Handicraft Exporter. <br/>
              Formalizing Ancient Artistry for the Modern Global Trade.
            </p>
            <button onClick={() => setIsModalOpen(true)} className="px-12 py-5 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-black transition-all flex items-center gap-3 mx-auto">
              Initiate Bulk RFQ <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- MARKET POTENTIAL SECTION --- */}
      <section className="max-w-[1400px] mx-auto px-8 py-32 border-b border-stone-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <div className="flex items-center gap-3 text-stone-400">
              <Globe2 size={18} />
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Market Intelligence</span>
            </div>
            <h2 className={`${cormorant.className} text-5xl md:text-7xl leading-tight italic`}>The Indian Export <br/> Advantage.</h2>
            <div className="space-y-6 text-stone-500 text-sm md:text-base leading-relaxed font-light text-left">
              <p>
                India is the world’s leading hub for handmade décor, contributing significantly to global supply chains. The potential lies in **Cluster-based Manufacturing**, where heritage expertise is passed down through generations.
              </p>
              <p>
                As a **best trusted exporter of handicraft**, Puriva Industries bridges these clusters with international buyers, ensuring that artisans receive fair value and buyers receive **export-quality assurance** and 100% compliant documentation.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {clusters.map((c, i) => (
                <div key={i} className="p-6 bg-stone-50 rounded-2xl border border-stone-100 text-left">
                  <h4 className="text-xs font-black uppercase text-stone-900 mb-1">{c.region}</h4>
                  <p className="text-[10px] text-stone-500 uppercase tracking-widest mb-2">{c.craft}</p>
                  <span className="text-green-600 text-[10px] font-bold">Growth: {c.growth}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image src="/images/hero1.jpg" alt="Indian Handicraft Production" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* --- COMPLIANCE VAULT --- */}
      <section className="bg-stone-900 py-32 text-white">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="mb-20 text-left">
             <span className="text-stone-500 text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Trade Verification</span>
             <h3 className={`${cormorant.className} text-5xl italic`}>Corporate Integrity.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ComplianceCard title="IEC License" id="DGFT Verified" desc="Import Export Code registered for worldwide commercial trading." icon={<ShieldCheck size={24}/>} />
            <ComplianceCard title="EPCH Member" id="RCMC Certified" desc="Member of Export Promotion Council for Handicrafts." icon={<Award size={24}/>} />
            <ComplianceCard title="GST Compliance" id="Corporate ID" desc="Registered tax entity under Puriva Industries Pvt. Ltd." icon={<FileCheck size={24}/>} />
            <ComplianceCard title="Consolidation" id="Noida Hub" desc="Centralized quality control and logistics management." icon={<Box size={24}/>} />
          </div>
        </div>
      </section>

      {/* --- TIMELINE SECTION --- */}
      <section className="py-40 bg-white relative">
        <div className="max-w-[1000px] mx-auto px-8">
           <div className="text-center mb-32 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.6em] text-stone-400 font-bold">Origins</span>
              <h2 className={`${cormorant.className} text-5xl md:text-7xl italic`}>The Journey Log</h2>
           </div>
           <div className="space-y-24">
             {milestones.map((item, idx) => (
               <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-12 group text-left">
                 <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-stone-400 group-hover:bg-stone-900 group-hover:text-white transition-all">
                       {item.icon}
                    </div>
                    <div className="w-px h-full bg-stone-100 group-last:hidden mt-4" />
                 </div>
                 <div className="pb-16">
                    <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest block mb-2">{item.date}</span>
                    <h3 className="text-xl font-bold uppercase tracking-widest text-stone-900 mb-4">{item.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed max-w-xl font-light">{item.desc}</p>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* --- FULL WIDTH FOOTER --- */}
      <footer className="bg-stone-900 text-stone-400 pt-32 pb-12 w-full border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-24 border-b border-white/5 text-left">
            <div className="lg:col-span-5 space-y-10">
              <Link href="/" className="relative block w-[200px] h-[60px]">
                <Image src="/images/AurindelLogo.png" alt="Aurindel" fill className="object-contain brightness-0 invert" />
              </Link>
              <p className="text-sm leading-relaxed max-w-sm font-light">Puriva Industries Private Limited: A corporate standard in Indian handicraft exports and global trade compliance.</p>
              <div className="flex gap-6">
                <Link href="https://instagram.com/theabhinavanand" target="_blank" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"><Instagram size={18}/></Link>
                <Link href="https://linkedin.com/in/abhinavanandofficial" target="_blank" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"><Linkedin size={18}/></Link>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-8">
              <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Trade Desk</h4>
              <ul className="space-y-4 text-xs font-light">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/archives" className="text-white">Compliance Archives</Link></li>
                <li><button onClick={() => setIsModalOpen(true)} className="hover:text-white transition-colors text-left">Wholesale Inquiry</button></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Hub</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Direct Line</h4>
              <ul className="space-y-4 text-xs font-light">
                <li className="flex items-center gap-3"><Mail size={14} /> abhinav.purivaindustries@gmail.com</li>
                <li className="flex items-center gap-3"><Phone size={14} /> +91 8340220161</li>
                <li className="flex items-center gap-3"><Globe size={14} /> www.aurindel.com</li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Headquarters</h4>
              <p className="text-xs font-light leading-loose flex items-start gap-3 text-stone-500">
                <MapPin size={14} className="mt-1 flex-shrink-0" />
                <span>8th Floor 8125, Gaur City Mall Office Space, <br/>Greater Noida (201318) UP, INDIA</span>
              </p>
            </div>
          </div>
          <div className="pt-12 text-center text-[9px] uppercase tracking-[0.6em] text-stone-700 font-bold">
            © 2026 PURIVA INDUSTRIES PVT. LTD. (AURINDEL STUDIO)
          </div>
        </div>
      </footer>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[10000] flex items-center justify-center px-4 bg-stone-900/60 backdrop-blur-md cursor-default">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white w-full max-w-2xl rounded-[3rem] p-12 md:p-16 relative shadow-2xl">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-10 right-10 text-stone-300 hover:text-black transition-all"><X size={24}/></button>
              {!isSubmitted ? (
                <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); setTimeout(() => { setIsModalOpen(false); setIsSubmitted(false); }, 3000); }} className="space-y-8 text-left">
                  <div><span className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold block mb-2">Trade Desk</span><h4 className={`${cormorant.className} text-4xl italic text-stone-900`}>Inquiry Channel</h4></div>
                  <input type="text" placeholder="Organization" className="w-full bg-stone-50 border border-stone-100 rounded-full px-8 py-5 text-sm" required />
                  <input type="email" placeholder="Trade Email" className="w-full bg-stone-50 border border-stone-100 rounded-full px-8 py-5 text-sm" required />
                  <textarea placeholder="Trade Requirements (Quantity, Destination, Items)" className="w-full bg-stone-50 border border-stone-100 rounded-[2rem] p-8 text-sm h-32 resize-none" />
                  <button type="submit" className="w-full py-6 bg-stone-900 text-white rounded-full text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-3">Submit RFQ <Send size={14}/></button>
                </form>
              ) : (
                <div className="py-24 text-center space-y-6"><BadgeCheck size={48} className="mx-auto text-stone-900" /><h4 className="text-4xl font-serif italic text-stone-900">Request Received.</h4><p className="text-stone-500 text-sm">Puriva Industries will contact you within 24 business hours.</p></div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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