"use client";

import React from "react";
import { ArrowUp, Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { siteContent } from "@/data/content";

interface FooterProps {
  onOpenCv: () => void;
}

export function Footer({ onOpenCv }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950/60 pt-16 pb-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Summary */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-zinc-950 font-bold font-mono text-xs">
              PJ
            </div>
            <span className="text-base font-bold text-zinc-100 tracking-tight">
              {siteContent.personal.name}
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
            {siteContent.personal.tagline}
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-400">
          {siteContent.navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-emerald-400 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <button
            onClick={onOpenCv}
            className="hover:text-emerald-400 transition-colors"
          >
            Curriculum Vitae
          </button>
        </div>

        {/* Back to top & Socials */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href={siteContent.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 border border-zinc-800 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={siteContent.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 border border-zinc-800 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${siteContent.socials.email}`}
              aria-label="Email"
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 border border-zinc-800 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-emerald-500/10 text-zinc-400 hover:text-emerald-400 border border-zinc-800 hover:border-emerald-500/30 transition-colors"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono gap-2">
        <p>© {new Date().getFullYear()} {siteContent.personal.name}. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Built with Next.js, TypeScript & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
