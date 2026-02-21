import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Alexandro Francisco | Full Stack Developer",
  description: "Portfolio of Alexandro Francisco - Full Stack Developer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`noise-bg ${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}