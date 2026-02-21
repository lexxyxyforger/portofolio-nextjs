"use client";
import { Award } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const ACCENT = "#f0a500";

export function CertImage({ src, alt }: { src: string; alt: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [12, -12]), { stiffness: 340, damping: 28 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-12, 12]), { stiffness: 340, damping: 28 });
  const shineX = useTransform(rawX, [-0.5, 0.5], [10, 90]);
  const shineY = useTransform(rawY, [-0.5, 0.5], [10, 90]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [rawX, rawY]);

  const handleLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }, [rawX, rawY]);

  return (
    <div className="relative mb-8" style={{ perspective: 800 }}>
      {hovered && (
        <div
          className="absolute -bottom-4 inset-x-8 h-8 rounded-full pointer-events-none"
          style={{ background: ACCENT, filter: "blur(20px)", opacity: 0.25 }}
        />
      )}

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-72 rounded-2xl overflow-hidden cursor-default"
      >
        <div
          className="absolute inset-0 rounded-2xl transition-all duration-400"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: hovered ? `1px solid ${ACCENT}40` : "1px solid rgba(255,255,255,0.08)",
            boxShadow: hovered
              ? `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px ${ACCENT}12, 0 0 40px ${ACCENT}10, inset 0 1px 0 rgba(255,255,255,0.12)`
              : "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        />

        {!imgError && (
          <motion.img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onError={() => setImgError(true)}
            style={{ transform: "translateZ(0px)" }}
          />
        )}

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: imgError
              ? `linear-gradient(135deg, rgba(240,165,0,0.06), rgba(168,85,247,0.04))`
              : "transparent",
          }}
        >
          {imgError && (
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.12, 0.2, 0.12] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Award size={80} color={ACCENT} style={{ opacity: 0.15 }} />
            </motion.div>
          )}
        </div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }}
        />

        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
            style={{ opacity: 0.06 }}
          >
            <motion.div
              className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
              style={{ background: `radial-gradient(circle at ${shineX}% ${shineY}%, white, transparent 55%)` }}
            />
          </motion.div>
        )}

        <motion.div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}80, transparent)` }}
        />

        <motion.div
          className="absolute inset-y-0 left-0 w-px pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: `linear-gradient(to bottom, ${ACCENT}60, transparent 70%)` }}
        />

        <div
          className="absolute top-3 right-3 pointer-events-none"
          style={{
            background: `${ACCENT}15`,
            border: `1px solid ${ACCENT}30`,
            borderRadius: "0.625rem",
            padding: "6px",
            backdropFilter: "blur(8px)",
            transform: "translateZ(20px)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <Award size={14} color={ACCENT} />
        </div>
      </motion.div>
    </div>
  );
}