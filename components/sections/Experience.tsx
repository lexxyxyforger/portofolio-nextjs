"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import { experiences } from "@/data/portfolio";
import { Briefcase, GraduationCap, Zap } from "lucide-react";

const glowColors: Record<string, string> = {
  work: "rgba(139,92,246,0.6)",
  education: "rgba(6,182,212,0.6)",
};

function FloatingOrb({ cx, cy, r, color }: { cx: string; cy: string; r: string; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: cx,
        top: cy,
        width: r,
        height: r,
        background: color,
        filter: "blur(80px)",
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.15, 0.3, 0.15],
      }}
      transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Card3D({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const cardRef = useRef<HTMLDivElement>(null);
  const isWork = exp.type !== "education";
  const accent = isWork ? "#8b5cf6" : "#06b6d4";
  const accentGlow = isWork ? glowColors.work : glowColors.education;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateZ(8px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="flex gap-4 sm:gap-8 items-start">
        <div className="flex flex-col items-center gap-0 flex-shrink-0 pt-1">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            style={{
              background: `linear-gradient(135deg, ${accent}22, ${accent}44)`,
              border: `1.5px solid ${accent}66`,
              boxShadow: `0 0 20px ${accentGlow}, inset 0 1px 0 ${accent}33`,
            }}
            className="w-11 h-11 rounded-2xl flex items-center justify-center relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at 30% 30%, white, transparent 70%)`,
              }}
            />
            {isWork
              ? <Briefcase size={16} color={accent} />
              : <GraduationCap size={16} color={accent} />}
          </motion.div>

          {index < experiences.length - 1 && (
            <div className="relative w-0.5 flex-1 min-h-[80px] my-2 overflow-hidden rounded-full"
              style={{ background: "rgba(255,255,255,0.06)" }}>
              <motion.div
                className="absolute top-0 left-0 w-full rounded-full"
                style={{ background: `linear-gradient(to bottom, ${accent}, transparent)` }}
                initial={{ height: "0%" }}
                animate={inView ? { height: "100%" } : {}}
                transition={{ duration: 1.2, delay: index * 0.12 + 0.4, ease: "easeOut" }}
              />
            </div>
          )}
        </div>

        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex-1 mb-8 cursor-default"
          style={{ transition: "transform 0.15s ease", transformStyle: "preserve-3d" }}
        >
          <div
            className="relative rounded-3xl p-6 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              boxShadow: `0 4px 40px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)`,
            }}
          >
            <div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${accentGlow} 0%, transparent 70%)`,
                opacity: 0.15,
              }}
            />

            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}66, transparent)`,
              }}
            />

            <div className="relative z-10">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <h3
                    className="font-bold text-xl tracking-tight mb-1"
                    style={{ fontFamily: "'Cabinet Grotesk', 'Clash Display', sans-serif" }}
                  >
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Zap size={11} color={accent} />
                    <p className="text-sm font-semibold" style={{ color: accent, fontFamily: "monospace" }}>
                      {exp.company}
                    </p>
                  </div>
                </div>

                <span
                  className="text-xs font-mono px-3 py-1.5 rounded-xl flex-shrink-0"
                  style={{
                    background: `${accent}12`,
                    border: `1px solid ${accent}33`,
                    color: accent,
                  }}
                >
                  {exp.period}
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.techStack.map((tech, ti) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.12 + 0.5 + ti * 0.04 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-3 py-1 rounded-full text-xs font-mono"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.6)",
                      cursor: "default",
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
      style={{ background: "#050508" }}
    >
      <FloatingOrb cx="10%" cy="20%" r="500px" color="rgba(139,92,246,0.3)" />
      <FloatingOrb cx="85%" cy="60%" r="400px" color="rgba(6,182,212,0.2)" />
      <FloatingOrb cx="50%" cy="90%" r="350px" color="rgba(168,85,247,0.15)" />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: bgY,
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5))" }} />
            <span
              className="text-xs font-mono px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.3)",
                color: "#a78bfa",
              }}
            >
              03_experience
            </span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.5), transparent)" }} />
          </div>

          <div className="relative">
            <h2
              className="text-5xl sm:text-6xl font-black tracking-tight"
              style={{
                fontFamily: "'Cabinet Grotesk', 'Clash Display', sans-serif",
                background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.4) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Journey
            </h2>
            <motion.div
              className="absolute -bottom-2 left-0 h-0.5 rounded-full"
              style={{ background: "linear-gradient(90deg, #8b5cf6, #06b6d4, transparent)" }}
              initial={{ width: "0%" }}
              animate={inView ? { width: "40%" } : {}}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        <div>
          {experiences.map((exp, i) => (
            <Card3D key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}