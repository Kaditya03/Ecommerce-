"use client";

import { motion } from "framer-motion";

export default function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100 pb-5 mb-5 last:border-0">
      <h3 className="font-semibold text-gray-900 mb-4 text-[11px] uppercase tracking-wider">
        {title}
      </h3>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-3"
      >
        {children}
      </motion.div>
    </div>
  );
}