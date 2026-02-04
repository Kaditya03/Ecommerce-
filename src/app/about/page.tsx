"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Instagram, 
  Linkedin, 
  ArrowLeft, 
  Globe,
  Quote,
  Play,
  Pause,
  Target,
  Users,
  Mail,
  MapPin,
  Phone,
  ArrowRight
} from "lucide-react";

export default function AboutPage() {
  const { scrollY } = useScroll();
  const [showBack, setShowBack] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false); 
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowBack(latest < 80);
  });

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  return (
    <main ref={containerRef} className="bg-[#FBFBF9] text-stone-900 min-h-screen selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* NAVIGATION */}
      <div className="fixed top-0 left-0 w-full z-[150] px-6 py-6 md:px-10 md:py-10 pointer-events-none">
        <div className="max-w-[1800px] mx-auto flex justify-between items-center w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="pointer-events-auto">
            <Link href="/" className="block relative w-[120px] h-[40px] md:w-[160px] md:h-[50px]">
              <Image src="/images/AurindelLogo.png" alt="Aurindel" fill className="object-contain object-left contrast-125" />
            </Link>
          </motion.div>
          <AnimatePresence>
            {showBack && (
              <motion.nav initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="pointer-events-auto">
                <Link href="/" className="group flex items-center gap-4 bg-black/5 backdrop-blur-2xl border border-black/10 px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all duration-700">
                  <ArrowLeft size={16} />
                  <span className="text-[9px] uppercase tracking-[0.5em] font-bold">Back</span>
                </Link>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FBFBF9]/20 to-[#FBFBF9] z-10" />
          <Image src="/images/company-main.jpg" alt="Aurindel" fill className="object-cover" priority />
        </motion.div>
        
        <motion.div style={{ y: textY }} className="relative z-20 text-center px-4 max-w-5xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-stone-500 uppercase tracking-[0.8em] text-[10px] font-bold mb-6">
            Puriva Industries Pvt. Ltd. Presents
          </motion.p>
          <h1 className="text-5xl md:text-[10rem] font-serif italic leading-none tracking-tighter mb-8 text-stone-900">Aurindel</h1>
          <p className="text-stone-600 text-sm md:text-lg uppercase tracking-[0.4em] font-light max-w-3xl mx-auto leading-relaxed">
            Connecting Indian Craftsmanship to the World
          </p>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 1.5 }} className="mt-12 w-24 h-px bg-black/20 mx-auto" />
        </motion.div>
      </section>

      {/* BRAND SECTION */}
      <section className="py-32 px-8 flex justify-center bg-[#F5F5F2]">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl text-center space-y-12">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold">The Aurindel Narrative</span>
            <h2 className="text-3xl md:text-6xl font-serif leading-tight text-stone-800 italic">
              Where Golden Heritage Meets Indian Elegance
            </h2>
          </div>
          <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed">
            At Puriva Industries Pvt. Ltd., we believe every handicraft creation tells a story. Rooted in India’s rich legacy of craftsmanship, we bring timeless artistry into the modern world. Aurindel collections blend traditional techniques with contemporary designs, celebrating the beauty of heritage while embracing global elegance.
          </p>
          <div className="inline-block p-8 border border-black/5 rounded-2xl bg-black/[0.02]">
            <p className="text-stone-500 italic font-serif text-lg">
              "As a dedicated handicraft company for Indian handicraft exports, we connect traditional artisans with global markets, ensuring that our rich heritage reaches homes across the world."
            </p>
          </div>
        </motion.div>
      </section>

      {/* VISION CARDS */}
      <section className="max-w-[1400px] mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <VisionCard 
            index={0} 
            icon={<Users size={28} />} 
            title="01. Who We Are" 
            desc="We work with skilled artisans across India to curate and export authentic handicrafts that blend heritage and artistry." 
          />
          <VisionCard 
            index={1} 
            icon={<Target size={28} />} 
            title="02. Our Mission" 
            desc="To be a trusted partner for global buyers by offering high-quality handicrafts with competitive pricing and timely delivery." 
          />
          <VisionCard 
            index={2} 
            icon={<Globe size={28} />} 
            title="03. Our Vision" 
            desc="To be a global name in exports, ensuring Indian craftsmanship earns the recognition it deserves worldwide." 
          />
      </section>

      {/* VIDEO MESSAGE SECTION */}
      <section className="py-40 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative group">
            <motion.div 
              initial={{ rotateX: 20, y: 50, opacity: 0 }}
              whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative aspect-video rounded-[4rem] overflow-hidden border border-black/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] bg-[radial-gradient(circle_at_center,_#FFFFFF_0%,_#F2F2F2_100%)]"
            >
              <video 
                ref={videoRef}
                src="https://res.cloudinary.com/dcgmsnhro/video/upload/v1770226463/video-founder_rg01pp.mp4" 
                muted={isMuted} 
                loop 
                playsInline 
                controls={isPlaying} 
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ${isPlaying ? 'opacity-100' : 'opacity-80 group-hover:scale-105'}`}
              />
              
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center space-y-8 cursor-pointer z-20"
                  onClick={handlePlayToggle}
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-24 h-24 rounded-full bg-black/10 backdrop-blur-xl border border-black/10 flex items-center justify-center"
                  >
                    <Play className="fill-black text-black ml-2" size={32} />
                  </motion.div>
                  <div className="text-center">
                    <h3 className="text-3xl font-serif italic mb-2 tracking-wide text-black">A Message from the Founder</h3>
                    <p className="text-[10px] uppercase tracking-[0.5em] text-stone-500">Puriva Industries Executive Studio</p>
                  </div>
                </div>
              )}

              {isPlaying && (
                <button 
                  onClick={handlePlayToggle}
                  className="absolute top-10 right-10 z-30 p-4 bg-black/10 backdrop-blur-md border border-black/10 rounded-full text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <Pause size={18} />
                </button>
              )}

              <div className="absolute top-10 left-10 w-32 h-32 border-l border-t border-black/10 rounded-tl-[3rem] pointer-events-none" />
              <div className="absolute bottom-10 right-10 w-32 h-32 border-r border-b border-black/10 rounded-br-[3rem] pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION - UPDATED TO LIGHT COLOR */}
      <section className="py-40 bg-[#F5F5F2] text-stone-900 rounded-[4rem] md:rounded-[6rem] mx-4 md:mx-12 overflow-hidden border border-black/5">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold block">The Architect of Vision</span>
              <h2 className="text-6xl md:text-8xl font-serif italic tracking-tight">Abhinav Anand</h2>
            </div>
            <div className="relative">
              <Quote className="absolute -top-10 -left-6 text-stone-200" size={60} />
              <p className="text-2xl md:text-3xl text-stone-600 font-light leading-relaxed font-serif italic relative z-10">
                "True luxury is not found in the machine's precision, but in the artisan's imperfection."
              </p>
            </div>
            <div className="flex gap-8 pt-6">
              <SocialLink href="https://www.instagram.com/theabhinavanand" icon={<Instagram size={22} />} label="Instagram" />
              <SocialLink href="https://in.linkedin.com/in/abhinavanandofficial" icon={<Linkedin size={22} />} label="LinkedIn" />
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            className="relative h-[600px] md:h-[800px] w-full rounded-[3.5rem] overflow-hidden shadow-2xl group"
          >
            <Image 
              src="/images/founder.jpeg" 
              alt="Abhinav Anand" 
              fill 
              className="object-cover transition-all duration-1000 group-hover:scale-105" 
            />
          </motion.div>
        </div>
      </section>

      {/* THE COLLECTIVE GALLERY */}
      <section className="py-40 px-8 max-w-[1500px] mx-auto text-center">
        <Globe size={32} strokeWidth={1} className="text-stone-300 mb-8 mx-auto animate-pulse" />
        <h2 className="text-5xl md:text-7xl font-serif italic mb-24 text-stone-900">The Collective</h2>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="relative h-[600px] md:h-[850px] group overflow-hidden rounded-[5rem]">
          <Image src="/images/team-photo.jpg" alt="Aurindel Team" fill className="object-cover transition-all duration-[3s]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FBFBF9] to-transparent opacity-80" />
          <div className="absolute bottom-16 left-10 md:left-20 text-left">
              <p className="text-3xl md:text-5xl font-serif italic text-stone-900">200+ Master Artisans</p>
          </div>
        </motion.div>
      </section>

      {/* ENHANCED FOOTER */}
      <footer className="bg-stone-900 text-stone-400 pt-32 pb-12 rounded-t-[4rem] md:rounded-t-[6rem]">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 pb-24 border-b border-white/5">
            
            {/* Brand Column */}
            <div className="lg:col-span-1 space-y-8">
              <Link href="/" className="block relative w-[180px] h-[50px]">
                <Image src="/images/AurindelLogo.png" alt="Aurindel" fill className="object-contain object-left brightness-0 invert" />
              </Link>
              <p className="text-sm leading-relaxed max-w-xs">
                A legacy of Indian craftsmanship, exported with contemporary elegance to the world's most discerning spaces.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-8">
              <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Navigation</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/collections" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"/> Collections</Link></li>
                <li><Link href="/heritage" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"/> Our Heritage</Link></li>
                <li><Link href="/artisans" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"/> Master Artisans</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Inquiries</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3"><Mail size={16} /> export@purivaindustries.com</li>
                <li className="flex items-center gap-3"><Phone size={16} /> +91 999 000 0000</li>
                <li className="flex items-center gap-3"><Globe size={16} /> www.aurindel.com</li>
              </ul>
            </div>

            {/* Location */}
            <div className="space-y-8">
              <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Studio</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-1 flex-shrink-0" /> 
                  <span>102, Executive Block,<br/>Puriva Industries HQ,<br/>New Delhi, India</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 gap-8">
            <p className="text-[9px] uppercase tracking-[0.6em] text-stone-600">© 2026 Aurindel Studio by Puriva Industries Pvt. Ltd.</p>
            <div className="flex gap-8 text-[9px] uppercase tracking-[0.3em]">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function VisionCard({ icon, title, desc, index }: { icon: React.ReactNode, title: string, desc: string, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 1 }}
      viewport={{ once: true }}
      className="p-12 border border-black/5 rounded-[4rem] bg-black/[0.01] hover:bg-black hover:text-white transition-all duration-700 group h-full"
    >
      <div className="mb-10 text-stone-400 group-hover:text-white transition-colors transform scale-125 origin-left">{icon}</div>
      <h3 className="text-2xl font-serif italic mb-6">{title}</h3>
      <p className="text-stone-500 group-hover:text-stone-200 text-base font-light leading-relaxed">{desc}</p>
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