"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Crown, Keyboard } from "lucide-react";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { personalInfo } from "@/data/portfolio";

const ACCENT = "#f0a500";

const navLinks = [
  { href: "#about", label: "About", key: "1" },
  { href: "#projects", label: "Projects", key: "2" },
  { href: "#experience", label: "Experience", key: "3" },
  { href: "#certificates", label: "Certificates", key: "4" },
  { href: "#blog", label: "Blog", key: "5" },
  { href: "#contact", label: "Contact", key: "6" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const logoClickCount = useRef(0);
  const logoClickTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    navLinks.forEach((link) => {
      const el = document.getElementById(link.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useKeyboardShortcuts({
    "1": () => scrollToSection("about"),
    "2": () => scrollToSection("projects"),
    "3": () => scrollToSection("experience"),
    "4": () => scrollToSection("certificates"),
    "5": () => scrollToSection("blog"),
    "6": () => scrollToSection("contact"),
    "?": () => setShowShortcuts((v) => !v),
  });

  const scrollToSection = (id: string) => {
    setOpen(false);
    setShowShortcuts(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLogoClick = async () => {
    logoClickCount.current += 1;
    if (logoClickTimer.current) clearTimeout(logoClickTimer.current);
    logoClickTimer.current = setTimeout(() => { logoClickCount.current = 0; }, 2000);
    if (logoClickCount.current >= 5) {
      logoClickCount.current = 0;
      const confetti = (await import("canvas-confetti")).default;
      confetti({ particleCount: 200, spread: 110, origin: { y: 0.05 }, colors: [ACCENT, "#f97316", "#ffffff", "#a855f7"] });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl"
      >
        <div
          className="rounded-2xl transition-all duration-400"
          style={{
            background: scrolled ? "rgba(5,5,8,0.88)" : "rgba(5,5,8,0.4)",
            border: scrolled ? `1px solid ${ACCENT}22` : "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: scrolled
              ? `0 8px 32px rgba(0,0,0,0.55), 0 0 24px ${ACCENT}08`
              : "0 4px 20px rgba(0,0,0,0.25)",
          }}
        >
          <div className="flex items-center justify-between px-5 py-3.5">
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-2.5 select-none"
              style={{ transition: "transform 0.15s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}18, ${ACCENT}30)`,
                  border: `1px solid ${ACCENT}40`,
                  boxShadow: `0 0 14px ${ACCENT}18`,
                }}
              >
                <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 60%)" }} />
                <Crown size={14} color={ACCENT} />
              </div>
              <span
                className="font-bold text-lg"
                style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.92)", letterSpacing: "-0.03em" }}
              >
                {personalInfo.name.split(" ")[0]}
                <span style={{ color: ACCENT }}>.</span>
              </span>
            </button>

            <div
              className="hidden md:flex items-center gap-0.5 rounded-xl px-1.5 py-1.5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href.slice(1))}
                    className="relative px-3.5 py-1.5 rounded-lg text-xs transition-all duration-200 select-none"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: isActive ? "#000" : "rgba(255,255,255,0.45)",
                      fontWeight: isActive ? 700 : 400,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.85)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)";
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: `linear-gradient(135deg, ${ACCENT}, #f97316)`, zIndex: -1, boxShadow: `0 4px 14px ${ACCENT}45` }}
                        transition={{ type: "spring", stiffness: 350, damping: 32 }}
                      />
                    )}
                    <span style={{ opacity: 0.5, fontSize: "9px", marginRight: "2px" }}>{link.key}_</span>
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowShortcuts((v) => !v)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all duration-200 select-none"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: showShortcuts ? ACCENT : "rgba(255,255,255,0.3)",
                  border: showShortcuts ? `1px solid ${ACCENT}40` : "1px solid rgba(255,255,255,0.08)",
                  background: showShortcuts ? `${ACCENT}10` : "transparent",
                }}
              >
                <Keyboard size={12} />
                press ?
              </button>

              <button
                className="md:hidden p-2 rounded-xl transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
                onClick={() => setOpen(!open)}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X size={16} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden overflow-hidden"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="px-4 py-3 space-y-1">
                  {navLinks.map((link, i) => {
                    const isActive = activeSection === link.href.slice(1);
                    return (
                      <motion.button
                        key={link.href}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        onClick={() => scrollToSection(link.href.slice(1))}
                        className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 flex items-center gap-3"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          background: isActive ? `${ACCENT}12` : "transparent",
                          border: isActive ? `1px solid ${ACCENT}28` : "1px solid transparent",
                          color: isActive ? ACCENT : "rgba(255,255,255,0.5)",
                        }}
                      >
                        <span style={{ color: ACCENT, fontWeight: 700, fontSize: "11px" }}>{link.key}</span>
                        <span style={{ opacity: 0.3 }}>—</span>
                        {link.label}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(12px)" }}
            onClick={() => setShowShortcuts(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-sm w-full mx-4 rounded-3xl overflow-hidden"
              style={{
                background: "rgba(10,10,16,0.96)",
                border: `1px solid ${ACCENT}22`,
                backdropFilter: "blur(20px)",
                boxShadow: `0 32px 64px rgba(0,0,0,0.75), 0 0 0 0.5px ${ACCENT}12`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}55, transparent)` }} />
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${ACCENT}10, transparent 70%)` }} />

              <div className="relative z-10 p-7">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${ACCENT}18, ${ACCENT}30)`, border: `1px solid ${ACCENT}40` }}
                    >
                      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 60%)" }} />
                      <Crown size={15} color={ACCENT} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-none" style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.92)" }}>
                        Shortcuts
                      </h3>
                      <p className="text-xs mt-0.5 font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>keyboard navigation</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowShortcuts(false)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.4)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                  >
                    <X size={13} />
                  </button>
                </div>

                <div className="space-y-1">
                  {navLinks.map((l, i) => (
                    <motion.div
                      key={l.key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="flex justify-between items-center py-2.5 px-3 rounded-xl cursor-pointer transition-all duration-200"
                      style={{ border: "1px solid transparent" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.background = "transparent";
                        (e.currentTarget as HTMLDivElement).style.borderColor = "transparent";
                      }}
                      onClick={() => scrollToSection(l.href.slice(1))}
                    >
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>{l.label}</span>
                      <kbd
                        className="px-2.5 py-1 rounded-lg text-xs font-bold"
                        style={{ fontFamily: "'JetBrains Mono', monospace", background: `${ACCENT}12`, border: `1px solid ${ACCENT}28`, color: ACCENT }}
                      >
                        {l.key}
                      </kbd>
                    </motion.div>
                  ))}

                  <div
                    className="flex justify-between items-center py-2.5 px-3 mt-1 pt-3"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}>Toggle panel</span>
                    <kbd className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
                      ?
                    </kbd>
                  </div>
                </div>

                <p className="text-xs text-center mt-5 pt-4 font-mono" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)" }}>
                  click logo 5× for surprise 👑
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}