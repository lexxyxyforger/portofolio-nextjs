"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  animate,
} from "framer-motion";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { personalInfo } from "@/data/portfolio";
import { Github, Download, MapPin, Sparkles, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const ACCENT = "#F0A500";

// Counter lebih ringan: durasi lebih pendek
function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const ctrl = animate(0, value, {
      duration: 1.2,
      delay: 0.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [value]);
  return (
    <>
      {display}
      {suffix}
    </>
  );
}

// Particle dikurangi dari 28 → 10, animasi disederhanakan
type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 10 + 10, // lebih lambat = lebih ringan
        delay: Math.random() * 4,
        opacity: Math.random() * 0.3 + 0.1,
      })),
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              p.id % 3 === 0 ? ACCENT : p.id % 3 === 1 ? "#a855f7" : "#06b6d4",
          }}
          // Hanya animasi Y (hapus X) untuk mengurangi beban
          animate={{
            y: [-15, 15, -15],
            opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function AvatarCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring lebih longgar = lebih ringan
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 25,
  });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY],
  );

  const handleReset = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }, [rawX, rawY]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, x: 30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="hidden lg:flex justify-center items-center relative"
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        // Float lebih lambat = lebih ringan
        animate={{ y: [0, -10, 0] }}
        transition={{ y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleReset}
        className="relative select-none"
      >
        {/* Glow background */}
        <div
          className="absolute -inset-10 rounded-[3rem] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, ${ACCENT}20, rgba(168,85,247,0.08) 50%, transparent 70%)`,
            filter: "blur(30px)",
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 0.5s",
          }}
        />

        <div
          className="absolute inset-x-8 -bottom-8 h-10 rounded-full pointer-events-none"
          style={{
            background: `${ACCENT}35`,
            filter: "blur(28px)",
            opacity: hovered ? 1 : 0.45,
            transition: "opacity 0.5s",
          }}
        />

        <div
          className="relative w-[300px] h-[300px] rounded-[2rem] overflow-hidden"
          style={{
            border: `1.5px solid ${hovered ? `${ACCENT}60` : `${ACCENT}25`}`,
            boxShadow: hovered
              ? `0 40px 100px -20px rgba(0,0,0,0.95), 0 0 0 1px ${ACCENT}15, 0 0 60px ${ACCENT}20, inset 0 1px 0 rgba(255,255,255,0.1)`
              : `0 20px 60px -10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)`,
            transition: "border-color 0.4s, box-shadow 0.4s",
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] z-30"
            style={{
              background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(240,165,0,0.06)] to-transparent z-10" />

          <img
            src={personalInfo.avatar}
            alt={personalInfo.name}
            className="w-full h-full object-cover"
            style={{
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>

        {/* Floating badges — animasi dikurangi, hanya satu sumbu */}
        {[
          {
            text: "5+ yrs exp 🚀",
            pos: "-top-5 -right-8",
            delay: 0.4,
            dir: -5,
          },
          {
            text: "30+ projects ⚡",
            pos: "-bottom-5 -left-8",
            delay: 0,
            dir: 5,
          },
        ].map((badge) => (
          <motion.div
            key={badge.text}
            animate={{ y: [0, badge.dir, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: badge.delay,
            }}
            className={`absolute ${badge.pos} px-4 py-2 rounded-2xl font-mono text-xs font-bold`}
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              border: `1px solid ${badge.dir < 0 ? ACCENT + "40" : "rgba(255,255,255,0.1)"}`,
              color: badge.dir < 0 ? ACCENT : "rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              boxShadow: `0 8px 32px rgba(0,0,0,0.5)`,
            }}
          >
            {badge.text}
          </motion.div>
        ))}

        {/* Rotating ring — dihapus: ini sangat mahal karena rotate: 360 tiap 20s. Diganti dekorasi statis */}
        <div
          className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full pointer-events-none"
          style={{ border: `1px dashed ${ACCENT}20` }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-44px",
            right: "-44px",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: ACCENT,
            boxShadow: `0 0 8px ${ACCENT}`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const typedText = useTypingEffect(personalInfo.roles);

  const handleCV = () => {
    const a = document.createElement("a");
    a.href = personalInfo.cvUrl;
    a.download = "CV.pdf";
    a.click();
    toast.success("CV downloaded!");
  };

  const stats = [
    { value: 30, suffix: "+", label: "Projects", color: ACCENT },
    { value: 5, suffix: "+", label: "Tahun Exp", color: "#06b6d4" },
    { value: 90, suffix: "+", label: "Happy Clients", color: "#a855f7" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden"
      style={{ background: "#050508" }}
    >
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .animate-blink { animation: blink 1.1s step-end infinite; }
      `}</style>

      <ParticleField />

      {/* Grid background — CSS murni, nol JS */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(240,165,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(240,165,0,0.025) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient glows — statis, tidak dianimasikan */}
      <div
        className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${ACCENT}06 0%, transparent 65%)`,
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            {/* Badge & location */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex items-center gap-3 mb-8 flex-wrap"
            >
              {personalInfo.available && (
                <span
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold"
                  style={{
                    border: `1px solid ${ACCENT}45`,
                    background: `${ACCENT}10`,
                    color: ACCENT,
                    boxShadow: `0 0 20px ${ACCENT}15`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: ACCENT }}
                  />
                  Available for work
                </span>
              )}
              <span
                className="flex items-center gap-1.5 text-xs font-mono"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                <MapPin size={11} />
                {personalInfo.location}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p
                className="text-sm font-mono mb-3"
                style={{
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.15em",
                }}
              >
                HELLO WORLD —
              </p>
              <h1
                className="font-black leading-[1.0] mb-6"
                style={{
                  fontFamily: "'Cabinet Grotesk', 'Clash Display', sans-serif",
                  fontSize: "clamp(3rem, 8vw, 5.5rem)",
                  letterSpacing: "-0.04em",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.9)" }}>
                  Hi, I&apos;m
                </span>
                <br />
                <span
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, #f97316)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: `drop-shadow(0 0 30px ${ACCENT}60)`,
                  }}
                >
                  {personalInfo.name.split(" ")[0]}
                </span>
              </h1>
            </motion.div>

            {/* Typing */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="h-11 mb-7"
            >
              <p
                className="text-xl lg:text-2xl font-semibold"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "-0.02em",
                }}
              >
                {typedText}
                <span
                  className="inline-block w-[2px] h-6 ml-1 align-middle animate-blink rounded-full"
                  style={{ background: ACCENT }}
                />
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="leading-relaxed mb-10 max-w-md text-sm"
              style={{
                color: "rgba(255,255,255,0.38)",
                fontFamily: "'Cabinet Grotesk', sans-serif",
                lineHeight: "1.8",
              }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <motion.button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold font-mono text-sm relative overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, #f97316)`,
                  color: "#000",
                  boxShadow: `0 8px 32px ${ACCENT}40`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
                  }}
                />
                <Sparkles size={14} />
                Lihat Projects
                <ArrowRight size={13} />
              </motion.button>

              <motion.button
                onClick={handleCV}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold font-mono text-sm"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const b = e.currentTarget as HTMLButtonElement;
                  b.style.borderColor = `${ACCENT}50`;
                  b.style.color = ACCENT;
                  b.style.boxShadow = `0 0 20px ${ACCENT}15`;
                }}
                onMouseLeave={(e) => {
                  const b = e.currentTarget as HTMLButtonElement;
                  b.style.borderColor = "rgba(255,255,255,0.1)";
                  b.style.color = "rgba(255,255,255,0.6)";
                  b.style.boxShadow = "none";
                }}
              >
                <Download size={14} />
                Download CV
              </motion.button>
            </motion.div>

            {/* GitHub */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3"
            >
              <a
                href={`https://github.com/${personalInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-xs transition-all duration-300"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.35)",
                  background: "rgba(255,255,255,0.02)",
                }}
                onMouseEnter={(e) => {
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.borderColor = `${ACCENT}45`;
                  a.style.color = ACCENT;
                  a.style.background = `${ACCENT}08`;
                }}
                onMouseLeave={(e) => {
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.borderColor = "rgba(255,255,255,0.08)";
                  a.style.color = "rgba(255,255,255,0.35)";
                  a.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <Github size={15} />@{personalInfo.github}
              </a>
            </motion.div>
          </div>

          <AvatarCard />
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 relative"
        >
          <div
            className="absolute inset-0 -top-4 rounded-3xl pointer-events-none"
            style={{
              background: "rgba(255,255,255,0.015)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          />

          <div className="grid grid-cols-3 gap-0 relative">
            {stats.map((stat, i) => (
              <div key={stat.label} className="relative">
                {i > 0 && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)",
                    }}
                  />
                )}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className="text-center py-8 px-4 group cursor-default"
                >
                  <div
                    className="font-black mb-2 tabular-nums"
                    style={{
                      fontFamily: "'Cabinet Grotesk', sans-serif",
                      fontSize: "clamp(2rem, 5vw, 3rem)",
                      letterSpacing: "-0.04em",
                      color: stat.color,
                      textShadow: `0 0 40px ${stat.color}50`,
                    }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div
                    className="text-xs font-mono tracking-widest uppercase"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    {stat.label}
                  </div>
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-12 rounded-full transition-all duration-500"
                    style={{ background: stat.color }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
