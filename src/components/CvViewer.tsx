"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Download,
  Printer,
  Share2,
  Check,
  FileText,
  FileCheck2,
  Move,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { ResumeDocument } from "./ResumeDocument";
import { siteContent } from "@/data/content";

interface CvViewerProps {
  onClose?: () => void;
  isStandalonePage?: boolean;
}

export function CvViewer({ onClose, isStandalonePage = false }: CvViewerProps) {
  const [scale, setScale] = useState<number>(1.0);
  const [viewMode, setViewMode] = useState<"interactive" | "pdf">("interactive");
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Pan & Drag state
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number }>({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const documentWrapperRef = useRef<HTMLDivElement>(null);

  // Zoom handlers
  const handleZoomIn = () => setScale((s) => Math.min(2.5, +(s + 0.15).toFixed(2)));
  const handleZoomOut = () => setScale((s) => Math.max(0.5, +(s - 0.15).toFixed(2)));
  const handleResetZoom = () => {
    setScale(1.0);
    setPanPosition({ x: 0, y: 0 });
  };
  const handleFitWidth = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 48;
      const targetScale = Math.min(1.4, Math.max(0.6, containerWidth / 850));
      setScale(+targetScale.toFixed(2));
      setPanPosition({ x: 0, y: 0 });
    }
  };

  // Keyboard navigation (+, -, 0, f, p)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === "0") {
        e.preventDefault();
        handleResetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Mouse wheel zoom (Ctrl + wheel or pinch)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.08 : -0.08;
        setScale((prev) => Math.min(2.5, Math.max(0.5, +(prev + delta).toFixed(2))));
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Mouse drag / pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start pan if clicking directly on the canvas / background or if scale > 1.0
    if ((e.target as HTMLElement).closest("a, button")) return;

    setIsPanning(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: panPosition.x,
      initialY: panPosition.y,
    };
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning) return;
      const dx = e.clientX - dragStartRef.current.startX;
      const dy = e.clientY - dragStartRef.current.startY;
      setPanPosition({
        x: dragStartRef.current.initialX + dx,
        y: dragStartRef.current.initialY + dy,
      });
    },
    [isPanning]
  );

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && scale > 1.0) {
      setIsPanning(true);
      dragStartRef.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        initialX: panPosition.x,
        initialY: panPosition.y,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPanning || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.startX;
    const dy = e.touches[0].clientY - dragStartRef.current.startY;
    setPanPosition({
      x: dragStartRef.current.initialX + dx,
      y: dragStartRef.current.initialY + dy,
    });
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
  };

  // Copy share link
  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/cv` : "https://portfolio-sandy-psi-96.vercel.app/cv";
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  // Print CV
  const handlePrint = () => {
    window.print();
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col w-full h-full bg-[#0a0c10] text-zinc-100 select-none overflow-hidden ${
        isFullscreen ? "p-0" : ""
      }`}
    >
      {/* Top Floating Control Bar */}
      <div className="no-print z-20 flex flex-wrap items-center justify-between gap-2.5 px-4 sm:px-6 py-3 border-b border-zinc-800/90 bg-zinc-950/85 backdrop-blur-md">
        {/* Left: Document info & mode switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FileText className="w-4 h-4" />
            </span>
            <div>
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-100">
                Pavel Hasan Joy — CV
              </span>
              <span className="hidden md:inline-block ml-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                2026 Edition
              </span>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-zinc-900/90 border border-zinc-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setViewMode("interactive")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
                viewMode === "interactive"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Crystal clear interactive vector render"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Interactive</span>
            </button>
            <button
              onClick={() => setViewMode("pdf")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
                viewMode === "pdf"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Official PDF preview"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PDF Doc</span>
            </button>
          </div>
        </div>

        {/* Center: Zoom Controls Toolbar */}
        <div className="flex items-center gap-1 sm:gap-1.5 bg-zinc-900/90 border border-zinc-800 rounded-xl px-2 py-1">
          {/* Zoom Out */}
          <button
            onClick={handleZoomOut}
            disabled={scale <= 0.5}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            title="Zoom Out (-)"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Scale Display & Click to Reset */}
          <button
            onClick={handleResetZoom}
            className="px-2.5 py-1 text-xs font-mono font-semibold text-emerald-400 hover:bg-zinc-800/80 rounded-md transition-colors min-w-[54px] text-center"
            title="Click to reset zoom (0)"
          >
            {Math.round(scale * 100)}%
          </button>

          {/* Zoom In */}
          <button
            onClick={handleZoomIn}
            disabled={scale >= 2.5}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            title="Zoom In (+)"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <span className="w-px h-4 bg-zinc-700/60 mx-1 hidden sm:block" />

          {/* Fit to Width */}
          <button
            onClick={handleFitWidth}
            className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
            title="Fit to Width"
          >
            Fit
          </button>

          {/* Reset Position */}
          <button
            onClick={handleResetZoom}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            title="Reset Zoom & Pan"
            aria-label="Reset Zoom and Pan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Actions (Download, Print, Share, Fullscreen) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Share / Copy Link */}
          <button
            onClick={handleCopyLink}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 rounded-lg transition-colors"
            title="Copy CV Link"
            aria-label="Copy Shareable CV Link"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* Print CV */}
          <button
            onClick={handlePrint}
            className="hidden md:flex p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 rounded-lg transition-colors"
            title="Print Official CV"
            aria-label="Print CV"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Download PDF Button */}
          <a
            href={siteContent.cv.filePath}
            download={siteContent.cv.fileName}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Download Official PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download PDF</span>
          </a>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 rounded-lg transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Viewing Canvas & Pan Area */}
      <div
        className={`flex-1 relative overflow-auto p-4 sm:p-8 flex items-start justify-center cursor-default bg-zinc-950/50 ${
          isPanning ? "cursor-grabbing" : scale > 1.0 ? "cursor-grab" : ""
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Helper Hint Badge when Zoomed In */}
        {scale > 1.0 && (
          <div className="no-print absolute top-3 left-4 z-10 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-400 backdrop-blur-sm">
            <Move className="w-3 h-3 text-emerald-400" />
            <span>Click & drag to pan around</span>
          </div>
        )}

        {viewMode === "interactive" ? (
          <div
            ref={documentWrapperRef}
            className="transition-transform duration-75 origin-top will-change-transform pb-12"
            style={{
              transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${scale})`,
            }}
          >
            <ResumeDocument />
          </div>
        ) : (
          /* PDF Mode: Native Object / Iframe Viewer */
          <div
            className="w-full max-w-4xl h-[85vh] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl transition-transform duration-75 origin-top"
            style={{
              transform: `scale(${scale})`,
            }}
          >
            <iframe
              src={`${siteContent.cv.filePath}#toolbar=0&navpanes=0&scrollbar=1`}
              title="Pavel Hasan Joy CV PDF"
              className="w-full h-full border-none"
            />
          </div>
        )}
      </div>

      {/* Bottom Floating Status Bar */}
      <div className="no-print z-20 flex items-center justify-between px-4 py-2 border-t border-zinc-800/80 bg-zinc-950/90 text-xs text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">Pavel Hasan Joy · Verified Curriculum Vitae</span>
          <span className="sm:hidden">Verified CV 2026</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="hidden md:inline text-zinc-500">
            Shortcuts: <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">+</kbd> Zoom In · <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">-</kbd> Zoom Out · <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">0</kbd> Reset
          </span>
          <a
            href={siteContent.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            GitHub Profile <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
