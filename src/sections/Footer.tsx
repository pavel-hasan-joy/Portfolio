"use client";

import React from "react";
import { ArrowUp, Mail, Heart } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsAppIcon,
  YoutubeIcon,
} from "@/components/Icons";
import { siteContent } from "@/data/content";

interface FooterProps {
  onOpenCv: () => void;
}

export function Footer({ onOpenCv }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-zinc-950/40 backdrop-blur-xl pt-16 pb-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Summary */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <img
              src="/logo-icon.png"
              alt="Pavel Hasan Joy"
              className="w-7 h-7 rounded-lg object-contain shadow-[0_0_12px_rgba(0,217,255,0.4)]"
            />
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
              className="hover:text-cyan-400 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <button
            onClick={onOpenCv}
            className="hover:text-cyan-400 transition-colors"
          >
            Curriculum Vitae
          </button>
        </div>

        {/* Back to top & Socials */}
        <div className="flex items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <a
              href={siteContent.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub (@pavel-hasan-joy)"
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-cyan-400 border border-zinc-800 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={siteContent.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn Profile"
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-cyan-400 border border-zinc-800 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            {siteContent.socials.twitter && (
              <a
                href={siteContent.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter (X)"
                title="Twitter / X (@pavelhasanjoy1)"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-cyan-400 border border-zinc-800 transition-colors"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            )}
            {siteContent.socials.telegram && (
              <a
                href={siteContent.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                title="Telegram (@pavelhasanjoy)"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-sky-400 border border-zinc-800 transition-colors"
              >
                <TelegramIcon className="w-4 h-4" />
              </a>
            )}
            {siteContent.socials.whatsapp && (
              <a
                href={siteContent.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp (+8801342182616)"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 border border-zinc-800 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            )}
            {siteContent.socials.youtube && (
              <a
                href={siteContent.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube (@PavelDevLab)"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 border border-zinc-800 transition-colors"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            )}
            {siteContent.socials.facebook && (
              <a
                href={siteContent.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook Profile"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-cyan-400 border border-zinc-800 transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            )}
            <a
              href={siteContent.socials.emailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email Pavel via Gmail"
              title="Compose Email to Pavel"
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-cyan-400 border border-zinc-800 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-cyan-500/10 text-zinc-400 hover:text-cyan-400 border border-zinc-800 hover:border-cyan-500/30 transition-colors"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono gap-3">
        <p>© {new Date().getFullYear()} {siteContent.personal.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/pavel-hasan-joy/Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 border border-white/[0.08] hover:border-cyan-500/40 text-zinc-400 hover:text-cyan-300 transition-all text-[11px]"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>View Source Code</span>
          </a>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1">
            Engineered with Next.js 16 & Three.js
          </span>
        </div>
      </div>
    </footer>
  );
}
