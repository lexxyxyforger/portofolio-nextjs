"use client";
import { useEffect } from "react";

type Shortcuts = Record<string, () => void>;

export function useKeyboardShortcuts(shortcuts: Shortcuts) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      
      const key = e.key.toLowerCase();
      if (shortcuts[key]) {
        e.preventDefault();
        shortcuts[key]();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcuts]);
}
