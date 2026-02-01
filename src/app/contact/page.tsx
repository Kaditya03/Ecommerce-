"use client";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-40 pb-20 bg-[#FAF9F6] flex flex-col items-center">
        <div className="text-center mb-20 space-y-4">
             <h1 className="text-6xl font-serif italic text-stone-900">Reach Out</h1>
             <p className="text-stone-400 uppercase text-[10px] tracking-[0.6em] font-bold">We are here to assist your journey</p>
        </div>

        <div className="max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
            {/* INFO CARDS */}
            <div className="space-y-4">
                <div className="p-10 bg-white border border-stone-100 rounded-[2rem] shadow-sm hover:-translate-y-2 transition-transform">
                    <Mail className="mb-6 text-stone-400" size={30} strokeWidth={1}/>
                    <h3 className="text-xs uppercase font-black tracking-widest mb-2">Email Us</h3>
                    <p className="text-stone-600 font-light">concierge@aurindel.com</p>
                </div>
                <div className="p-10 bg-white border border-stone-100 rounded-[2rem] shadow-sm hover:-translate-y-2 transition-transform">
                    <Phone className="mb-6 text-stone-400" size={30} strokeWidth={1}/>
                    <h3 className="text-xs uppercase font-black tracking-widest mb-2">Call Us</h3>
                    <p className="text-stone-600 font-light">+1 (800) AURINDEL</p>
                </div>
            </div>

            {/* QUICK CONTACT FORM (Premium Glass Design) */}
            <div className="bg-stone-900 p-12 rounded-[3rem] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                    <h3 className="text-2xl font-serif italic mb-8">Drop a Query</h3>
                    <div className="space-y-6">
                        <input type="text" placeholder="Name" className="w-full bg-white/10 border-b border-white/20 p-4 outline-none focus:border-white transition-colors placeholder:text-stone-500" />
                        <textarea placeholder="Your Message" rows={4} className="w-full bg-white/10 border-b border-white/20 p-4 outline-none focus:border-white transition-colors placeholder:text-stone-500" />
                    </div>
                </div>
                <button className="relative z-10 mt-10 w-full h-14 bg-white text-stone-900 rounded-2xl font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:gap-5 transition-all">
                    Send Message <Send size={14}/>
                </button>
            </div>
        </div>
    </main>
  );
}