"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, GitCommit, ExternalLink, Zap } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

interface Activity {
  repo: string;
  message: string;
  date: string;
  sha: string;
}

const FALLBACK: Activity[] = [
  { repo: "nightfall-topup", message: "feat: payment gateway integration", date: "2024-07-20", sha: "abc1234" },
  { repo: "github-clone", message: "feat: recursive folder structure renderer", date: "2024-07-18", sha: "def5678" },
  { repo: "nekonime", message: "fix: rate limiting with caching layer", date: "2024-07-15", sha: "ghi9012" },
  { repo: "nightfall-tech", message: "perf: lazy loading & mysql query optimization", date: "2024-07-12", sha: "jkl3456" },
  { repo: "techstore", message: "fix: server-side session cart management", date: "2024-07-10", sha: "mno7890" },
  { repo: "portfolio", message: "feat: add skill radar chart & tech stack section", date: "2024-07-08", sha: "pqr1234" },
];

const COMMIT_ACCENTS = ["#F0A500", "#00D4FF", "#A855F7", "#22C55E", "#F43F5E", "#FB923C"];

const TYPE_COLORS: Record<string, string> = {
  feat: "#22C55E",
  fix: "#F43F5E",
  perf: "#00D4FF",
  refactor: "#A855F7",
  chore: "#FB923C",
  docs: "#F0A500",
  style: "#EC4899",
  test: "#6366F1",
};

function getCommitType(message: string) {
  const match = message.match(/^(\w+):/);
  return match ? match[1] : "feat";
}

function CommitRow({ a, index, inView }: { a: Activity; index: number; inView: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const accent = COMMIT_ACCENTS[index % COMMIT_ACCENTS.length];
  const commitType = getCommitType(a.message);
  const typeColor = TYPE_COLORS[commitType] ?? "#F0A500";
  const cleanMessage = a.message.replace(/^\w+:\s*/, "");

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [3, -3]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-3, 3]), { stiffness: 300, damping: 30 });
  const glowX = useTransform(rawX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(rawY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [rawX, rawY]);

  const handleReset = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }, [rawX, rawY]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24, scale: 0.97 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={rowRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleReset}
        className="relative cursor-default select-none touch-manipulation"
      >
        <div
          className="absolute -inset-1 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 10% 50%, ${accent}18, transparent 60%)`,
            filter: "blur(10px)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />

        <div
          className="relative rounded-xl overflow-hidden border flex items-center gap-4 px-4 py-3.5"
          style={{
            background: "linear-gradient(155deg, #141414 0%, #0b0b0b 100%)",
            borderColor: hovered ? `${accent}45` : "rgba(255,255,255,0.06)",
            boxShadow: hovered
              ? `0 12px 40px -10px rgba(0,0,0,0.8), 0 0 0 1px ${accent}12, inset 0 1px 0 rgba(255,255,255,0.06)`
              : "0 2px 12px -2px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
        >
          {hovered && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl" style={{ opacity: 0.07 }}>
              <motion.div
                className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
                style={{ background: `radial-gradient(circle at ${glowX}% ${glowY}%, white, transparent 50%)` }}
              />
            </div>
          )}

          <div
            className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full"
            style={{
              background: typeColor,
              opacity: hovered ? 1 : 0.4,
              transition: "opacity 0.3s",
            }}
          />

          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ml-2"
            style={{
              background: `${typeColor}15`,
              border: `1px solid ${typeColor}30`,
              boxShadow: hovered ? `0 0 12px ${typeColor}30` : "none",
              transition: "box-shadow 0.3s",
            }}
          >
            <GitCommit size={13} style={{ color: typeColor }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span
                className="font-mono text-[11px] font-bold"
                style={{ color: accent }}
              >
                {a.repo}
              </span>
              <span
                className="font-mono text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider"
                style={{
                  background: `${typeColor}15`,
                  border: `1px solid ${typeColor}28`,
                  color: typeColor,
                }}
              >
                {commitType}
              </span>
              <span
                className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.25)",
                }}
              >
                {a.sha.slice(0, 7)}
              </span>
            </div>
            <p
              className="text-xs truncate"
              style={{
                color: hovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.38)",
                fontFamily: "'DM Sans', sans-serif",
                transition: "color 0.3s",
              }}
            >
              {cleanMessage}
            </p>
          </div>

          <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
            <span className="font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
              {a.date}
            </span>
            <div className="flex gap-0.5">
              {[0, 1].map((d) => (
                <div
                  key={d}
                  className="w-1 h-1 rounded-full"
                  style={{
                    background: hovered ? accent : "rgba(255,255,255,0.1)",
                    transition: `background 0.3s ${d * 0.08}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function GithubActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0 });

  useEffect(() => {
    fetch("/api/github-activity")
      .then((r) => r.json())
      .then((data) => setActivities(data.activities?.length ? data.activities : FALLBACK))
      .catch(() => setActivities(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #22C55E04 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--accent, #F0A500)" }}>
              06_activity
            </span>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Github size={18} style={{ color: "rgba(255,255,255,0.7)" }} />
                </div>
                <h2
                  className="text-4xl sm:text-5xl font-bold"
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}
                >
                  GitHub Activity
                </h2>
              </div>
              <p className="text-sm font-mono ml-12" style={{ color: "rgba(255,255,255,0.35)" }}>
                Recent commits & contributions.
              </p>
            </div>

            <a
              href={`https://github.com/${personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs transition-all duration-300 group"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.45)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#F0A50055";
                (e.currentTarget as HTMLAnchorElement).style.color = "#F0A500";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)";
              }}
            >
              <Zap size={11} />
              {"@" + personalInfo.github}
              <ExternalLink size={10} />
            </a>
          </div>
        </motion.div>

        <div className="space-y-2.5">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[62px] rounded-xl animate-pulse"
                  style={{
                    background: "linear-gradient(90deg, #141414, #0f0f0f, #141414)",
                    backgroundSize: "200% 100%",
                    animation: `pulse 1.5s ease-in-out ${i * 0.1}s infinite`,
                  }}
                />
              ))
            : activities.map((a, i) => (
                <CommitRow key={`${a.sha}-${i}`} a={a} index={i} inView={inView} />
              ))}
        </div>
      </div>
    </section>
  );
}