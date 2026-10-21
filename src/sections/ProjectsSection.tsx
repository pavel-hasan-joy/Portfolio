"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  Star,
  GitFork,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Terminal,
  Activity,
  Code2,
  Cpu,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { siteContent, Project } from "@/data/content";

function formatRelativeTime(dateString?: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSec < 60) return "Just now";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)}d ago`;

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return "";
  }
}

const FALLBACK_GRADIENTS = [
  "radial-gradient(circle at 75% 30%, rgba(168, 85, 247, 0.22), transparent 60%), linear-gradient(135deg, rgba(6, 182, 212, 0.15), #07090e 75%)",
  "radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.25), transparent 60%), linear-gradient(135deg, rgba(20, 184, 166, 0.15), #07090e 75%)",
  "radial-gradient(circle at 75% 75%, rgba(56, 189, 248, 0.22), transparent 60%), linear-gradient(135deg, rgba(6, 182, 212, 0.12), #07090e 75%)",
  "radial-gradient(circle at 50% 20%, rgba(6, 182, 212, 0.25), transparent 60%), linear-gradient(135deg, rgba(59, 130, 246, 0.12), #07090e 75%)",
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const hasImage = project.previewType === "image" && Boolean(project.previewImage);
  const isDynamicStats = project.previewType === "dynamic-stats";
  const isNoImage = project.previewType === "none" || (!hasImage && !isDynamicStats);
  const gradientBg = FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 25, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
      whileHover={{ y: -6 }}
      className="group glass-panel relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/60 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_35px_-8px_rgba(6,182,212,0.3)]"
    >
      {/* =========================================================================
          Top Media Banner (Amna's Portfolio Style with Watermark & Category Pill)
          ========================================================================= */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-zinc-950/90">
        {/* Case 1: Standard Image Preview (ULAB Setu & Climate Lens) */}
        {hasImage && (
          <>
            <img
              src={project.previewImage}
              alt={`${project.title} preview`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
          </>
        )}

        {/* Case 2: LeetCode Dynamic Stats Card (Auto-upgraded from GitHub / LeetCode) */}
        {isDynamicStats && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-950/30 via-zinc-950 to-zinc-950 p-3 sm:p-4">
            {project.previewImage ? (
              <img
                src={project.previewImage}
                alt={`${project.title} Live Stats`}
                loading="lazy"
                className="max-h-full w-auto object-contain filter drop-shadow-lg transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <Activity className="w-10 h-10 text-cyan-400 mb-2 animate-pulse" />
                <span className="text-xs font-mono text-cyan-300">Daily Algorithmic Solutions</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Case 3: No image needed (BlackBox, Bangla Search Engine, Face ID, etc.) */}
        {isNoImage && (
          <div
            className="absolute inset-0 flex items-center justify-center p-6 overflow-hidden transition-transform duration-700 group-hover:scale-105"
            style={{ background: gradientBg }}
          >
            {/* Ambient circuit & grid overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2 shadow-[0_0_20px_-3px_rgba(6,182,212,0.3)] group-hover:border-cyan-400/50 transition-colors">
                {project.slug.includes("search") ? (
                  <Code2 className="w-6 h-6" />
                ) : project.slug.includes("face") ? (
                  <Cpu className="w-6 h-6" />
                ) : (
                  <Terminal className="w-6 h-6" />
                )}
              </div>
              <span className="text-xs font-mono text-zinc-300 font-medium tracking-wide">
                {project.category}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 mt-1 max-w-[220px] truncate">
                {project.toolsUsed.join(" · ") || "Open-source codebase"}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Category Pill in Top-Right */}
        <div className="absolute right-3.5 top-3.5 flex items-center gap-2">
          {isDynamicStats && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-950/80 px-2.5 py-1 text-[11px] font-mono font-medium text-cyan-400 border border-cyan-500/40 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Live Sync
            </span>
          )}
          <span className="rounded-full bg-zinc-950/80 px-3 py-1 text-xs font-medium text-zinc-200 border border-white/10 backdrop-blur-md">
            {project.category}
          </span>
        </div>
      </div>

      {/* =========================================================================
          Card Body Content (Clean & Informative, like Amna's site)
          ========================================================================= */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          {/* Project Title */}
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-cyan-400">
            {project.title}
          </h3>

          {/* Project Short Details & Summary */}
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {project.summary || project.tagline}
          </p>

          {/* Tech Stack Pills */}
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
            {project.toolsUsed.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="rounded-md bg-cyan-500/10 px-2.5 py-0.5 text-xs font-mono text-cyan-400 border border-cyan-500/20"
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* GitHub Metadata Badges (if live-synced) */}
          {((project.stars !== undefined && project.stars > 0) || project.updatedAt) && (
            <div className="mt-3 flex items-center gap-3 text-[11px] font-mono text-zinc-400">
              {project.stars !== undefined && project.stars > 0 && (
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400/20" />
                  {project.stars}
                </span>
              )}
              {project.forks !== undefined && project.forks > 0 && (
                <span className="flex items-center gap-1 text-zinc-400">
                  <GitFork className="w-3 h-3" />
                  {project.forks}
                </span>
              )}
              {project.updatedAt && (
                <span className="text-zinc-500">
                  Synced {formatRelativeTime(project.updatedAt)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* =========================================================================
            Bottom Action Buttons
            ========================================================================= */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2.5 pt-4 border-t border-border/70">
          <div className="flex items-center gap-2">
            {/* GitHub Repo Button */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 hover:bg-cyan-500/10 hover:border-cyan-500/40 px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-200"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}

            {/* Live Demo Button (if available) */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-black font-semibold px-3 py-1.5 text-xs transition-all duration-200 shadow-sm shadow-cyan-500/20"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          {/* Case Study Details Link or Direct Repository Link */}
          {project.hasCaseStudy ? (
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-cyan-400 transition-colors ml-auto group/link"
            >
              <span>Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
            </Link>
          ) : (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-cyan-400 transition-colors ml-auto group/link"
            >
              <span>Repository</span>
              <ExternalLink className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(siteContent.projects);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(null);

  // Extract unique categories for filter tabs
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) {
        set.add(p.category);
      }
    });
    return ["All", ...Array.from(set)];
  }, [projects]);

  // Reset expansion state when category changes
  useEffect(() => {
    setIsExpanded(false);
  }, [selectedCategory]);

  // Fetch live repositories from GitHub on mount (includes all public repos)
  const fetchLiveGitHubProjects = useCallback(async () => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/github/projects", {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.projects && Array.isArray(data.projects)) {
          setProjects(data.projects);
          setLastSyncedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        }
      }
    } catch (err) {
      console.warn("Failed to sync live GitHub projects, using cached content:", err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveGitHubProjects();
  }, [fetchLiveGitHubProjects]);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  // Show only 4 projects initially, or all if user clicked "More Projects"
  const visibleProjects = useMemo(() => {
    if (isExpanded) {
      return filteredProjects;
    }
    return filteredProjects.slice(0, 4);
  }, [filteredProjects, isExpanded]);

  const hasRemaining = filteredProjects.length > 4;

  return (
    <section id="projects" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background radial ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Featured <span className="text-cyan-400">Projects</span>
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl leading-relaxed">
              Production-grade systems, high-performance algorithms, and live web applications built with rigorous software architecture and clean code.
            </p>
          </div>

          {/* GitHub Live Sync Trigger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchLiveGitHubProjects}
              disabled={isSyncing}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card/80 hover:bg-cyan-500/10 hover:border-cyan-500/30 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh live GitHub stars & repository activity"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-cyan-400" : ""}`} />
              <span>{isSyncing ? "Syncing..." : lastSyncedTime ? `Synced ${lastSyncedTime}` : "Sync GitHub"}</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills (Amna's Portfolio Style with Animated Spring Indicator) */}
        <div
          role="group"
          aria-label="Filter projects by category"
          className="mb-10 flex flex-wrap items-center gap-2 sm:gap-2.5"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={isSelected}
                className={`relative rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  isSelected ? "text-black font-semibold" : "text-muted-foreground hover:text-foreground bg-card/50 border border-border/80"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="project-cat-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 shadow-[0_0_24px_-4px_rgba(6,182,212,0.6)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Project Cards Responsive Grid (2x2 Balanced Layout) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* =========================================================================
            Bottom Controls: Counter & More Projects Option (Loads ALL remaining on click)
            ========================================================================= */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          {/* Status text */}
          <p className="text-xs sm:text-sm font-mono text-muted-foreground" aria-live="polite">
            {isExpanded
              ? `Showing all ${filteredProjects.length} projects`
              : `Showing ${visibleProjects.length} of ${filteredProjects.length} projects`}
          </p>

          {/* More Projects Button: Click loads ALL remaining projects at once */}
          {hasRemaining && (
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-cyan-500/40 bg-card hover:bg-cyan-500/15 hover:border-cyan-400 text-xs sm:text-sm font-semibold text-foreground transition-all duration-300 shadow-[0_0_25px_-5px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.4)] cursor-pointer active:scale-95"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 text-cyan-400" />
                  <span>Show Less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
                  <span>More Projects ({filteredProjects.length - 4} more)</span>
                </>
              )}
            </button>
          )}

          {/* Secondary link to GitHub */}
          <a
            href="https://github.com/pavel-hasan-joy?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-cyan-400 transition-colors mt-1"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>View all public repositories on GitHub</span>
            <ArrowRight className="w-3 h-3 ml-0.5 text-cyan-400" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
