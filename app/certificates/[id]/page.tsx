import { certificates } from "@/data/portfolio";
import { notFound } from "next/navigation";
import { ArrowLeft, Award, Calendar, Building2 } from "lucide-react";
import Link from "next/link";
import { CertImage } from "@/components/ui/CertImage";

export function generateStaticParams() {
  return certificates.map((c) => ({ id: c.id }));
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cert = certificates.find((c) => c.id === id);
  if (!cert) notFound();

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-[120px] pointer-events-none"
        style={{ background: "var(--accent)" }}
      />

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        <Link
          href="/#certificates"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all duration-300 mb-10 font-mono group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to certificates
        </Link>

        <CertImage src={cert.image} alt={cert.title} />

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)]">
            <Building2 size={10} />
            {cert.issuer}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)]">
            <Calendar size={10} />
            {cert.date}
          </span>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Award size={16} className="text-[var(--accent)]" />
            <span className="font-mono text-xs text-[var(--accent)]">
              Certificate of Completion
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight">
            {cert.title}
          </h1>
        </div>

        {cert.description && (
          <div className="card rounded-2xl p-6 mb-8 border border-[var(--border)]">
            <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
              {cert.description}
            </p>
          </div>
        )}

        <Link
          href="/#certificates"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300 text-[var(--text-secondary)] hover:text-[var(--accent)]"
        >
          Semua Sertifikat
        </Link>
      </div>
    </div>
  );
}
