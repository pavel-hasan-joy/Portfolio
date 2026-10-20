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
  fork: boolean;
}

// Helpers to format repo names and categories
function formatRepoTitle(name: string): string {
  // Replace hyphens/underscores with spaces unless it's CamelCase
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function inferCategory(repo: GitHubRepo): string {
  const nameLower = repo.name.toLowerCase();
  const langLower = (repo.language || "").toLowerCase();

  if (nameLower.includes("climate") || nameLower.includes("space") || nameLower.includes("satellite")) {
    return "AI & Geospatial";
  }
  if (nameLower.includes("search") || nameLower.includes("ir") || nameLower.includes("algorithm")) {
    return "Search & Systems";
  }
  if (nameLower.includes("face") || nameLower.includes("vision") || nameLower.includes("detect")) {
    return "Computer Vision";
  }
  if (nameLower.includes("leetcode") || langLower === "c" || langLower === "c++") {
    return "Algorithms & Systems";
  }
  if (langLower === "typescript" || langLower === "javascript" || nameLower.includes("setu") || nameLower.includes("portfolio")) {
    return "Full-Stack";
  }
  return "Engineering Project";
}

function getColorForCategory(cat: string): string {
  switch (cat) {
    case "AI & Geospatial":
      return "#10b981";
    case "Search & Systems":
      return "#f59e0b";
    case "Computer Vision":
      return "#8b5cf6";
    case "Algorithms & Systems":
      return "#06b6d4";
    case "Full-Stack":
      return "#3b82f6";
    default:
      return "#10b981";
  }
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

    if (!res.ok) {
      // If GitHub rate limit or network issue occurs, return curated projects gracefully
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

    const repos: GitHubRepo[] = await res.json();

    // Map of curated projects by lowercase slug or repo name
    const curatedMap = new Map<string, Project>();
    for (const project of siteContent.projects) {
      curatedMap.set(project.slug.toLowerCase(), project);
      const repoNameFromUrl = project.githubUrl.split("/").pop()?.toLowerCase();
      if (repoNameFromUrl) {
        curatedMap.set(repoNameFromUrl, project);
      }
    }

    // Skip special meta-repos
    const ignoredRepos = new Set(["pavel-hasan-joy", "first.repository"]);

    const liveProjects: Project[] = [];
    const matchedCuratedSlugs = new Set<string>();

    for (const repo of repos) {
      const lowerName = repo.name.toLowerCase();
      if (ignoredRepos.has(lowerName)) continue;

      // Check if this matches a curated project
      const matchedCurated = curatedMap.get(lowerName);

      if (matchedCurated) {
        matchedCuratedSlugs.add(matchedCurated.slug);
        liveProjects.push({
          ...matchedCurated,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.pushed_at || repo.updated_at,
          language: repo.language || matchedCurated.toolsUsed[0],
          liveUrl: repo.homepage || matchedCurated.liveUrl,
          githubUrl: repo.html_url,
          isLiveRepo: true,
          hasCaseStudy: true,
        });
      } else {
        // Dynamically discovered repository!
        const category = inferCategory(repo);
        const tools: string[] = [];
        if (repo.language) tools.push(repo.language);
        if (repo.topics && repo.topics.length > 0) tools.push(...repo.topics);
        tools.push("Git", "GitHub");

        liveProjects.push({
          slug: repo.name.toLowerCase(),
          title: formatRepoTitle(repo.name),
          tagline: repo.description || "Active open-source repository on GitHub.",
          category: category,
          summary: repo.description || `Active open-source repository written primarily in ${repo.language || "code"}. Maintained and version-controlled on GitHub.`,
          role: "Creator & Maintainer",
          githubUrl: repo.html_url,
          liveUrl: repo.homepage || undefined,
          featured: false,
          problem: "Solving modern engineering challenges with disciplined algorithms and modular architecture.",
          solution: `Engineered using ${repo.language || "modern technologies"} with clean modular code organization.`,
          impact: "Open-source codebase available for review, replication, and collaboration.",
          keyFeatures: [
            `Primary Language: ${repo.language || "Multi-language"}`,
            `Direct GitHub Repository: github.com/${repo.full_name}`,
            repo.pushed_at ? `Latest Push: ${new Date(repo.pushed_at).toLocaleDateString()}` : "Active development",
          ],
          toolsUsed: tools,
          accentColor: getColorForCategory(category),
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.pushed_at || repo.updated_at,
          language: repo.language || "Code",
          isLiveRepo: true,
          hasCaseStudy: false,
        });
      }
    }

    // Include any curated projects that were not in the recent push list
    for (const project of siteContent.projects) {
      if (!matchedCuratedSlugs.has(project.slug)) {
        liveProjects.push({
          ...project,
          hasCaseStudy: true,
          isLiveRepo: true,
        });
      }
    }

    return NextResponse.json({
      success: true,
      source: "github-live",
      totalRepos: repos.length,
      projectsCount: liveProjects.length,
      lastSynced: new Date().toISOString(),
      projects: liveProjects,
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
