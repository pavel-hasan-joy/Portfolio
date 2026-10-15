"use client";

import React from "react";
import { motion } from "motion/react";
import {
  ArrowDown,
  FileText,
  Mail,
  Sparkles,
  Terminal,
  Code2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/components/Icons";
import { siteContent } from "@/data/content";

interface HeroSectionProps {
  onOpenCv: () => void;
}

export function HeroSection({ onOpenCv }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center"
    >
      {/* Availability Pill */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6 backdrop-blur-sm"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>{siteContent.personal.availability}</span>
      </motion.div>

      {/* Main Name Heading with Line Mask Reveal */}
      <div className="overflow-hidden mb-3">
        <motion.h1
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-100"
        >
          {siteContent.personal.name}
        </motion.h1>
      </div>

      {/* Roles Display */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm sm:text-lg font-medium text-emerald-400 mb-6 font-mono"
      >
        <span>{siteContent.personal.roles[0]}</span>
        <span className="text-zinc-600">·</span>
        <span>{siteContent.personal.roles[1]}</span>
      </motion.div>

      {/* Value Proposition */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed mb-8"
      >
        {siteContent.personal.oneLineValueProp} CSE undergrad at{" "}
        <span className="text-zinc-200 font-medium">
          {siteContent.personal.institution}
        </span>
        , engineering software backed by rigorous foundations.
      </motion.p>

      {/* Core Tech Stack Mini Badges (C, C++, Java, Git, GitHub) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-lg"
      >
        {["C", "C++", "Java", "Git", "GitHub"].map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 rounded-lg bg-zinc-900/40 backdrop-blur-md border border-white/[0.08] text-xs font-mono font-medium text-zinc-300 shadow-sm hover:border-cyan-500/40 hover:text-cyan-300 transition-all"
          >
            {tech}
          </span>
        ))}
      </motion.div>

      {/* 2 Primary CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10"
      >
        <a
          href="#projects"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/25 hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          View Featured Projects
        </a>

        <button
          onClick={onOpenCv}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900/40 backdrop-blur-md hover:bg-zinc-800/60 text-zinc-200 hover:text-white border border-white/[0.08] hover:border-cyan-500/40 font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98] group"
        >
          <FileText className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span>Curriculum Vitae</span>
        </button>
      </motion.div>

      {/* Social Icons & Email */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="flex items-center gap-3 text-zinc-400"
      >
        <a
          href={siteContent.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="p-2.5 rounded-xl bg-zinc-900/40 backdrop-blur-md hover:bg-zinc-800/60 text-zinc-400 hover:text-cyan-400 border border-white/[0.08] hover:border-cyan-500/30 transition-all"
        >
          <GithubIcon className="w-4 h-4" />
        </a>
        <a
          href={siteContent.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className="p-2.5 rounded-xl bg-zinc-900/40 backdrop-blur-md hover:bg-zinc-800/60 text-zinc-400 hover:text-cyan-400 border border-white/[0.08] hover:border-cyan-500/30 transition-all"
        >
          <LinkedinIcon className="w-4 h-4" />
        </a>
        {siteContent.socials.facebook && (
          <a
            href={siteContent.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Profile"
            className="p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 border border-zinc-800/80 transition-colors"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>
        )}
        <a
          href={`mailto:${siteContent.socials.email}`}
          aria-label="Email Pavel"
          className="p-2.5 rounded-xl bg-zinc-900/40 backdrop-blur-md hover:bg-zinc-800/60 text-zinc-400 hover:text-cyan-400 border border-white/[0.08] hover:border-cyan-500/30 transition-all"
        >
          <Mail className="w-4 h-4" />
        </a>
      </motion.div>

      {/* Floating Mindset & Focus Badges (Inspired by aakashgugilla.is-a.dev) */}
      <div className="hidden xl:block absolute left-8 top-44 -rotate-2 select-none pointer-events-none">
        <div className="rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/[0.08] px-5 py-3 shadow-[0_0_35px_rgba(16,185,129,0.12)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">// core focus</p>
          <p className="mt-1 text-xs font-medium text-zinc-300">
            C/C++ <span className="text-emerald-400">·</span> Java <span className="text-cyan-400">·</span> Full-Stack & AI
          </p>
        </div>
      </div>

      <div className="hidden xl:block absolute right-8 top-44 rotate-2 select-none pointer-events-none">
        <div className="rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/[0.08] px-5 py-3 shadow-[0_0_35px_rgba(0,217,255,0.12)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-400">// engineering mindset</p>
          <p className="mt-1 text-xs font-medium text-zinc-300">
            Build <span className="text-cyan-400">·</span> Learn <span className="text-emerald-400">·</span> Optimize <span className="text-purple-400">·</span> Repeat
          </p>
        </div>
      </div>

      {/* Modern Mouse Scroll Down Explorer (Inspired by aakashgugilla.is-a.dev) */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="mt-14 flex flex-col items-center gap-2 text-zinc-500 hover:text-white transition-colors cursor-pointer group"
        aria-label="Scroll to explore"
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1 group-hover:border-cyan-400/60 transition-colors">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-cyan-400"
          />
        </span>
        <span className="uppercase tracking-widest text-[9px] font-mono text-zinc-400 group-hover:text-cyan-300 transition-colors">
          Scroll to explore
        </span>
        <span className="h-6 w-px bg-gradient-to-b from-cyan-400/60 to-transparent" />
      </motion.a>
    </section>
  );
}
