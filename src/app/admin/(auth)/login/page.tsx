"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [status, setStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setStatus("success");
      setTimeout(() => router.push("/admin/dashboard"), 800);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8"
      >
        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
            A
          </div>
          <h1 className="mt-3 text-2xl font-semibold">Admin Panel</h1>
          <p className="text-sm text-gray-500">
            Login to manage your store
          </p>
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-5">
          <label className="text-sm font-medium text-gray-600">
            Password
          </label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* STATUS */}
        <AnimatePresence>
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-500 text-center mb-3"
            >
              Invalid email or password
            </motion.p>
          )}

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center gap-2 text-green-600 mb-3"
            >
              <CheckCircle size={18} />
              Login successful
            </motion.div>
          )}
        </AnimatePresence>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full py-3 rounded-xl font-semibold transition ${
            status === "success"
              ? "bg-green-600 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {status === "loading"
            ? "Signing in..."
            : status === "success"
            ? "Welcome"
            : "Login"}
        </button>

        <p className="text-xs text-center text-gray-400 mt-6">
          © {new Date().getFullYear()} Aurindel Admin
        </p>
      </motion.form>
    </div>
  );
}
