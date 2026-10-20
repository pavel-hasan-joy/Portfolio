"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  ChevronRight,
  Star,
  GitFork,
  RefreshCw,
  Clock,
  Sparkles,
  GitBranch,
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

function getLanguageColor(lang?: string): string {
  switch (lang?.toLowerCase()) {
    case "python":
      return "#3572A5";
    case "typescript":
      return "#3178c6";
    case "javascript":
      return "#f1e05a";
    case "c":
      return "#555555";
    case "c++":
      return "#f34b7d";
    case "java":
      return "#b07219";
    case "html":
      return "#e34c26";
    default:
      return "#10b981";
  }
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(siteContent.projects);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<"idle" | "success" | "fallback">("idle");

  // Fetch live repositories from GitHub on load/refresh
  const fetchLiveGitHubProjects = useCallback(async (isManual = false) => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/github/projects", {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.projects && Array.isArray(data.projects)) {
          setProjects(data.projects);
          setSyncStatus(data.source === "github-live" ? "success" : "fallback");
          setLastSyncedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        }
      }
    } catch (err) {
      console.warn("Failed to sync live GitHub projects, using cached content:", err);
      setSyncStatus("fallback");
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveGitHubProjects();
  }, [fetchLiveGitHubProjects]);

  // Compute categories dynamically from current projects
  const availableCategories = React.useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 mb-2">
          // 03. FEATURED WORK
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Featured Engineering Projects
        </h2>
        <div className="w-12 h-1 bg-emerald-500 rounded-full mt-3" />
        <p className="max-w-xl text-sm text-zinc-400 mt-4 leading-relaxed">
          Real-world applications engineered from end to end — automatically analyzed and synced live from GitHub upon every visit.
        </p>

        {/* Live GitHub Sync Status Indicator */}
        <div className="flex items-center gap-2.5 mt-5 px-3.5 py-1.5 rounded-full bg-zinc-900/70 border border-zinc-800 text-xs font-mono backdrop-blur-md">
          <span className={`w-2 h-2 rounded-full ${isSyncing ? "bg-cyan-400 animate-ping" : "bg-emerald-400 animate-pulse"}`} />
          <span className="text-zinc-300">
            {isSyncing ? "Analyzing GitHub Repositories..." : "GitHub Live Synced"}
          </span>
          {lastSyncedTime && !isSyncing && (
            <span className="text-zinc-500 hidden sm:inline">
              · Synced at {lastSyncedTime}
            </span>
          )}
          <button
            onClick={() => fetchLiveGitHubProjects(true)}
            disabled={isSyncing}
            className="ml-1 p-1 rounded-md text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-colors disabled:opacity-40"
            title="Force refresh live repositories from GitHub"
            aria-label="Refresh GitHub Repositories"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-emerald-400" : ""}`} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {availableCategories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                isSelected
                  ? "text-emerald-400 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200 bg-zinc-900/40 backdrop-blur-md border border-white/[0.08]"
              }`}
            >
              {cat}
              {isSelected && (
                <motion.div
                  layoutId="active-project-filter"
                  className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/30 rounded-xl -z-10 backdrop-blur-md"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.article
              layout
              key={project.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-between rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-white/[0.08] hover:border-cyan-500/40 p-6 transition-all duration-300 group shadow-2xl hover:shadow-[0_0_30px_rgba(0,217,255,0.08)] hover:-translate-y-1"
            >
              <div>
                {/* Header with category, GitHub metrics, and links */}
                <div className="flex items-center justify-between mb-4 gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                      {project.category}
                    </span>

                    {/* Language Badge if available */}
                    {project.language && (
                      <span className="flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-300">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: getLanguageColor(project.language) }}
                        />
                        <span>{project.language}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Stars & Forks if present */}
                    {typeof project.stars === "number" && project.stars > 0 && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{project.stars}</span>
                      </span>
                    )}
                    {typeof project.forks === "number" && project.forks > 0 && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/60">
                        <GitFork className="w-3 h-3" />
                        <span>{project.forks}</span>
                      </span>
                    )}

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

              {/* Card Footer: Role & Case Study / GitHub Link */}
              <div className="pt-4 border-t border-zinc-800/80 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span>Role:</span>
                    <span className="text-zinc-200 font-semibold">{project.role}</span>
                  </div>

                  {project.updatedAt && (
                    <span className="flex items-center gap-1 text-[10px] text-zinc-500" title={`Last pushed: ${project.updatedAt}`}>
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span>{formatRelativeTime(project.updatedAt)}</span>
                    </span>
                  )}
                </div>

                {project.hasCaseStudy ? (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-zinc-800/80 hover:bg-emerald-500/10 text-xs text-zinc-200 hover:text-emerald-400 border border-zinc-700/60 hover:border-emerald-500/30 transition-all font-medium"
                  >
                    <span>Explore Case Study</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ) : (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-zinc-800/80 hover:bg-cyan-500/10 text-xs text-zinc-200 hover:text-cyan-400 border border-zinc-700/60 hover:border-cyan-500/30 transition-all font-medium"
                  >
                    <span className="flex items-center gap-1.5">
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>View on GitHub</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
