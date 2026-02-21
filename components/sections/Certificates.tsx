"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown, ChevronUp, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
import { certificates } from "@/data/portfolio";

const ACCENTS = ["#F0A500", "#00D4FF", "#A855F7", "#22C55E", "#F43F5E", "#FB923C"];

function CertCard({ cert, index }: { cert: (typeof certificates)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const accent = ACCENTS[index % ACCENTS.length];

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [14, -14]), { stiffness: 280, damping: 28 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-14, 14]), { stiffness: 280, damping: 28 });
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

  const floatDelay = (index % 3) * 0.9;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
    >
      <Link href={`/certificates/${cert.id}`} className="block" tabIndex={-1}>
        <motion.div
          ref={cardRef}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            y: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleReset}
          className="relative cursor-pointer select-none touch-manipulation"
        >
          <div
            className="absolute -inset-3 rounded-3xl pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 120%, ${accent}28, transparent 70%)`,
              filter: "blur(18px)",
              opacity: hovered ? 1 : 0.45,
              transition: "opacity 0.4s",
            }}
          />

          <div
            className="absolute inset-x-6 -bottom-4 h-6 rounded-full pointer-events-none"
            style={{
              background: `${accent}30`,
              filter: "blur(20px)",
              opacity: hovered ? 1 : 0.35,
              transition: "opacity 0.4s",
            }}
          />

          <div
            className="relative rounded-2xl overflow-hidden border"
            style={{
              background: "linear-gradient(160deg, #161616 0%, #0c0c0c 100%)",
              borderColor: hovered ? `${accent}55` : "rgba(255,255,255,0.07)",
              boxShadow: hovered
                ? `0 30px 70px -15px rgba(0,0,0,0.9), 0 0 0 1px ${accent}18, inset 0 1px 0 rgba(255,255,255,0.08)`
                : `0 8px 30px -8px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)`,
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
          >
            {hovered && (
              <div
                className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden"
                style={{ opacity: 0.12 }}
              >
                <motion.div
                  className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
                  style={{
                    background: `radial-gradient(circle at ${glowX}% ${glowY}%, white 0%, transparent 50%)`,
                  }}
                />
              </div>
            )}

            <div
              className="absolute top-0 left-0 right-0 h-[2px] z-30"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
            />

            <div
              className="relative overflow-hidden"
              style={{ height: 158, background: "linear-gradient(135deg, #181818, #0e0e0e)" }}
            >
              {cert.image && (
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover"
                  style={{
                    transform: hovered ? "scale(1.07)" : "scale(1)",
                    transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
                  }}
                  onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                />
              )}

              <div
                className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold backdrop-blur-md"
                style={{ background: `${accent}18`, border: `1px solid ${accent}30`, color: accent }}
              >
                <Sparkles size={9} />
                {cert.issuer}
              </div>

              <div
                className="absolute bottom-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background: accent,
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? "scale(1) translateY(0)" : "scale(0.5) translateY(6px)",
                  transition: "opacity 0.3s, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <ExternalLink size={11} className="text-black" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            </div>

            <div className="p-4 relative z-10">
              <h3
                className="font-semibold text-sm leading-snug mb-3 line-clamp-2"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: hovered ? accent : "rgba(255,255,255,0.88)",
                  transition: "color 0.3s",
                }}
              >
                {cert.title}
              </h3>

              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{
                    background: `${accent}12`,
                    color: `${accent}bb`,
                    border: `1px solid ${accent}1e`,
                  }}
                >
                  {cert.date}
                </span>
                <div className="flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <div
                      key={d}
                      className="w-1 h-1 rounded-full"
                      style={{
                        background: hovered ? accent : "rgba(255,255,255,0.14)",
                        opacity: hovered ? 0.5 + d * 0.25 : 1,
                        transition: `background 0.3s ${d * 0.06}s, opacity 0.3s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div
              className="h-px"
              style={{
                background: hovered
                  ? `linear-gradient(90deg, transparent, ${accent}70, transparent)`
                  : "transparent",
                transition: "background 0.4s",
              }}
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function Certificates() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0 });
  const [showAll, setShowAll] = useState(false);
  const [defaultCount, setDefaultCount] = useState(6);

  useEffect(() => {
    setDefaultCount(window.innerWidth < 640 ? 3 : 6);
  }, []);

  const visible = showAll ? certificates : certificates.slice(0, defaultCount);

  return (
    <section ref={ref} id="certificates" className="py-28 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #F0A50006 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{ color: "var(--accent, #F0A500)" }}
            >
              04_certificates
            </span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <h2
                className="text-4xl sm:text-5xl font-bold mb-2"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}
              >
                Certificates
              </h2>
              <p className="text-sm font-mono" style={{ color: "rgba(255,255,255,0.38)" }}>
                Sertifikasi & pencapaian yang telah saya raih.
              </p>
            </div>
            <div
              className="font-mono text-[11px] px-3 py-1.5 rounded-full"
              style={{ border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}
            >
              {certificates.length} total
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
          <AnimatePresence>
            {visible.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {certificates.length > defaultCount && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#F0A50055";
                (e.currentTarget as HTMLButtonElement).style.color = "#F0A500";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)";
              }}
            >
              {showAll ? (
                <><ChevronUp size={13} /> Show Less</>
              ) : (
                <><ChevronDown size={13} /> Lihat {certificates.length - defaultCount} lainnya</>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function CertImage({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      className="relative h-72 rounded-2xl overflow-hidden mb-8 border"
      style={{
        background: "linear-gradient(135deg, #161616, #0c0c0c)",
        borderColor: "rgba(255,255,255,0.07)",
        boxShadow: "0 20px 60px -15px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="absolute inset-x-8 -bottom-4 h-8 rounded-full pointer-events-none"
        style={{
          background: "rgba(240,165,0,0.2)",
          filter: "blur(22px)",
        }}
      />
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
      />
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #F0A500, transparent)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </motion.div>
  );
}