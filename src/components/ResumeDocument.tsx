"use client";

import React from "react";
import Link from "next/link";
import { siteContent } from "@/data/content";

export function ResumeDocument() {
  return (
    <article
      className="printable-cv w-full max-w-[850px] mx-auto bg-white text-zinc-900 shadow-2xl rounded-lg border border-zinc-200/80 px-8 sm:px-14 py-10 sm:py-14 font-sans select-text leading-relaxed tracking-normal"
      style={{
        minHeight: "1100px",
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-3xl sm:text-[34px] font-extrabold text-zinc-950 tracking-tight leading-none mb-2">
          Pavel Hasan Joy
        </h1>

        {/* Contact Line 1 */}
        <div className="text-xs sm:text-[13px] text-zinc-800 leading-normal flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <a
            href="tel:+8801342182616"
            className="hover:underline hover:text-blue-700 transition-colors"
          >
            +8801342182616
          </a>
          <span className="text-zinc-400">|</span>
          <a
            href="mailto:pavel.hasan.cse@ulab.edu.bd"
            className="text-blue-700 hover:underline transition-colors"
          >
            pavel.hasan.cse@ulab.edu.bd
          </a>
          <span className="text-zinc-400">|</span>
          <a
            href="https://www.linkedin.com/in/pavel-hasan-joy-ulab262014103"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline transition-colors"
          >
            www.linkedin.com/in/pavel-hasan-joy-ulab262014103
          </a>
          <span className="text-zinc-400">|</span>
        </div>

        {/* Contact Line 2 */}
        <div className="text-xs sm:text-[13px] text-blue-700 mt-1">
          <a
            href="https://github.com/pavel-hasan-joy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-colors"
          >
            github.com/pavel-hasan-joy
          </a>
        </div>

        {/* Contact Line 3: Address */}
        <div className="text-xs sm:text-[13px] text-zinc-600 mt-1">
          Mohammadi Homes, Mohammadpur, Dhaka, Dhaka 1207, Bangladesh
        </div>

        {/* Solid Dark Divider Rule */}
        <hr className="mt-3.5 border-t-[1.5px] border-zinc-950" />
      </header>

      {/* Main Content */}
      <div className="space-y-4 sm:space-y-5 text-zinc-900">
        {/* OBJECTIVE */}
        <section>
          <h2 className="text-sm font-bold text-zinc-950 uppercase tracking-wide mb-1.5">
            OBJECTIVE
          </h2>
          <p className="text-xs sm:text-[13px] text-zinc-800 leading-relaxed text-justify">
            I&apos;m Pavel Hasan Joy, a Computer Science & Engineering undergraduate with a clear goal - to become a skilled Full-Stack Software Engineer with a strong focus on frontend & backend development And an Ai Engineer.
          </p>
        </section>

        {/* SUMMARY */}
        <section>
          <h2 className="text-sm font-bold text-zinc-950 uppercase tracking-wide mb-1.5">
            SUMMARY
          </h2>
          <p className="text-xs sm:text-[13px] text-zinc-800 leading-relaxed text-justify">
            Dynamic Aspiring Full-Stack Software Engineer & ML/AI Engineer with a strong academic foundation in Computer Science & Engineering at ULAB. Proven track record of engineering impactful software, including a 3D NASA Space Apps climate observatory and a university-wide networking portal. Skilled in C, C++, Java, Git, and GitHub. Known for rigorous problem-solving and the ability to build resilient, scalable systems from first principles.
          </p>
        </section>

        {/* EDUCATION */}
        <section>
          <h2 className="text-sm font-bold text-zinc-950 uppercase tracking-wide mb-2">
            EDUCATION
          </h2>
          <div className="space-y-2.5 text-xs sm:text-[13px]">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <span className="font-bold text-zinc-950">
                  HSC in Science — Naogaon Govt. College, Naogaon, Rajshahi, Bangladesh
                </span>
                <span className="font-bold text-zinc-900 text-xs sm:text-[13px] shrink-0 sm:ml-4">
                  2023 – 2024
                </span>
              </div>
              <div className="font-bold text-zinc-900 mt-0.5">
                GPA: 4.50
              </div>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <span className="font-bold text-zinc-950">
                  SSC in Science — Tapir Bari Ansar High School - Gazipur, Dhaka, Bangladesh
                </span>
                <span className="font-bold text-zinc-900 text-xs sm:text-[13px] shrink-0 sm:ml-4">
                  2021 – 2022
                </span>
              </div>
              <div className="font-bold text-zinc-900 mt-0.5">
                GPA: 5.00
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section>
          <h2 className="text-sm font-bold text-zinc-950 uppercase tracking-wide mb-2">
            PROJECTS
          </h2>
          <div className="border border-slate-200/90 rounded-md bg-[#fafbfe] border-l-4 border-l-blue-600 p-3.5 sm:p-4 text-xs sm:text-[13px] shadow-sm">
            {/* Project 1 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                <span className="font-bold text-zinc-950">
                  ULAB Setu — University-Wide Networking Portal
                </span>
                <a
                  href="https://github.com/pavel-hasan-joy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-[12px] text-blue-700 hover:underline shrink-0"
                >
                  github.com/pavel-hasan-joy
                </a>
              </div>
              <p className="text-zinc-700 leading-relaxed text-justify">
                Developed a centralized university networking and community portal designed to connect ULAB students, faculty, and alumni on a unified platform. Engineered features to streamline academic collaboration, campus-wide communication, and peer resource sharing.
              </p>
            </div>

            <hr className="my-3 border-t border-slate-200" />

            {/* Project 2 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                <span className="font-bold text-zinc-950">
                  Climate Lens — 3D NASA Space Apps Climate Observatory
                </span>
                <a
                  href="https://github.com/pavel-hasan-joy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-[12px] text-blue-700 hover:underline shrink-0"
                >
                  github.com/pavel-hasan-joy
                </a>
              </div>
              <p className="text-zinc-700 leading-relaxed text-justify">
                Built an interactive 3D climate observatory web application for the NASA Space Apps Challenge to visualize and analyze global environmental datasets. Designed an intuitive interface that delivers real-time spatial insights into climate patterns and ecological changes.
              </p>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section>
          <h2 className="text-sm font-bold text-zinc-950 uppercase tracking-wide mb-2">
            SKILLS
          </h2>
          <div className="space-y-1.5 text-xs sm:text-[13px]">
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="font-bold text-zinc-950 w-full sm:w-44 shrink-0">
                Computer Skills
              </span>
              <span className="text-zinc-800">
                C programming Language, C++, Java, Git and GitHub
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="font-bold text-zinc-950 w-full sm:w-44 shrink-0">
                Languages
              </span>
              <span className="text-zinc-800">
                Bangla, English, Hindi
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="font-bold text-zinc-950 w-full sm:w-44 shrink-0">
                Professional Skills
              </span>
              <span className="text-zinc-800">
                Problem Solving, Object-Oriented Programming, Data Structures and Algorithms
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start">
              <span className="font-bold text-zinc-950 w-full sm:w-44 shrink-0">
                Soft Skills
              </span>
              <span className="text-zinc-800">
                Teamwork &amp; Collaboration, Effective Communication, Time Management &amp; Prioritization,
                <br className="hidden sm:inline" /> Adaptability &amp; Fast learner
              </span>
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section>
          <h2 className="text-sm font-bold text-zinc-950 uppercase tracking-wide mb-1">
            CERTIFICATIONS
          </h2>
          <div>
            <div className="font-bold text-xs sm:text-[13px] text-zinc-950">
              Introduction to AI and Machine Learning on Google Cloud
            </div>
            <div className="text-xs sm:text-[12px] text-zinc-500 mt-0.5">
              NetCom Learning
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section>
          <h2 className="text-sm font-bold text-zinc-950 uppercase tracking-wide mb-1.5">
            ACHIEVEMENTS
          </h2>
          <div className="text-xs sm:text-[13px]">
            <div className="font-bold text-zinc-950 flex items-baseline gap-1.5">
              <span>•</span>
              <span>Hackathon - ULAB Computer Programming Club (15-08-2026)</span>
            </div>
            <p className="text-zinc-800 pl-3.5 mt-0.5 leading-relaxed">
              Secured 4th position. For the hackathon, we built Campus Safety a simple web platform to help students during emergencies.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
