import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#090a0f] text-zinc-100">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-cyan-500/30 text-cyan-400 mb-6 font-mono text-xl font-bold">
        404
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
        Page Not Found
      </h1>

      <p className="text-sm text-zinc-400 max-w-md mb-8 font-mono">
        The requested endpoint does not exist or has been relocated.
      </p>

      <Link
        href="/"
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-zinc-950 font-semibold text-xs transition-colors shadow-lg shadow-cyan-500/20"
      >
        <Home className="w-4 h-4" />
        <span>Return to Portfolio Home</span>
      </Link>
    </main>
  );
}
