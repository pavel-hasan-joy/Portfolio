"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Sun,
  Moon,
  FileText,
  Menu,
  X,
  Command,
  ArrowRight,
  Code2,
} from "lucide-react";
import { siteContent } from "@/data/content";
import { useTheme } from "./ThemeProvider";

interface NavbarProps {
  onOpenCv: () => void;
  onOpenCommandPalette: () => void;
}

export function Navbar({ onOpenCv, onOpenCommandPalette }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Dynamic show on scroll-up and hide on scroll-down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && !mobileMenuOpen) {
          setIsVisible(false); // scrolling down
        } else {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Track active section
      const sections = ["about", "skills", "education", "achievements", "projects", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -90, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-3 sm:top-5 left-0 right-0 z-40 mx-auto max-w-5xl px-3 sm:px-6"
    >
      <nav className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-zinc-900/50 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
        {/* Brand Logo / Monogram */}
        <a
          href="#"
          className="flex items-center gap-2.5 group select-none"
          aria-label="Pavel Hasan Joy Home"
        >
          <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-cyan-500/30 bg-[#061126] flex items-center justify-center shadow-md group-hover:scale-105 group-hover:border-cyan-400 transition-all">
            <Image
              src="/logo-icon.png"
              alt="Pavel Hasan Joy Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold tracking-tight text-zinc-100 group-hover:text-cyan-400 transition-colors">
              {siteContent.personal.name}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">
              Software Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-950/40 backdrop-blur-md px-2 py-1 rounded-xl border border-white/[0.06] text-xs font-medium">
          {siteContent.navigation.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-3 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? "text-cyan-400 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/15 border border-cyan-400/40 rounded-lg -z-10 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Action Icons & Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Cmd+K Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800 text-xs font-mono transition-colors"
            title="Open Command Palette (Cmd/Ctrl + K)"
            aria-label="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden lg:inline text-[11px]">Cmd+K</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            aria-label="Toggle Color Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-500" />
            )}
          </button>

          {/* View CV Button */}
          <button
            onClick={onOpenCv}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-medium transition-all group"
          >
            <FileText className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span>View CV</span>
          </button>

          {/* Contact CTA Button */}
          <a
            href="#contact"
            className="hidden sm:flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
          >
            <span>Let&apos;s Talk</span>
            <ArrowRight className="w-3 h-3" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden rounded-xl bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Animated Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 p-4 rounded-2xl glass-panel border border-zinc-800/80 shadow-2xl flex flex-col gap-2"
          >
            {siteContent.navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-cyan-400 hover:bg-zinc-900/60 transition-colors"
              >
                {item.name}
              </a>
            ))}

            <div className="pt-2 border-t border-zinc-800/80 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCv();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Curriculum Vitae</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-zinc-950 text-xs font-bold"
              >
                <span>Contact Pavel</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
