"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { personalInfo } from "@/data/portfolio";
import { Terminal, Heart, ArrowUp, Github } from "lucide-react";

const ACCENT = "#f0a500";

export function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#050508", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}35, transparent)` }}
      />
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-32 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${ACCENT}05, transparent 70%)`, filter: "blur(40px)" }}
      />

      <div className="max-w-5xl mx-auto px-6 py-10 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 select-none"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center relative overflow-hidden"
              style={{ background: `${ACCENT}14`, border: `1px solid ${ACCENT}32` }}
            >
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 60%)" }} />
              <Terminal size={13} color={ACCENT} />
            </div>
            <span
              className="font-bold text-base"
              style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.85)", letterSpacing: "-0.03em" }}
            >
              {personalInfo.name.split(" ")[0]}
              <span style={{ color: ACCENT }}>.</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.22)" }}
          >
            Built with
            <Heart size={11} style={{ color: "#ef4444", fill: "#ef4444" }} />
            using Next.js & TailwindCSS
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <p className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.18)" }}>
              © {new Date().getFullYear()} {personalInfo.name}
            </p>

            <div className="w-px h-3" style={{ background: "rgba(255,255,255,0.1)" }} />

            <a
              href={`https://github.com/${personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.22)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}
            >
              <Github size={14} />
            </a>

            <button
              onClick={scrollToTop}
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background: `${ACCENT}10`,
                border: `1px solid ${ACCENT}22`,
                color: ACCENT,
                transition: "background 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = `${ACCENT}1e`;
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 14px ${ACCENT}20`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = `${ACCENT}10`;
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              <ArrowUp size={12} />
            </button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}