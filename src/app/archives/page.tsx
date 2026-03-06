"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
  TrendingUp,
  Layers,
  Leaf,
  Check,
  Navigation,
  ChevronRight,
  Verified,
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
    desc: "Puriva Industries Private Limited was formally established as a corporate entity to professionalize the Indian handicraft export sector.",
    icon: <FileCheck className="w-5 h-5" />,
  },
  {
    date: "July 2025",
    title: "The Birth of Aurindel",
    desc: "Launch of Aurindel, our flagship brand focused on high-end B2B decorative exports and modern artisanal collaborations.",
    icon: <Award className="w-5 h-5" />,
  },
  {
    date: "Sept 2025",
    title: "Regulatory Licensing",
    desc: "Achieved full export readiness with IEC (Import Export Code) and EPCH (Export Promotion Council for Handicrafts) registration.",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    date: "Oct 2025",
    title: "Global Trade Commencement",
    desc: "Successfully initiated international operations, fulfilling bulk orders for European and North American retail partners.",
    icon: <Ship className="w-5 h-5" />,
  },
];

const marketInsights = [
  {
    title: "Global Demand",
    value: "$4B+",
    desc: "Indian handicraft exports reached new heights in 2025, driven by a global shift toward authentic, sustainable décor.",
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    title: "Artisan Clusters",
    value: "744+",
    desc: "India hosts the world's most dense network of craft clusters, from Moradabad Brass to Saharanpur Woodcraft.",
    icon: <Layers className="w-6 h-6" />
  },
  {
    title: "Eco-Sustainability",
    value: "100%",
    desc: "Traditional Indian crafts naturally utilize biodegradable materials like clay, jute, and sustainable wood.",
    icon: <Leaf className="w-6 h-6" />
  }
];

export default function ArchivesPage() {
  const containerRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = 85;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; vx: number; vy: number;
      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
      }
      update(w: number, h: number) {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(168, 162, 158, 0.4)";
      ctx.strokeStyle = "rgba(168, 162, 158, 0.12)";
      
      particles.forEach((p, i) => {
        p.update(canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 170) {
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
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

      {/* --- HERO SECTION --- */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-white">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FBFBFA]" />
        <div className="relative z-10 text-center px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <span className="text-[10px] uppercase tracking-[1em] text-stone-400 mb-8 block font-black">
              Puriva Industries Pvt. Ltd. | Premier Export House
            </span>
            <h1 className={`${cormorant.className} text-6xl md:text-[10rem] text-stone-900 font-light leading-none mb-8 tracking-tighter`}>
              Aurinde<span className="italic text-stone-300">l</span> Archives
            </h1>
            <p className="text-[11px] uppercase tracking-[0.4em] text-stone-500 max-w-2xl mx-auto leading-loose font-medium">
              Best Trusted Exporter of Handicraft & Indian Handicraft Exporter. <br/>
              Bridging Heritage Clusters to the Global Marketplace.
            </p>
            <div className="mt-12 flex flex-col md:flex-row justify-center gap-6">
                <Link href="/contact" className="px-10 py-4 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-black transition-all flex items-center gap-2">
                    Request Trade Catalogue <ArrowRight size={14} />
                </Link>
                <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 font-bold border border-stone-200 px-6 py-4 rounded-full">
                    <Verified size={14} className="text-stone-900" /> Authorized DGFT & EPCH Partner
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 1: MARKET POTENTIAL --- */}
      <section className="max-w-[1400px] mx-auto px-8 py-32 border-b border-stone-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
                <div className="flex items-center gap-3 text-stone-400">
                    <Globe2 size={18} />
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Market Leadership</span>
                </div>
                <h2 className={`${cormorant.className} text-5xl md:text-7xl leading-tight italic text-stone-800`}>
                    India: The Global <br/> Epicenter of Craft.
                </h2>
                <div className="space-y-6 text-stone-500 text-sm md:text-base leading-relaxed font-light text-left">
                    <p>
                        The Indian handicraft industry is a multi-billion dollar sector, valued at over USD 4.5 billion. India stands as one of the world&apos;s top exporters, fueled by its unique Artisan Cluster system.
                    </p>
                    <p>
                        From the intricately carved woodware of Saharanpur to the art metalwares of Moradabad, Puriva Industries ensures international buyers receive consistent quality and ethical production.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left">
                    {marketInsights.map((item, i) => (
                        <div key={i} className="p-8 bg-stone-50 rounded-3xl border border-stone-100 group hover:bg-stone-900 transition-all duration-500">
                            <div className="text-stone-300 group-hover:text-stone-500 mb-4">{item.icon}</div>
                            <h4 className="text-2xl font-serif text-stone-800 group-hover:text-white mb-1">{item.value}</h4>
                            <p className="text-[9px] uppercase tracking-widest text-stone-400 group-hover:text-stone-500 font-bold mb-3">{item.title}</p>
                            <p className="text-[11px] text-stone-500 group-hover:text-stone-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image src="/images/hero1.jpg" alt="Indian Artisan Heritage" fill className="object-cover" />
            </div>
        </div>
      </section>

      {/* --- SECTION 2: DIRECT CLUSTER SOURCING (FIXED ERROR AREA) --- */}
      <section className="bg-stone-900 py-32 text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24 text-left">
            <div className="max-w-2xl space-y-4">
              <span className="text-stone-500 text-[10px] uppercase tracking-[0.5em] font-bold">Operational Excellence</span>
              <h3 className={`${cormorant.className} text-5xl italic`}>Direct Cluster Sourcing.</h3>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                At Puriva Industries (Aurindel), our supply chain is built on the foundation of Direct Cluster Sourcing. This model eliminates unnecessary middle-layer markups and ensures that every piece of handicraft is an authentic representation of its regional heritage.
              </p>
            </div>
            <div className="flex flex-col items-end gap-4">
               <span className="text-[9px] uppercase tracking-[0.4em] text-stone-600 font-black">2026 Export Readiness</span>
               <div className="h-px w-32 bg-stone-800" />
            </div>
          </div>
          
          

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             <ComplianceCard title="IEC Verified" id="Trade ID Active" desc="Import-Export Code licensed for international B2B commerce." icon={<ShieldCheck size={24}/>} />
             <ComplianceCard title="EPCH RCMC" id="Industry Partner" desc="Registered with the Export Promotion Council for Handicrafts." icon={<Award size={24}/>} />
             <ComplianceCard title="Direct Logistics" id="Global Fulfillment" desc="Noida-based hub optimizing freight across 40+ countries." icon={<Globe size={24}/>} />
             <ComplianceCard title="Compliance" id="Legal Assurance" desc="Fumigation, Origin & QC documentation guaranteed." icon={<CheckCircle2 size={24}/>} />
          </div>
        </div>
      </section>

      {/* --- SECTION 3: TIMELINE --- */}
      <section className="py-40 bg-white relative">
        <div className="max-w-[1100px] mx-auto px-8 relative">
           <div className="text-center mb-40 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.6em] text-stone-400 font-bold">The Puriva Story</span>
              <h2 className={`${cormorant.className} text-5xl md:text-[5.5rem] italic text-stone-900 leading-tight`}>Growth & Compliance</h2>
           </div>
           <div className="space-y-40">
             {milestones.map((item, idx) => (
               <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`relative flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-16`}>
                 <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 bg-white border border-stone-100 rounded-full items-center justify-center z-10 shadow-sm text-stone-900">
                   {item.icon}
                 </div>
                 <div className="w-full lg:w-1/2 p-12 bg-white border border-stone-100 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all group text-left">
                    <div className="flex items-center justify-between mb-6">
                        <span className={`${cormorant.className} text-3xl italic text-stone-200 group-hover:text-stone-400 transition-colors`}>{item.date}</span>
                        <Navigation size={14} className="text-stone-100 group-hover:text-stone-300" />
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-widest text-stone-900 mb-6">{item.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed font-light">{item.desc}</p>
                 </div>
                 <div className="w-full lg:w-1/2" />
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* --- SECTION 4: VALUE PROPOSITION --- */}
      <section className="max-w-[1400px] mx-auto px-8 py-32 border-t border-stone-100 text-left">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 space-y-6">
               <h3 className={`${cormorant.className} text-5xl italic`}>Trusted by the <br/> World&apos;s Retailers.</h3>
               <div className="h-1 w-20 bg-stone-900 rounded-full" />
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
               <ValueItem title="B2B Consolidation" desc="We aggregate products from various craft hubs into a single consignment, reducing shipping overhead for international buyers." />
               <ValueItem title="Artisan Empowerment" desc="A portion of every Aurindel export supports the health and children's education in our primary artisan clusters." />
               <ValueItem title="Compliance Experts" desc="Puriva Industries handles all regulatory hurdles, from GST filing to DGFT export mandates, ensuring a hassle-free import." />
               <ValueItem title="Quality First" desc="As an Indian handicraft exporter of repute, we reject anything that doesn't meet our 'Tier-1' finish standards." />
            </div>
         </div>
      </section>

      {/* --- FULL-WIDTH FOOTER --- */}
      <footer className="bg-stone-900 text-stone-400 pt-32 pb-12 w-full">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-24 border-b border-white/5 text-left">
            <div className="lg:col-span-5 space-y-10">
              <Link href="/" className="relative block w-[200px] h-[60px]">
                <Image src="/images/AurindelLogo.png" alt="Aurindel" fill className="object-contain object-left brightness-0 invert" />
              </Link>
              <p className="text-sm leading-relaxed max-w-sm font-light">
                Puriva Industries Private Limited: A corporate standard in Indian artisan exports and trade compliance. 
                Connecting heritage craftsmanship with modern global demand.
              </p>
              <div className="flex gap-6">
                <Link href="https://instagram.com/theabhinavanand" target="_blank" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"><Instagram size={18}/></Link>
                <Link href="https://linkedin.com/in/abhinavanandofficial" target="_blank" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"><Linkedin size={18}/></Link>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-8">
              <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Trade Desk</h4>
              <ul className="space-y-4 text-xs font-light">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/archives" className="text-white">Trade Archives</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Partner With Us</Link></li>
              </ul>
            </div>
            <div className="lg:col-span-2 space-y-8">
              <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Legal Hub</h4>
              <ul className="space-y-4 text-xs font-light">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Trade Terms</Link></li>
              </ul>
            </div>
            <div className="lg:col-span-3 space-y-8">
              <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">HQ Office</h4>
              <p className="text-xs font-light leading-loose flex items-start gap-3">
                <MapPin size={14} className="mt-1 flex-shrink-0 text-stone-600" />
                <span>8th Floor 8125, Gaur City Mall, Greater Noida (201318) UP, INDIA</span>
              </p>
            </div>
          </div>
          <div className="pt-12 text-center text-[9px] uppercase tracking-[0.6em] font-medium">© 2026 PURIVA INDUSTRIES PVT. LTD.</div>
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

function ValueItem({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-widest font-black text-stone-900 border-b border-stone-100 pb-2 flex justify-between items-center">
                {title} <ChevronRight size={10} />
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed font-light">{desc}</p>
        </div>
    )
}