"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser"; 
import { 
  Mail, Phone, MapPin, Send, 
  Instagram, Twitter, Facebook, MessageCircle, 
  Linkedin, Globe, X, CheckCircle2, Loader2,
  ExternalLink
} from "lucide-react";
import { Cormorant_Garamond, Poppins } from "next/font/google";

// Integrated Navbar
import Navbar from "@/components/Navbar";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "600"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "600"] });

export default function ContactPage() {
  const [selectedInquiry, setSelectedInquiry] = useState("General");
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const whatsappNumber = "+918340220161"; 
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Aurindel...`;
  const mapUrl = "https://maps.google.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInquiry === "Trade Partnership" || selectedInquiry === "Bespoke Commission") {
      setShowCalendar(true);
      return;
    }
    setIsSubmitting(true);

    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const INQUIRY_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_INQUIRY_TEMPLATE_ID!;
    const AUTOREPLY_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID!;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    if (!formRef.current) return;

    try {
      await emailjs.sendForm(SERVICE_ID, INQUIRY_TEMPLATE, formRef.current, PUBLIC_KEY);
      await emailjs.sendForm(SERVICE_ID, AUTOREPLY_TEMPLATE, formRef.current, PUBLIC_KEY);
      setIsSuccess(true);
      formRef.current.reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#FBFBFA] ${poppins.className} text-[#1A1A18] selection:bg-stone-200 overflow-x-hidden`}>
      
      {/* 1. NAVBAR  */}
      <Navbar />

      {/* 2. HEADER */}
      <section className="pt-52 pb-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold mb-8">Aurindel — Contact Us</h2>
        <h1 className={`${cormorant.className} text-6xl md:text-8xl font-light italic leading-tight mb-8`}>The Start of a Story</h1>
        <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light">
          At <span className="text-black font-medium">Puriva Industries Pvt. Ltd.</span> we believe every conversation is the start of a story. Whether you have a question about our collections, need support, or simply want to share your thoughts, we’re always here for you.
        </p>
      </section>

      {/* 3. CONTACT GRID */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 px-6 pb-32">
        <div className="lg:col-span-5 space-y-8">
          <InfoCard icon={<Mail size={22} strokeWidth={1}/>} title="Direct Inquiries" value="abhinav.purivaindustries@gmail.com" />
          
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block group">
            <div className="p-10 bg-[#E8EAE6] rounded-[2.5rem] flex flex-col justify-between border border-stone-100 transition-all hover:bg-white shadow-sm hover:shadow-xl">
                <MessageCircle className="text-stone-400 group-hover:text-green-600 transition-colors mb-6" size={24} />
                <div>
                  <h3 className="text-[10px] uppercase font-black tracking-widest text-stone-500 mb-2">Priority Artisan Chat</h3>
                  <p className="text-stone-800 font-medium italic">Connect via WhatsApp →</p>
                </div>
            </div>
          </a>

          <div className="p-10 bg-stone-50 border border-stone-100 rounded-[2.5rem] relative overflow-hidden">
            <h3 className="text-[10px] uppercase font-black tracking-widest text-stone-400 mb-8">Atelier Location</h3>
            <div className="space-y-6">
                <AddressBlock city="Corporate Office" desc="Unit No. 8125, 8th Floor, Gaur City Mall Office Space, Sector 4, Greater Noida, Uttar Pradesh-201318" />
                <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-stone-800 hover:text-stone-500 transition-colors">
                  <MapPin size={14} /> View Live Location <ExternalLink size={12} />
                </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <SocialTile icon={<Instagram size={20}/>} label="Insta" href="https://www.instagram.com/aurindelexports" />
            <SocialTile icon={<Linkedin size={20}/>} label="LinkedIn" href="https://www.linkedin.com/company/purivaindustries/" />
            {/* <SocialTile icon={<Twitter size={20}/>} label="Twitter" href="https://twitter.com" /> */}
          </div>
        </div>

        {/* 4. CONTACT FORM */}
        <div className="lg:col-span-7 bg-[#1A1A18] p-12 md:p-16 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
          <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 className={`${cormorant.className} text-4xl md:text-5xl italic mb-10`}>Inquiry Details</h3>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormInput name="from_name" label="Your Name" placeholder="Ex: Julian Thorne" required />
                    <FormInput name="reply_to" label="Email Address" placeholder="Ex: julian@house.com" type="email" required />
                </div>
                <input type="hidden" name="inquiry_type" value={selectedInquiry} />
                <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-bold">Nature of Inquiry</label>
                    <div className="flex flex-wrap gap-3">
                      {["Bespoke Commission", "Press/Media", "Trade Partnership", "General"].map((opt) => (
                          <button 
                            type="button"
                            key={opt} 
                            onClick={() => setSelectedInquiry(opt)}
                            className={`px-5 py-2 rounded-full border text-[10px] uppercase tracking-widest transition-all ${selectedInquiry === opt ? "bg-white text-black border-white" : "border-stone-800 hover:border-stone-400"}`}
                          >
                              {opt}
                          </button>
                      ))}
                    </div>
                </div>
                <div className="relative">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-bold">Message</label>
                  <textarea name="message" rows={4} className="w-full bg-transparent border-b border-stone-800 py-3 outline-none focus:border-white transition-colors placeholder:text-stone-800 resize-none" placeholder="How can we assist your legacy?" required />
                </div>
              </div>
            </div>

            <div className="mt-16">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-3 text-green-400 font-bold uppercase text-[10px] tracking-widest py-4">
                    <CheckCircle2 size={18} /> Message Received
                  </motion.div>
                ) : (
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full h-16 bg-white text-stone-900 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 hover:gap-6 transition-all group disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (
                      <>
                        {selectedInquiry === "Trade Partnership" || selectedInquiry === "Bespoke Commission" ? "Schedule Consultation" : "Dispatch Inquiry"}
                        <Send size={14} />
                      </>
                    )}
                  </button>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>

      {/* 5. CALENDAR MODAL */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white max-w-md w-full rounded-[2.5rem] p-10 text-center relative">
                <button onClick={() => setShowCalendar(false)} className="absolute top-6 right-6 text-stone-400 hover:text-black"><X size={20}/></button>
                <h4 className={`${cormorant.className} text-4xl mb-4`}>Artisan Booking</h4>
                <p className="text-xs text-stone-500 mb-8">Scheduling a direct bridge to our production house.</p>
                <div className="bg-stone-50 h-48 rounded-2xl flex items-center justify-center border border-dashed border-stone-200 mb-6 text-center px-4">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 leading-relaxed">Please email us at abhinav.purivaindustries@gmail.com for appointment slots.</p>
                </div>
                <button onClick={() => setShowCalendar(false)} className="w-full py-4 bg-black text-white text-[10px] uppercase tracking-[0.3em] rounded-xl">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. FOOTER */}
      <footer className="bg-[#0D0D0C] text-white pt-24 pb-12 px-6 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-left mb-20 border-b border-stone-900 pb-20">
            <div>
                <Image src="/images/AurindelLogo.png" alt="Logo" width={140} height={45} className="brightness-0 invert mb-6" />
                <p className="text-stone-500 text-xs leading-relaxed max-w-xs">Crafting excellence through Puriva Industries Pvt. Ltd. Our pieces are more than decor; they are legacies for your home.</p>
            </div>
            <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-stone-300">Explore</h4>
                <div className="flex flex-col gap-3 text-xs text-stone-500">
                    <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                    <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                </div>
            </div>
            <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-stone-300">Contact Support</h4>
                <p className="text-xs text-stone-500 mb-2 font-medium">Available for Bespoke Queries</p>
                <p className="text-xs text-stone-500">Email: abhinav.purivaindustries@gmail.com</p>
            </div>
        </div>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <p className="text-stone-600 text-[9px] uppercase tracking-[0.4em]">© 2026 Aurindel House | Puriva Industries Pvt. Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

/* HELPER COMPONENTS */
function SocialTile({ icon, label, href }: { icon: any, label: string, href: string }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 bg-white border border-stone-100 rounded-2xl hover:bg-stone-50 transition-all group">
            <span className="text-stone-300 group-hover:text-black transition-colors mb-2">{icon}</span>
            <span className="text-[8px] uppercase tracking-widest font-bold text-stone-400">{label}</span>
        </a>
    );
}

function InfoCard({ icon, title, value }: any) {
  return (
    <div className="p-10 bg-white border border-stone-100 rounded-[2.5rem] shadow-sm">
      <div className="text-stone-300 mb-6">{icon}</div>
      <h3 className="text-[10px] uppercase font-black tracking-widest text-stone-400 mb-2">{title}</h3>
      <p className="text-stone-800 font-medium tracking-tight text-sm">{value}</p>
    </div>
  );
}

function FormInput({ label, name, placeholder, type = "text", required = false }: any) {
    return (
        <div className="relative">
            <label className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-bold">{label}</label>
            <input name={name} type={type} required={required} className="w-full bg-transparent border-b border-stone-800 py-3 outline-none focus:border-white transition-colors placeholder:text-stone-800" placeholder={placeholder} />
        </div>
    );
}

function AddressBlock({ city, desc }: any) {
    return (
        <div><p className="text-xs font-bold uppercase tracking-widest text-stone-800 mb-1">{city}</p><p className="text-sm text-stone-500 font-light leading-relaxed">{desc}</p></div>
    );
}