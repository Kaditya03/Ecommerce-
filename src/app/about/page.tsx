"use client";

import React, { useState, useRef, useEffect } from "react";
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
  MonitorPlay,
  Maximize,
  X as CloseIcon
} from "lucide-react";

import Navbar from "@/components/Navbar"; 

const STORY_BEATS = [
  // {
  //   id: 1,
  //   image: "https://blog.ipleaders.in/wp-content/uploads/2017/05/iPleaders-12.jpg",
  // },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    image: "https://tetrainspection.com/product-quality/",
  },
  {
    id: 4,
    image: "https://etimg.etb2bimg.com/photo/118316548.cms",
  },
];

export default function AboutPage() {
  const { scrollY } = useScroll();
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false); 
  const [videoProgress, setVideoProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [mouseX, setMouseX] = useState(50);
  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    setMouseX(x);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STORY_BEATS.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, []);

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

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMuteState = !isMuted;
      videoRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  return (
    <main ref={containerRef} className="relative bg-[#FBFBF9] text-stone-900 min-h-screen selection:bg-black selection:text-white overflow-x-hidden">
      <Navbar />

      {/* BACKGROUND DECORATIVE ANIMATIONS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-stone-200/30 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -80, 0], y: [0, 120, 0], scale: [1, 1.1, 1] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[5%] w-[40%] h-[40%] bg-stone-300/20 rounded-full blur-[100px]" 
        />
      </div>

      {/* HERO SECTION */}
      <section onMouseMove={handleMouseMove} className="relative z-10 h-[40vh] md:h-screen flex items-center justify-center overflow-hidden bg-[#FBFBF9]">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={STORY_BEATS[activeStep].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="block md:hidden absolute inset-0 h-full w-full">
                <Image src={STORY_BEATS[activeStep].image} alt="Aurindel Export Process" fill className="object-cover opacity-[0.2] grayscale-[0.2]" priority />
                <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBF9] via-transparent to-[#FBFBF9]" />
              </div>

              <div className="hidden md:block absolute inset-0">
                <Image src={STORY_BEATS[activeStep].image} alt="Aurindel Export Process" fill className="object-cover opacity-20 grayscale-[0.4] blur-[15px]" priority />
                <div 
                  className="absolute inset-0 transition-all duration-300 ease-out" 
                  style={{ 
                    backgroundImage: `url(${STORY_BEATS[activeStep].image})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    maskImage: `linear-gradient(to right, transparent ${mouseX - 15}%, black ${mouseX}%, transparent ${mouseX + 15}%)`, 
                    WebkitMaskImage: `linear-gradient(to right, transparent ${mouseX - 15}%, black ${mouseX}%, transparent ${mouseX + 15}%)`, 
                    opacity: 0.5 
                  }} 
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div style={{ scale: heroScale, opacity: heroOpacity, y: textY }} className="relative z-20 text-center px-6 max-w-5xl mt-[-2rem] md:mt-0">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-stone-500 uppercase tracking-[0.4em] md:tracking-[0.8em] text-[8px] md:text-[10px] font-bold mb-2 md:mb-6">
            Puriva Industries Pvt. Ltd. Presents
          </motion.p>
          <h1 className="text-6xl md:text-[10rem] font-serif italic leading-none tracking-tighter mb-4 md:mb-8 text-stone-900 drop-shadow-sm">Aurindel</h1>
          <p className="text-stone-600 text-[10px] md:text-lg uppercase tracking-[0.2em] md:tracking-[0.4em] font-light max-w-2xl mx-auto leading-relaxed px-4">
            Connecting Indian Craftsmanship to the World
          </p>
          <div className="flex justify-center gap-2 md:gap-3 mt-8 md:mt-12">
            {STORY_BEATS.map((_, i) => (
              <div key={i} className="w-8 md:w-12 h-[2px] bg-stone-200 overflow-hidden relative rounded-full">
                {i === activeStep && (
                  <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 4, ease: "linear" }} className="absolute inset-0 bg-stone-900" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* VIDEO MESSAGE SECTION */}
      <section id="founder-video" className="relative z-10 py-16 md:py-40 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative group">
            <motion.div initial={{ rotateX: 5, y: 30, opacity: 0 }} whileInView={{ rotateX: 0, y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className="relative aspect-video w-full rounded-[1.5rem] md:rounded-[4rem] overflow-hidden border border-black/5 shadow-2xl bg-black flex items-center justify-center">
              <video ref={videoRef} src="https://pub-84f1fc036af747ce8fec64cbbbb8754b.r2.dev/video-founder.mp4" muted={isMuted} loop playsInline onTimeUpdate={handleTimeUpdate} className={`w-full h-full transition-all duration-[2s] ${isPlaying ? 'opacity-100' : 'opacity-80 group-hover:scale-105'} object-contain md:object-cover`} />
              <div ref={progressRef} onClick={handleSeek} className="absolute bottom-0 left-0 w-full h-1.5 md:h-3 bg-white/10 z-50 cursor-pointer group/progress transition-all hover:h-4">
                <motion.div className="h-full bg-stone-400 origin-left relative shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ width: `${videoProgress}%` }}>
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg border-2 border-stone-400" />
                </motion.div>
              </div>
              {!isPlaying && (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 md:space-y-8 cursor-pointer z-20" onClick={handlePlayToggle}>
                  <motion.div whileHover={{ scale: 1.1 }} className="w-14 h-14 md:w-24 md:h-24 rounded-full bg-black/20 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                    <Play className="fill-white text-white ml-1 md:ml-2" size={24} />
                  </motion.div>
                  <div className="text-center px-4">
                    <h3 className="text-lg md:text-3xl font-serif italic mb-1 md:mb-2 text-white">A Message from the Founder</h3>
                    <p className="text-[7px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-stone-300">Puriva Industries Executive Studio</p>
                  </div>
                </div>
              )}
              <div className="absolute bottom-4 right-3 md:bottom-10 md:right-10 z-30 flex items-center gap-2 md:gap-4">
                <button onClick={toggleMute} className="p-3 md:p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white">{isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
                {isPlaying && (
                  <button onClick={(e) => { e.stopPropagation(); handlePlayToggle(); }} className="p-3 md:p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white"><Pause size={16} /></button>
                )}
                <button onClick={(e) => { e.stopPropagation(); setShowMoreMenu(true); }} className="p-3 md:p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white"><MoreVertical size={16} /></button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT OUR COMPANY */}
      <section className="relative z-10 py-16 md:py-32 px-6 flex flex-col items-center bg-[#F5F5F2]/50 backdrop-blur-sm">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold">Puriva Industries Pvt. Ltd.</span>
              <h2 className="text-3xl md:text-6xl font-serif leading-tight text-stone-800 italic">Our Business Model</h2>
            </div>
            <p className="text-base md:text-xl text-stone-600 font-light leading-relaxed">
              Puriva Industries operates as a professionally managed trading and export company, coordinating a network of verified suppliers and artisan clusters across India. Rather than functioning as a manufacturing unit, we act as an integrated sourcing and export management partner, ensuring structured execution at every stage of the supply chain.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3 text-stone-500 text-sm font-light">
                    <li className="flex gap-3"><Check size={16} className="shrink-0 text-stone-800"/> Strategic supplier identification and onboarding </li>
                    <li className="flex gap-3"><Check size={16} className="shrink-0 text-stone-800"/> Product development and customization support </li>
                    <li className="flex gap-3"><Check size={16} className="shrink-0 text-stone-800"/> Production planning and timeline coordination </li>
                </ul>
                <ul className="space-y-3 text-stone-500 text-sm font-light">
                    <li className="flex gap-3"><Check size={16} className="shrink-0 text-stone-800"/> Quality inspection and compliance monitoring </li>
                    <li className="flex gap-3"><Check size={16} className="shrink-0 text-stone-800"/> Export documentation and regulatory handling </li>
                    <li className="flex gap-3"><Check size={16} className="shrink-0 text-stone-800"/> Logistics and shipment management </li>
                </ul>
            </div>
          </div>
          <div className="relative aspect-square w-full max-w-md mx-auto">
             <Image src="https://m.media-amazon.com/images/I/61XrGmVn+dL._AC_UF894,1000_QL80_.jpg" alt="Best handicraft export company" fill className="object-cover rounded-full border-[1rem] border-white shadow-2xl"/>
          </div>
        </motion.div>
      </section>

      {/* MISSION & VISION - REVISED ALIGNMENT & ICONS */}
<section className="relative z-10 max-w-[1400px] mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
    
    {/* WHO WE ARE */}
    <div className="p-8 md:p-12 border border-black/5 rounded-[2.5rem] md:rounded-[4rem] bg-black/[0.01] hover:bg-black hover:text-white transition-all group h-full">
        <div className="mb-6 md:mb-10 text-stone-400 group-hover:text-white transform scale-110 md:scale-125 origin-left">
            <Users size={28} />
        </div>
        <h3 className="text-xl md:text-2xl font-serif italic mb-4 md:mb-6 uppercase tracking-widest">
            01. Who We Are
        </h3>
        <p className="text-stone-500 group-hover:text-stone-200 text-sm md:text-base font-light leading-relaxed">
            Puriva Industries Pvt. Ltd. works with skilled artisans across India to curate and export authentic handicrafts that blend heritage and artistry. 
        </p>
    </div>

    {/* OUR MISSION */}
    <div className="p-8 md:p-12 border border-black/5 rounded-[2.5rem] md:rounded-[4rem] bg-black/[0.01] hover:bg-black hover:text-white transition-all group h-full">
        <div className="mb-6 md:mb-10 text-stone-400 group-hover:text-white transform scale-110 md:scale-125 origin-left">
            <Target size={28} />
        </div>
        <h3 className="text-xl md:text-2xl font-serif italic mb-4 md:mb-6 uppercase tracking-widest">
            02. Our Mission
        </h3>
        <p className="text-stone-500 group-hover:text-stone-200 text-sm md:text-base font-light leading-relaxed">
            To be a trusted partner for global buyers by offering high-quality handicrafts with competitive pricing and timely delivery.
        </p>
    </div>

    {/* OUR VISION */}
    <div className="p-8 md:p-12 border border-black/5 rounded-[2.5rem] md:rounded-[4rem] bg-black/[0.01] hover:bg-black hover:text-white transition-all group h-full">
        <div className="mb-6 md:mb-10 text-stone-400 group-hover:text-white transform scale-110 md:scale-125 origin-left">
            <Globe size={28} />
        </div>
        <h3 className="text-xl md:text-2xl font-serif italic mb-4 md:mb-6 uppercase tracking-widest">
            03. Our Vision
        </h3>
        <p className="text-stone-500 group-hover:text-stone-200 text-sm md:text-base font-light leading-relaxed">
            To be a global name in exports, ensuring Indian craftsmanship earns the recognition it deserves worldwide.
        </p>
    </div>

</section>

      {/* MESSAGE FROM THE FOUNDER */}
      <section className="relative z-10 py-16 md:py-40 bg-[#F5F5F2]/50 backdrop-blur-sm text-stone-900 rounded-[2rem] md:rounded-[6rem] mx-4 md:mx-12 overflow-hidden border border-black/5">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="space-y-8 md:space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold block">Founder & Director</span>
              <h2 className="text-4xl md:text-8xl font-serif italic tracking-tight text-stone-900">Abhinav Anand</h2>
            </div>
            <div className="relative">
              <Quote className="absolute -top-8 md:-top-10 -left-4 md:-left-6 text-stone-200" size={40} />
              <div className="text-lg md:text-2xl text-stone-600 font-light leading-relaxed font-serif italic relative z-10 space-y-4">
                <p>
                    Puriva Industries Private Limited was founded with a clear vision — to create a structured export platform for premium Indian handicrafts and home décor. 
                </p>
                <p>
                    We believe global partnerships are built on trust, consistency, and professional execution. By combining India’s craftsmanship heritage with disciplined trade systems and quality governance, we ensure reliability at every stage of the export process.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 md:gap-8 pt-4">
              <SocialLink href="https://www.instagram.com/theabhinavanand" icon={<Instagram size={20} />} label="Instagram" />
              <SocialLink href="https://in.linkedin.com/in/abhinavanandofficial" icon={<Linkedin size={20} />} label="LinkedIn" />
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="relative h-[400px] md:h-[800px] w-full rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl">
            <Image src="/images/founder1.png" alt="Abhinav Anand Founder of Aurindel" fill className="object-cover transition-all duration-1000 group-hover:scale-105" />
          </motion.div>
        </div>
      </section>

      {/* COMPLIANCE SECTION */}
      <section className="relative z-10 py-16 md:py-32 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
                <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold">Trust & Governance</span>
                <h2 className="text-3xl md:text-6xl font-serif italic text-stone-900">Compliance & Registrations</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ComplianceItem label="GST Registration" value="09AAPCP4772J1ZO" />
                <ComplianceItem label="Import Export Code (IEC)" value="AAPCP4772J" />
                <ComplianceItem label="Corporate ID (CIN)" value="U03229UP2025PTC217476" />
                <ComplianceItem label="EPCH Member" value="RCMC/EPCH/04898/2025-2026" />
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-[#0D0C0C] text-stone-400 pt-20 pb-10 rounded-t-[3rem] md:rounded-t-[7rem]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16">
            <div className="space-y-6 md:space-y-8">
              <div className="relative w-[100px] md:w-[120px] h-[40px]">
                <Image src="/images/AurindelLogo.png" alt="Aurindel Logo" fill className="object-contain object-left invert brightness-0" />
              </div>
              <p className="text-[12px] md:text-[13px] leading-relaxed text-stone-400 max-w-[240px]">
                Aurindel serves as the digital identity of Puriva Industries Pvt. Ltd. for all handicraft export operations. A legacy of Indian craftsmanship, exported with contemporary elegance to the world.
              </p>
            </div>
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-white text-[10px] uppercase tracking-[0.5em] font-black">Navigation</h4>
              <ul className="space-y-3 md:space-y-4 text-[12px] md:text-[13px]">
                <li><Link href="#" className="hover:text-white transition-colors">Collections</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Our Heritage</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Master Artisans</Link></li>
              </ul>
            </div>
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-white text-[10px] uppercase tracking-[0.5em] font-black">Inquiries</h4>
              <ul className="space-y-3 md:space-y-4 text-[12px] md:text-[13px]">
                <li className="flex items-center gap-3"><Mail size={14} /> abhinav.purivaindustries@gmail.com</li>
                <li className="flex items-center gap-3"><Phone size={14} /> +91 8340220161</li>
                <li className="flex items-center gap-3"><Globe size={14} /> www.aurindel.com</li>
              </ul>
            </div>
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-white text-[10px] uppercase tracking-[0.5em] font-black">Studio</h4>
              <div className="flex gap-3 text-[12px] md:text-[13px] leading-relaxed">
                <MapPin size={16} className="shrink-0 mt-1" />
                <p>8th Floor 8125, Gaur City Mall Office Space, <br /> Greater Noida (201318) UP, INDIA</p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-stone-500 text-center md:text-left">© 2026 Aurindel Studio by Puriva Industries Pvt. Ltd.</p>
              <div className="flex gap-6 md:gap-8 text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-bold">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </div>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <AnimatePresence>
        {showMoreMenu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-6" onClick={() => setShowMoreMenu(false)}>
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="bg-white w-full md:max-w-sm rounded-t-[2.5rem] md:rounded-[2.5rem] p-6 md:p-8 space-y-6 relative shadow-2xl max-h-[80vh] overflow-y-auto custom-scrollbar" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowMoreMenu(false)} className="absolute top-6 right-6 text-stone-400 hover:text-black"><CloseIcon size={20} /></button>
              <div className="text-center md:text-left space-y-2"><p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold">Options</p><h4 className="text-2xl font-serif italic">Video Settings</h4></div>
              <div className="space-y-2">
                <MenuButton icon={<Download size={16} />} label="Download Message" onClick={handleDownload} />
                <MenuButton icon={<MonitorPlay size={16} />} label="Picture-in-Picture" onClick={togglePiP} />
                <MenuButton icon={<Maximize size={16} />} label="Full-Screen" onClick={toggleFullScreen} />
                <div className="h-px bg-stone-100 my-4" />
                <div className="flex justify-between px-2 py-2 mb-4">{[0.5, 1, 1.5, 2].map(s => (<button key={s} onClick={() => changeSpeed(s)} className="text-sm hover:text-black font-bold p-2 px-4 rounded-xl hover:bg-stone-50 border border-stone-100">{s}x</button>))}</div>
                <button onClick={(e) => { e.stopPropagation(); setShowMoreMenu(false); setShowShareModal(true); }} className="w-full bg-black text-white rounded-2xl py-4 flex items-center justify-center gap-3 group transition-transform active:scale-95">
                  <Share2 size={18} className="group-hover:rotate-12 transition-transform" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Share Video</span>
                  <ArrowRight size={14} className="opacity-50 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showShareModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setShowShareModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-sm rounded-[2.5rem] p-10 relative shadow-2xl text-center" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowShareModal(false)} className="absolute top-6 right-6 text-stone-300 hover:text-black"><CloseIcon size={20} /></button>
              <h4 className="text-3xl font-serif italic mb-10">Share Vision</h4>
              <div className="flex justify-center gap-8 mb-10">
                <ShareOption icon={<MessageCircle size={24} />} label="Whatsapp" />
                <ShareOption icon={<Linkedin size={24} />} label="Linkedin" />
                <ShareOption icon={<Twitter size={24} />} label="X" />
              </div>
              <button onClick={handleCopyLink} className="w-full bg-[#1A1817] text-white rounded-2xl py-4 flex items-center justify-center gap-3 font-bold text-[10px] uppercase tracking-[0.2em]">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Link Copied" : "Copy Page Link"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d6d3d1; border-radius: 10px; }
      `}</style>
    </main>
  );
}

function ComplianceItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-6 bg-white border border-stone-100 rounded-2xl flex flex-col gap-2 hover:shadow-xl transition-all group">
            <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold group-hover:text-stone-900 transition-colors">{label}</span>
            <span className="text-sm font-medium text-stone-900 break-all">{value}</span>
        </div>
    );
}

function VisionCard({ icon, title, desc, index }: { icon: React.ReactNode, title: string, desc: string, index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.15 }} className="p-8 md:p-12 border border-black/5 rounded-[2.5rem] md:rounded-[4rem] bg-black/[0.01] hover:bg-black hover:text-white transition-all group h-full">
      <div className="mb-6 md:mb-10 text-stone-400 group-hover:text-white transform scale-110 md:scale-125 origin-left">{icon}</div>
      <h3 className="text-xl md:text-2xl font-serif italic mb-4 md:mb-6">{title}</h3>
      <p className="text-stone-500 group-hover:text-stone-200 text-sm md:text-base font-light leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function SocialLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link href={href} target="_blank" className="flex items-center gap-3 md:gap-4 text-stone-400 hover:text-stone-900 group transition-all">
      <div className="p-4 md:p-5 border border-stone-200 rounded-full group-hover:bg-black group-hover:text-white transition-all">{icon}</div>
      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">{label}</span>
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

function ShareOption({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 group cursor-pointer">
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:scale-110 active:scale-90">
        {icon}
      </div>
      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 group-hover:text-black">{label}</span>
    </div>
  );
}