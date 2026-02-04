"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react"; // Added icons for luxury feel
import DesktopFilters from "./DesktopFilters";

export default function MobileFilters(props: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* STICKY BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="
          lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2
          bg-black text-white px-8 py-4 rounded-full shadow-2xl z-40
          flex items-center gap-2 font-medium tracking-wide text-sm
        "
      >
        <SlidersHorizontal size={16} />
        Filter & Sort
      </button>

      {/* OVERLAY & DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="
                fixed bottom-0 left-0 right-0 bg-white
                rounded-t-[2.5rem] p-8 z-[70] max-h-[90vh] overflow-y-auto
              "
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <button 
                  onClick={() => setOpen(false)}
                  className="p-2 bg-gray-100 rounded-full text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Pass isMobile to remove the desktop border/shadow styling */}
              <DesktopFilters {...props} isMobile={true} />
              
              <div className="h-10" /> {/* Extra spacing for bottom */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}