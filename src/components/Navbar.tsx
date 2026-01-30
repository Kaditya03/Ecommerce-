"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LogOut,
  Heart,
  Globe,
  Mail,
  ArrowRight,
} from "lucide-react";

import { useMenu } from "@/context/MenuContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

/* ================= TYPES ================= */

type MobileMenu = "shop" | "about" | null;

type NavSubLinkProps = {
  title: string;
  desc: string;
  href: string;
};

/* ================= COMPONENT ================= */

export default function Navbar() {
  const { menuOpen, setMenuOpen } = useMenu();
  const { cartCount } = useCart();
  const { isLoggedIn, user, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [activeMobileSub, setActiveMobileSub] = useState<MobileMenu>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveMobileSub(null);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl py-3 border-b border-stone-100 shadow-sm"
            : "bg-white md:bg-transparent py-4 md:py-8"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* LEFT */}
          <div className="hidden lg:flex items-center gap-10 flex-1 text-[10px] uppercase tracking-[0.4em] text-stone-500 font-medium">
            <div className="relative group py-2">
              <span className="flex items-center gap-1 cursor-default">
                Collections <ChevronDown size={10} />
              </span>
              <div className="absolute top-full -left-4 mt-2 w-60 bg-white border border-stone-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 p-6 z-[110]">
                <NavSubLink title="Pottery" desc="Handcrafted Earth" href="/collections/pottery" />
                <NavSubLink title="Handlooms" desc="Traditional Weaves" href="/collections/handlooms" />
                <NavSubLink title="Brass Art" desc="Timeless Metalwork" href="/collections/brass" />
              </div>
            </div>

            <div className="relative group py-2">
              <span className="flex items-center gap-1 cursor-default">
                About <ChevronDown size={10} />
              </span>
              <div className="absolute top-full -left-4 mt-2 w-72 bg-white border border-stone-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 p-6 z-[110]">
                <NavSubLink title="Our Story" desc="The Aurindel Heritage" href="/about" />
                <NavSubLink title="Artisans" desc="Meet the Makers" href="/about/artisans" />
                <NavSubLink title="Sustainability" desc="Our Green Commitment" href="/about/sustainability" />
                <NavSubLink title="Workshops" desc="Learn the Craft" href="/about/workshops" />
              </div>
            </div>
          </div>

          {/* LOGO */}
          <Link href="/" className="flex justify-center">
            <div
              className={`relative transition-all duration-700 ${
                scrolled ? "h-7 w-24 md:h-10 md:w-36" : "h-8 w-28 md:h-14 md:w-52"
              }`}
            >
              <Image src="/images/AurindelLogo.png" alt="Aurindel" fill className="object-contain" priority />
            </div>
          </Link>

          {/* RIGHT */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <Search size={18} />

            <div className="hidden lg:block relative group">
              <User size={18} />
              <div className="absolute right-0 mt-2 w-52 bg-white border shadow-xl opacity-0 group-hover:opacity-100 transition-all p-5">
                {!isLoggedIn ? (
                  <>
                    <Link href="/login">Sign In</Link>
                    <Link href="/register">Join</Link>
                  </>
                ) : (
                  <>
                    <p className="text-xs">Hello, {user?.name}</p>
                    <button onClick={logout}>Logout</button>
                  </>
                )}
              </div>
            </div>

            <Link href="/cart" className="relative">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] px-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <button onClick={() => setMenuOpen(true)} className="lg:hidden">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 bg-stone-50 z-[200]"
          >
            <div className="flex justify-between p-6 border-b">
              <span>Menu</span>
              <button onClick={closeMenu}>
                <X />
              </button>
            </div>

            <div className="p-8 space-y-4">
              <button
                onClick={() =>
                  setActiveMobileSub(activeMobileSub === "shop" ? null : "shop")
                }
                className="w-full flex justify-between"
              >
                Collections <ChevronRight />
              </button>

              {activeMobileSub === "shop" && (
                <div className="pl-4 space-y-2">
                  {["Pottery", "Handlooms", "Brass Art"].map((i) => (
                    <Link key={i} href={`/collections/${i.toLowerCase()}`}>
                      {i}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= SUB COMPONENT ================= */

function NavSubLink({ title, desc, href }: NavSubLinkProps) {
  return (
    <Link href={href} className="group flex flex-col mb-4">
      <span className="text-[10px] uppercase tracking-widest flex items-center gap-2">
        {title}
        <ChevronRight size={10} className="opacity-0 group-hover:opacity-100" />
      </span>
      <span className="text-[9px] text-stone-400 italic">{desc}</span>
    </Link>
  );
}
