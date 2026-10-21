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

  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number }>({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });
  const hasMovedRef = useRef<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasAreaRef = useRef<HTMLDivElement>(null);

  // Zoom handlers
  const handleZoomIn = () => setScale((s) => Math.min(2.5, +(s + 0.15).toFixed(2)));
  const handleZoomOut = () => setScale((s) => Math.max(0.5, +(s - 0.15).toFixed(2)));
  const handleResetZoom = () => {
    setScale(1.0);
    setPanPosition({ x: 0, y: 0 });
  };
  const handleFitWidth = () => {
    if (canvasAreaRef.current) {
      const availableWidth = canvasAreaRef.current.clientWidth - 48;
      const targetScale = Math.min(1.3, Math.max(0.55, availableWidth / 850));
      setScale(+targetScale.toFixed(2));
      setPanPosition({ x: 0, y: 0 });
    }
  };

  // Keyboard navigation (+, -, 0)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

  // Global mouse / pointer dragging listeners
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - dragStartRef.current.startX;
      const dy = e.clientY - dragStartRef.current.startY;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMovedRef.current = true;
      }

      setPanPosition({
        x: dragStartRef.current.initialX + dx,
        y: dragStartRef.current.initialY + dy,
      });
    };

    const handlePointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsPanning(false);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, []);

  // Mouse wheel zoom & pan
  useEffect(() => {
    const canvas = canvasAreaRef.current;
    if (!canvas) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        // Zooming with ctrl + wheel
        const delta = e.deltaY < 0 ? 0.08 : -0.08;
        setScale((prev) => Math.min(2.5, Math.max(0.5, +(prev + delta).toFixed(2))));
      } else {
        // Natural mouse wheel panning (vertical / horizontal)
        setPanPosition((prev) => ({
          x: prev.x - (e.shiftKey ? e.deltaY : e.deltaX),
          y: prev.y - (e.shiftKey ? 0 : e.deltaY),
        }));
      }
    };

    canvas.addEventListener("wheel", handleWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", handleWheel);
  }, []);

  // Start drag handler
  const handlePointerDown = (e: React.PointerEvent) => {
    // Left mouse button only
    if (e.button !== 0) return;

    isDraggingRef.current = true;
    hasMovedRef.current = false;
    setIsPanning(true);

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: panPosition.x,
      initialY: panPosition.y,
    };
  };

  // Prevent link click if user was dragging
  const handleCaptureClick = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      hasMovedRef.current = false;
    }
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
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="w-4 h-4" />
            </span>
            <div>
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-100">
                Pavel Hasan Joy — CV
              </span>
              <span className="hidden md:inline-block ml-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                Official
              </span>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-zinc-900/90 border border-zinc-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setViewMode("interactive")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
                viewMode === "interactive"
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Interactive Pan & Zoom View"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Interactive</span>
            </button>
            <button
              onClick={() => setViewMode("pdf")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
                viewMode === "pdf"
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Official PDF preview"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PDF Doc</span>
            </button>
          </div>
        </div>

        {/* Center: Zoom & Pan Controls Toolbar */}
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
            className="px-2.5 py-1 text-xs font-mono font-semibold text-cyan-400 hover:bg-zinc-800/80 rounded-md transition-colors min-w-[54px] text-center"
            title="Click to reset zoom & pan (0)"
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
            title="Reset Position & Zoom"
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
            {copied ? <Check className="w-4 h-4 text-cyan-400" /> : <Share2 className="w-4 h-4" />}
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 via-cyan-500 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-zinc-950 text-xs font-semibold shadow-md shadow-cyan-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
        ref={canvasAreaRef}
        onPointerDown={handlePointerDown}
        onClickCapture={handleCaptureClick}
        className={`flex-1 relative overflow-hidden flex items-start justify-center bg-zinc-950/60 ${
          isPanning ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        {/* Helper Hint Badge */}
        <div className="no-print absolute top-3 left-4 z-10 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300 backdrop-blur-sm shadow-lg">
          <Move className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Mouse drag to move freely · Scroll wheel to pan / zoom</span>
        </div>

        {viewMode === "interactive" ? (
          <div
            className="p-4 sm:p-8 pt-8 sm:pt-10 will-change-transform pb-24"
            style={{
              transform: `translate3d(${panPosition.x}px, ${panPosition.y}px, 0) scale(${scale})`,
              transformOrigin: "top center",
              transition: isPanning ? "none" : "transform 0.08s ease-out",
            }}
          >
            <ResumeDocument />
          </div>
        ) : (
          /* PDF Mode: Native Object / Iframe Viewer */
          <div
            className="w-full max-w-4xl h-[85vh] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl origin-top mt-8 relative"
            style={{
              transform: `translate3d(${panPosition.x}px, ${panPosition.y}px, 0) scale(${scale})`,
              transformOrigin: "top center",
              transition: isPanning ? "none" : "transform 0.08s ease-out",
            }}
          >
            {/* Transparent overlay while panning so iframe doesn't capture drag events */}
            {isPanning && <div className="absolute inset-0 z-30 bg-transparent" />}
            <iframe
              src={`${siteContent.cv.filePath}#toolbar=0&navpanes=0&scrollbar=1`}
              title="Pavel Hasan Joy CV PDF"
              className="w-full h-full border-none pointer-events-auto"
            />
          </div>
        )}
      </div>

      {/* Bottom Floating Status Bar */}
      <div className="no-print z-20 flex items-center justify-between px-4 py-2 border-t border-zinc-800/80 bg-zinc-950/90 text-xs text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="hidden sm:inline">Pavel Hasan Joy · Verified Curriculum Vitae</span>
          <span className="sm:hidden">Verified CV</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="hidden md:inline text-zinc-500">
            Navigation: <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">Drag Mouse</kbd> Pan · <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">Scroll</kbd> Move · <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">Ctrl + Scroll</kbd> Zoom
          </span>
          <a
            href={siteContent.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            GitHub Profile <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
