"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight } from "lucide-react";
import { CvViewer } from "./CvViewer";
import { useSmoothScroll } from "./SmoothScroll";
import Link from "next/link";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvModal({ isOpen, onClose }: CvModalProps) {
  const { stopScroll, startScroll } = useSmoothScroll();
  const modalRef = useRef<HTMLDivElement>(null);

  // Sync scroll locking and Lenis pausing
  useEffect(() => {
    if (isOpen) {
      stopScroll();
      document.body.style.overflow = "hidden";
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
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 flex flex-col w-full max-w-6xl h-[94vh] rounded-2xl border border-zinc-800 bg-[#0a0c10] text-zinc-100 shadow-2xl shadow-emerald-500/10 overflow-hidden cv-modal-surface"
          >
            {/* Top Modal Close and Open-In-Page Bar */}
            <div className="absolute top-3.5 right-4 z-30 flex items-center gap-2">
              <Link
                href="/cv"
                target="_blank"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-xs transition-colors"
                title="Open in Dedicated Full Page"
              >
                <span>Full Page</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
                aria-label="Close CV Viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Zoomable CV Viewer Engine */}
            <div className="flex-1 w-full h-full overflow-hidden">
              <CvViewer onClose={onClose} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
