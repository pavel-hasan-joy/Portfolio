import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteContent, Project } from "@/data/content";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Award,
  Layers,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export function generateStaticParams() {
  return siteContent.projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = siteContent.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Back button navigation */}
      <div className="mb-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
          <span>{project.category}</span>
          <span>·</span>
          <span>Role: {project.role}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-100 mb-4">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl">
          {project.tagline}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-700/80 text-xs font-semibold transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Deployment</span>
            </a>
          )}
        </div>
      </header>

      {/* Structured Case Study Sections */}
      <div className="space-y-12">
        {/* Problem Breakdown */}
        <section className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
          <div className="flex items-center gap-2.5 text-amber-400 text-sm font-bold uppercase tracking-wider font-mono mb-3">
            <AlertTriangle className="w-4 h-4" />
            <h2>The Challenge & Problem</h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {project.problem}
          </p>
        </section>

        {/* Engineered Solution */}
        <section className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
          <div className="flex items-center gap-2.5 text-emerald-400 text-sm font-bold uppercase tracking-wider font-mono mb-3">
            <Lightbulb className="w-4 h-4" />
            <h2>The Solution & Architecture</h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
            {project.solution}
          </p>

          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
            Key Architectural Highlights:
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
            {project.keyFeatures.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Technology Stack & Tools Used */}
        <section className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
          <div className="flex items-center gap-2.5 text-cyan-400 text-sm font-bold uppercase tracking-wider font-mono mb-4">
            <Layers className="w-4 h-4" />
            <h2>Technologies & APIs Leveraged</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.toolsUsed.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1.5 rounded-xl bg-zinc-800/80 text-zinc-200 border border-zinc-700/60 text-xs font-mono"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* Real-World Impact */}
        <section className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
          <div className="flex items-center gap-2.5 text-emerald-400 text-sm font-bold uppercase tracking-wider font-mono mb-3">
            <Award className="w-4 h-4" />
            <h2>Result & Impact</h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {project.impact}
          </p>
        </section>
      </div>

      {/* Bottom Back Navigation */}
      <div className="mt-16 pt-8 border-t border-zinc-800/80 flex items-center justify-between">
        <Link
          href="/#projects"
          className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to All Projects</span>
        </Link>
        <span className="text-xs font-mono text-zinc-500">
          Pavel Hasan Joy · Case Studies
        </span>
      </div>
    </main>
  );
}
