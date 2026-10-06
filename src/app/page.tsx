"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { TimelineSection } from "@/sections/TimelineSection";
import { ContactSection } from "@/sections/ContactSection";
import { Footer } from "@/sections/Footer";
import { CvModal } from "@/components/CvModal";
import { CommandPalette } from "@/components/CommandPalette";
import { IntroLoader } from "@/components/IntroLoader";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { InteractiveBackground } from "@/components/InteractiveBackground";

export default function Home() {
  const [cvOpen, setCvOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Deep-link detection for #cv
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#cv") {
        setCvOpen(true);
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  return (
    <>
      {/* Intro Loader (<1.5s, session-cached, skippable) */}
      <IntroLoader />

      {/* Top scroll progress indicator */}
      <ScrollProgressBar />

      {/* Interactive mouse and constellation ambient background */}
      <InteractiveBackground />

      {/* Spring desktop cursor */}
      <CustomCursor />

      {/* Sticky navigation bar with blur and dynamic scroll detection */}
      <Navbar
        onOpenCv={() => setCvOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <HeroSection onOpenCv={() => setCvOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenCv={() => setCvOpen(true)} />

      {/* In-Page Canvas CV Viewer Modal with Hash Deep-link */}
      <CvModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />

      {/* Quick Keyboard Command Palette (Cmd/Ctrl + K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenCv={() => setCvOpen(true)}
      />
    </>
  );
}
