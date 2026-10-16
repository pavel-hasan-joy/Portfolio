"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Award,
  BookOpen,
  Code2,
  Cpu,
  GraduationCap,
  Globe,
  Sparkles,
  Layers,
  Terminal,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { siteContent } from "@/data/content";

interface ResumeDocumentProps {
  theme?: "clean" | "slate";
}

export function ResumeDocument({ theme = "clean" }: ResumeDocumentProps) {
  return (
    <div
      className={`printable-cv w-full max-w-[850px] mx-auto bg-white text-zinc-900 shadow-2xl rounded-xl border border-zinc-200/80 p-8 sm:p-12 font-sans select-text leading-relaxed tracking-normal transition-colors`}
      style={{
        minHeight: "1120px",
        fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
      }}
    >
      {/* Top Header */}
      <header className="border-b border-zinc-200 pb-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 font-sans">
              PAVEL HASAN JOY
            </h1>
            <p className="text-sm sm:text-base font-semibold text-emerald-700 tracking-wide mt-1 flex items-center gap-2">
              <span>Aspiring Full-Stack Software Engineer & ML/AI Engineer</span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-zinc-500 font-normal">ULAB CSE</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open to Engineering Roles & Internships</span>
          </div>
        </div>

        {/* Contact Links Bar */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-zinc-600 mt-4 pt-3 border-t border-zinc-100">
          <a
            href={`tel:${siteContent.personal.phone || "+8801342182616"}`}
            className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>+8801342182616</span>
          </a>

          <span className="text-zinc-300">|</span>

          <a
            href={`mailto:${siteContent.socials.email}`}
            className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-emerald-600" />
            <span>pavel.hasan.cse@ulab.edu.bd</span>
          </a>

          <span className="text-zinc-300">|</span>

          <a
            href={siteContent.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>linkedin.com/in/pavel-hasan-joy-ulab262014103</span>
          </a>

          <span className="text-zinc-300">|</span>

          <a
            href={siteContent.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>github.com/pavel-hasan-joy</span>
          </a>

          <span className="text-zinc-300">|</span>

          <div className="flex items-center gap-1.5 text-zinc-500">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span>Dhaka 1207, Bangladesh</span>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <div className="space-y-6">
        {/* PROFESSIONAL SUMMARY */}
        <section>
          <div className="flex items-center gap-2 mb-2 pb-1 border-b border-zinc-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Professional Summary
            </h2>
          </div>
          <p className="text-xs sm:text-[13px] text-zinc-700 leading-relaxed text-justify">
            Undergraduate Computer Science & Engineering student at the <strong>University of Liberal Arts Bangladesh (ULAB)</strong> with
            a proven track record of engineering impactful software solutions from first principles. Experienced in building 3D geospatial observatories (<strong>NASA Space Apps Challenge</strong>),
            high-performance search & information retrieval engines with sub-3ms latency, and university-wide networking portals. Proficient in <strong>C, C++, Java, Python</strong>, and modern full-stack web architectures (<strong>Next.js, React, Tailwind CSS</strong>). Known for disciplined algorithmic problem-solving, clean code architecture, and rapid adaptability in high-pressure hackathon environments.
          </p>
        </section>

        {/* EDUCATION */}
        <section>
          <div className="flex items-center gap-2 mb-3 pb-1 border-b border-zinc-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Education
            </h2>
          </div>

          <div className="space-y-3.5">
            {/* ULAB */}
            <div className="text-xs sm:text-[13px]">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-semibold text-zinc-900">
                <span className="text-sm font-bold text-zinc-950 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
                  B.Sc. in Computer Science & Engineering (CSE)
                </span>
                <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                  2026 – Present
                </span>
              </div>
              <div className="text-zinc-600 font-medium mt-0.5">
                University of Liberal Arts Bangladesh (ULAB) — Dhaka, Bangladesh
              </div>
              <p className="text-[12px] text-zinc-600 mt-1 pl-5 border-l-2 border-emerald-300">
                Coursework: Data Structures & Algorithms, Object-Oriented Programming (OOP) in C++ and Java, Systems Architecture, Discrete Mathematics.
              </p>
            </div>

            {/* HSC */}
            <div className="text-xs sm:text-[13px]">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-semibold text-zinc-900">
                <span className="font-bold text-zinc-900">Higher Secondary Certificate (HSC) — Science</span>
                <span className="text-xs font-mono text-zinc-500">2023 – 2024</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-zinc-600">
                <span>Naogaon Govt. College — Naogaon, Rajshahi, Bangladesh</span>
                <span className="font-semibold text-emerald-700 text-xs">GPA: 4.50 / 5.00</span>
              </div>
            </div>

            {/* SSC */}
            <div className="text-xs sm:text-[13px]">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-semibold text-zinc-900">
                <span className="font-bold text-zinc-900">Secondary School Certificate (SSC) — Science</span>
                <span className="text-xs font-mono text-zinc-500">2021 – 2022</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-zinc-600">
                <span>Tapir Bari Ansar High School — Gazipur, Dhaka, Bangladesh</span>
                <span className="font-semibold text-emerald-700 text-xs">GPA: 5.00 / 5.00 (Golden GPA)</span>
              </div>
            </div>
          </div>
        </section>

        {/* TECHNICAL SKILLS */}
        <section>
          <div className="flex items-center gap-2 mb-3 pb-1 border-b border-zinc-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Technical Skills & Competencies
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs text-zinc-700">
            <div className="flex items-start gap-2">
              <span className="font-bold text-zinc-950 min-w-[130px] shrink-0">Programming:</span>
              <span>C, C++, Java, Python, JavaScript (ES6+), TypeScript</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-bold text-zinc-950 min-w-[130px] shrink-0">Web & Frameworks:</span>
              <span>Next.js 16, React 19, FastAPI, Node.js, Tailwind CSS</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-bold text-zinc-950 min-w-[130px] shrink-0">Core CS:</span>
              <span>Data Structures, Algorithms (DSA), OOP, RESTful APIs, Systems</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-bold text-zinc-950 min-w-[130px] shrink-0">Tools & DevOps:</span>
              <span>Git, GitHub, Linux/Bash, VS Code, Vercel, Prisma ORM</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-bold text-zinc-950 min-w-[130px] shrink-0">Spoken Languages:</span>
              <span>Bangla (Native), English (Professional Working), Hindi</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-bold text-zinc-950 min-w-[130px] shrink-0">Soft Skills:</span>
              <span>Team Collaboration, Fast Learner, Problem Solving, Diligence</span>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section>
          <div className="flex items-center gap-2 mb-3 pb-1 border-b border-zinc-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Featured Engineering Projects
            </h2>
          </div>

          <div className="space-y-4">
            {/* Project 1 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <span className="text-sm font-bold text-zinc-950 flex items-center gap-1.5">
                  Climate Lens — 3D NASA Space Apps Climate Observatory
                </span>
                <a
                  href="https://github.com/pavel-hasan-joy/Climate-Lens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-emerald-700 hover:underline flex items-center gap-1"
                >
                  github.com/pavel-hasan-joy/Climate-Lens <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 mb-1">
                Tech Stack: TypeScript, Next.js, NASA POWER API, geoBoundaries, Tailwind CSS
              </div>
              <ul className="list-disc list-outside pl-4 text-xs text-zinc-700 space-y-1">
                <li>
                  Built an interactive 3D climate observatory web application for the <strong>NASA Space Apps Challenge 2026</strong> to visualize and analyze multi-decadal global environmental datasets.
                </li>
                <li>
                  Integrated NASA POWER daily satellite observations, CMIP6 projections, and rice crop calendar indicators across all 64 districts in Bangladesh with bilingual Bengali localization.
                </li>
              </ul>
            </div>

            {/* Project 2 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <span className="text-sm font-bold text-zinc-950 flex items-center gap-1.5">
                  ULAB Setu — University-Wide Networking & Mentorship Portal
                </span>
                <a
                  href="https://github.com/pavel-hasan-joy/ulab-setu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-emerald-700 hover:underline flex items-center gap-1"
                >
                  github.com/pavel-hasan-joy/ulab-setu <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 mb-1">
                Tech Stack: Next.js 16, React 19, TypeScript, Prisma ORM, Tailwind CSS
              </div>
              <ul className="list-disc list-outside pl-4 text-xs text-zinc-700 space-y-1">
                <li>
                  Engineered a centralized university networking platform connecting ULAB students, faculty, and alumni on a unified collaborative network.
                </li>
                <li>
                  Implemented role-based access control (RBAC), academic collaboration feeds, peer-to-peer resource sharing, and verified alumni referral job board integration.
                </li>
              </ul>
            </div>

            {/* Project 3 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <span className="text-sm font-bold text-zinc-950 flex items-center gap-1.5">
                  Bangla & Banglish Search Engine — Information Retrieval Core
                </span>
                <a
                  href="https://github.com/pavel-hasan-joy/Bangla-Search-Engine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-emerald-700 hover:underline flex items-center gap-1"
                >
                  github.com/pavel-hasan-joy/Bangla-Search-Engine <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 mb-1">
                Tech Stack: Python (Pure Standard Library), Information Retrieval, BM25, Block-Max WAND, FastAPI
              </div>
              <ul className="list-disc list-outside pl-4 text-xs text-zinc-700 space-y-1">
                <li>
                  Engineered an ultra-fast phonetic and BM25 search engine from scratch in pure Python standard library with zero external runtime dependencies.
                </li>
                <li>
                  Engineered 3-tier G2P phonetic hashing, trigram-indexed Damerau-Levenshtein fuzzy matching, and Block-Max WAND dynamic pruning delivering sub-3ms latency over 100,000 documents.
                </li>
              </ul>
            </div>

            {/* Project 4 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <span className="text-sm font-bold text-zinc-950 flex items-center gap-1.5">
                  Campus Safety — Real-Time Emergency Platform (Hackathon Project)
                </span>
                <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                  4th Position Recognition
                </span>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 mb-1">
                Tech Stack: React, Real-Time WebSockets, Geolocation, Tailwind CSS
              </div>
              <ul className="list-disc list-outside pl-4 text-xs text-zinc-700 space-y-1">
                <li>
                  Engineered a crisis coordination platform during the ULAB CPC Hackathon to assist students and emergency responders during campus emergencies with real-time status alerts.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS & ACHIEVEMENTS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1 border-t border-zinc-100">
          <div>
            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-zinc-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Certifications
              </h2>
            </div>
            <div className="text-xs text-zinc-800">
              <p className="font-bold">Introduction to AI and Machine Learning on Google Cloud</p>
              <p className="text-zinc-500 text-[11px] mt-0.5">NetCom Learning / Google Cloud</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-zinc-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Honors & Hackathons
              </h2>
            </div>
            <ul className="text-xs text-zinc-800 space-y-1.5 list-disc list-outside pl-4">
              <li>
                <strong>4th Position</strong> — ULAB Computer Programming Club Hackathon (15-08-2026)
              </li>
              <li>
                <strong>Global Participant</strong> — NASA Space Apps Challenge (2026)
              </li>
              <li>
                <strong>Golden GPA 5.00</strong> — Secondary School Certificate (2022)
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Footer stamp */}
      <footer className="mt-8 pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 font-mono">
        <span>Curriculum Vitae — Pavel Hasan Joy</span>
        <span>Verified Portfolio: github.com/pavel-hasan-joy</span>
      </footer>
    </div>
  );
}
