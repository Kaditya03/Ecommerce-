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
  ArrowRight,
  ChevronDown,
  UserCircle,
  Home,
  Clock,
  TrendingUp
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
  const [activeMobileSub, setActiveMobileSub] = useState<string | null>(null);
  
  // Search State
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  const collectionsData = [
    { title: "Bathroom Accessories", items: ["Hooks", "Handle", "Laundry Basket", "Soap Dispenser", "Soap Dish"] },
    { title: "Home Decor", subItems: [
        { name: "Vases", types: ["Glass Vase", "Ceramic Vase", "Metal Vase"] },
        { name: "Wall Art" },
        { name: "Mirrors", types: ["Wall Mirror", "Floor Mirror", "Decorative Mirror", "Sunburst Mirror"] }
      ] 
    },
    { title: "Furniture", items: ["Dining Table", "Console Table", "Center Table", "Side Table", "Bookshelf", "Shoe Rack", "Ottoman"] },
    { title: "Kitchen Accessories", items: ["Utensil Holders", "Storage Container", "Dish Rack"] },
    { title: "Garden Accessories", items: ["Water Cans", "Tree Decor", "Bird Table", "Garden Wall Art", "Wind Chimes", "Wind Spinners", "Bird Bath", "Garden Urm"] },
    { title: "Pots and Planters" },
    { title: "Lighting & Candle Holders", items: ["Lanterns", "Candelabrum", "T-Light Holder", "Hurricane Holder", "Moroccan Holder", "Pillar Holder"] },
    { title: "Figurines & Sculptures" }
  ];

  return (
    <>
      <nav className={`top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? "fixed bg-white/95 backdrop-blur-xl shadow-sm border-b border-stone-100 py-3" 
          : "sticky lg:absolute bg-[#FBFBFA] lg:bg-transparent py-4 md:py-8" 
      }`}>
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex-shrink-0 z-[110]">
            <div className={`relative transition-all duration-500 ${scrolled ? "h-8 w-28 md:h-10 md:w-36" : "h-10 w-32 md:h-16 md:w-52"}`}>
              <Image src="/images/AurindelLogo.png" alt="Aurindel" fill priority unoptimized className="object-contain object-left" />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className={`hidden lg:flex items-center gap-10 text-[10px] uppercase tracking-[0.4em] font-bold transition-colors duration-500 ${scrolled ? "text-stone-500" : "text-black"}`}>
            <NavLink href="/" label="Home" />
            <div className="relative group/nav">
              <button className="flex items-center gap-2 hover:opacity-100 opacity-80 transition-all py-4">
                Collections <ChevronDown size={10} className="group-hover/nav:rotate-180 transition-transform"/>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[90vw] max-w-[1200px] bg-white border border-stone-100 shadow-2xl rounded-3xl p-10 grid grid-cols-4 gap-x-8 gap-y-12 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 transform group-hover/nav:translate-y-2">
                {collectionsData.map((cat, idx) => (
                  <div key={idx} className="flex flex-col space-y-4">
                    <h4 className="text-black border-b border-stone-100 pb-2 text-[11px] font-black tracking-widest">{cat.title}</h4>
                    <div className="flex flex-col space-y-2 text-stone-400 font-sans text-[13px] font-light">
                      {cat.items?.map(item => <Link key={item} href="#" className="hover:text-black transition-colors">{item}</Link>)}
                      {cat.subItems?.map(sub => (
                        <div key={sub.name} className="space-y-1">
                          <p className="text-stone-800 font-medium">{sub.name}</p>
                          <div className="pl-3 border-l border-stone-100 flex flex-col space-y-1">
                            {sub.types?.map(t => <Link key={t} href="#" className="text-[12px] hover:text-black">{t}</Link>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <NavLink href="/about" label="About Us" />
            <NavLink href="/contact" label="Contact Us" />
            <NavLink href="/archives" label="Archives" />
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 md:gap-7 z-[110] text-black">
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:bg-stone-200/20 rounded-full"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>
            
            <Link href="/cart" className="relative p-2 hover:bg-stone-200/20 rounded-full group">
              <ShoppingBag size={19} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 text-[7px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold bg-black text-white">{cartCount}</span>
              )}
            </Link>

            <div className="relative group">
              <Link href={isLoggedIn ? "/account" : "/login"} className="p-2 hover:bg-stone-200/20 rounded-full flex items-center gap-2">
                <User size={19} strokeWidth={1.5} />
                {isLoggedIn && <span className="hidden lg:block text-[9px] uppercase tracking-widest font-bold">{user?.name?.split(' ')[0]}</span>}
              </Link>
              
              <div className="hidden lg:block absolute right-0 mt-4 w-60 bg-white border border-stone-100 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 rounded-2xl p-2">
                {!isLoggedIn ? (
                  <div className="p-5 flex flex-col gap-4">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold">Member Access</p>
                    <Link href="/login" className="bg-black text-white text-center py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:opacity-90">Sign In</Link>
                    <Link href="/register" className="text-center text-[10px] uppercase tracking-widest font-bold text-stone-600 hover:text-black">Join Aurindel</Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="p-4 border-b border-stone-50 mb-1">
                       <p className="text-[10px] font-bold uppercase">{user?.name}</p>
                       <p className="text-[9px] text-stone-400 lowercase">{user?.email}</p>
                    </div>
                    <ProfileItem icon={<Package size={14}/>} label="Orders" href="/account/orders" />
                    <ProfileItem icon={<Heart size={14}/>} label="Wishlist" href="/wishlist" />
                    <ProfileItem icon={<Settings size={14}/>} label="Settings" href="/account/settings" />
                    <button onClick={logout} className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-50 rounded-lg text-[10px] uppercase font-bold mt-1 border-t border-stone-50"><LogOut size={14} /> Logout</button>
                  </div>
                )}
              </div>
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-stone-100/50">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#FBFBFA] z-[300] flex flex-col items-center pt-32 px-6"
          >
            <button onClick={() => setSearchOpen(false)} className="absolute top-10 right-10 p-4 hover:bg-stone-100 rounded-full transition-all">
              <X size={24} />
            </button>
            <div className="w-full max-w-3xl">
              <p className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold mb-8 text-center">Search our Collections</p>
              <form onSubmit={handleSearch} className="relative">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="WHAT ARE YOU LOOKING FOR?"
                  className="w-full bg-transparent border-b-2 border-stone-200 pb-6 text-2xl md:text-4xl font-serif italic focus:outline-none focus:border-black transition-all text-center"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-0 bottom-8">
                  <ArrowRight size={24} />
                </button>
              </form>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h5 className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-stone-400 border-b border-stone-100 pb-2"><TrendingUp size={12}/> Trending Now</h5>
                  <div className="flex flex-wrap gap-2">
                    {["Metal Vases", "Bird Baths", "Dining Tables", "Mirrors"].map(tag => (
                      <button key={tag} onClick={() => {setSearchQuery(tag)}} className="px-4 py-2 bg-stone-100 rounded-full text-[10px] uppercase font-bold hover:bg-black hover:text-white transition-all">{tag}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h5 className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-stone-400 border-b border-stone-100 pb-2"><Clock size={12}/> Recent Collections</h5>
                  <div className="space-y-2">
                    <p className="text-xs text-stone-500 hover:text-black cursor-pointer">Artisan Lanterns 2026</p>
                    <p className="text-xs text-stone-500 hover:text-black cursor-pointer">Spring Garden Series</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-0 bg-[#FBFBFA] z-[200] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <Image src="/images/AurindelLogo.png" alt="Logo" width={110} height={40} className="object-contain" />
              <button onClick={() => setMenuOpen(false)} className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-8">
                {isLoggedIn ? (
                  <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-100">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-400"><User size={24}/></div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Welcome back,</p>
                        <p className="text-lg font-serif italic text-black">{user?.name}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <Link href="/account/orders" onClick={() => setMenuOpen(false)} className="flex flex-col gap-2 p-4 bg-stone-50 rounded-2xl">
                          <Package size={18} className="text-stone-400"/>
                          <span className="text-[9px] uppercase font-bold tracking-widest">Orders</span>
                       </Link>
                       <Link href="/wishlist" onClick={() => setMenuOpen(false)} className="flex flex-col gap-2 p-4 bg-stone-50 rounded-2xl">
                          <Heart size={18} className="text-stone-400"/>
                          <span className="text-[9px] uppercase font-bold tracking-widest">Wishlist</span>
                       </Link>
                    </div>
                    <button onClick={logout} className="mt-6 w-full py-3 text-[9px] uppercase font-bold tracking-[0.2em] text-red-400 border border-red-50 rounded-xl">Secure Logout</button>
                  </div>
                ) : (
                  <div className="bg-[#1A1A18] rounded-[2rem] p-8 text-center">
                    <UserCircle size={40} className="text-stone-600 mx-auto mb-4" />
                    <h3 className="text-white font-serif italic text-xl mb-2">Artisan Membership</h3>
                    <p className="text-stone-500 text-xs mb-6">Access your exclusive archives and orders.</p>
                    <Link href="/login" onClick={() => setMenuOpen(false)} className="block w-full py-4 bg-white text-black rounded-xl text-[10px] uppercase font-bold tracking-[0.2em]">Sign In</Link>
                  </div>
                )}
              </div>

              {/* HOME FEATURES CARD (NEW FEATURE) */}
              <div className="px-6 pb-6">
                <div className="bg-stone-100/50 rounded-3xl p-6 grid grid-cols-2 gap-4">
                  <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest"><Home size={16}/> Home</Link>
                  <Link href="/account/orders" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest"><Package size={16}/> Track Order</Link>
                </div>
              </div>

              <div className="px-6 space-y-4 pb-12">
                <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold ml-2 mb-4">Maison Collections</p>
                {collectionsData.map((cat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-stone-50 overflow-hidden">
                    <button onClick={() => setActiveMobileSub(activeMobileSub === cat.title ? null : cat.title)} className="w-full flex items-center justify-between p-5 text-left text-[11px] font-bold uppercase tracking-widest">
                      {cat.title} <ChevronDown size={14} className={`transition-transform duration-300 ${activeMobileSub === cat.title ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeMobileSub === cat.title && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-stone-50/50">
                          <div className="flex flex-col gap-4 p-6 text-stone-500 text-[11px] uppercase tracking-widest font-medium">
                            {cat.items?.map(i => <Link key={i} href="#" onClick={() => setMenuOpen(false)} className="hover:text-black transition-colors">{i}</Link>)}
                            {cat.subItems?.map(sub => (
                              <div key={sub.name} className="space-y-3">
                                <p className="text-black font-black text-[10px] pt-2 border-t border-stone-100">{sub.name}</p>
                                {sub.types?.map(t => <Link key={t} href="#" className="block pl-2 hover:text-black transition-colors">{t}</Link>)}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                
                <div className="pt-8 space-y-4 border-t border-stone-100">
                  <MobileLink href="/about" label="About Us" onClick={() => setMenuOpen(false)} />
                  <MobileLink href="/contact" label="Contact Us" onClick={() => setMenuOpen(false)} />
                  <MobileLink href="/archives" label="Archives" onClick={() => setMenuOpen(false)} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* Helpers */
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
    <Link href={href} onClick={onClick} className="text-xs font-bold uppercase tracking-[0.4em] flex items-center justify-between py-4 px-2 border-b border-stone-50">
      {label} <ArrowRight size={14} className="text-stone-300" />
    </Link>
  );
}