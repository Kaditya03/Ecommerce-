"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Github } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ Save user to context
      login(data.user);

      // ✅ Redirect by role
      if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#FAF9F6] overflow-hidden">
      <div className="relative z-10 flex w-full max-w-[1100px] h-[700px] bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white/50 shadow-xl overflow-hidden m-4">

        {/* LEFT IMAGE */}
        <div className="w-1/2 hidden md:block relative overflow-hidden">
          <img
            src="/images/login-left_img1.png"
            className="h-full w-full object-cover"
            alt="Login"
          />
        </div>

        {/* FORM */}
        <div className="flex-1 flex items-center justify-center p-10">
          <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">

            <h2 className="text-3xl font-serif text-center">Welcome Back</h2>

            {/* EMAIL */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                className="w-full pl-12 h-12 border rounded-xl"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-12 pr-12 h-12 border rounded-xl"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* ERROR */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-black text-white rounded-xl font-semibold"
            >
              {loading ? "Signing in..." : "Login"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link href="/register" className="text-black font-semibold">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
