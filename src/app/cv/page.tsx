import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, Download, FileText } from "lucide-react";
import { CvViewer } from "@/components/CvViewer";
import { siteContent } from "@/data/content";

export const metadata: Metadata = {
  title: "Curriculum Vitae — Pavel Hasan Joy | Full-Stack Software Engineer & ML/AI Engineer",
  description:
    "Official Curriculum Vitae of Pavel Hasan Joy. Computer Science undergraduate at ULAB specializing in full-stack architecture, 3D geospatial observatories, and high-performance algorithms.",
  openGraph: {
    title: "Curriculum Vitae — Pavel Hasan Joy",
    description: "Official Curriculum Vitae of Pavel Hasan Joy — Full-Stack Software Engineer & ML/AI Engineer",
    url: "https://portfolio-sandy-psi-96.vercel.app/cv",
    type: "profile",
  },
};

export default function CvPage() {
  return (
    <div className="flex flex-col w-screen h-screen bg-[#090a0f] text-zinc-100 overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="no-print flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md z-30">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            title="Portfolio Home"
          >
            <Home className="w-4 h-4" />
          </Link>
          <a
            href={siteContent.cv.filePath}
            download={siteContent.cv.fileName}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-950/40 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download PDF</span>
          </a>
        </div>
      </header>

      {/* Main Full-Screen Interactive Zoomable CV Viewer */}
      <main className="flex-1 w-full h-full overflow-hidden">
        <CvViewer isStandalonePage={true} />
      </main>
    </div>
  );
}
