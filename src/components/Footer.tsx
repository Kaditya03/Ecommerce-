"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Instagram,
  Facebook,
  Twitter,
  ArrowUpRight,
  Mail,
  Globe,
  ArrowRight,
  Linkedin,
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

// Fixed: Added link and label to the type definition
type SocialBtnProps = {
  icon: React.ReactNode;
  link: string;
  label: string;
};

/* ================= MAIN FOOTER ================= */

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const animatedRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const animatedScale = useSpring(scale, { stiffness: 100, damping: 30 });

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

            <div className="flex items-center border-b border-stone-200 pb-3">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full bg-transparent outline-none text-[11px] tracking-[0.2em]"
              />
              <ArrowRight size={18} />
            </div>
          </motion.div>
        </div>

        {/* LINKS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32">
          <FooterGroup
            title="Curation"
            links={[
              { n: "Pottery", h: "/collections/pottery" },
              { n: "Handlooms", h: "/collections/handlooms" },
              { n: "Brass Art", h: "/collections/brass" },
              { n: "Woodcraft", h: "/collections/wood" },
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
              {/* Fixed: Corrected string syntax for labels */}
              <SocialBtn 
                icon={<Instagram size={18} />} 
                link="https://www.instagram.com/theabhinavanand" 
                label="Instagram"
              />
              <SocialBtn 
                icon={<Linkedin size={18} />} 
                link="https://in.linkedin.com/in/abhinavanandofficial" 
                label="LinkedIn" 
              />
            </div>

            <div className="mt-10 space-y-2 text-[10px] uppercase tracking-[0.2em] text-stone-400">
              <p className="flex items-center gap-2">
                <Mail size={12} /> support@aurindel.com
              </p>
              <p className="flex items-center gap-2">
                <Globe size={12} /> New Delhi, India
              </p>
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

// Fixed: Wrapped the motion.div in an anchor tag and passed the href
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