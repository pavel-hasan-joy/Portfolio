"use client";

import React from "react";
import { motion } from "motion/react";
import { Trophy, Award, Calendar, MapPin, CheckCircle2, Sparkles } from "lucide-react";
import { siteContent } from "@/data/content";

const ACHIEVEMENT_GRADIENTS = [
  "from-amber-400/15 via-emerald-950/20 to-card/90",
  "from-cyan-400/15 via-emerald-950/20 to-card/90",
  "from-purple-400/15 via-emerald-950/20 to-card/90",
];

export function AchievementsSection() {
  const achievementItems = siteContent.timeline.filter((item) => item.type === "achievement");

  return (
    <section id="achievements" className="py-24 sm:py-32 relative overflow-hidden bg-zinc-950/40">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>04 / Competitions & Honors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Honors & <span className="text-amber-400">Achievements</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Competitive hackathon victories and global technological challenges proving real-world problem solving under tight execution limits.
          </p>
        </div>

        {/* Responsive Grid for Achievements (2 balanced cards for the 2 flagship achievements) */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-8 max-w-5xl mx-auto">
          {achievementItems.map((item, index) => {
            const gradient = ACHIEVEMENT_GRADIENTS[index % ACHIEVEMENT_GRADIENTS.length];
            const watermark = String(index + 1).padStart(2, "0");

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 35, rotate: index % 2 ? 1.2 : -1.2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 95, damping: 16, delay: index * 0.15 }}
                whileHover={{ y: -8, rotate: index % 2 ? -0.5 : 0.5 }}
                className={`glass-panel relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-border/80 bg-gradient-to-br ${gradient} p-6 sm:p-8 transition-all duration-500 hover:border-amber-500/50 hover:shadow-[0_0_35px_-8px_rgba(245,158,11,0.25)]`}
              >
                {/* Ambient glow in corner */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col">
                  {/* Top Row: Trophy Icon & Large Watermark */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-500/40 bg-amber-500/10 text-amber-400 shadow-[0_0_22px_-8px_rgba(245,158,11,0.5)]">
                      {index === 0 ? <Trophy size={23} /> : <Award size={23} />}
                    </span>
                    <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-amber-400/80 select-none">
                      {watermark}
                    </span>
                  </div>

                  {/* Year & Badge row */}
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-2">
                    <p className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400">
                      <Sparkles size={14} className="text-amber-400 animate-pulse" />
                      <span>{item.period}</span>
                    </p>
                    {item.badge && (
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Achievement Title */}
                  <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-foreground">
                    {item.title}
                  </h3>

                  {/* Organization & Location */}
                  <div className="mt-1 flex flex-col text-sm leading-relaxed text-muted-foreground">
                    <span className="font-medium text-zinc-300">{item.organization}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin size={12} className="text-amber-400/70" />
                      {item.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs sm:text-sm text-zinc-300/90 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullets */}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2 border-t border-border/40 pt-4">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Animated Bottom Glow Progress Bar */}
                <div className="relative z-10 mt-8 h-1 w-20 overflow-hidden rounded-full bg-amber-500/15">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.25 + index * 0.12 }}
                    className="h-full rounded-full bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.9)]"
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

export default AchievementsSection;
