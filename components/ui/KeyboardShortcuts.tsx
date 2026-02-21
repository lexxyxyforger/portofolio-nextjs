"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/store/portfolio";
import { X, Command } from "lucide-react";

const shortcuts = [
  { keys: ["H"], action: "Scroll to Hero" },
  { keys: ["P"], action: "Scroll to Projects" },
  { keys: ["C"], action: "Scroll to Contact" },
  { keys: ["?"], action: "Show shortcuts" },
  { keys: ["Esc"], action: "Close modal" },
];

const sectionMap: Record<string, string> = {
  h: "hero",
  a: "about",
  p: "projects",
  s: "skills",
  e: "experience",
  b: "blog",
  c: "contact",
};

export default function KeyboardShortcuts() {
  const { showShortcuts, setShowShortcuts } = usePortfolioStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
      
      if (e.key === "?") {
        setShowShortcuts(!showShortcuts);
        return;
      }
      if (e.key === "Escape") {
        setShowShortcuts(false);
        return;
      }
      const key = e.key.toLowerCase();
      if (sectionMap[key]) {
        const el = document.getElementById(sectionMap[key]);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showShortcuts, setShowShortcuts]);

  return (
    <AnimatePresence>
      {showShortcuts && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowShortcuts(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111118] border border-white/10 rounded-2xl p-6 w-full max-w-sm mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Command className="w-4 h-4 text-[#00ff94]" />
                <h3 className="font-display font-semibold text-white">Keyboard Shortcuts</h3>
              </div>
              <button onClick={() => setShowShortcuts(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {shortcuts.map((s) => (
                <div key={s.action} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-sm text-gray-400">{s.action}</span>
                  <div className="flex gap-1">
                    {s.keys.map((k) => (
                      <kbd key={k} className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-gray-300 font-mono">{k}</kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">Press <kbd className="px-1 py-0.5 bg-white/5 border border-white/10 rounded font-mono">?</kbd> to toggle this panel</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
