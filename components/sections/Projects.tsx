"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects, allTechStacks } from "@/data/portfolio";
import { usePortfolioStore } from "@/store";
import {
  Heart,
  ExternalLink,
  Github,
  Layers,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { ProjectCardSkeleton } from "../ui/Skeleton";

const ACCENT = "#F0A500";

function GlowCursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 120, damping: 20 });
  const springY = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 rounded-full"
      style={{
        width: 480,
        height: 480,
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background: `radial-gradient(circle, ${ACCENT}06 0%, transparent 65%)`,
      }}
    />
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const { toggleLike, isLiked } = usePortfolioStore();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const cardRef = useRef<HTMLDivElement>(null);
  const liked = isLiked(project.id);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });
  const shineX = useTransform(mouseX, [-0.5, 0.5], [20, 80]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], [20, 80]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY],
  );

  const handleLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  }, [mouseX, mouseY]);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(project.id);
    toast(liked ? "Like removed" : "Project disukai! ❤️", {
      icon: liked ? "💔" : "❤️",
    });
  };

  const isLive = project.status === "live";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: index * 0.09,
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href={`/projects/${project.slug}`}>
        <div style={{ perspective: 900 }}>
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleLeave}
            className="relative cursor-pointer group"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d" as const,
              borderRadius: "1.5rem",
              overflow: "hidden",
              background: "rgba(255,255,255,0.025)",
              border: hovered
                ? `1px solid ${ACCENT}40`
                : "1px solid rgba(255,255,255,0.08)",
              boxShadow: hovered
                ? `0 24px 70px rgba(0,0,0,0.55), 0 0 0 0.5px ${ACCENT}15, 0 0 40px ${ACCENT}08, inset 0 1px 0 rgba(255,255,255,0.1)`
                : `0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)`,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              transition: "border 0.35s, box-shadow 0.35s",
            }}
          >
            {hovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-3xl"
                style={{ opacity: 0.07 }}
              >
                <motion.div
                  className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
                  style={{
                    background: `radial-gradient(circle at ${shineX}% ${shineY}%, white, transparent 50%)`,
                  }}
                />
              </motion.div>
            )}

            <div
              className="absolute inset-x-0 top-0 h-px z-10 pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent 5%, ${ACCENT}${hovered ? "99" : "33"} 50%, transparent 95%)`,
                transition: "background 0.35s",
              }}
            />

            <div className="relative h-52 overflow-hidden bg-black/40">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                animate={{ scale: hovered ? 1.08 : 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />

              <motion.div
                className="absolute inset-0 flex items-center justify-center gap-3"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)",
                  opacity: hovered ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              >
                {project.previewUrl && (
                  <motion.span
                    initial={{ y: 12, opacity: 0 }}
                    animate={
                      hovered ? { y: 0, opacity: 1 } : { y: 12, opacity: 0 }
                    }
                    transition={{ delay: 0.05 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold font-mono"
                    style={{ background: ACCENT, color: "#000" }}
                  >
                    <ExternalLink size={13} /> Live Demo
                  </motion.span>
                )}
                <motion.span
                  initial={{ y: 12, opacity: 0 }}
                  animate={
                    hovered ? { y: 0, opacity: 1 } : { y: 12, opacity: 0 }
                  }
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold font-mono"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <Github size={13} /> Code
                </motion.span>
              </motion.div>

              <div className="absolute top-3 left-3 z-20">
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5"
                  style={{
                    background: isLive ? `${ACCENT}18` : "rgba(234,179,8,0.15)",
                    border: `1px solid ${isLive ? ACCENT + "40" : "rgba(234,179,8,0.4)"}`,
                    color: isLive ? ACCENT : "#eab308",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: isLive ? ACCENT : "#eab308" }}
                  />
                  {project.status}
                </span>
              </div>

              <div
                className="absolute bottom-0 inset-x-0 h-16 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(5,5,8,0.9), transparent)",
                }}
              />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 pr-3">
                  <h3
                    className="font-black text-lg leading-tight mb-1"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      color: hovered ? "#fff" : "rgba(255,255,255,0.88)",
                      transition: "color 0.3s",
                    }}
                  >
                    {project.title}
                  </h3>
                  {hovered && (
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-1"
                    >
                      <span
                        className="text-xs font-mono"
                        style={{ color: ACCENT }}
                      >
                        View Details
                      </span>
                      <ArrowUpRight size={11} color={ACCENT} />
                    </motion.div>
                  )}
                </div>

                <motion.button
                  onClick={handleLike}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.85 }}
                  className="flex-shrink-0 p-2 rounded-xl"
                  style={{
                    background: liked
                      ? "rgba(239,68,68,0.12)"
                      : "rgba(255,255,255,0.04)",
                    border: `1px solid ${liked ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  <Heart
                    size={15}
                    style={{
                      color: liked ? "#ef4444" : "rgba(255,255,255,0.4)",
                      fill: liked ? "#ef4444" : "none",
                      transition: "all 0.2s",
                    }}
                  />
                </motion.button>
              </div>

              <p
                className="text-sm leading-relaxed mb-5 line-clamp-2"
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "'DM Sans', sans-serif",
                  lineHeight: "1.75",
                }}
              >
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techStack.slice(0, 4).map((tech, ti) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.09 + 0.4 + ti * 0.04 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1 rounded-full text-xs font-mono cursor-default"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      color: "rgba(255,255,255,0.5)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
                {project.techStack.length > 4 && (
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

function FilterPill({
  tech,
  active,
  onClick,
}: {
  tech: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 rounded-xl text-sm font-mono font-bold relative overflow-hidden"
      style={{
        background: active ? ACCENT : "rgba(255,255,255,0.04)",
        border: active
          ? `1px solid ${ACCENT}`
          : "1px solid rgba(255,255,255,0.08)",
        color: active ? "#000" : "rgba(255,255,255,0.45)",
        boxShadow: active ? `0 0 24px ${ACCENT}40` : "none",
        transition: "all 0.25s ease",
      }}
    >
      {active && (
        <motion.div
          layoutId="filter-glow"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
          }}
        />
      )}
      {tech}
    </motion.button>
  );
}

export function Projects() {
  const { activeFilter, setFilter } = usePortfolioStore();
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.techStack.includes(activeFilter));

  return (
    <section
      id="projects"
      className="relative py-32 overflow-hidden"
      style={{ background: "#07070d" }}
    >
      <GlowCursor />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(240,165,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(240,165,0,0.025) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${ACCENT}06 0%, transparent 65%)`,
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, transparent, ${ACCENT}50)`,
              }}
            />
            <span
              className="text-xs font-mono px-4 py-2 rounded-full"
              style={{
                background: `${ACCENT}12`,
                border: `1px solid ${ACCENT}30`,
                color: ACCENT,
              }}
            >
              02_projects
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${ACCENT}50, transparent)`,
              }}
            />
          </div>

          <div className="relative">
            <div
              className="absolute -top-10 -left-3 font-black leading-none select-none pointer-events-none"
              style={{
                fontSize: "clamp(7rem, 18vw, 11rem)",
                color: ACCENT,
                opacity: 0.025,
                fontFamily: "'Syne', sans-serif",
                letterSpacing: "-0.06em",
              }}
            >
              02
            </div>
            <h2
              className="font-black tracking-tight"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(3.5rem, 9vw, 6rem)",
                letterSpacing: "-0.04em",
                background:
                  "linear-gradient(135deg, #ffffff 30%, rgba(255,255,255,0.3) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 0.95,
              }}
            >
              Selected Work
            </h2>
            <motion.div
              className="absolute -bottom-3 left-0 h-[3px] rounded-full"
              style={{
                background: `linear-gradient(90deg, ${ACCENT}, rgba(168,85,247,0.8), transparent)`,
                boxShadow: `0 0 12px ${ACCENT}50`,
              }}
              initial={{ width: "0%" }}
              animate={inView ? { width: "48%" } : {}}
              transition={{
                duration: 1.3,
                delay: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 mt-7"
          >
            <Sparkles size={13} color={ACCENT} />
            <p
              className="text-sm"
              style={{
                color: "rgba(255,255,255,0.3)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Projects yang paling saya banggakan — {projects.length} total
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex flex-wrap gap-2 mb-10 p-4 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-2 mr-2">
            <Layers size={13} style={{ color: "rgba(255,255,255,0.25)" }} />
            <span
              className="text-xs font-mono"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Filter:
            </span>
          </div>
          {["All", ...allTechStacks].map((tech) => (
            <FilterPill
              key={tech}
              tech={tech}
              active={activeFilter === tech}
              onClick={() => setFilter(tech)}
            />
          ))}
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid md:grid-cols-2 gap-6">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard project={project} index={i} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {filtered.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">🔍</div>
            <p
              className="font-mono text-sm"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Tidak ada project dengan tech stack ini.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
