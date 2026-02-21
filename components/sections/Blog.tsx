"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { blogPosts } from "@/data/portfolio";
import {
  Clock,
  Eye,
  ArrowUpRight,
  Hash,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

const POST_ACCENTS = [
  "#F0A500",
  "#00D4FF",
  "#A855F7",
  "#22C55E",
  "#F43F5E",
  "#FB923C",
];

function BlogCard({
  post,
  index,
}: {
  post: (typeof blogPosts)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const accent = POST_ACCENTS[index % POST_ACCENTS.length];

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });
  const glowX = useTransform(rawX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(rawY, [-0.5, 0.5], [0, 100]);

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
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{
        delay: index * 0.09,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1000 }}
    >
      <Link href={`/blog/${post.slug}`} tabIndex={-1} className="block">
        <motion.div
          ref={cardRef}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleReset}
          animate={{ y: [0, -5, 0] }}
          transition={{
            y: {
              duration: 4 + index * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.7,
            },
          }}
          className="relative cursor-pointer select-none touch-manipulation"
        >
          <div
            className="absolute -inset-2 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 110%, ${accent}22, transparent 70%)`,
              filter: "blur(14px)",
              opacity: hovered ? 1 : 0.3,
              transition: "opacity 0.4s",
            }}
          />
          <div
            className="absolute inset-x-8 -bottom-3 h-4 rounded-full pointer-events-none"
            style={{
              background: `${accent}25`,
              filter: "blur(14px)",
              opacity: hovered ? 0.9 : 0.25,
              transition: "opacity 0.4s",
            }}
          />

          <div
            className="relative rounded-2xl overflow-hidden border"
            style={{
              background: "linear-gradient(155deg, #141414 0%, #0b0b0b 100%)",
              borderColor: hovered ? `${accent}50` : "rgba(255,255,255,0.06)",
              boxShadow: hovered
                ? `0 24px 60px -12px rgba(0,0,0,0.85), 0 0 0 1px ${accent}15, inset 0 1px 0 rgba(255,255,255,0.07)`
                : "0 4px 24px -4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
          >
            {hovered && (
              <div
                className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl"
                style={{ opacity: 0.1 }}
              >
                <motion.div
                  className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
                  style={{
                    background: `radial-gradient(circle at ${glowX}% ${glowY}%, white, transparent 50%)`,
                  }}
                />
              </div>
            )}

            <div
              className="absolute top-0 left-0 right-0 h-[2px] z-30"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}cc, transparent)`,
              }}
            />

            <div className="p-5 relative z-10">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold"
                      style={{
                        background: `${accent}14`,
                        border: `1px solid ${accent}28`,
                        color: `${accent}cc`,
                      }}
                    >
                      <Hash size={8} strokeWidth={2.5} />
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: hovered ? accent : `${accent}15`,
                    border: `1px solid ${accent}30`,
                    transition: "background 0.3s, transform 0.3s",
                    transform: hovered
                      ? "rotate(-45deg) scale(1.1)"
                      : "rotate(0deg) scale(1)",
                  }}
                >
                  <ArrowUpRight
                    size={13}
                    style={{
                      color: hovered ? "#000" : accent,
                      transition: "color 0.3s",
                    }}
                  />
                </div>
              </div>

              <h3
                className="font-bold text-base leading-snug mb-2"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: hovered ? accent : "rgba(255,255,255,0.9)",
                  transition: "color 0.3s",
                  letterSpacing: "-0.01em",
                }}
              >
                {post.title}
              </h3>

              <p
                className="text-xs leading-relaxed mb-4 line-clamp-2"
                style={{
                  color: "rgba(255,255,255,0.38)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {post.excerpt}
              </p>

              <div
                className="flex items-center gap-4 pt-3 font-mono text-[10px]"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                <span className="flex items-center gap-1.5">
                  <Clock size={10} />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye size={10} />
                  {post.views.toLocaleString("en-US")} views
                </span>
                <div className="ml-auto flex gap-1">
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
                background: hovered
                  ? `linear-gradient(90deg, transparent, ${accent}60, transparent)`
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

export function Blog() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0 });
  const [showAll, setShowAll] = useState(false);
  const [defaultCount, setDefaultCount] = useState(6);

  useEffect(() => {
    setDefaultCount(window.innerWidth < 640 ? 3 : 6);
  }, []);

  const visible = showAll ? blogPosts : blogPosts.slice(0, defaultCount);

  return (
    <section id="blog" ref={ref} className="py-28 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #00D4FF05 0%, transparent 70%)",
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
            <div
              className="h-px flex-1"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{ color: "var(--accent, #F0A500)" }}
            >
              07_blog
            </span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <h2
                className="text-4xl sm:text-5xl font-bold mb-2"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Dev Notes
              </h2>
              <p
                className="text-sm font-mono"
                style={{ color: "rgba(255,255,255,0.38)" }}
              >
                Sharing pengalaman coding dan insights.
              </p>
            </div>
            <div
              className="font-mono text-[11px] px-3 py-1.5 rounded-full"
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              {blogPosts.length} posts
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-4">
          <AnimatePresence>
            {visible.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {blogPosts.length > defaultCount && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs transition-all duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.45)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#F0A50055";
                (e.currentTarget as HTMLButtonElement).style.color = "#F0A500";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(255,255,255,0.45)";
              }}
            >
              {showAll ? (
                <>
                  <ChevronUp size={13} /> Show Less
                </>
              ) : (
                <>
                  <ChevronDown size={13} /> Lihat{" "}
                  {blogPosts.length - defaultCount} lainnya
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
