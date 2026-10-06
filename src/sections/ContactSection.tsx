"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  Mail,
  Send,
  Copy,
  Check,
  Clock,
  Sparkles,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { siteContent } from "@/data/content";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0, "Bot detected"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      honeypot: "",
    },
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteContent.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok) {
        setStatus("success");
        setStatusMessage(
          resData.fallbackMailto
            ? "Thank you! Opening your email client to send message..."
            : "Thank you! Your message has been sent directly to Pavel."
        );
        reset();

        // Celebration confetti
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
        });

        if (resData.fallbackMailto && resData.mailToUrl) {
          setTimeout(() => {
            window.location.href = resData.mailToUrl;
          }, 800);
        }
      } else {
        setStatus("error");
        setStatusMessage(resData.error || "Unable to send message right now.");
      }
    } catch (err) {
      setStatus("error");
      setStatusMessage("Network error. Falling back to direct email client...");
      setTimeout(() => {
        window.location.href = `mailto:${siteContent.socials.email}?subject=Portfolio%20Contact&body=${encodeURIComponent(
          data.message
        )}`;
      }, 1000);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
          Get in Touch
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Let&apos;s Build Together
        </h2>
        <div className="w-12 h-1 bg-emerald-500 rounded-full mt-3" />
        <p className="max-w-xl text-sm text-zinc-400 mt-4 leading-relaxed">
          Open to software engineering internships, collaborative tech initiatives, and technical discussions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info & Quick Copy */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-zinc-100">
              Direct Contact & Channels
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Prefer writing an email directly or connecting on professional networks? Reach out through any of these verified channels:
            </p>

            {/* Email Copy Card */}
            <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-mono text-zinc-200 truncate">
                  {siteContent.socials.email}
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/60 transition-colors shrink-0 flex items-center gap-1 text-[11px]"
                title="Copy Email"
                aria-label="Copy Email Address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-mono">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-zinc-400 font-mono">Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Availability & Response Time */}
            <div className="pt-2 border-t border-zinc-800/60 space-y-2 text-xs text-zinc-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{siteContent.personal.availability}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{siteContent.personal.responseTime}</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteContent.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-200 hover:text-white text-xs font-medium border border-zinc-700/60 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={siteContent.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-200 hover:text-white text-xs font-medium border border-zinc-700/60 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Validated Interactive Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 sm:p-8 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 shadow-2xl space-y-4"
          >
            {/* Honeypot field (hidden from genuine users) */}
            <div className="hidden" aria-hidden="true">
              <input type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
            </div>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="e.g. Alex Morgan"
                {...register("name")}
                className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/70 border text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors ${
                  errors.name
                    ? "border-red-500/80 focus:border-red-500"
                    : "border-zinc-800 focus:border-emerald-500/60"
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-red-400 font-mono mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Your Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="alex@example.com"
                {...register("email")}
                className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/70 border text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors ${
                  errors.email
                    ? "border-red-500/80 focus:border-red-500"
                    : "border-zinc-800 focus:border-emerald-500/60"
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-red-400 font-mono mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Write your message or inquiry here..."
                {...register("message")}
                className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/70 border text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors resize-none ${
                  errors.message
                    ? "border-red-500/80 focus:border-red-500"
                    : "border-zinc-800 focus:border-emerald-500/60"
                }`}
              />
              {errors.message && (
                <p className="text-[11px] text-red-400 font-mono mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Status Feedback Banner */}
            <AnimatePresence>
              {statusMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    status === "success"
                      ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                      : "bg-red-950/80 text-red-300 border border-red-500/40"
                  }`}
                >
                  {status === "success" ? (
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                  <span>{statusMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Dispatching Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
