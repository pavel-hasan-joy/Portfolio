"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Binary,
  Cpu,
  Coffee,
  GitBranch,
  Code2,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { siteContent } from "@/data/content";

const iconMap: Record<string, React.ElementType> = {
  Binary,
  Cpu,
  Coffee,
  GitBranch,
  Github: GithubIcon,
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
          Technical Arsenal
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Core Languages & Version Control
        </h2>
        <div className="w-12 h-1 bg-emerald-500 rounded-full mt-3" />
        <p className="max-w-xl text-sm text-zinc-400 mt-4 leading-relaxed">
          Mastering computational fundamentals through low-level memory control, object-oriented systems design, and collaborative repository engineering.
        </p>
      </div>

      <div className="space-y-12">
        {siteContent.techStack.map((group, groupIdx) => (
          <div key={group.category} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <h3 className="text-lg font-bold text-zinc-200 tracking-tight">
                {group.category}
              </h3>
              <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
                ({group.description})
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {group.skills.map((skill, skillIdx) => {
                const IconComponent = iconMap[skill.icon] || Code2;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: skillIdx * 0.1 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-emerald-500/40 transition-all flex flex-col justify-between group shadow-lg shadow-black/20"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-zinc-800/80 text-emerald-400 flex items-center justify-center border border-zinc-700/80 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                          {skill.level}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                        {skill.name}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                        {skill.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                      <span className="flex items-center gap-1 text-emerald-500/80">
                        <CheckCircle2 className="w-3 h-3" /> Core Foundation
                      </span>
                      <span>Verified</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
