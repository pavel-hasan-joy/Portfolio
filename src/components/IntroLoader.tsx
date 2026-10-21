"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteContent } from "@/data/content";

export function IntroLoader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const capsuleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if seen in current session
    const hasSeen = sessionStorage.getItem("pavel_intro_seen");
    if (!hasSeen) {
      setVisible(true);

      // Progress Counter animation (0% to 100% over ~1.4s)
      const startTime = Date.now();
      const duration = 1400;

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
        setProgress(rawProgress);

        if (rawProgress >= 100) {
          clearInterval(interval);
          setIsLoaded(true);

          // Auto-trigger smooth entry if user doesn't click after 800ms
          const autoEnterTimer = setTimeout(() => {
            handleEnter();
          }, 900);

          return () => clearTimeout(autoEnterTimer);
        }
      }, 20);

      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape" || e.key === "Enter") {
          handleEnter();
        }
      };
      window.addEventListener("keydown", handleKey);

      return () => {
        clearInterval(interval);
        window.removeEventListener("keydown", handleKey);
      };
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!capsuleRef.current) return;
    const rect = capsuleRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleEnter = () => {
    if (isClicked) return;
    setIsClicked(true);
    sessionStorage.setItem("pavel_intro_seen", "true");

    // Fade out and unmount after the iris expansion animation completes
    setTimeout(() => {
      setVisible(false);
    }, 700);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!isClicked ? (
        <motion.div
          key="loader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="fixed inset-0 z-[99999999] flex flex-col justify-between items-center bg-[#07080c] text-white overflow-hidden select-none font-sans"
        >
          {/* ── TOP HEADER (Like redoyanulhaque.me) ── */}
          <header className="w-full max-w-7xl mx-auto px-6 py-6 sm:py-8 flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-xs sm:text-sm tracking-widest uppercase text-zinc-100 font-mono">
                  {siteContent.personal.name}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono hidden sm:block">
                  ULAB CSE • Systems & AI
                </span>
              </div>
            </div>

            {/* Retro Arcade Mini-Game Animation (Bouncing Ball over Bars) */}
            <div className="flex items-center gap-1.5 opacity-80 scale-90 sm:scale-100">
              <div className="relative w-28 h-8 overflow-hidden rounded-lg bg-zinc-900/60 border border-white/5 flex items-center px-2">
                {/* 5 Vertical obstacles */}
                <div className="flex items-end justify-between w-full h-5 px-1">
                  <div className="w-1.5 h-3 bg-zinc-700/80 rounded-t-sm" />
                  <div className="w-1.5 h-4 bg-zinc-700/80 rounded-t-sm" />
                  <div className="w-1.5 h-2.5 bg-zinc-700/80 rounded-t-sm" />
                  <div className="w-1.5 h-5 bg-zinc-700/80 rounded-t-sm" />
                  <div className="w-1.5 h-3.5 bg-zinc-700/80 rounded-t-sm" />
                </div>
                {/* Bouncing Neon Ball */}
                <motion.div
                  animate={{
                    x: [0, 85, 0],
                    y: [-4, 6, -6, 4, -4],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                />
              </div>
              <span className="text-[10px] font-mono text-zinc-500 hidden md:block">
                SYS.INIT
              </span>
            </div>
          </header>

          {/* ── BACKGROUND RUNNING MARQUEE (Masked in center so no letters clash with capsule) ── */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] overflow-hidden whitespace-nowrap"
            style={{
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 35%, black 85%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 35%, black 85%)",
            }}
          >
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="flex items-center text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter text-white"
            >
              <span>PAVEL HASAN JOY • SOFTWARE ENGINEER • AI SYSTEMS • C / C++ / JAVA • ALGORITHMIC INTELLIGENCE • </span>
              <span>PAVEL HASAN JOY • SOFTWARE ENGINEER • AI SYSTEMS • C / C++ / JAVA • ALGORITHMIC INTELLIGENCE • </span>
            </motion.div>
          </div>

          {/* ── CENTER INTERACTIVE PILL CAPSULE (Like redoyanulhaque.me) ── */}
          <div className="relative z-20 flex flex-col items-center justify-center my-auto">
            <div
              ref={capsuleRef}
              onMouseMove={handleMouseMove}
              onClick={handleEnter}
              className={`relative group cursor-pointer rounded-full p-[2px] transition-all duration-500 ${
                isLoaded
                  ? "shadow-[0_0_50px_rgba(6,182,212,0.4)] scale-105"
                  : "shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              }`}
            >
              {/* Outer Capsule Glow Border */}
              <div
                className="absolute inset-0 rounded-full transition-opacity duration-300 opacity-80 group-hover:opacity-100"
                style={{
                  background: isLoaded
                    ? "linear-gradient(135deg, #00f2fe 0%, #06b6d4 50%, #38bdf8 100%)"
                    : "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.02))",
                }}
              />

              {/* Cursor-following spotlight inside capsule */}
              <div
                className="absolute w-24 h-24 rounded-full blur-2xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{
                  left: mousePos.x,
                  top: mousePos.y,
                  transform: "translate(-50%, -50%)",
                  background: isLoaded
                    ? "radial-gradient(circle, rgba(6,182,212,0.8) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(0,217,255,0.6) 0%, transparent 70%)",
                }}
              />

              {/* Capsule Inner Button */}
              <div className="relative flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#0d0f15] border border-white/10 text-white min-w-[200px] sm:min-w-[240px] text-center overflow-hidden">
                {!isLoaded ? (
                  <div className="flex items-center gap-2.5 font-mono text-sm sm:text-base font-medium tracking-wider">
                    <span className="text-cyan-400 font-bold">{progress}%</span>
                    <span className="text-zinc-500">|</span>
                    <span className="text-zinc-300 uppercase tracking-widest text-xs">
                      {progress < 40
                        ? "BOOTING KERNEL"
                        : progress < 80
                        ? "INDEXING REPO"
                        : "SYSTEM READY"}
                    </span>
                    {/* Blinking block cursor */}
                    <span className="w-2 h-4 bg-cyan-400 animate-pulse ml-0.5" />
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 font-mono text-sm sm:text-base font-bold uppercase tracking-wider text-cyan-400"
                  >
                    <Sparkles className="w-4 h-4 text-teal-300 animate-spin" />
                    <span>ENTER PORTFOLIO</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Quick Helper Text */}
            <p className="mt-6 text-[11px] font-mono text-zinc-500 tracking-wider flex items-center gap-2">
              <span>CLICK TO ENTER</span>
              <span>•</span>
              <span>PRESS ESC TO SKIP</span>
            </p>
          </div>

          {/* ── FOOTER STATUS ── */}
          <footer className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between text-[11px] font-mono text-zinc-600 z-20">
            <div>© 2026 PAVEL HASAN JOY</div>
            <div className="hidden sm:block">PORTFOLIO v2.0 • NEXT.JS 16 • THREE.JS</div>
            <div className="text-cyan-400/80">LATENCY: &lt;3ms</div>
          </footer>
        </motion.div>
      ) : (
        /* ── CIRCULAR PORTAL EXPANSION / IRIS WIPE ON CLICK ── */
        <motion.div
          key="loader-wipe"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 35, opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.33, 1, 0.68, 1] }}
          className="fixed inset-0 m-auto z-[99999999] pointer-events-none w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-500"
        />
      )}
    </AnimatePresence>
  );
}
