"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Star,
  GitFork,
  RefreshCw,
  Clock,
  ArrowRight,
  Layers,
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
    default:
      return "#10b981";
  }
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(siteContent.projects);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch live repositories from GitHub on load/refresh
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

  // Compute categories dynamically
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  // Horizontal scroll buttons
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = 380;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cards = scrollRef.current.children;
      if (cards[index]) {
        (cards[index] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
        setActiveIndex(index);
      }
    }
  };

  // Track active card while scrolling
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const center = scrollLeft + clientWidth / 2;
    const children = Array.from(scrollRef.current.children) as HTMLElement[];

    let closestIdx = 0;
    let minDistance = Infinity;

    children.forEach((child, idx) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setActiveIndex(closestIdx);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
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
          4 flagship engineering systems — presented horizontally and synced live with GitHub repositories.
        </p>

        {/* Live GitHub Sync Status & Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/70 border border-zinc-800 text-xs font-mono backdrop-blur-md">
            <span className={`w-2 h-2 rounded-full ${isSyncing ? "bg-cyan-400 animate-ping" : "bg-emerald-400 animate-pulse"}`} />
            <span className="text-zinc-300">
              {isSyncing ? "Syncing GitHub Repos..." : "GitHub Live Synced"}
            </span>
            {lastSyncedTime && !isSyncing && (
              <span className="text-zinc-500 hidden sm:inline">
                · {lastSyncedTime}
              </span>
            )}
            <button
              onClick={() => fetchLiveGitHubProjects()}
              disabled={isSyncing}
              className="ml-1 p-1 rounded-md text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-colors disabled:opacity-40"
              title="Refresh GitHub Repositories"
              aria-label="Refresh GitHub Repositories"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-emerald-400" : ""}`} />
            </button>
          </div>

          {/* Previous / Next Arrow Controls */}
          <div className="flex items-center gap-1 bg-zinc-900/80 border border-zinc-800 rounded-xl p-1">
            <button
              onClick={() => scroll("left")}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Scroll Left"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-zinc-500 px-2">
              0{activeIndex + 1} / 0{filteredProjects.length}
            </span>
            <button
              onClick={() => scroll("right")}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Scroll Right"
              aria-label="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveIndex(0);
                if (scrollRef.current) scrollRef.current.scrollLeft = 0;
              }}
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

      {/* Horizontal Carousel Track */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-2 px-2 scrollbar-none focus:outline-none cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {filteredProjects.map((project, idx) => (
            <article
              key={project.slug}
              className="w-[300px] sm:w-[360px] lg:w-[410px] shrink-0 snap-center flex flex-col justify-between rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-white/[0.08] hover:border-cyan-500/40 p-6 transition-all duration-300 group shadow-2xl hover:shadow-[0_0_30px_rgba(0,217,255,0.08)] hover:-translate-y-1"
            >
              <div>
                {/* Header with category, language and links */}
                <div className="flex items-center justify-between mb-4 gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                      {project.category}
                    </span>

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
                <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                  {project.summary}
                </p>

                {/* Key Features Bullet Points */}
                <ul className="space-y-1.5 mb-6 text-xs text-zinc-300 font-sans">
                  {project.keyFeatures.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span className="line-clamp-2">{feat}</span>
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

                <Link
                  href={`/projects/${project.slug}`}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-zinc-800/80 hover:bg-emerald-500/10 text-xs text-zinc-200 hover:text-emerald-400 border border-zinc-700/60 hover:border-emerald-500/30 transition-all font-medium"
                >
                  <span>Explore Case Study</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Interactive Dot Navigation Indicators */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {filteredProjects.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to project ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === i
                ? "w-8 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400"
                : "w-2 h-2 bg-zinc-700 hover:bg-zinc-500"
            }`}
          />
        ))}
      </div>

      {/* Swipe/Scroll Instruction */}
      <p className="text-center text-[11px] font-mono text-zinc-500 mt-3">
        ← Swipe or scroll horizontally to explore all 4 projects →
      </p>
    </section>
  );
}
