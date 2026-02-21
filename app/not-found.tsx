"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, repeatDelay: 2 }}
          className="text-8xl mb-6"
        >
          👑
        </motion.div>

        <div className="font-mono text-[var(--accent)] text-sm mb-4">
          $ find . -name &quot;page&quot; --type f
        </div>

        <h1 className="font-display text-7xl font-bold text-[var(--accent)] mb-4">404</h1>
        <p className="font-display text-2xl font-bold mb-4">Page Not Found</p>
        <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
          Halaman yang kamu cari tidak ada atau sudah dipindah.
          Tapi tenang — ini bukan bug, ini fitur eksklusif. 😄
        </p>

        <div className="card rounded-2xl p-4 mb-8 text-left font-mono text-sm">
          <div className="text-[var(--text-secondary)]">
            <span className="text-[var(--accent)]">Error:</span> Cannot GET /this-page
          </div>
          <div className="text-[var(--text-secondary)] mt-1">
            <span className="text-[var(--accent)]">Suggestion:</span> Go back home 👇
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-medium transition-shadow hover:shadow-[0_0_20px_rgba(240,165,0,0.4)]"
          style={{ background: "var(--accent)", color: "#000" }}
        >
          <Home size={16} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}