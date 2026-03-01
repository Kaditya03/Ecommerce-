"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Check,
  ArrowUpRight,
  Heart
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("sending");

    setTimeout(() => {
      setStatus("sent");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    }, 1000);
  };

  return (
    <footer
      ref={containerRef}
      className="bg-[#faf9f6] pt-32 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden perspective-1000"
    >
      <motion.div
        style={{ rotateX: animatedRotateX, scale: animatedScale }}
        className="max-w-[1700px] mx-auto origin-bottom"
      >
        {/* ================= TOP BRAND SECTION ================= */}

        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-28">
          <div className="space-y-8 max-w-2xl">
            <div className="relative h-14 w-56">
              <Link href="/">
                <Image
                  src="/images/AurindelLogo.png"
                  alt="Aurindel"
                  fill
                  className="object-contain object-left"
                />
              </Link>
            </div>

            <p className="text-stone-400 text-3xl md:text-5xl font-extralight leading-[1.1]">
              Honoring the <span className="italic text-stone-800">hand</span>,<br />
              Elevating the <span className="italic text-stone-800">soul</span>.
            </p>

            <p className="text-stone-500 text-sm max-w-md">
              Aurindel curates timeless handcrafted collections that celebrate
              artisan mastery and heritage craftsmanship from India.
            </p>
          </div>

          {/* NEWSLETTER */}

          <motion.div
            whileHover={{ translateZ: 20 }}
            className="w-full lg:w-[450px] bg-white p-8 md:p-12 rounded-3xl border border-stone-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)]"
          >
            <h3 className="text-[10px] uppercase tracking-[0.5em] text-stone-400 mb-6 font-bold">
              Join The Aurindel Circle
            </h3>

            <p className="text-stone-500 text-sm mb-8">
              Receive exclusive access to curated launches & export collections.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex items-center border-b border-stone-200 pb-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={status === "sent" ? "THANK YOU" : "YOUR EMAIL"}
                disabled={status !== "idle"}
                className="w-full bg-transparent outline-none text-[11px] tracking-[0.2em]"
              />

              <button type="submit" disabled={status !== "idle"}>
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

        {/* ================= MAIN GRID ================= */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-14 mb-28">

          {/* COLLECTIONS */}

          <FooterGroup
            title="Collections"
            links={[
              { n: "Pots & Planters", h: "/categories/pots-and-planters" },
              { n: "Furniture", h: "/categories/furniture" },
              { n: "Kitchen Accessories", h: "/categories/kitchen-accessories" },
              { n: "Lighting & Candle Holders", h: "/categories/lighting-candles" },
            ]}
          />

          {/* BUSINESS */}

          <FooterGroup
            title="Business"
            links={[
              { n: "Wholesale Inquiries", h: "/contact" },
              { n: "Export Partnerships", h: "/contact" },
              { n: "Bulk Orders", h: "/contact" },
            ]}
          />

          {/* COMPANY */}

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] mb-10 font-black">
              Company
            </h4>

            <ul className="space-y-5">
              <li>
                <a
                  href="/images/Company Profile- Puriva Industries.pdf"
                  download
                  className="text-[11px] uppercase tracking-[0.25em] text-stone-400 hover:text-stone-900 transition"
                >
                  Company Profile
                </a>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-[11px] uppercase tracking-[0.25em] text-stone-400 hover:text-stone-900 transition"
                >
                  Contact Office
                </Link>
              </li>
            </ul>
          </div>

          {/* CONNECT */}

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] mb-10 font-black">
              Connect
            </h4>

            <div className="flex gap-6 mb-8">
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

            <div className="space-y-4 text-sm text-stone-500">
              <div className="flex items-start gap-2">
                <Mail size={14} />
                abhinav.purivaindustries@gmail.com
              </div>

              <div className="flex items-start gap-2">
                <Phone size={14} />
                +91 8340220161
              </div>

              <div className="flex items-start gap-2">
                <MapPin size={14} />
                8th Floor 8125, Gaur City Mall Office Space, Greater Noida (201318) UP, INDIA
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}

        <div className="pt-12 border-t text-[10px] text-stone-400 flex flex-col md:flex-row justify-between items-center gap-6">

          <p>
            © {currentYear} Aurindel Studio. Crafted with{" "}
            <Heart size={12} className="inline mb-1" /> in India.
          </p>

          <div className="flex gap-8 uppercase tracking-[0.3em] text-[9px]">
            <span>Handcrafted</span>
            <span>Export Quality</span>
            <span>Artisan Made</span>
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