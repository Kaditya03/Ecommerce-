"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Instagram, Linkedin, Twitter, Play, ArrowDown, Globe, Award, Zap, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutStory() {
  const { scrollYProgress } = useScroll();
  
  // Advanced Parallax transforms
  const videoScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.15]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const ownerX = useTransform(scrollYProgress, [0.1, 0.4], [150, 0]);
  const driftY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <main className="bg-[#FAF9F6] selection:bg-stone-900 selection:text-white overflow-x-hidden">
      
      {/* 1. CINEMATIC INTRO */}
      <section className="relative h-[110vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: videoScale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/45 z-10" />
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/videos/aurindel-hero.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <motion.div style={{ opacity: opacityHero }} className="relative z-20 text-center text-white px-6">
          <motion.span initial={{ letterSpacing: "0.2em", opacity: 0 }} animate={{ letterSpacing: "0.8em", opacity: 1 }} transition={{ duration: 1.5 }} className="text-[10px] uppercase font-black mb-8 block text-stone-300">
            Artisanal Excellence
          </motion.span>
          <h1 className="text-[13vw] md:text-[11vw] font-serif italic leading-[0.75] tracking-tighter">
            Aurindel
          </h1>
          <p className="mt-8 font-light text-stone-300 tracking-[0.3em] uppercase text-[10px]">The Soul of Craftsmanship</p>
        </motion.div>
      </section>

      {/* NEW: RUNNING BRAND TICKER (High-End Aesthetic) */}
      <div className="bg-stone-900 py-6 overflow-hidden flex whitespace-nowrap border-y border-stone-800">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-20 items-center"
        >
          {["GLOBAL EXPORTS", "HANDCRAFTED IN INDIA", "ETHICAL SOURCING", "PREMIUM QUALITY", "TRADITIONAL ARTISTRY"].map((text, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="text-stone-500 font-serif italic text-2xl">{text}</span>
              <div className="w-2 h-2 rounded-full bg-stone-700" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* 2. THE VISIONARY (Owner Section) */}
      <section className="relative py-40 px-6 max-w-[1400px] mx-auto">
        {/* Background Drift Element */}
        <motion.div style={{ y: driftY }} className="absolute top-20 -left-20 opacity-10 pointer-events-none">
            <h2 className="text-[20vw] font-serif italic text-stone-300">Heritage</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          <motion.div style={{ x: ownerX }} className="relative">
            <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.3)]">
              <Image 
                src="/images/owner-portrait.jpg" 
                alt="Founder of Aurindel" 
                fill 
                className="object-cover"
              />
            </div>
            
            <motion.div 
              whileHover={{ translateZ: 50, rotateY: 10 }}
              style={{ transformStyle: "preserve-3d" }}
              className="absolute -bottom-12 -right-8 bg-[#FAF9F6] p-10 rounded-[2.5rem] shadow-2xl border border-stone-200 hidden md:block max-w-sm"
            >
              <Quote className="text-stone-200 absolute top-4 left-4" size={40} />
              <p className="text-stone-900 font-serif italic text-2xl leading-snug">"We don't just export products; we export the heartbeat of Indian villages."</p>
              <p className="text-[10px] uppercase tracking-[0.4em] font-black mt-6 text-stone-400">— Founder & CEO</p>
            </motion.div>
          </motion.div>

          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-stone-200 bg-stone-50">
                <Zap size={14} className="text-amber-600" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-stone-500">The Visionary</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif text-stone-900 leading-[0.9]">Beyond <br /><span className="italic">Boundaries</span></h2>
            <p className="text-xl text-stone-500 font-light leading-relaxed max-w-lg">
              What started as a small initiative to support local artisans has transformed into a global hallmark of quality. Our founder ensures every piece that leaves our facility carries the seal of authenticity and unmatched craftsmanship.
            </p>
            <div className="flex items-center gap-8 pt-4">
               <SocialLink href="https://linkedin.com/company/aurindel" icon={<Linkedin size={20} />} label="LinkedIn" />
               <SocialLink href="https://www.instagram.com/aurindelexports/" icon={<Instagram size={20} />} label="Instagram" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SUCCESS MILESTONES (Enhanced Grid) */}
      <section className="bg-stone-950 text-white py-40 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-stone-900/50 to-transparent pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-8">
            <h3 className="text-5xl md:text-7xl font-serif italic">Our Evolution</h3>
            <div className="flex gap-4">
                <Stat icon={<Globe size={18} />} value="24+" label="Global Destinations" />
                <Stat icon={<Award size={18} />} value="100%" label="Handmade Ethics" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SuccessCard year="2020" title="The Spark" desc="Identifying the untapped potential of traditional terracotta clusters." />
            <SuccessCard year="2023" title="Expansion" desc="Setting up our first global-scale export unit for high-volume supply." />
            <SuccessCard year="2026" title="Innovate" desc="Integrating 3D visualization to allow global buyers to customize crafts." />
          </div>
        </div>
      </section>

      {/* 4. IMMERSIVE VIDEO REEL */}
      <section className="py-40 bg-[#FAF9F6]">
        <div className="max-w-[1600px] mx-auto px-6 text-center">
          <h2 className="text-xs uppercase tracking-[0.5em] font-black text-stone-400 mb-16">The Artisan's Rhythm</h2>
          <div className="relative rounded-[4rem] overflow-hidden group h-[80vh] cursor-none">
            <video autoPlay muted loop className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100">
               <source src="/videos/workshop-cinematic.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                whileHover={{ scale: 1.2 }}
                className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center text-white"
              >
                <Play fill="white" size={32} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE GLOBAL REACH (Export Map Aesthetic) */}
      <section className="py-40 bg-white px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-400">Our Footprint</h4>
              <h2 className="text-5xl md:text-7xl font-serif text-stone-900 leading-tight">From Local Clusters <br /> to <span className="italic">Global Doorsteps</span>.</h2>
              <p className="text-stone-500 font-light text-lg leading-relaxed max-w-xl">
                Aurindel has bridged the gap between rural Indian craftsmanship and the world's most sophisticated spaces. Our logistics network ensures that whether it's a single masterpiece or a bulk container, the integrity of the craft remains uncompromised.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <p className="text-3xl font-serif italic text-stone-900">Europe</p>
                  <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Primary Market</p>
                </div>
                <div>
                  <p className="text-3xl font-serif italic text-stone-900">Americas</p>
                  <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Expanding Base</p>
                </div>
              </div>
            </div>

            {/* Decorative Map / 3D Abstract Representation */}
            <div className="relative group">
               <div className="absolute inset-0 bg-stone-100 rounded-[4rem] -rotate-2 group-hover:rotate-0 transition-transform duration-700" />
               <div className="relative aspect-square bg-stone-50 rounded-[4rem] border border-stone-100 flex items-center justify-center p-12 overflow-hidden shadow-sm">
                  <Globe className="text-stone-200 w-full h-full absolute -right-20 -bottom-20 rotate-12" strokeWidth={0.5} />
                  <div className="relative z-10 text-center">
                    <p className="text-6xl font-serif italic text-stone-900">24+</p>
                    <p className="text-xs uppercase tracking-[0.3em] font-black text-stone-400 mt-2">Countries Served</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR CORE VALUES (Iconic Grid) */}
      <section className="py-40 bg-stone-50 px-6 border-y border-stone-200/50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-24">
             <h3 className="text-4xl md:text-6xl font-serif italic text-stone-900">The Aurindel Promise</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <ValueCard 
              icon={<Award size={24} />} 
              title="Authenticity" 
              desc="Every piece is verified as 100% handmade by registered Indian artisan clusters."
            />
            <ValueCard 
              icon={<Zap size={24} />} 
              title="Innovation" 
              desc="Blending traditional motifs with contemporary utility for modern interiors."
            />
            <ValueCard 
              icon={<Globe size={24} />} 
              title="Sustainability" 
              desc="Natural dyes, locally sourced clay, and plastic-free export packaging."
            />
            <ValueCard 
              icon={<Quote size={24} />} 
              title="Transparency" 
              desc="Direct trade models that ensure artisans receive fair, ethical compensation."
            />
          </div>
        </div>
      </section>

      {/* 7. FINAL B2B CALL TO ACTION */}
      <section className="relative py-40 bg-stone-900 overflow-hidden text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-3xl mx-auto space-y-12"
        >
          <h2 className="text-5xl md:text-8xl font-serif italic text-white leading-tight">Partner with <br /> Excellence</h2>
          <p className="text-stone-400 text-lg font-light leading-relaxed">
            Interested in bulk exports, custom artisan collaborations, or architectural commissions? Let’s bring the soul of Indian craft to your project.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">
            <Link href="/contact" className="group relative px-12 py-5 bg-white rounded-full overflow-hidden transition-all">
               <span className="relative z-10 text-stone-900 font-bold uppercase text-[10px] tracking-widest">Send Inquiry</span>
               <div className="absolute inset-0 bg-stone-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <Link href="mailto:exports@aurindel.com" className="text-stone-400 hover:text-white transition-colors uppercase text-[10px] tracking-widest font-black border-b border-stone-800 pb-2">
              exports@aurindel.com
            </Link>
          </div>
        </motion.div>

        {/* Subtle Background Text */}
        <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 whitespace-nowrap opacity-[0.03] pointer-events-none select-none">
          <h2 className="text-[30vw] font-serif italic text-white">Aurindel Exports</h2>
        </div>
      </section>

      {/* FLOATING SIDEBAR */}
      <aside className="fixed right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-10 items-center mix-blend-difference">
         <Link href="https://www.instagram.com/aurindelexports/" target="_blank">
            <motion.div whileHover={{ y: -5, scale: 1.2 }} className="text-white flex flex-col items-center gap-4">
               <Instagram size={20} strokeWidth={1.5} />
               <p className="vertical-text text-[9px] uppercase tracking-[0.4em] font-black">@aurindelexports</p>
            </motion.div>
         </Link>
         <div className="w-[1px] h-20 bg-white/30" />
         <Link href="https://linkedin.com/company/aurindel" target="_blank">
            <motion.div whileHover={{ y: -5, scale: 1.2 }} className="text-white">
               <Linkedin size={20} strokeWidth={1.5} />
            </motion.div>
         </Link>
      </aside>

    </main>
  );
}

// Utility Components for a Clean page.tsx
function SocialLink({ href, icon, label }: any) {
    return (
        <Link href={href} target="_blank" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
                {icon}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 group-hover:text-stone-900 transition-colors">{label}</span>
        </Link>
    )
}

function Stat({ icon, value, label }: any) {
    return (
        <div className="px-6 py-4 rounded-3xl bg-stone-900 border border-stone-800 flex items-center gap-4">
            <div className="text-stone-500">{icon}</div>
            <div>
                <p className="text-xl font-serif italic text-white leading-none">{value}</p>
                <p className="text-[8px] uppercase tracking-widest text-stone-500 font-bold mt-1">{label}</p>
            </div>
        </div>
    )
}

function SuccessCard({ year, title, desc }: any) {
  return (
    <motion.div 
      whileHover={{ y: -15, backgroundColor: "rgba(28, 25, 23, 1)" }}
      className="p-12 border border-stone-900 rounded-[3.5rem] bg-stone-900/30 transition-all duration-500"
    >
      <div className="w-12 h-12 rounded-2xl bg-stone-800 flex items-center justify-center mb-8 text-stone-500 font-serif italic text-xl">
        {year.slice(-2)}
      </div>
      <h5 className="text-2xl font-serif italic text-white mb-4">{title}</h5>
      <p className="text-stone-500 text-sm leading-relaxed font-light">{desc}</p>
    </motion.div>
  );
}
function ValueCard({ icon, title, desc }: any) {
  return (
    <div className="group p-8 bg-white border border-stone-100 rounded-[2.5rem] hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-500">
      <div className="w-14 h-14 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-900 mb-8 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h4 className="text-xl font-serif italic text-stone-900 mb-4">{title}</h4>
      <p className="text-stone-500 text-sm leading-relaxed font-light">{desc}</p>
    </div>
  )
}