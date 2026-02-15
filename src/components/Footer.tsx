"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Instagram,
  ArrowUpRight,
  Mail,
  Globe,
  ArrowRight,
  Linkedin,
  Check,
  FileText
} from "lucide-react";

/* ================= TYPES ================= */

type FooterLink = {
  n: string;
  h: string;
};

type FooterGroupProps = {
  title: string;
  links: FooterLink[];
};

type SocialBtnProps = {
  icon: React.ReactNode;
  link: string;
  label: string;
};

/* ================= MAIN FOOTER ================= */

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const animatedRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const animatedScale = useSpring(scale, { stiffness: 100, damping: 30 });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    }, 1000);
  };

  return (
    <footer
      ref={containerRef}
      className="bg-[#faf9f6] pt-32 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden perspective-1000"
    >
      <motion.div
        style={{ rotateX: animatedRotateX, scale: animatedScale }}
        className="max-w-[1700px] mx-auto origin-bottom"
      >
        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-32">
          <div className="space-y-8 max-w-2xl">
            <div className="relative h-14 w-56">
              <Image
                src="/images/AurindelLogo.png"
                alt="Aurindel"
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="text-stone-400 text-3xl md:text-5xl font-extralight leading-[1.1]">
              Honoring the <span className="italic text-stone-800">hand</span>,<br />
              Elevating the <span className="italic text-stone-800">soul</span>.
            </p>
          </div>

          {/* NEWSLETTER */}
          <motion.div
            whileHover={{ translateZ: 20 }}
            className="w-full lg:w-[450px] bg-white p-8 md:p-12 rounded-3xl border border-stone-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)]"
          >
            <h3 className="text-[10px] uppercase tracking-[0.5em] text-stone-400 mb-6 font-bold">
              The Aurindel Club
            </h3>

            <p className="text-stone-500 text-sm mb-8">
              Join for exclusive access to heritage drops and artisan stories.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex items-center border-b border-stone-200 pb-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={status === "sent" ? "THANK YOU" : "YOUR EMAIL"}
                disabled={status !== "idle"}
                className="w-full bg-transparent outline-none text-[11px] tracking-[0.2em] disabled:text-stone-400"
              />
              <button type="submit" disabled={status !== "idle"} className="transition-all">
                {status === "sent" ? (
                  <span className="text-green-600 text-[10px] font-bold tracking-widest flex items-center gap-1">
                    SENT <Check size={14} />
                  </span>
                ) : status === "sending" ? (
                  <div className="animate-pulse text-stone-400">...</div>
                ) : (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* LINKS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32">
          <FooterGroup
            title="Curation"
            links={[
              { n: "Pots and Planters", h: "/categories/pots-and-planters" },
              { n: "Furniture", h: "/categories/furniture" },
              { n: "Kitchen Accessories", h: "/categories/kitchen-accessories" },
              { n: "Lighting and Candle Holders", h: "/categories/lighting-candles" },
            ]}
          />

          <FooterGroup
            title="Heritage"
            links={[
              { n: "Our Story", h: "/about" },
              { n: "Artisans", h: "/about/artisans" },
              { n: "Sustainability", h: "/about/sustainability" },
              { n: "Contact", h: "/contact" },
            ]}
          />

          <FooterGroup
            title="Services"
            links={[
              { n: "Shipping Policy", h: "/policies/shipping" },
              { n: "Returns", h: "/policies/refund" },
              { n: "Care Guide", h: "/care" },
              { n: "Bespoke", h: "/bespoke" },
            ]}
          />

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] mb-10 font-black">
              Socials
            </h4>
            <div className="flex gap-6">
              <SocialBtn 
                icon={<Instagram size={18} />} 
                link="https://www.instagram.com/aurindelexports" 
                label="Instagram"
              />
              <SocialBtn 
                icon={<Linkedin size={18} />} 
                link="https://www.linkedin.com/company/purivaindustries/" 
                label="LinkedIn" 
              />
            </div>

            <div className="mt-10 space-y-4 text-[10px] uppercase tracking-[0.2em] text-stone-400">
              <div className="flex items-start gap-2">
                <Mail size={12} className="mt-0.5 flex-shrink-0" /> 
                <span className="break-all whitespace-normal">abhinav.purivaindustries@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <Globe size={12} className="mt-0.5 flex-shrink-0" /> 
                <span className="leading-relaxed">8th Floor 8125, Gaur City Mall Office Space, Greater Noida (201318) UP, INDIA</span>
              </div>
              
              {/* PREMIUM DOWNLOAD SECTION */}
              <div className="pt-4 flex flex-col gap-3">
                <a 
                  href="/images/Company Profile- Puriva Industries.pdf" 
                  download 
                  className="group relative inline-block w-20 h-28 bg-white border border-stone-100 rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-1"
                >
                  <Image 
                    src="/images/Company Profile- Puriva Industries.png" 
                    alt="Company Profile"
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-2 right-2 p-1 bg-white/80 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <FileText size={10} className="text-black" />
                  </div>
                </a>
                
                <a 
                  href="/images/Company Profile- Puriva Industries.pdf" 
                  download="Company Profile- Puriva Industries.pdf"
                  className="flex items-center gap-2 text-stone-800 font-bold hover:text-black transition-colors group"
                >
                  Download Profile
                  <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER BASE */}
        <div className="pt-10 border-t text-[9px] uppercase tracking-[0.4em] text-stone-400 flex flex-col md:flex-row justify-between">
          <p>© {currentYear} Aurindel Studio</p>
          <div className="flex gap-10 mt-4 md:mt-0">
            <span>Accessibility</span>
            <span>Terms</span>
            <span>Privacy</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

/* ================= SUB COMPONENTS ================= */

const FooterGroup = ({ title, links }: FooterGroupProps) => (
  <div>
    <h4 className="text-[10px] uppercase tracking-[0.4em] mb-10 font-black">
      {title}
    </h4>
    <ul className="space-y-5">
      {links.map((link) => (
        <li key={link.n}>
          <Link
            href={link.h}
            className="text-[11px] uppercase tracking-[0.25em] text-stone-400 hover:text-stone-900 transition"
          >
            {link.n}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialBtn = ({ icon, link, label }: SocialBtnProps) => (
  <Link href={link} target="_blank" rel="noopener noreferrer">
    <motion.div
      whileHover={{ y: -5, rotateZ: 10 }}
      className="p-2 border rounded-full cursor-pointer hover:bg-stone-900 hover:text-white transition-colors duration-300"
      aria-label={label}
    >
      {icon}
    </motion.div>
  </Link>
);

export default Footer;