"use client";

import React from "react";
import { motion } from "motion/react";
import { GraduationCap, Award, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { siteContent } from "@/data/content";

export function TimelineSection() {
  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
          Milestones
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Education & Achievements
        </h2>
        <div className="w-12 h-1 bg-emerald-500 rounded-full mt-3" />
        <p className="max-w-xl text-sm text-zinc-400 mt-4 leading-relaxed">
          Academic progression and competitive hackathon challenges shaping my engineering approach.
        </p>
      </div>

      {/* Vertical Timeline with Drawing Line */}
      <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-cyan-500 before:to-zinc-800">
        {siteContent.timeline.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="relative"
          >
            {/* Timeline Node Dot */}
            <div className="absolute -left-6 sm:-left-10 top-1.5 w-5 h-5 rounded-full bg-zinc-950 border-2 border-emerald-400 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Timeline Card */}
            <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 shadow-lg hover:border-emerald-500/30 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-medium text-emerald-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.period}
                </span>
                {item.badge && (
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                    {item.badge}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-zinc-100">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-400 font-medium mt-0.5">
                {item.organization} · <span className="text-zinc-500">{item.location}</span>
              </p>

              <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
                {item.description}
              </p>

              {/* Bullet Details */}
              <ul className="mt-4 space-y-1.5 text-xs text-zinc-400">
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
