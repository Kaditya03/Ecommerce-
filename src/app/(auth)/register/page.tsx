"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, CheckCircle2, ArrowRight, Github, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess(data.message);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#FAF9F6] overflow-hidden p-4">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-stone-200/50 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-indigo-50/60 blur-[100px] pointer-events-none" />

      {/* MAIN CARD */}
      <div className="relative z-10 flex w-full max-w-[1100px] min-h-[750px] bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden">
        
        {/* LEFT SIDE: BRANDING */}
        <div className="w-1/2 hidden lg:block relative overflow-hidden group">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
            className="h-full w-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-[2s]"
            src="/images/login-left_img1.png"
            alt="Register Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/70 via-stone-900/20 to-transparent" />
          <div className="absolute bottom-16 left-16 text-white max-w-xs">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black opacity-60 mb-4 block">Join the Circle</span>
            <h2 className="text-5xl font-serif italic leading-tight">Authentic <br />Craftsmanship <br />Await You.</h2>
          </div>
        </div>

        {/* RIGHT SIDE: THE FORM */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 relative">
          
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div 
                key="register-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-sm"
              >
                <div className="mb-10 text-center lg:text-left">
                  <h1 className="text-4xl font-serif text-stone-900">Sign Up</h1>
                  <p className="text-stone-500 font-light mt-3 italic">Begin your artisanal journey with us.</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  {/* FULL NAME */}
                  <InputWrapper icon={<User size={18} />}>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="bg-transparent w-full h-14 outline-none text-sm font-light text-stone-800"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </InputWrapper>

                  {/* EMAIL */}
                  <InputWrapper icon={<Mail size={18} />}>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="bg-transparent w-full h-14 outline-none text-sm font-light text-stone-800"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputWrapper>

                  {/* PASSWORD */}
                  <InputWrapper icon={<Lock size={18} />}>
                    <input
                      type="password"
                      placeholder="Create Password"
                      className="bg-transparent w-full h-14 outline-none text-sm font-light text-stone-800"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </InputWrapper>

                  {/* CONFIRM PASSWORD */}
                  <InputWrapper icon={<ShieldCheck size={18} />}>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="bg-transparent w-full h-14 outline-none text-sm font-light text-stone-800"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </InputWrapper>

                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] uppercase font-black tracking-tighter text-center pt-2">
                      {error}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full h-14 bg-stone-900 text-white rounded-2xl font-bold uppercase text-[10px] tracking-[0.3em] overflow-hidden transition-all active:scale-95 disabled:opacity-70 mt-4"
                  >
                    <span className="relative z-10">{loading ? "Registering..." : "Create Account"}</span>
                    <div className="absolute inset-0 bg-stone-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </form>

                <div className="mt-8">
                   <div className="relative flex items-center justify-center mb-6">
                      <div className="w-full h-px bg-stone-100" />
                      <span className="absolute bg-[#FAF9F6] px-4 text-[9px] uppercase tracking-[0.3em] text-stone-400">Social Sign-Up</span>
                   </div>
                   <div className="flex gap-4">
                      <SocialIcon icon={<img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" className="w-5" alt="Google" />} />
                      <SocialIcon icon={<Github size={20} />} />
                   </div>
                </div>

                <p className="mt-10 text-center text-xs text-stone-400 tracking-widest uppercase">
                  Member? <Link href="/login" className="text-stone-900 font-black border-b border-stone-900 pb-0.5 ml-1">Sign In</Link>
                </p>
              </motion.div>
            ) : (
              /* SUCCESS STATE - PREMIUM CARD */
              <motion.div 
                key="success-card"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center p-8 space-y-6"
              >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
                  <CheckCircle2 size={48} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-serif text-stone-900">Check your Inbox</h2>
                <p className="text-stone-500 font-light leading-relaxed max-w-xs mx-auto">
                  We've sent a verification link to <span className="text-stone-900 font-medium">{email}</span>. Please verify to activate your account.
                </p>
                <button 
                  onClick={() => router.push("/login")}
                  className="flex items-center gap-3 mx-auto text-[10px] uppercase font-black tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
                >
                  Return to Login <ArrowRight size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Utility Components
function InputWrapper({ children, icon }: any) {
  return (
    <div className="relative group">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-stone-900 transition-colors">
        {icon}
      </div>
      <div className="border border-stone-100 bg-white/50 rounded-2xl pl-14 pr-6 focus-within:border-stone-900 focus-within:ring-1 focus-within:ring-stone-900 transition-all shadow-sm">
        {children}
      </div>
    </div>
  );
}

function SocialIcon({ icon }: any) {
  return (
    <motion.button
      whileHover={{ y: -4, backgroundColor: "#fff" }}
      className="flex-1 h-14 rounded-2xl border border-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:shadow-xl hover:shadow-stone-200/40 transition-all"
    >
      {icon}
    </motion.button>
  );
}