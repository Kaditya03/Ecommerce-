"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  User,
  X,
  Menu,
  Heart,
  Settings,
  Package,
  LogOut,
  ArrowRight
} from "lucide-react";

import { useMenu } from "@/context/MenuContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const router = useRouter();
  const { menuOpen, setMenuOpen } = useMenu();
  const { cartCount } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCloseToHome = () => {
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      <nav className={`top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? "fixed bg-white/95 backdrop-blur-xl shadow-sm border-b border-stone-100 py-3" 
          : "sticky lg:absolute bg-[#FBFBFA] lg:bg-transparent py-4 md:py-10" 
      }`}>
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* LOGO - Original Colors */}
          <Link href="/" className="flex-shrink-0 z-[110]">
            <div className={`relative transition-all duration-500 ${
              scrolled ? "h-6 w-20 md:h-8 md:w-28" : "h-7 w-24 md:h-12 md:w-40"
            }`}>
              <Image 
                src="/images/AurindelLogo.png" 
                alt="Aurindel" 
                fill 
                priority
                unoptimized
                className="object-contain object-left" 
              />
            </div>
          </Link>

          {/* DESKTOP NAV - Synced Words */}
          <div className={`hidden lg:flex items-center gap-10 text-[10px] uppercase tracking-[0.4em] font-bold transition-colors duration-500 ${
            scrolled ? "text-stone-500" : "text-black"
          }`}>
            <NavLink href="/about" label="About Us" />
            <NavLink href="/contact" label="Contact" />
            <NavLink href="/archives" label="Archives" />
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3 md:gap-7 z-[110] text-black">
            <button className="p-2 hover:bg-stone-200/20 rounded-full transition-colors">
              <Search size={18} strokeWidth={1.5} />
            </button>
            
            <Link href="/cart" className="relative p-2 hover:bg-stone-200/20 rounded-full group transition-colors">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 text-[7px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold bg-black text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* PROFILE DROPDOWN - RESTORED FEATURES */}
            <div className="hidden md:block relative group">
              <div className="flex items-center gap-2 cursor-pointer p-2 hover:bg-stone-100 rounded-full transition-colors">
                <User size={18} strokeWidth={1.5} />
                {isLoggedIn && (
                  <span className="text-[9px] uppercase tracking-widest font-bold">
                    {user?.name?.split(' ')[0]}
                  </span>
                )}
              </div>
              
              <div className="absolute right-0 mt-4 w-60 bg-white border border-stone-100 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 rounded-2xl overflow-hidden p-2 text-black font-sans">
                {!isLoggedIn ? (
                  <div className="p-5 flex flex-col gap-4">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold">Member Access</p>
                    <Link href="/login" className="bg-black text-white text-center py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-stone-800 transition-all">Sign In</Link>
                    <Link href="/register" className="text-center text-[10px] uppercase tracking-widest font-bold text-stone-600 hover:text-black transition-all">Join Aurindel</Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="p-4 border-b border-stone-50 mb-1">
                       <p className="text-[10px] font-bold uppercase tracking-tight">{user?.name}</p>
                       <p className="text-[9px] text-stone-400 lowercase">{user?.email}</p>
                    </div>
                    <ProfileItem icon={<Package size={14}/>} label="Orders" href="/account/orders" />
                    <ProfileItem icon={<Heart size={14}/>} label="Wishlist" href="/wishlist" />
                    <ProfileItem icon={<Settings size={14}/>} label="Settings" href="/account/settings" />
                    <button onClick={logout} className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-50 transition-all rounded-lg text-[10px] uppercase font-bold mt-1 border-t border-stone-50">
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* MOBILE TOGGLE */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-stone-100/50 text-black"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* FULLSCREEN MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ y: "-100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "-100%" }} 
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#FBFBFA] z-[200] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <Image src="/images/AurindelLogo.png" alt="Logo" width={90} height={35} className="object-contain" />
              <button onClick={handleCloseToHome} className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col p-8 space-y-12 overflow-y-auto">
                {/* Main Links */}
                <div className="flex flex-col space-y-6">
                  <MobileLink href="/about" label="About Us" onClick={() => setMenuOpen(false)} />
                  <MobileLink href="/contact" label="Contact" onClick={() => setMenuOpen(false)} />
                  <MobileLink href="/archives" label="Archives" onClick={() => setMenuOpen(false)} />
                </div>

                {/* Profile Section */}
                <div className="pt-8 border-t border-stone-200">
                  {isLoggedIn ? (
                    <div className="space-y-6">
                      <div className="mb-2">
                       
                        <p className="text-xl font-medium">{user?.name}</p>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <MobileProfileItem icon={<Package size={18}/>} label="My Orders" href="/account/orders" />
                        <MobileProfileItem icon={<Heart size={18}/>} label="Your Wishlist" href="/wishlist" />
                        <MobileProfileItem icon={<Settings size={18}/>} label="Account Settings" href="/account/settings" />
                      </div>
                      <button onClick={logout} className="flex items-center gap-3 py-4 text-red-500 text-[10px] uppercase font-bold border-t border-stone-200 mt-4 w-full">
                        <LogOut size={16}/> Logout
                      </button>
                    </div>
                  ) : (
                    <Link href="/login" onClick={() => setMenuOpen(false)} className="block w-full py-5 text-center bg-black text-white rounded-2xl text-[10px] uppercase font-bold tracking-widest shadow-lg">Sign In</Link>
                  )}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* Helper Components */

function NavLink({ href, label }: { href: string, label: string }) {
  return (
    <Link href={href} className="transition-all relative group opacity-80 hover:opacity-100">
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all group-hover:w-full" />
    </Link>
  );
}

function ProfileItem({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 p-3 hover:bg-stone-50 rounded-lg transition-all text-[10px] uppercase font-bold text-stone-600 hover:text-black">
      {icon} {label}
    </Link>
  );
}

function MobileLink({ href, label, onClick }: { href: string, label: string, onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="text-sm font-bold uppercase tracking-[0.4em] flex items-center justify-between py-2 active:opacity-50">
      {label} <ArrowRight size={16} className="text-stone-300" />
    </Link>
  );
}

function MobileProfileItem({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
    return (
      <Link href={href} className="flex items-center gap-4 py-1 text-[11px] uppercase tracking-widest font-bold text-stone-600">
        <span className="text-stone-300">{icon}</span> {label}
      </Link>
    );
}