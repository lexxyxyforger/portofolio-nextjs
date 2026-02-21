"use client";
import { Award } from "lucide-react";
import { useState } from "react";

const ACCENT = "#f0a500";

export function CertImage({ src, alt }: { src: string; alt: string }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative mb-8">
      <div
        className="absolute -bottom-3 inset-x-8 h-6 rounded-full pointer-events-none"
        style={{
          background: ACCENT,
          filter: "blur(18px)",
          opacity: hovered ? 0.22 : 0,
          transition: "opacity 0.35s",
        }}
      />

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative h-72 rounded-2xl overflow-hidden cursor-default"
        style={{
          border: hovered ? `1px solid ${ACCENT}38` : "1px solid rgba(255,255,255,0.08)",
          boxShadow: hovered
            ? `0 20px 50px rgba(0,0,0,0.55), 0 0 0 1px ${ACCENT}10, inset 0 1px 0 rgba(255,255,255,0.1)`
            : "0 4px 20px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05)",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          transition: "border 0.3s, box-shadow 0.3s, transform 0.3s ease",
        }}
      >
        {!imgError && (
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1)",
            }}
            onError={() => setImgError(true)}
          />
        )}

        {imgError && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, rgba(240,165,0,0.05), rgba(168,85,247,0.04))` }}
          >
            <Award size={80} color={ACCENT} style={{ opacity: 0.13 }} />
          </div>
        )}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.48) 0%, transparent 50%)",
            opacity: hovered ? 1 : 0.6,
            transition: "opacity 0.3s",
          }}
        />

        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${ACCENT}70, transparent)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />

        <div
          className="absolute top-3 right-3 pointer-events-none"
          style={{
            background: `${ACCENT}14`,
            border: `1px solid ${ACCENT}28`,
            borderRadius: "0.625rem",
            padding: "6px",
            backdropFilter: "blur(8px)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.25s",
          }}
        >
          <Award size={14} color={ACCENT} />
        </div>
      </div>
    </div>
  );
}