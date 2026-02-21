"use client";
import { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";

export function ToastProvider() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: theme === "dark" ? "#110e09" : "#fff",
          color: theme === "dark" ? "#f0ede6" : "#0f0f0f",
          border: "1px solid #f0a500",
          borderRadius: "12px",
          fontFamily: "var(--font-body)",
          boxShadow: "0 0 20px rgba(240,165,0,0.1)",
        },
        success: {
          iconTheme: { primary: "#f0a500", secondary: "#000" },
        },
        error: {
          iconTheme: { primary: "#e63946", secondary: "#fff" },
        },
      }}
    />
  );
}