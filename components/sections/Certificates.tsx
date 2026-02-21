"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown, ChevronUp, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
import { certificates } from "@/data/portfolio";

const ACCENTS = ["#F0A500", "#00D4FF", "#A855F7", "#22C55E", "#F43F5E", "#FB923C"];

function CertCard({ cert, index }: { cert: (typeof certificates)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/certificates/${cert.id}`} className="block" tabIndex={-1}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative cursor-pointer select-none"
          style={{
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
            transition: "transform 0.3s ease",
          }}
        >
          <div
            className="absolute -inset-3 rounded-3xl pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 120%, ${accent}22, transparent 70%)`,
              filter: "blur(16px)",
              opacity: hovered ? 1 : 0.35,
              transition: "opacity 0.35s",
            }}
          />

          <div
            className="relative rounded-2xl overflow-hidden border"
            style={{
              background: "linear-gradient(160deg, #161616 0%, #0c0c0c 100%)",
              borderColor: hovered ? `${accent}50` : "rgba(255,255,255,0.07)",
              boxShadow: hovered
                ? `0 24px 60px -15px rgba(0,0,0,0.85), 0 0 0 1px ${accent}15, inset 0 1px 0 rgba(255,255,255,0.07)`
                : `0 8px 28px -8px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)`,
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
          >
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
                    transform: hovered ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                  }}
                  onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                />
              )}

              <div
                className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold"
                style={{ background: `${accent}18`, border: `1px solid ${accent}28`, color: accent, backdropFilter: "blur(8px)" }}
              >
                <Sparkles size={9} />
                {cert.issuer}
              </div>

              <div
                className="absolute bottom-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background: accent,
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? "scale(1) translateY(0)" : "scale(0.6) translateY(6px)",
                  transition: "opacity 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <ExternalLink size={11} className="text-black" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>

            <div className="p-4 relative z-10">
              <h3
                className="font-semibold text-sm leading-snug mb-3 line-clamp-2"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: hovered ? accent : "rgba(255,255,255,0.88)",
                  transition: "color 0.25s",
                }}
              >
                {cert.title}
              </h3>

              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{ background: `${accent}12`, color: `${accent}bb`, border: `1px solid ${accent}1e` }}
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
                        transition: `background 0.25s ${d * 0.05}s, opacity 0.25s`,
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
                transition: "background 0.35s",
              }}
            />
          </div>
        </div>
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #F0A50005 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "#F0A500" }}>
              04_certificates
            </span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <h2
                className="text-4xl sm:text-5xl font-bold mb-2"
                style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.03em" }}
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
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs transition-all duration-250"
              style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#F0A50050";
                (e.currentTarget as HTMLButtonElement).style.color = "#F0A500";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)";
              }}
            >
              {showAll ? <><ChevronUp size={13} /> Show Less</> : <><ChevronDown size={13} /> Lihat {certificates.length - defaultCount} lainnya</>}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function CertImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative h-72 rounded-2xl overflow-hidden mb-8 border"
      style={{
        background: "linear-gradient(135deg, #161616, #0c0c0c)",
        borderColor: "rgba(255,255,255,0.07)",
        boxShadow: "0 20px 60px -15px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div
        className="absolute inset-x-8 -bottom-4 h-8 rounded-full pointer-events-none"
        style={{ background: "rgba(240,165,0,0.18)", filter: "blur(20px)" }}
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
    </div>
  );
}