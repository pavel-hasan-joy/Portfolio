"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  FileText,
  Sun,
  Moon,
  Copy,
  ExternalLink,
  Code2,
  FolderGit2,
  User,
  Mail,
  GraduationCap,
  X,
  Check,
} from "lucide-react";
import { siteContent } from "@/data/content";
import { useTheme } from "./ThemeProvider";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCv: () => void;
}

export function CommandPalette({ isOpen, onClose, onOpenCv }: CommandPaletteProps) {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const actions = useMemo(() => {
    return [
      {
        id: "cv",
        title: "View Curriculum Vitae (CV)",
        category: "Documents",
        icon: FileText,
        action: () => {
          onClose();
          onOpenCv();
        },
      },
      {
        id: "theme",
        title: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
        category: "Preferences",
        icon: theme === "dark" ? Sun : Moon,
        action: () => {
          toggleTheme();
          showToast(`Theme switched to ${theme === "dark" ? "Light" : "Dark"}`);
        },
      },
      {
        id: "copy-email",
        title: `Copy Email (${siteContent.socials.email})`,
        category: "Contact",
        icon: Copy,
        action: () => {
          navigator.clipboard.writeText(siteContent.socials.email);
          showToast("Email address copied to clipboard!");
        },
      },
      {
        id: "github",
        title: "Open GitHub Profile",
        category: "Links",
        icon: ExternalLink,
        action: () => {
          window.open(siteContent.socials.github, "_blank");
          onClose();
        },
      },
      {
        id: "linkedin",
        title: "Open LinkedIn Profile",
        category: "Links",
        icon: ExternalLink,
        action: () => {
          window.open(siteContent.socials.linkedin, "_blank");
          onClose();
        },
      },
      {
        id: "sec-about",
        title: "Jump to About Section",
        category: "Navigation",
        icon: User,
        action: () => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "sec-skills",
        title: "Jump to Skills Matrix (C, C++, Java, Git)",
        category: "Navigation",
        icon: Code2,
        action: () => {
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "sec-projects",
        title: "Jump to Featured Projects",
        category: "Navigation",
        icon: FolderGit2,
        action: () => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "sec-timeline",
        title: "Jump to Education & Timeline",
        category: "Navigation",
        icon: GraduationCap,
        action: () => {
          document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "sec-contact",
        title: "Jump to Contact Form",
        category: "Navigation",
        icon: Mail,
        action: () => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      ...siteContent.projects.map((p) => ({
        id: `proj-${p.slug}`,
        title: `Project: ${p.title}`,
        category: "Projects",
        icon: FolderGit2,
        action: () => {
          window.location.href = `/projects/${p.slug}`;
          onClose();
        },
      })),
    ];
  }, [theme, toggleTheme, onOpenCv, onClose]);

  const filtered = useMemo(() => {
    if (!query.trim()) return actions;
    return actions.filter((a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [actions, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle arrow keys
  useEffect(() => {
    const handleNavigation = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
      }
    };
    window.addEventListener("keydown", handleNavigation);
    return () => window.removeEventListener("keydown", handleNavigation);
  }, [isOpen, filtered, selectedIndex]);

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/30 text-emerald-300 text-xs shadow-2xl backdrop-blur-md"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative z-10 w-full max-w-xl rounded-2xl border border-zinc-800 bg-[#0f1118] shadow-2xl overflow-hidden text-zinc-100"
            >
              {/* Search input field */}
              <div className="flex items-center px-4 py-3.5 border-b border-zinc-800/80 bg-zinc-950/50">
                <Search className="w-4 h-4 text-zinc-400 mr-3 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or jump to section..."
                  className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none font-medium"
                  autoFocus
                />
                <button
                  onClick={onClose}
                  className="p-1 rounded text-zinc-500 hover:text-zinc-300 transition-colors ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="max-h-80 overflow-y-auto p-2 divide-y divide-zinc-900">
                {filtered.length === 0 ? (
                  <div className="py-12 text-center text-xs text-zinc-500">
                    No matching actions found for &quot;{query}&quot;
                  </div>
                ) : (
                  filtered.map((item, index) => {
                    const Icon = item.icon;
                    const isSelected = index === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs transition-colors ${
                          isSelected
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "text-zinc-300 hover:bg-zinc-900 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isSelected ? "text-emerald-400" : "text-zinc-400"}`} />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <span className="text-[10px] font-mono uppercase text-zinc-500 px-1.5 py-0.5 rounded bg-zinc-900">
                          {item.category}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Quick instructions footer */}
              <div className="px-4 py-2 border-t border-zinc-800/80 bg-zinc-950/80 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <div className="flex items-center gap-2">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>ESC Close</span>
                </div>
                <span>Cmd+K Shortcut</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
