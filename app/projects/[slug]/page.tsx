import { projects } from "@/data/portfolio";
import { notFound } from "next/navigation";
import { ExternalLink, Github, ArrowLeft, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors mb-8 font-mono">
          <ArrowLeft size={14} />
          Back to projects
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-mono ${
              project.status === "live" ? "bg-[var(--accent)]/20 text-[var(--accent)]" : "bg-yellow-500/20 text-yellow-500"
            }`}>
              {project.status}
            </span>
            <span className="text-sm text-[var(--text-secondary)] font-mono">{project.year}</span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-[var(--text-secondary)] leading-relaxed text-lg">{project.longDescription}</p>
        </div>

        <img src={project.image} alt={project.title} className="w-full rounded-2xl mb-8 object-cover h-72" />

        <div className="flex gap-4 mb-10">
          {project.previewUrl && (
            <a href={project.previewUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-black font-medium text-sm">
              <ExternalLink size={15} /> Live Demo
            </a>
          )}
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] transition-colors text-sm font-medium">
            <Github size={15} /> Source Code
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="card rounded-2xl p-6">
            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[var(--accent)]" />
              Features
            </h3>
            <ul className="space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <span className="text-[var(--accent)] mt-0.5">→</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="card rounded-2xl p-6">
            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <Zap size={18} className="text-[var(--accent)]" />
              Problem Solving
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{project.problemSolving}</p>
          </div>
        </div>

        <div className="card rounded-2xl p-6">
          <h3 className="font-display font-bold text-lg mb-4">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-xl text-sm font-mono bg-[var(--bg-secondary)] border border-[var(--border)]">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
