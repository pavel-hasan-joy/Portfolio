"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  FileText,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { siteContent } from "@/data/content";
import { useSmoothScroll } from "./SmoothScroll";

// Lazy-load PDF canvas viewer to ensure zero initial load penalty
const PdfCanvasViewer = dynamic(() => import("./PdfCanvasViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center p-20 gap-3 text-zinc-400">
      <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
      <span className="text-sm">Loading PDF Viewer Module...</span>
    </div>
  ),
});

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvModal({ isOpen, onClose }: CvModalProps) {
  const { stopScroll, startScroll } = useSmoothScroll();
  const [numPages, setNumPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.1);
  const modalRef = useRef<HTMLDivElement>(null);

  // Sync scroll locking and Lenis pausing
  useEffect(() => {
    if (isOpen) {
      stopScroll();
      document.body.style.overflow = "hidden";
      // Update hash to #cv without jumping
      if (window.location.hash !== "#cv") {
        window.history.pushState(null, "", "#cv");
      }
    } else {
      startScroll();
      document.body.style.overflow = "";
      if (window.location.hash === "#cv") {
        window.history.pushState(null, "", window.location.pathname + window.location.search);
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, stopScroll, startScroll]);

  // Handle ESC key and browser Back button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    const handlePopState = () => {
      if (window.location.hash !== "#cv" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);

  const handleZoomIn = () => setScale((s) => Math.min(2.0, s + 0.15));
  const handleZoomOut = () => setScale((s) => Math.max(0.65, s - 0.15));
  const handleFitWidth = () => setScale(1.0);

  const prevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const nextPage = () => setCurrentPage((p) => Math.min(numPages, p + 1));

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
        >
          {/* Backdrop with rich blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 flex flex-col w-full max-w-5xl h-[92vh] rounded-2xl border border-zinc-800 bg-[#0d0f17] text-zinc-100 shadow-2xl shadow-emerald-500/5 overflow-hidden"
          >
            {/* Modal Header & Interactive Toolbar */}
            <header className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-zinc-800/90 bg-zinc-950/70 backdrop-blur-sm select-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h2 id="cv-modal-title" className="text-sm font-semibold tracking-wide text-zinc-100 flex items-center gap-2">
                    {siteContent.personal.name} — Curriculum Vitae
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800/40">
                      2026
                    </span>
                  </h2>
                  <p className="text-[11px] text-zinc-400 font-mono hidden sm:block">
                    In-Page Canvas Viewer · Verified Credentials
                  </p>
                </div>
              </div>

              {/* Controls Toolbar */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Page Navigation */}
                {numPages > 1 && (
                  <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-zinc-300 mr-1">
                    <button
                      onClick={prevPage}
                      disabled={currentPage <= 1}
                      className="p-1 hover:text-emerald-400 disabled:opacity-30 transition-colors"
                      aria-label="Previous Page"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-1.5 font-mono text-[11px]">
                      {currentPage} / {numPages}
                    </span>
                    <button
                      onClick={nextPage}
                      disabled={currentPage >= numPages}
                      className="p-1 hover:text-emerald-400 disabled:opacity-30 transition-colors"
                      aria-label="Next Page"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Zoom Controls */}
                <div className="hidden sm:flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
                  <button
                    onClick={handleZoomOut}
                    className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                    title="Zoom Out"
                    aria-label="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleFitWidth}
                    className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors text-xs font-mono px-2"
                    title="Reset Zoom"
                    aria-label="Reset Zoom"
                  >
                    {Math.round(scale * 100)}%
                  </button>
                  <button
                    onClick={handleZoomIn}
                    className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                    title="Zoom In"
                    aria-label="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                {/* Direct Download Button */}
                <a
                  href={siteContent.cv.filePath}
                  download={siteContent.cv.fileName}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow-lg shadow-emerald-950/40"
                  title="Download Official PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
                  aria-label="Close CV Viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Modal Body / Viewer Canvas Area */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-zinc-950/40">
              <PdfCanvasViewer
                filePath={siteContent.cv.filePath}
                onNumPagesChange={setNumPages}
                currentPage={currentPage}
                scale={scale}
                setScale={setScale}
              />
            </div>

            {/* Footer Status Bar */}
            <footer className="px-4 py-2.5 border-t border-zinc-800/80 bg-zinc-950/80 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Pavel Hasan Joy · Verified Portfolio</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={siteContent.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  LinkedIn Profile <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
