"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const cursorX = useSpring(0, { damping: 25, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 350 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasPointer || prefersReducedMotion) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, input, textarea, [data-interactive='true'], .cursor-pointer");
      setIsPointer(!!interactive);
    };

    const handleMouseDown = () => setIsHovered(true);
    const handleMouseUp = () => setIsHovered(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer trailing aura */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-emerald-500/40 bg-emerald-500/10 pointer-events-none -translate-x-1/2 -translate-y-1/2 backdrop-blur-[1px]"
        style={{
          x: cursorX,
          y: cursorY,
          width: isPointer ? 48 : 28,
          height: isPointer ? 48 : 28,
        }}
        animate={{
          scale: isHovered ? 0.8 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
      {/* Precision center dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-emerald-400 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
        }}
      />
    </div>
  );
}
