"use client";
import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { testimonials } from "@/data/portfolio";
import { Star, Sparkles } from "lucide-react";
import Link from "next/link";

const ACCENTS = ["#F0A500", "#A855F7", "#00D4FF", "#22C55E", "#F43F5E", "#FB923C"];

function TestiCard({ t, index }: { t: (typeof testimonials)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const accent = ACCENTS[index % ACCENTS.length];

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX = useTransform(rawX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(rawY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
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
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -8, 0] }}
        transition={{
          y: { duration: 3.8 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.8 },
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleReset}
        className="relative cursor-default select-none touch-manipulation"
      >
        <div
          className="absolute -inset-2 rounded-3xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 110%, ${accent}20, transparent 70%)`,
            filter: "blur(16px)",
            opacity: hovered ? 1 : 0.35,
            transition: "opacity 0.4s",
          }}
        />
        <div
          className="absolute inset-x-8 -bottom-3 h-5 rounded-full pointer-events-none"
          style={{
            background: `${accent}28`,
            filter: "blur(16px)",
            opacity: hovered ? 0.9 : 0.3,
            transition: "opacity 0.4s",
          }}
        />

        <div
          className="relative rounded-2xl overflow-hidden border"
          style={{
            background: "linear-gradient(155deg, #141414 0%, #0b0b0b 100%)",
            borderColor: hovered ? `${accent}50` : "rgba(255,255,255,0.06)",
            boxShadow: hovered
              ? `0 28px 65px -14px rgba(0,0,0,0.88), 0 0 0 1px ${accent}15, inset 0 1px 0 rgba(255,255,255,0.07)`
              : "0 6px 28px -6px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.03)",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
        >
          {hovered && (
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl" style={{ opacity: 0.1 }}>
              <motion.div
                className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
                style={{ background: `radial-gradient(circle at ${glowX}% ${glowY}%, white, transparent 50%)` }}
              />
            </div>
          )}

          <div
            className="absolute top-0 left-0 right-0 h-[2px] z-30"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}bb, transparent)` }}
          />

          <div className="p-5 relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] font-semibold"
                style={{
                  background: `${accent}14`,
                  border: `1px solid ${accent}28`,
                  color: `${accent}cc`,
                }}
              >
                <Sparkles size={9} />
                verified
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star
                    key={s}
                    size={11}
                    style={{
                      fill: accent,
                      color: accent,
                      opacity: 0.7 + s * 0.06,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-5 relative">
              <span
                className="absolute -top-1 -left-1 font-serif text-5xl leading-none select-none pointer-events-none"
                style={{ color: `${accent}18`, fontFamily: "Georgia, serif" }}
              >
                "
              </span>
              <p
                className="text-sm leading-relaxed pl-3 relative z-10"
                style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {t.content}
              </p>
            </div>

            <div
              className="flex items-center gap-3 pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover"
                  style={{
                    border: `2px solid ${accent}40`,
                    boxShadow: hovered ? `0 0 12px ${accent}40` : "none",
                    transition: "box-shadow 0.3s",
                  }}
                />
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                  style={{
                    background: accent,
                    borderColor: "#0b0b0b",
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="font-semibold text-sm truncate"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: hovered ? accent : "rgba(255,255,255,0.88)",
                    transition: "color 0.3s",
                  }}
                >
                  {t.name}
                </p>
                <p className="text-[10px] font-mono truncate" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {t.role}
                </p>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map((d) => (
                  <div
                    key={d}
                    className="w-1 h-1 rounded-full"
                    style={{
                      background: hovered ? accent : "rgba(255,255,255,0.12)",
                      opacity: hovered ? 0.5 + d * 0.25 : 1,
                      transition: `background 0.3s ${d * 0.06}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="h-px"
            style={{
              background: hovered ? `linear-gradient(90deg, transparent, ${accent}60, transparent)` : "transparent",
              transition: "background 0.4s",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0 });

  return (
    <section id="testimonials" ref={ref} className="py-28 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #A855F705 0%, transparent 70%)",
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
              05_testimonials
            </span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <h2
                className="text-4xl sm:text-5xl font-bold mb-2"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}
              >
                Kata Mereka
              </h2>
              <p className="text-sm font-mono" style={{ color: "rgba(255,255,255,0.38)" }}>
                Apa yang orang-orang bilang tentang kerja sama kita.
              </p>
            </div>
            <div
              className="font-mono text-[11px] px-3 py-1.5 rounded-full"
              style={{ border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}
            >
              {testimonials.length} reviews
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-4">
          {testimonials.map((t, i) => (
            <TestiCard key={t.id} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}