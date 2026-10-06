"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  ArrowRight,
  Layers,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { siteContent, Project } from "@/data/content";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "AI & Geospatial", "Full-Stack", "Computer Vision"];

  const filteredProjects = selectedCategory === "All"
    ? siteContent.projects
    : siteContent.projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
          Portfolio
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Featured Engineering Projects
        </h2>
        <div className="w-12 h-1 bg-emerald-500 rounded-full mt-3" />
        <p className="max-w-xl text-sm text-zinc-400 mt-4 leading-relaxed">
          Real-world applications engineered from end to end — ranging from NASA satellite climate intelligence to campus job networks and browser AI.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                isSelected
                  ? "text-emerald-400 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200 bg-zinc-900/60 border border-zinc-800"
              }`}
            >
              {cat}
              {isSelected && (
                <motion.div
                  layoutId="active-project-filter"
                  className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/30 rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.article
              layout
              key={project.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-between rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-emerald-500/40 p-6 transition-all group shadow-xl hover:shadow-emerald-500/5"
            >
              <div>
                {/* Header with category and links */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                      title="GitHub Repository"
                      aria-label={`${project.title} GitHub`}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                        title="Live Deployment"
                        aria-label={`${project.title} Live URL`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {project.summary}
                </p>

                {/* Key Features Bullet Points */}
                <ul className="space-y-1.5 mb-6 text-xs text-zinc-300 font-sans">
                  {project.keyFeatures.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer: Role & Case Study Link */}
              <div className="pt-4 border-t border-zinc-800/80 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Role:</span>
                  <span className="text-zinc-200 font-semibold">{project.role}</span>
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-zinc-800/80 hover:bg-emerald-500/10 text-xs text-zinc-200 hover:text-emerald-400 border border-zinc-700/60 hover:border-emerald-500/30 transition-all font-medium"
                >
                  <span>Explore Case Study</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
