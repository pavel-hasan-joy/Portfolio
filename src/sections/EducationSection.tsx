"use client";

import React from "react";
import { motion } from "motion/react";
import { GraduationCap, Sparkles, MapPin, CheckCircle2 } from "lucide-react";
import { siteContent } from "@/data/content";

const EDUCATION_GRADIENTS = [
  "from-emerald-400/20 via-green-500/5 to-transparent",
  "from-lime-300/20 via-emerald-500/5 to-transparent",
  "from-green-400/20 via-teal-500/5 to-transparent",
  "from-teal-400/20 via-lime-500/5 to-transparent",
];

export function EducationSection() {
  // Filter exclusively the education items from content
  const educationItems = siteContent.timeline.filter((item) => item.type === "education");

  return (
    <section id="education" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Fallback anchor for legacy #timeline deep links */}
      <span id="timeline" className="absolute -top-10" />

      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header matching Amna's Portfolio Style */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>03 / Academic Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Academic <span className="text-emerald-400">Education</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Every academic milestone represents disciplined problem solving and strong fundamentals in Computer Science.
          </p>
        </div>

        {/* Education Cards Grid (Amna's Portfolio Responsive Layout: 1 col on mobile, 2 on md, 3 on xl) */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 md:gap-7">
          {educationItems.map((item, index) => {
            const gradient = EDUCATION_GRADIENTS[index % EDUCATION_GRADIENTS.length];
            const watermark = String(index + 1).padStart(2, "0");

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 35, rotate: index % 2 ? 1.5 : -1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 95, damping: 16, delay: index * 0.12 }}
                whileHover={{ y: -8, rotate: index % 2 ? -0.5 : 0.5 }}
                className={`education-card glass-panel relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-border/80 bg-gradient-to-br ${gradient} p-6 sm:p-8 transition-all duration-500 hover:border-emerald-500/50 hover:shadow-[0_0_35px_-8px_rgba(16,185,129,0.3)]`}
              >
                {/* Ambient glow reflection in corner */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col">
                  {/* Top Row: Icon Badge & Large Watermark Index */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-[0_0_22px_-8px_rgba(16,185,129,0.6)]">
                      <GraduationCap size={23} />
                    </span>
                    <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-emerald-400/80 select-none">
                      {watermark}
                    </span>
                  </div>

                  {/* Year with Sparkle Icon */}
                  <p className="mt-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
                    <Sparkles size={14} className="text-emerald-400 animate-pulse" />
                    <span>{item.period}</span>
                  </p>

                  {/* Degree / Certificate Title */}
                  <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-foreground">
                    {item.title}
                  </h3>

                  {/* Status / Grade Badge */}
                  {item.badge && (
                    <p className="mt-3 text-sm font-semibold text-emerald-300">
                      {item.badge}
                    </p>
                  )}

                  {/* Institution & Location */}
                  <div className="mt-1 flex flex-col text-sm leading-relaxed text-muted-foreground">
                    <span className="font-medium text-zinc-300">{item.organization}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin size={12} className="text-emerald-400/70" />
                      {item.location}
                    </span>
                  </div>

                  {/* Complete Academic Details & Description (Preserved 100%) */}
                  <p className="mt-4 text-xs sm:text-sm text-zinc-300/90 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet Points with Checkmarks (Nothing omitted) */}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2 border-t border-border/40 pt-4">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Animated Bottom Glow Progress Bar (Same as Amna's site) */}
                <div className="relative z-10 mt-8 h-1 w-20 overflow-hidden rounded-full bg-emerald-500/15">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.25 + index * 0.12 }}
                    className="h-full rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
