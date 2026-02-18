"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Instagram, 
  Linkedin, 
  Globe,
  Quote,
  Play,
  Pause,
  Target,
  Users,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Share2,
  Check,
  MoreVertical,
  Twitter,
  MessageCircle,
  Copy,
  Volume2,
  VolumeX,
  Download,
  Gauge,
  MonitorPlay,
  Maximize,
  X as CloseIcon
} from "lucide-react";

import Navbar from "@/components/Navbar"; 

export default function AboutPage() {
  const { scrollY } = useScroll();
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1); // Track volume level
  const [isPlaying, setIsPlaying] = useState(false); 
  const [isCopied, setIsCopied] = useState(false); 
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  // VOLUME HANDLER
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMuteState = !isMuted;
      videoRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
      if (!newMuteState && volume === 0) {
        setVolume(0.5);
        videoRef.current.volume = 0.5;
      }
    }
  };

  const changeSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setShowMoreMenu(false);
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const link = document.createElement("a");
      link.href = videoRef.current.src;
      link.download = "Aurindel-Founder-Message.mp4";
      link.click();
    }
    setShowMoreMenu(false);
  };

  const togglePiP = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await videoRef.current.requestPictureInPicture();
        }
      } catch (error) {
        console.error("PiP failed", error);
      }
      setShowMoreMenu(false);
    }
  };

  const toggleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) videoRef.current.requestFullscreen();
    }
    setShowMoreMenu(false);
  };

  const PRODUCTION_URL = "https://www.aurindel.com/about";

  const getCleanUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.hostname === "localhost"
        ? PRODUCTION_URL
        : window.location.href.split("#")[0];
    }
    return PRODUCTION_URL;
  };

  const copyLink = () => {
    navigator.clipboard.writeText(getCleanUrl());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const shareOnPlatform = (platform: string) => {
    const url = encodeURIComponent(getCleanUrl());
    const text = encodeURIComponent("Check out the artistry of Aurindel by Puriva Industries.");
    let shareUrl = "";
    if (platform === "whatsapp") shareUrl = `https://wa.me/?text=${text}%20${url}`;
    if (platform === "linkedin") shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    if (platform === "twitter") shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  return (
    <main ref={containerRef} className="bg-[#FBFBF9] text-stone-900 min-h-screen selection:bg-black selection:text-white overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FBFBF9]/20 to-[#FBFBF9] z-10" />
        </motion.div>
        <motion.div style={{ y: textY }} className="relative z-20 text-center px-4 max-w-5xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-stone-500 uppercase tracking-[0.8em] text-[10px] font-bold mb-6">Puriva Industries Pvt. Ltd. Presents</motion.p>
          <h1 className="text-5xl md:text-[10rem] font-serif italic leading-none tracking-tighter mb-8 text-stone-900">Aurindel</h1>
          <p className="text-stone-600 text-sm md:text-lg uppercase tracking-[0.4em] font-light max-w-3xl mx-auto leading-relaxed">Connecting Indian Craftsmanship to the World</p>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 1.5 }} className="mt-12 w-24 h-px bg-black/20 mx-auto" />
        </motion.div>
      </section>

      {/* BRAND SECTION */}
      <section className="py-20 md:py-32 px-8 flex justify-center bg-[#F5F5F2]">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl text-center space-y-12">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold">The Aurindel Narrative</span>
            <h2 className="text-3xl md:text-6xl font-serif leading-tight text-stone-800 italic">Where Golden Heritage Meets Indian Elegance</h2>
          </div>
          <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed">At Puriva Industries Pvt. Ltd., we believe every handicraft creation tells a story. Rooted in India’s rich legacy of craftsmanship, we bring timeless artistry into the modern world. Aurindel collections blend traditional techniques with contemporary designs, celebrating the beauty of heritage while embracing global elegance.</p>
          <div className="inline-block p-8 border border-black/5 rounded-2xl bg-black/[0.02]">
            <p className="text-stone-500 italic font-serif text-lg">"As a dedicated handicraft company for Indian handicraft exports, we connect traditional artisans with global markets, ensuring that our rich heritage reaches homes across the world."</p>
          </div>
        </motion.div>
      </section>

      {/* VISION CARDS */}
      <section className="max-w-[1400px] mx-auto px-8 py-20 md:py-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <VisionCard index={0} icon={<Users size={28} />} title="01. Who We Are" desc="We work with skilled artisans across India to curate and export authentic handicrafts that blend heritage and artistry." />
          <VisionCard index={1} icon={<Target size={28} />} title="02. Our Mission" desc="To be a trusted partner for global buyers by offering high-quality handicrafts with competitive pricing and timely delivery." />
          <VisionCard index={2} icon={<Globe size={28} />} title="03. Our Vision" desc="To be a global name in exports, ensuring Indian craftsmanship earns the recognition it deserves worldwide." />
      </section>

      {/* VIDEO MESSAGE SECTION */}
      <section id="founder-video" className="py-20 md:py-40 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative group">
            <motion.div 
              initial={{ rotateX: 10, y: 30, opacity: 0 }}
              whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="relative aspect-video w-full rounded-[1.5rem] md:rounded-[4rem] overflow-hidden border border-black/5 shadow-2xl bg-black flex items-center justify-center"
            >
              <video 
                ref={videoRef}
                src="https://res.cloudinary.com/dcgmsnhro/video/upload/v1770226463/video-founder_rg01pp.mp4" 
                muted={isMuted} 
                loop 
                playsInline 
                onTimeUpdate={handleTimeUpdate}
                className={`w-full h-full transition-all duration-[2s] ${isPlaying ? 'opacity-100' : 'opacity-80 group-hover:scale-105'} object-contain md:object-cover`}
              />
              
              <div 
                ref={progressRef}
                onClick={handleSeek}
                className="absolute bottom-0 left-0 w-full h-2 md:h-3 bg-white/10 z-50 cursor-pointer group/progress transition-all hover:h-4"
              >
                <motion.div className="h-full bg-stone-400 origin-left relative shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ width: `${videoProgress}%` }}>
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg border-2 border-stone-400" />
                </motion.div>
              </div>

              {!isPlaying && (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 md:space-y-8 cursor-pointer z-20" onClick={handlePlayToggle}>
                  <motion.div whileHover={{ scale: 1.1 }} className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-black/20 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                    <Play className="fill-white text-white ml-1 md:ml-2" size={32} />
                  </motion.div>
                  <div className="text-center px-4">
                    <h3 className="text-xl md:text-3xl font-serif italic mb-2 text-white">A Message from the Founder</h3>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-stone-300">Puriva Industries Executive Studio</p>
                  </div>
                </div>
              )}

              {/* OVERLAY CONTROLS - RE-ADDED VOLUME SLIDER LOGIC */}
              <div className="absolute bottom-6 right-4 md:bottom-10 md:right-10 z-30 flex items-center gap-1.5 md:gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                
                {/* DYNAMIC VOLUME SLIDER CONTAINER */}
                <div className="flex items-center group/volume bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-2">
                  <button onClick={toggleMute} className="p-2 md:p-4 text-white">
                    {isMuted ? <VolumeX size={14} className="md:w-[18px]" /> : <Volume2 size={14} className="md:w-[18px]" />}
                  </button>
                  <input 
                    type="range" min="0" max="1" step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    // Animated width: shows on hover for all screens
                    className="w-0 group-hover/volume:w-16 md:group-hover/volume:w-24 transition-all duration-300 h-1 accent-white cursor-pointer bg-white/20 rounded-full appearance-none overflow-hidden"
                  />
                </div>

                {isPlaying && (
                  <button onClick={(e) => { e.stopPropagation(); handlePlayToggle(); }} className="p-2 md:p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white">
                    <Pause size={14} className="md:w-[18px]" />
                  </button>
                )}
                
                <button onClick={(e) => { e.stopPropagation(); setShowMoreMenu(true); }} className="p-2 md:p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white">
                  <MoreVertical size={14} className="md:w-[18px]" />
                </button>
              </div>

              {/* MORE MENU OVERLAY */}
              <AnimatePresence>
                {showMoreMenu && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-6"
                    onClick={() => setShowMoreMenu(false)}
                  >
                    <motion.div 
                      initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                      className="bg-white w-full md:max-w-sm rounded-t-[2.5rem] md:rounded-[2.5rem] p-6 md:p-8 space-y-6 relative shadow-2xl max-h-[80vh] overflow-y-auto custom-scrollbar"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto md:hidden mb-4" />
                      <button onClick={() => setShowMoreMenu(false)} className="absolute top-6 right-6 text-stone-400 hover:text-black"><CloseIcon size={20} /></button>
                      
                      <div className="text-center md:text-left space-y-2">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold">Options</p>
                        <h4 className="text-2xl font-serif italic">Video Settings</h4>
                      </div>

                      <div className="space-y-2">
                        <MenuButton icon={<Download size={16} />} label="Download Message" onClick={handleDownload} />
                        <MenuButton icon={<MonitorPlay size={16} />} label="Picture-in-Picture" onClick={togglePiP} />
                        <MenuButton icon={<Maximize size={16} />} label="Full-Screen" onClick={toggleFullScreen} />
                        <div className="h-px bg-stone-100 my-4" />
                        <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2"><Gauge size={12}/> Playback Speed</div>
                        <div className="flex justify-between px-2 py-2">
                          {[0.5, 1, 1.5, 2].map(s => (
                            <button key={s} onClick={() => changeSpeed(s)} className="text-sm hover:text-black font-bold p-2 px-4 rounded-xl hover:bg-stone-50 border border-stone-100">{s}x</button>
                          ))}
                        </div>
                        <div className="h-px bg-stone-100 my-4" />
                        <button onClick={() => { setShowShareMenu(true); setShowMoreMenu(false); }} className="w-full flex items-center justify-between px-6 py-4 bg-black text-white rounded-2xl group transition-all">
                          <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest"><Share2 size={16} /> Share Video</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* SHARE MENU OVERLAY */}
              <AnimatePresence>
                {showShareMenu && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-6" onClick={() => setShowShareMenu(false)}>
                    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="bg-[#FBFBF9] w-full md:max-w-sm rounded-t-[2.5rem] md:rounded-[2rem] p-8 space-y-8 relative shadow-2xl text-center" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => setShowShareMenu(false)} className="absolute top-6 right-6 text-stone-400 hover:text-black"><CloseIcon size={20} /></button>
                      <h4 className="text-2xl font-serif italic text-stone-900">Share Vision</h4>
                      <div className="grid grid-cols-3 gap-3">
                        <ShareOption icon={<MessageCircle size={18} />} label="WhatsApp" onClick={() => shareOnPlatform("whatsapp")} />
                        <ShareOption icon={<Linkedin size={18} />} label="LinkedIn" onClick={() => shareOnPlatform("linkedin")} />
                        <ShareOption icon={<Twitter size={18} />} label="X" onClick={() => shareOnPlatform("twitter")} />
                      </div>
                      <div className="pt-4 border-t border-stone-100">
                        <button onClick={copyLink} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-stone-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all">
                          {isCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />} {isCopied ? "Link Copied" : "Copy Page Link"}
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="py-20 md:py-40 bg-[#F5F5F2] text-stone-900 rounded-[2.5rem] md:rounded-[6rem] mx-2 md:mx-12 overflow-hidden border border-black/5">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold block">The Architect of Vision</span>
              <h2 className="text-5xl md:text-8xl font-serif italic tracking-tight text-stone-900">Abhinav Anand</h2>
            </div>
            <div className="relative">
              <Quote className="absolute -top-10 -left-6 text-stone-200" size={60} />
              <p className="text-xl md:text-3xl text-stone-600 font-light leading-relaxed font-serif italic relative z-10">"True luxury is not found in the machine's precision, but in the artisan's imperfection."</p>
            </div>
            <div className="flex gap-8 pt-6">
              <SocialLink href="https://www.instagram.com/theabhinavanand" icon={<Instagram size={22} />} label="Instagram" />
              <SocialLink href="https://in.linkedin.com/in/abhinavanandofficial" icon={<Linkedin size={22} />} label="LinkedIn" />
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="relative h-[500px] md:h-[800px] w-full rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl">
            <Image src="/images/founder1.png" alt="Abhinav Anand" fill className="object-cover transition-all duration-1000 group-hover:scale-105" />
          </motion.div>
        </div>
      </section>

      <footer className="bg-stone-900 text-stone-400 pt-32 pb-12 rounded-t-[4rem] md:rounded-t-[6rem]">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 pb-24 border-b border-white/5">
            <div className="lg:col-span-1 space-y-8">
              <Link href="/" className="relative block w-[180px] h-[50px]"><Image src="/images/AurindelLogo.png" alt="Aurindel" fill className="object-contain object-left brightness-0 invert" /></Link>
              <p className="text-sm leading-relaxed max-w-xs">A legacy of Indian craftsmanship, exported with contemporary elegance to the world's most discerning spaces.</p>
            </div>
            <div className="space-y-8">
              <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Navigation</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/collections" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"/> Collections</Link></li>
                <li><Link href="/heritage" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"/> Our Heritage</Link></li>
                <li><Link href="/artisans" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"/> Master Artisans</Link></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Inquiries</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3"><Mail size={16} /> abhinav.purivaindustries@gmail.com</li>
                <li className="flex items-center gap-3"><Phone size={16} /> +91 8340220161</li>
                <li className="flex items-center gap-3"><Globe size={16} /> www.aurindel.com</li>
              </ul>
            </div>
            <div className="space-y-8"><h4 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Studio</h4><ul className="space-y-4 text-sm"><li className="flex items-start gap-3"><MapPin size={16} className="mt-1 flex-shrink-0" /><span>102, Executive Block,<br/>Puriva Industries HQ,<br/>Noida, India</span></li></ul></div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 gap-8 text-[9px] uppercase tracking-[0.6em]"><p>© 2026 Aurindel Studio by Puriva Industries Pvt. Ltd.</p><div className="flex gap-8"><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></div></div>
        </div>
      </footer>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d6d3d1; border-radius: 10px; }
        input[type='range']::-webkit-slider-thumb { 
          -webkit-appearance: none; 
          width: 12px; 
          height: 12px; 
          background: white; 
          border-radius: 50%; 
          cursor: pointer; 
          box-shadow: 0 0 10px rgba(0,0,0,0.3); 
        }
      `}</style>
    </main>
  );
}

// HELPERS
function VisionCard({ icon, title, desc, index }: { icon: React.ReactNode, title: string, desc: string, index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.15 }} className="p-12 border border-black/5 rounded-[4rem] bg-black/[0.01] hover:bg-black hover:text-white transition-all group h-full">
      <div className="mb-10 text-stone-400 group-hover:text-white transform scale-125 origin-left">{icon}</div>
      <h3 className="text-2xl font-serif italic mb-6">{title}</h3>
      <p className="text-stone-500 group-hover:text-stone-200 text-base font-light leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function SocialLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link href={href} target="_blank" className="flex items-center gap-4 text-stone-400 hover:text-stone-900 group transition-all">
      <div className="p-5 border border-stone-200 rounded-full group-hover:bg-black group-hover:text-white transition-all">{icon}</div>
      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{label}</span>
    </Link>
  );
}

function MenuButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: (e: React.MouseEvent) => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-50 rounded-xl transition-all text-stone-600 hover:text-black text-left">
      {icon} <span className="text-[11px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}

function ShareOption({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group">
      <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 group-hover:bg-black group-hover:text-white transition-all">{icon}</div>
      <span className="text-[8px] md:text-[9px] uppercase tracking-widest font-bold text-stone-400 group-hover:text-black">{label}</span>
    </button>
  );
}