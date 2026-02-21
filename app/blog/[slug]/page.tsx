import { blogPosts } from "@/data/portfolio";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Eye, Tag } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <Link href="/#blog" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors mb-8 font-mono">
          <ArrowLeft size={14} />
          Back to blog
        </Link>

        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono bg-[var(--accent)]/10 text-[var(--accent)]">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-3xl font-bold leading-tight mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)] font-mono">
            <span className="flex items-center gap-1.5"><Clock size={12} />{post.readTime}</span>
            <span className="flex items-center gap-1.5"><Eye size={12} />{post.views.toLocaleString()} views</span>
            <span>{post.date}</span>
          </div>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4">
          {paragraphs.map((para, i) => {
            if (para.startsWith("##")) {
              return <h2 key={i} className="font-display text-2xl font-bold mt-8 mb-4 text-[var(--text)]">{para.replace(/^##\s/, "")}</h2>;
            }
            return <p key={i} className="text-[var(--text-secondary)] leading-relaxed">{para}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
