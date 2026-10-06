"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { GraduationCap, MapPin, Award, Terminal, Code2 } from "lucide-react";
import { siteContent } from "@/data/content";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const stepTime = Math.max(20, Math.floor(duration / target));
    const increment = Math.ceil(target / (duration / stepTime));

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-mono text-2xl sm:text-3xl font-bold text-zinc-100">
      {count}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
          Who I Am
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          About & Academic Background
        </h2>
        <div className="w-12 h-1 bg-emerald-500 rounded-full mt-3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16">
        {/* Profile Card with Avatar */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5 flex flex-col items-center"
        >
          <div className="relative group">
            {/* Subtle rotating glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-20 blur-lg group-hover:opacity-40 transition-opacity" />

            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl flex items-center justify-center">
              <Image
                src={siteContent.personal.avatarUrl}
                alt={siteContent.personal.name}
                width={300}
                height={300}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-4 right-4 text-left">
                <span className="text-xs font-mono font-medium text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ULAB CSE Student
                </span>
                <p className="text-sm font-semibold text-zinc-100">{siteContent.personal.name}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {siteContent.personal.location}
            </span>
          </div>
        </motion.div>

        {/* Bio Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-7 flex flex-col gap-4 text-zinc-300 leading-relaxed text-sm sm:text-base"
        >
          {siteContent.personal.bioParagraphs.map((para, idx) => (
            <p key={idx} className="text-zinc-300">
              {para}
            </p>
          ))}

          {/* Academic Milestone Box */}
          <div className="mt-4 p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">
                {siteContent.personal.degree}
              </h3>
              <p className="text-xs text-emerald-400 font-mono mt-0.5">
                {siteContent.personal.institution}
              </p>
              <p className="text-xs text-zinc-400 mt-1 leading-normal">
                Coursework emphasizing Object-Oriented Programming (OOP) in C++ and Java, memory management in C, Data Structures & Algorithms, and modern software design.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Verified Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {siteContent.stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col items-center text-center hover:border-emerald-500/30 transition-colors"
          >
            <CountUp target={stat.value} suffix={stat.suffix} />
            <span className="text-xs font-semibold text-zinc-300 mt-1">
              {stat.label}
            </span>
            <span className="text-[11px] text-zinc-500 mt-0.5 font-mono">
              {stat.description}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
