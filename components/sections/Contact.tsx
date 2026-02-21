"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, MapPin, Github, ArrowUpRight, Loader2, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { personalInfo } from "@/data/portfolio";

const schema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  subject: z.string().min(5, "Subject minimal 5 karakter"),
  message: z.string().min(20, "Pesan minimal 20 karakter"),
});

type FormData = z.infer<typeof schema>;

const ACCENT = "#F0A500";

const contactLinks = [
  { Icon: Mail, label: "Email", getValue: () => personalInfo.email, getHref: () => `mailto:${personalInfo.email}`, color: "#f59e0b" },
  { Icon: MapPin, label: "Location", getValue: () => personalInfo.location, getHref: () => null, color: "#06b6d4" },
  { Icon: Github, label: "GitHub", getValue: () => `@${personalInfo.github}`, getHref: () => `https://github.com/${personalInfo.github}`, color: "#a855f7" },
];

function GlowInput({
  label,
  error,
  accent,
  children,
}: {
  label: string;
  error?: string;
  accent: string;
  children: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      <label
        className="block text-xs font-mono mb-2 tracking-widest uppercase transition-colors duration-200"
        style={{ color: focused ? accent : "rgba(255,255,255,0.3)" }}
      >
        {label}
      </label>
      <div
        className="relative rounded-2xl transition-all duration-300"
        style={{
          background: focused ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)",
          border: error ? "1px solid rgba(239,68,68,0.6)" : focused ? `1px solid ${accent}60` : "1px solid rgba(255,255,255,0.08)",
          boxShadow: focused ? `0 0 0 3px ${accent}12, 0 4px 20px rgba(0,0,0,0.3)` : "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        {focused && (
          <div
            className="absolute inset-x-0 top-0 h-px rounded-t-2xl pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
          />
        )}
        {children}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs mt-1.5 font-mono"
          style={{ color: "rgba(239,68,68,0.8)" }}
        >
          ⚠ {error}
        </motion.p>
      )}
    </div>
  );
}

function ContactCard({ Icon, label, value, href, color, index, inView }: {
  Icon: React.FC<{ size?: number; color?: string }>;
  label: string;
  value: string;
  href: string | null;
  color: string;
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const content = (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-4 p-4 rounded-2xl cursor-default transition-all duration-300"
      style={{
        background: hovered ? `${color}08` : "rgba(255,255,255,0.02)",
        border: hovered ? `1px solid ${color}35` : "1px solid rgba(255,255,255,0.06)",
        boxShadow: hovered ? `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${color}10` : "none",
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 relative overflow-hidden"
        style={{
          background: hovered ? `${color}20` : `${color}10`,
          border: `1px solid ${color}${hovered ? "50" : "25"}`,
          boxShadow: hovered ? `0 0 20px ${color}30` : "none",
        }}
      >
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 60%)` }} />
        <Icon size={15} color={color} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-mono tracking-widest uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>{label}</p>
        <p className="text-sm font-semibold truncate transition-colors duration-200" style={{ color: hovered ? color : "rgba(255,255,255,0.75)", fontFamily: "monospace" }}>
          {value}
        </p>
      </div>
      {href && <ArrowUpRight size={14} style={{ color: hovered ? color : "rgba(255,255,255,0.15)", flexShrink: 0, transition: "color 0.2s" }} />}
    </motion.div>
  );

  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className="block no-underline">{content}</a>;
  return content;
}

export function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const sectionRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSent(true);
        toast.success("Pesan terkirim! 🚀");
        reset();
        setTimeout(() => setSent(false), 4000);
      } else throw new Error();
    } catch {
      toast.error("Gagal mengirim. Coba lagi ya.");
    }
  };

  const inputClass = "w-full px-4 py-3 bg-transparent text-sm font-mono outline-none text-white placeholder:text-white/20 rounded-2xl";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: "#07070d" }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: bgY,
          backgroundImage: `
            radial-gradient(ellipse 70% 50% at 10% 80%, rgba(240,165,0,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 90% 20%, rgba(168,85,247,0.06) 0%, transparent 60%)
          `,
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          y: bgY,
          backgroundImage: `linear-gradient(rgba(240,165,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(240,165,0,0.03) 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}55)` }} />
            <span className="text-xs font-mono px-4 py-2 rounded-full"
              style={{ background: `${ACCENT}12`, border: `1px solid ${ACCENT}30`, color: ACCENT }}>
              08_contact
            </span>
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${ACCENT}55, transparent)` }} />
          </div>

          <div className="relative">
            <div
              className="absolute -top-8 -left-2 font-black leading-none select-none pointer-events-none"
              style={{ fontSize: "clamp(7rem, 18vw, 11rem)", color: ACCENT, opacity: 0.025, fontFamily: "'Cabinet Grotesk', sans-serif", letterSpacing: "-0.06em" }}
            >
              08
            </div>
            <h2
              className="font-black tracking-tight"
              style={{
                fontFamily: "'Cabinet Grotesk', 'Clash Display', sans-serif",
                fontSize: "clamp(3rem, 8vw, 5.5rem)",
                letterSpacing: "-0.04em",
                background: "linear-gradient(135deg, #ffffff 30%, rgba(255,255,255,0.3) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 0.95,
              }}
            >
              Mari Ngobrol
            </h2>
            <motion.div
              className="absolute -bottom-3 left-0 h-[3px] rounded-full"
              style={{ background: `linear-gradient(90deg, ${ACCENT}, #f97316, transparent)`, boxShadow: `0 0 12px ${ACCENT}60` }}
              initial={{ width: "0%" }}
              animate={inView ? { width: "35%" } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <p className="mt-7 text-sm" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Cabinet Grotesk', sans-serif", maxWidth: "40ch", lineHeight: 1.8 }}>
            Ada project keren? Let&apos;s collaborate! Saya terbuka untuk freelance, full-time, atau sekadar diskusi tech.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-3">
            {contactLinks.map(({ Icon, label, getValue, getHref, color }, i) => (
              <ContactCard
                key={label}
                Icon={Icon}
                label={label}
                value={getValue()}
                href={getHref()}
                color={color}
                index={i}
                inView={inView}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="mt-6 p-5 rounded-2xl relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${ACCENT}20, transparent 70%)`, filter: "blur(20px)" }} />
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10b981" }} />
                <span className="text-xs font-mono" style={{ color: "#10b981" }}>Available for work</span>
              </div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "monospace", lineHeight: 1.7 }}>
                Response time: &lt; 24h<br />
                Timezone: WIB (UTC+7)
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <div
              className="relative rounded-3xl p-7 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}55, transparent)` }} />
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${ACCENT}08, transparent 70%)` }} />

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
                <div className="grid sm:grid-cols-2 gap-5">
                  <GlowInput label="Nama" error={errors.name?.message} accent={ACCENT}>
                    <input {...register("name")} type="text" placeholder="John Doe" className={inputClass} />
                  </GlowInput>
                  <GlowInput label="Email" error={errors.email?.message} accent={ACCENT}>
                    <input {...register("email")} type="email" placeholder="john@example.com" className={inputClass} />
                  </GlowInput>
                </div>

                <GlowInput label="Subject" error={errors.subject?.message} accent={ACCENT}>
                  <input {...register("subject")} type="text" placeholder="Project collaboration..." className={inputClass} />
                </GlowInput>

                <GlowInput label="Pesan" error={errors.message?.message} accent={ACCENT}>
                  <textarea {...register("message")} rows={5} placeholder="Ceritain project kamu..." className={`${inputClass} resize-none`} />
                </GlowInput>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || sent}
                  whileHover={!isSubmitting && !sent ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isSubmitting && !sent ? { scale: 0.97 } : {}}
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold font-mono text-sm relative overflow-hidden"
                  style={{
                    background: sent
                      ? "linear-gradient(135deg, #10b981, #059669)"
                      : `linear-gradient(135deg, ${ACCENT}, #f97316)`,
                    color: "#000",
                    boxShadow: sent ? "0 8px 32px rgba(16,185,129,0.35)" : `0 8px 32px ${ACCENT}40`,
                    transition: "background 0.4s, box-shadow 0.4s",
                    opacity: isSubmitting ? 0.8 : 1,
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15), transparent)" }} />
                  </div>

                  {isSubmitting ? (
                    <><Loader2 size={15} className="animate-spin" />Mengirim...</>
                  ) : sent ? (
                    <><CheckCircle2 size={15} />Terkirim!</>
                  ) : (
                    <><Send size={15} />Kirim Pesan</>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}