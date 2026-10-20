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

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/users/pavel-hasan-joy/repos?sort=pushed&per_page=30", {
      headers: {
        "User-Agent": "Pavel-Portfolio-Sync",
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 0 },
    });

    // Base 4 projects specified by user
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

    // Enrich the 4 designated projects with real-time GitHub repository data
    const enrichedProjects: Project[] = targetProjects.map((project) => {
      // Find matching repo name
      const repoNameFromUrl = project.githubUrl.split("/").pop()?.toLowerCase();
      const repo = repoNameFromUrl ? repoMap.get(repoNameFromUrl) : undefined;

      if (repo) {
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

    return NextResponse.json({
      success: true,
      source: "github-live",
      projectsCount: enrichedProjects.length,
      lastSynced: new Date().toISOString(),
      projects: enrichedProjects,
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
