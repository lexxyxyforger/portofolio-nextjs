"use client";
import {
  motion,
  useScroll,
  useTransform,
  animate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useEffect, useState, useCallback } from "react";
import { skills, skillRadar } from "@/data/portfolio";

const techStack = [
  {
    name: "React",
    color: "#61DAFB",
    bg: "rgba(13,42,54,0.9)",
    svg: (
      <svg viewBox="0 0 40 40" width="36" height="36">
        <circle cx="20" cy="20" r="3.5" fill="#61DAFB" />
        <ellipse
          cx="20"
          cy="20"
          rx="18"
          ry="7"
          fill="none"
          stroke="#61DAFB"
          strokeWidth="1.5"
        />
        <ellipse
          cx="20"
          cy="20"
          rx="18"
          ry="7"
          fill="none"
          stroke="#61DAFB"
          strokeWidth="1.5"
          transform="rotate(60 20 20)"
        />
        <ellipse
          cx="20"
          cy="20"
          rx="18"
          ry="7"
          fill="none"
          stroke="#61DAFB"
          strokeWidth="1.5"
          transform="rotate(120 20 20)"
        />
      </svg>
    ),
  },
  {
    name: "Next.js",
    color: "#e5e5e5",
    bg: "rgba(10,10,10,0.9)",
    svg: (
      <svg viewBox="0 0 40 40" width="36" height="36">
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="#111"
          stroke="#444"
          strokeWidth="1"
        />
        <path d="M13 28V12l16 19h-3L13 16v12z" fill="white" />
        <path
          d="M24 12h3v10"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    color: "#3B82F6",
    bg: "rgba(10,25,41,0.9)",
    svg: (
      <svg viewBox="0 0 40 40" width="36" height="36">
        <rect
          x="4"
          y="4"
          width="32"
          height="32"
          rx="5"
          fill="#3178C6"
          opacity="0.22"
          stroke="#3178C6"
          strokeWidth="1.5"
        />
        <text
          x="20"
          y="27"
          textAnchor="middle"
          fontSize="13"
          fontWeight="bold"
          fill="#3B82F6"
          fontFamily="monospace"
        >
          TS
        </text>
      </svg>
    ),
  },
  {
    name: "Node.js",
    color: "#4ADE80",
    bg: "rgba(10,26,10,0.9)",
    svg: (
      <svg viewBox="0 0 40 40" width="36" height="36">
        <path
          d="M20 3 L35 12 L35 28 L20 37 L5 28 L5 12 Z"
          fill="#339933"
          opacity="0.18"
          stroke="#339933"
          strokeWidth="1.5"
        />
        <text
          x="20"
          y="24"
          textAnchor="middle"
          fontSize="9"
          fontWeight="bold"
          fill="#4ADE80"
          fontFamily="monospace"
        >
          node
        </text>
      </svg>
    ),
  },
  {
    name: "Tailwind",
    color: "#38BDF8",
    bg: "rgba(7,26,46,0.9)",
    svg: (
      <svg viewBox="0 0 40 40" width="36" height="36">
        <path
          d="M10 20 Q15 10 20 20 Q25 30 30 20"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M6 27 Q11 17 16 27 Q21 37 26 27"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    ),
  },
  {
    name: "PHP",
    color: "#A78BFA",
    bg: "rgba(18,18,42,0.9)",
    svg: (
      <svg viewBox="0 0 40 40" width="36" height="36">
        <ellipse
          cx="20"
          cy="20"
          rx="18"
          ry="11"
          fill="#8892BF"
          opacity="0.12"
          stroke="#8892BF"
          strokeWidth="1.5"
        />
        <text
          x="20"
          y="24"
          textAnchor="middle"
          fontSize="11"
          fontWeight="bold"
          fill="#A78BFA"
          fontFamily="monospace"
        >
          PHP
        </text>
      </svg>
    ),
  },
  {
    name: "C++",
    color: "#60A5FA",
    bg: "rgba(7,22,38,0.9)",
    svg: (
      <svg viewBox="0 0 40 40" width="36" height="36">
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="none"
          stroke="#00599C"
          strokeWidth="1.5"
        />
        <text
          x="20"
          y="25"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="#60A5FA"
          fontFamily="monospace"
        >
          C++
        </text>
      </svg>
    ),
  },
  {
    name: "MySQL",
    color: "#22D3EE",
    bg: "rgba(7,30,36,0.9)",
    svg: (
      <svg viewBox="0 0 40 40" width="36" height="36">
        <ellipse
          cx="20"
          cy="13"
          rx="13"
          ry="5"
          fill="#00758F"
          opacity="0.18"
          stroke="#00758F"
          strokeWidth="1.5"
        />
        <path
          d="M7 13 L7 27 Q7 32 20 32 Q33 32 33 27 L33 13"
          fill="none"
          stroke="#00758F"
          strokeWidth="1.5"
        />
        <path
          d="M7 20 Q7 25 20 25 Q33 25 33 20"
          fill="none"
          stroke="#00758F"
          strokeWidth="1"
        />
      </svg>
    ),
  },
];

function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [inView, value]);
  return <>{display}</>;
}

function SkillBar({
  skill,
  index,
  inView,
}: {
  skill: { name: string; level: number };
  index: number;
  inView: boolean;
}) {
  const palettes = [
    ["#a855f7", "#ec4899"],
    ["#06b6d4", "#3b82f6"],
    ["#10b981", "#06b6d4"],
    ["#f59e0b", "#ef4444"],
    ["#8b5cf6", "#a855f7"],
    ["#ec4899", "#f97316"],
  ];
  const [c1, c2] = palettes[index % palettes.length];
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        delay: index * 0.07,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span
          className="text-sm font-semibold"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          {skill.name}
        </span>
        <span
          className="text-xs tabular-nums"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: c1 }}
        >
          <AnimatedNumber value={skill.level} inView={inView} />%
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{
            duration: 1.1,
            delay: index * 0.07 + 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${c1}, ${c2})`,
            boxShadow: `0 0 8px ${c1}66`,
          }}
        >
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{ background: c2, boxShadow: `0 0 6px ${c2}` }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function RadarChartSVG({
  data,
}: {
  data: { subject: string; value: number }[];
}) {
  const size = 260;
  const center = 130;
  const radius = 92;
  const levels = 4;
  const total = data.length;
  const pt = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / total - Math.PI / 2;
    const r = (v / 100) * radius;
    return { x: center + r * Math.cos(a), y: center + r * Math.sin(a) };
  };
  const ax = (i: number, r: number) => {
    const a = (Math.PI * 2 * i) / total - Math.PI / 2;
    return { x: center + r * Math.cos(a), y: center + r * Math.sin(a) };
  };
  const pts = data.map((d, i) => pt(i, d.value));
  const pathD =
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  const gc = [
    "rgba(139,92,246,0.06)",
    "rgba(139,92,246,0.1)",
    "rgba(139,92,246,0.14)",
    "rgba(139,92,246,0.19)",
  ];
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="w-full max-w-[260px]"
    >
      <defs>
        <radialGradient id="rg5" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.04" />
        </radialGradient>
        <filter id="gl5">
          <feGaussianBlur stdDeviation="2.5" result="cb" />
          <feMerge>
            <feMergeNode in="cb" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {Array.from({ length: levels }).map((_, l) => {
        const r = (radius / levels) * (l + 1);
        const points = Array.from({ length: total })
          .map((_, i) => {
            const p = ax(i, r);
            return `${p.x},${p.y}`;
          })
          .join(" ");
        return (
          <polygon
            key={l}
            points={points}
            fill={gc[l]}
            stroke="rgba(139,92,246,0.18)"
            strokeWidth="1"
          />
        );
      })}
      {data.map((_, i) => {
        const p = ax(i, radius);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="rgba(139,92,246,0.13)"
            strokeWidth="1"
          />
        );
      })}
      <path d={pathD} fill="url(#rg5)" stroke="none" />
      <path
        d={pathD}
        fill="rgba(168,85,247,0.1)"
        stroke="#a855f7"
        strokeWidth="2"
        filter="url(#gl5)"
      />
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3.5"
          fill="#a855f7"
          filter="url(#gl5)"
        />
      ))}
      {data.map((d, i) => {
        const p = ax(i, radius + 19);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9.5"
            fontFamily="monospace"
            fill="rgba(255,255,255,0.42)"
          >
            {d.subject}
          </text>
        );
      })}
    </svg>
  );
}

function TechCard({
  tech,
  index,
  inView,
}: {
  tech: (typeof techStack)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [20, -20]), {
    stiffness: 380,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-20, 20]), {
    stiffness: 380,
    damping: 28,
  });
  const shineX = useTransform(rawX, [-0.5, 0.5], [10, 90]);
  const shineY = useTransform(rawY, [-0.5, 0.5], [10, 90]);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY],
  );

  const handleLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }, [rawX, rawY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.82 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: 0.45 + index * 0.06,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: 500 }}
      className="relative"
    >
      {hovered && (
        <div
          className="absolute -bottom-3 inset-x-3 h-6 rounded-full pointer-events-none"
          style={{ background: tech.color, filter: "blur(14px)", opacity: 0.4 }}
        />
      )}

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative flex flex-col items-center gap-2.5 p-3.5 sm:p-4 rounded-2xl cursor-default select-none overflow-hidden"
      >
        <div
          className="absolute inset-0 rounded-2xl transition-all duration-300"
          style={{
            background: hovered ? tech.bg : "rgba(255,255,255,0.02)",
            border: hovered
              ? `1px solid ${tech.color}45`
              : "1px solid rgba(255,255,255,0.07)",
            boxShadow: hovered
              ? `0 16px 48px rgba(0,0,0,0.7), 0 0 0 1px ${tech.color}12, inset 0 1px 0 rgba(255,255,255,0.14)`
              : "0 2px 10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        />

        {hovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
            style={{ opacity: 0.08 }}
          >
            <motion.div
              className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
              style={{
                background: `radial-gradient(circle at ${shineX}% ${shineY}%, white, transparent 55%)`,
              }}
            />
          </motion.div>
        )}

        <motion.div
          className="absolute inset-x-0 top-0 h-px rounded-t-2xl pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            background: `linear-gradient(90deg, transparent, ${tech.color}90, transparent)`,
          }}
        />

        <motion.div
          className="absolute inset-y-0 left-0 w-px pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            background: `linear-gradient(to bottom, ${tech.color}60, transparent 70%)`,
          }}
        />

        <div
          className="relative rounded-xl p-2.5 flex items-center justify-center z-10"
          style={{
            background: hovered ? `${tech.color}16` : "rgba(255,255,255,0.04)",
            border: `1px solid ${hovered ? tech.color + "30" : "rgba(255,255,255,0.05)"}`,
            transition: "all 0.3s ease",
            boxShadow: hovered
              ? `0 0 28px ${tech.color}28, inset 0 1px 0 rgba(255,255,255,0.12)`
              : "none",
            transform: "translateZ(18px)",
          }}
        >
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.18), transparent 65%)",
            }}
          />
          <div className="relative z-10">{tech.svg}</div>
        </div>

        <motion.span
          className="relative z-10 text-[10px] sm:text-xs font-mono font-bold whitespace-nowrap text-center"
          animate={{
            color: hovered ? tech.color : "rgba(255,255,255,0.3)",
            textShadow: hovered ? `0 0 14px ${tech.color}90` : "none",
          }}
          transition={{ duration: 0.25 }}
          style={{ transform: "translateZ(10px)" }}
        >
          {tech.name}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.06 });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: "#07070d" }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: bgY,
          backgroundImage: `radial-gradient(ellipse 80% 50% at 20% 30%, rgba(168,85,247,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 70%, rgba(6,182,212,0.06) 0%, transparent 60%)`,
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          y: bgY,
          backgroundImage: `linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-6">
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(168,85,247,0.5))",
              }}
            />
            <span
              className="text-xs font-mono px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(168,85,247,0.1)",
                border: "1px solid rgba(168,85,247,0.3)",
                color: "#c084fc",
              }}
            >
              01_skills
            </span>
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, rgba(168,85,247,0.5), transparent)",
              }}
            />
          </div>
          <div className="relative inline-block">
            <h2
              className="font-black tracking-tight"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
                letterSpacing: "-0.04em",
                background:
                  "linear-gradient(135deg, #ffffff 30%, rgba(255,255,255,0.35) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Skills & Expertise
            </h2>
            <motion.div
              className="absolute -bottom-2 left-0 h-0.5 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #a855f7, #06b6d4, transparent)",
              }}
              initial={{ width: "0%" }}
              animate={inView ? { width: "55%" } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-20">
          <div className="space-y-4">
            {skills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                index={i}
                inView={inView}
              />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
                  filter: "blur(28px)",
                }}
              />
              <div
                className="relative rounded-3xl p-5 sm:p-6"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(20px)",
                  boxShadow:
                    "0 0 0 0.5px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                <RadarChartSVG data={skillRadar} />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(6,182,212,0.4))",
              }}
            />
            <span
              className="text-xs font-mono px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(6,182,212,0.1)",
                border: "1px solid rgba(6,182,212,0.3)",
                color: "#67e8f9",
              }}
            >
              tech_stack
            </span>
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, rgba(6,182,212,0.4), transparent)",
              }}
            />
          </div>

          <div className="grid grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 pb-6">
            {techStack.map((tech, i) => (
              <TechCard key={tech.name} tech={tech} index={i} inView={inView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
