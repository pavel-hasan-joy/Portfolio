"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fineGridRef = useRef<HTMLDivElement | null>(null);
  const majorGridRef = useRef<HTMLDivElement | null>(null);
  const orb1Ref = useRef<HTMLDivElement | null>(null);
  const orb2Ref = useRef<HTMLDivElement | null>(null);
  const orb3Ref = useRef<HTMLDivElement | null>(null);
  const cursorLightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // High-fidelity Star Glow Texture Generator
    const createStarTexture = () => {
      const texCanvas = document.createElement("canvas");
      texCanvas.width = 64;
      texCanvas.height = 64;
      const ctx = texCanvas.getContext("2d");
      if (!ctx) return null;

      const center = 32;
      const radius = 30;
      const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(180, 245, 255, 0.95)");
      gradient.addColorStop(0.5, "rgba(0, 217, 255, 0.5)");
      gradient.addColorStop(0.8, "rgba(167, 139, 250, 0.15)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      return new THREE.CanvasTexture(texCanvas);
    };

    const starTexture = createStarTexture();

    // 1. Primary 3D Starfield Cosmos (2,200 stars - optimized for 120 FPS)
    const starCount = 2200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const halfSpanY = 160;
    const totalSpanY = halfSpanY * 2;

    const palette = [
      new THREE.Color("#00d9ff"), // Cyan (ayushcmd.me)
      new THREE.Color("#38bdf8"), // Sky Blue
      new THREE.Color("#a78bfa"), // Soft Purple (ayushcmd.me)
      new THREE.Color("#14b8a6"), // Deep Teal (cyan/teal companion)
      new THREE.Color("#ffffff"), // Pure White Star
      new THREE.Color("#e0f2fe"), // Icy Blue
      new THREE.Color("#f59e0b"), // Subtle Amber
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 110;
      positions[i3 + 1] = (Math.random() - 0.5) * totalSpanY;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.32,
      map: starTexture || undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const starPoints = new THREE.Points(geometry, material);
    scene.add(starPoints);

    // 2. Secondary Floating Quantum Dust (450 larger ambient nodes)
    const dustCount = 450;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      dustPositions[i3] = (Math.random() - 0.5) * 85;
      dustPositions[i3 + 1] = (Math.random() - 0.5) * totalSpanY;
      dustPositions[i3 + 2] = (Math.random() - 0.5) * 75;

      const c = Math.random() > 0.5 ? new THREE.Color("#00d9ff") : new THREE.Color("#a78bfa");
      dustColors[i3] = c.r;
      dustColors[i3 + 1] = c.g;
      dustColors[i3 + 2] = c.b;
    }

    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.72,
      map: starTexture || undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustPoints);

    // --- INTERACTION & SCROLL STATE ---
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let rawMouseX = width / 2;
    let rawMouseY = height / 2;
    let currentRawMouseX = width / 2;
    let currentRawMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX = e.clientX;
      rawMouseY = e.clientY;
      targetMouseX = (e.clientX - width / 2) * 0.0003;
      targetMouseY = (e.clientY - height / 2) * 0.0003;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // --- ANIMATION LOOP (60/120 FPS DIRECT DOM TRANSFORM) ---
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (prefersReducedMotion) {
        renderer.render(scene, camera);
        return;
      }

      // Smooth scroll lerping with inertia
      const scrollDiff = targetScrollY - currentScrollY;
      currentScrollY += scrollDiff * 0.085;
      scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Mouse lerping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      currentRawMouseX += (rawMouseX - currentRawMouseX) * 0.08;
      currentRawMouseY += (rawMouseY - currentRawMouseY) * 0.08;

      // 1. Camera Vertical Gliding Parallax
      const targetCamY = -currentScrollY * 0.045;
      camera.position.y += (targetCamY - camera.position.y) * 0.07;
      camera.position.x = mouseX * 24;

      // 2. Star Rotation & Dynamic Velocity Tilt
      starPoints.rotation.x = mouseY * 0.8 + scrollVelocity * 0.0008;
      starPoints.rotation.y += 0.0003 + mouseX * 0.15;

      dustPoints.rotation.x = mouseY * 0.5 + scrollVelocity * 0.0005;
      dustPoints.rotation.y += 0.00015;

      // 3. Infinite Vertical Gliding (GPU Matrix Transform, 0 Buffer Re-upload)
      starPoints.position.y = camera.position.y * 0.35;
      dustPoints.position.y = camera.position.y * 0.25;

      // Pulse dust opacity slightly
      dustMaterial.opacity = 0.28 + Math.sin(clock.getElapsedTime() * 0.9) * 0.1;

      renderer.render(scene, camera);

      // --- HIGH-PERFORMANCE DIRECT DOM UPDATES (NO REACT RE-RENDERS) ---
      // Cyber Grid Scroll Motion (Transforms up/down seamlessly like ayushcmd.me)
      if (fineGridRef.current) {
        const fineOffsetY = -(currentScrollY * 0.22) % 48;
        fineGridRef.current.style.transform = `translate3d(0, ${fineOffsetY}px, 0)`;
      }

      if (majorGridRef.current) {
        const majorOffsetY = -(currentScrollY * 0.12) % 192;
        majorGridRef.current.style.transform = `translate3d(0, ${majorOffsetY}px, 0)`;
      }

      // Ambient Glowing Nebulae Parallax Motion
      if (orb1Ref.current) {
        const orb1Y = -currentScrollY * 0.16;
        orb1Ref.current.style.transform = `translate3d(0, ${orb1Y}px, 0)`;
      }

      if (orb2Ref.current) {
        const orb2Y = currentScrollY * 0.12;
        orb2Ref.current.style.transform = `translate3d(0, ${orb2Y}px, 0)`;
      }

      if (orb3Ref.current) {
        const orb3Y = -currentScrollY * 0.09;
        orb3Ref.current.style.transform = `translate3d(0, ${orb3Y}px, 0)`;
      }

      // Cursor Follow Spotlight
      if (cursorLightRef.current) {
        cursorLightRef.current.style.transform = `translate3d(${currentRawMouseX - 250}px, ${currentRawMouseY - 250}px, 0)`;
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      geometry.dispose();
      material.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      if (starTexture) starTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Deep 3D Starfield & Particle Cosmos Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 2. Cyber Tech Grid 1: Fine 48px Precision Matrix (like ayushcmd.me) */}
      <div
        ref={fineGridRef}
        className="absolute -inset-y-24 inset-x-0 opacity-[0.05] dark:opacity-[0.095] will-change-transform"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 217, 255, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* 3. Cyber Tech Grid 2: 192px Deep Coordinate Architecture Grid */}
      <div
        ref={majorGridRef}
        className="absolute -inset-y-48 inset-x-0 opacity-[0.03] dark:opacity-[0.06] will-change-transform"
        style={{
          backgroundImage: `
            linear-gradient(rgba(167, 139, 250, 0.4) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(167, 139, 250, 0.4) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "192px 192px",
        }}
      />

      {/* 4. Interactive Cursor Radial Spotlight */}
      <div
        ref={cursorLightRef}
        className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full opacity-25 dark:opacity-20 pointer-events-none will-change-transform transform-gpu"
        style={{
          background: "radial-gradient(circle, rgba(0, 217, 255, 0.22) 0%, rgba(0, 217, 255, 0.06) 40%, transparent 70%)",
        }}
      />

      {/* 5. Ambient Nebula 1: Electric Cyan Glow (Parallax Upward) */}
      <div
        ref={orb1Ref}
        className="absolute w-[680px] h-[680px] rounded-full opacity-35 dark:opacity-25 pointer-events-none will-change-transform transform-gpu"
        style={{
          top: "12%",
          right: "4%",
          background: "radial-gradient(circle, rgba(0, 217, 255, 0.26) 0%, rgba(0, 217, 255, 0.08) 35%, transparent 68%)",
        }}
      />

      {/* 6. Ambient Nebula 2: Deep Violet / Purple Spotlight (Parallax Downward) */}
      <div
        ref={orb2Ref}
        className="absolute w-[720px] h-[720px] rounded-full opacity-30 dark:opacity-20 pointer-events-none will-change-transform transform-gpu"
        style={{
          top: "40%",
          left: "2%",
          background: "radial-gradient(circle, rgba(167, 139, 250, 0.24) 0%, rgba(167, 139, 250, 0.07) 35%, transparent 68%)",
        }}
      />

      {/* 7. Ambient Nebula 3: Harmonious Teal & Deep Cyan Glow (Anchored Lower) */}
      <div
        ref={orb3Ref}
        className="absolute w-[620px] h-[620px] rounded-full opacity-25 dark:opacity-18 pointer-events-none will-change-transform transform-gpu"
        style={{
          top: "70%",
          right: "15%",
          background: "radial-gradient(circle, rgba(20, 184, 166, 0.22) 0%, rgba(6, 182, 212, 0.06) 35%, transparent 68%)",
        }}
      />

      {/* 8. Vignette Edge Depth Mask */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 90% 85% at 50% 50%, transparent 45%, rgba(9, 10, 15, 0.72) 100%)`,
        }}
      />
    </div>
  );
}
