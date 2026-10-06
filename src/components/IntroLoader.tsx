"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteContent } from "@/data/content";

export function IntroLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const hasSeen = sessionStorage.getItem("pavel_intro_seen");
    if (!hasSeen) {
      setVisible(true);
      const timer = setTimeout(() => {
        closeLoader();
      }, 1200);

      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeLoader();
      };
      window.addEventListener("keydown", handleKey);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("keydown", handleKey);
      };
    }
  }, []);

  const closeLoader = () => {
    sessionStorage.setItem("pavel_intro_seen", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onClick={closeLoader}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090a0f] text-white cursor-pointer select-none"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-emerald-500/30 shadow-2xl shadow-emerald-500/10"
            >
              <span className="text-2xl font-bold tracking-tight text-emerald-400 font-mono">
                PJ
              </span>
              <div className="absolute inset-0 rounded-2xl border border-emerald-400/20 animate-pulse" />
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-center"
            >
              <h2 className="text-sm font-semibold tracking-wider uppercase text-zinc-300">
                {siteContent.personal.name}
              </h2>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                Initializing Environment...
              </p>
            </motion.div>

            {/* Quick Loading Bar */}
            <div className="w-40 h-1 bg-zinc-800 rounded-full overflow-hidden mt-2">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
              />
            </div>

            <span className="text-[10px] text-zinc-600 mt-2 hover:text-zinc-400 transition-colors">
              Press ESC or click anywhere to skip
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
