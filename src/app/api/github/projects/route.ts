import { NextResponse } from "next/server";
import { siteContent, Project } from "@/data/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  updated_at: string;
  homepage: string | null;
  topics: string[];
}

function cleanTitle(repoName: string): string {
  const customNames: Record<string, string> = {
    "bangla-search-engine": "Bangla & Banglish Search Engine",
    "face-idntification": "Face Identification & Biometric HUD",
    "first.repository": "First Learning Repository",
    "blackbox": "BlackBox",
    "climate-lens": "Climate Lens — Bangladesh",
    "ulab-setu": "ULAB Setu",
    "leetcode-solutions": "LeetCode Solutions & Algorithms",
  };

  const lower = repoName.toLowerCase();
  if (customNames[lower]) return customNames[lower];

  return repoName
    .replace(/[-_.]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function inferCategory(repoName: string, lang: string | null): string {
  const lowerName = repoName.toLowerCase();
  if (lowerName.includes("search") || lowerName.includes("engine")) return "Search & Systems";
  if (lowerName.includes("face") || lowerName.includes("vision")) return "Computer Vision & AI";
  if (lowerName.includes("leetcode") || lowerName.includes("algorithm")) return "Algorithms & Systems";
  if (lowerName.includes("climate") || lowerName.includes("lens")) return "AI & Geospatial";
  if (lowerName.includes("setu") || lowerName.includes("portal") || lowerName.includes("web")) return "Full-Stack";
  if (lowerName.includes("box") || lowerName.includes("telemetry")) return "Systems & Observability";

  if (lang === "Python") return "Machine Learning & Systems";
  if (lang === "TypeScript" || lang === "JavaScript") return "Full-Stack";
  if (lang === "C" || lang === "C++" || lang === "Java") return "Systems & Algorithms";
  return "Engineering Project";
}

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/users/pavel-hasan-joy/repos?sort=pushed&per_page=30", {
      headers: {
        "User-Agent": "Pavel-Portfolio-Sync",
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 0 },
    });

    const targetProjects = [...siteContent.projects];

    if (!res.ok) {
      return NextResponse.json({
        success: true,
        source: "fallback",
        projects: targetProjects.map((p) => ({
          ...p,
          hasCaseStudy: true,
          isLiveRepo: true,
        })),
        lastSynced: new Date().toISOString(),
      });
    }

    const repos: GitHubRepo[] = await res.json();

    // Map repos by lowercase name
    const repoMap = new Map<string, GitHubRepo>();
    for (const r of repos) {
      repoMap.set(r.name.toLowerCase(), r);
    }

    // Keep track of which repos have been matched with siteContent
    const matchedRepoNames = new Set<string>();

    // 1. Enrich existing siteContent projects with live GitHub repository data
    const enrichedProjects: Project[] = targetProjects.map((project) => {
      const repoNameFromUrl = project.githubUrl.split("/").pop()?.toLowerCase();
      const repo = repoNameFromUrl ? repoMap.get(repoNameFromUrl) : undefined;

      if (repo) {
        matchedRepoNames.add(repo.name.toLowerCase());
        return {
          ...project,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.pushed_at || repo.updated_at,
          language: repo.language || project.toolsUsed[0],
          liveUrl: project.liveUrl || repo.homepage || undefined,
          githubUrl: repo.html_url,
          isLiveRepo: true,
          hasCaseStudy: true,
        };
      }

      return {
        ...project,
        hasCaseStudy: true,
        isLiveRepo: true,
      };
    });

    // 2. Discover and append any additional public repositories from GitHub
    const ignoredRepos = new Set(["pavel-hasan-joy", "portfolio"]);
    const additionalProjects: Project[] = [];

    for (const repo of repos) {
      const lower = repo.name.toLowerCase();
      if (ignoredRepos.has(lower) || matchedRepoNames.has(lower)) {
        continue;
      }

      additionalProjects.push({
        slug: repo.name.toLowerCase().replace(/[^a-z0-9_-]/g, "-"),
        title: cleanTitle(repo.name),
        tagline: repo.description || `Open-source ${repo.language || "software"} repository published on GitHub.`,
        category: inferCategory(repo.name, repo.language),
        summary: repo.description || "An open-source repository engineered by Pavel Hasan Joy.",
        role: "Software Engineer",
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || undefined,
        featured: false,
        problem: repo.description || "Open-source software implementation.",
        solution: "Engineered clean, modular code following software engineering best practices.",
        impact: "Publicly accessible on GitHub for collaborative development and code reuse.",
        keyFeatures: [
          repo.description || "Open-source software implementation",
          `Primary language: ${repo.language || "Code"}`,
          repo.forks_count > 0 ? `${repo.forks_count} community forks` : "Continuous version control with Git",
        ],
        toolsUsed: [repo.language || "Code", ...(repo.topics || [])].filter(Boolean),
        accentColor: "#10b981",
        previewType: "none",
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.pushed_at || repo.updated_at,
        language: repo.language || undefined,
        isLiveRepo: true,
        hasCaseStudy: false,
      });
    }

    const allProjects = [...enrichedProjects, ...additionalProjects];

    return NextResponse.json({
      success: true,
      source: "github-live",
      projectsCount: allProjects.length,
      lastSynced: new Date().toISOString(),
      projects: allProjects,
    });
  } catch (error) {
    console.error("Error in /api/github/projects:", error);
    return NextResponse.json({
      success: true,
      source: "fallback",
      projects: siteContent.projects.map((p) => ({
        ...p,
        hasCaseStudy: true,
        isLiveRepo: true,
      })),
      lastSynced: new Date().toISOString(),
    });
  }
}
