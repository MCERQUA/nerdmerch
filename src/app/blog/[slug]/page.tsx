import { blogPosts, getBlogPost, formatDate } from "@/lib/blog";
import { getProduct } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { BlogCard } from "@/components/BlogCard";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — NERDMERCH Blog`,
    description: post.excerpt,
  };
}

const categoryLabels: Record<string, string> = {
  "dev-culture": "Dev Culture",
  "behind-the-design": "Behind the Design",
  "merch-drops": "Merch Drops",
  "tech-humor": "Tech Humor",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedProducts = (post.relatedProducts || [])
    .map((s) => getProduct(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProduct>>[];

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  // Convert markdown-style content to HTML-safe paragraphs
  const sections = post.content.split("\n\n").map((block, i) => {
    const trimmed = block.trim();

    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="text-2xl font-black uppercase tracking-tight mt-12 mb-4"
        >
          {trimmed.replace("## ", "")}
        </h2>
      );
    }

    if (trimmed.startsWith("```")) {
      const lines = trimmed.split("\n");
      const code = lines.slice(1, -1).join("\n");
      return (
        <pre
          key={i}
          className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 my-6 overflow-x-auto font-mono text-sm text-[#22c55e]"
        >
          <code>{code}</code>
        </pre>
      );
    }

    if (trimmed.startsWith("1. ") || trimmed.startsWith("- ")) {
      const isOrdered = trimmed.startsWith("1. ");
      const items = trimmed.split("\n").map((line) =>
        line.replace(/^\d+\.\s+/, "").replace(/^-\s+/, "")
      );
      const Tag = isOrdered ? "ol" : "ul";
      return (
        <Tag
          key={i}
          className={`my-4 space-y-2 text-[#b3b3b3] leading-relaxed ${
            isOrdered ? "list-decimal" : "list-disc"
          } list-inside`}
        >
          {items.map((item, j) => (
            <li key={j}>{renderInline(item)}</li>
          ))}
        </Tag>
      );
    }

    return (
      <p key={i} className="text-[#b3b3b3] leading-relaxed my-4">
        {renderInline(trimmed)}
      </p>
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#555] mb-10">
        <a href="/" className="hover:text-[#22c55e] transition-colors">
          Home
        </a>
        <span>/</span>
        <a href="/blog" className="hover:text-[#22c55e] transition-colors">
          Blog
        </a>
        <span>/</span>
        <span className="text-[#b3b3b3]">{post.title}</span>
      </nav>

      <article className="max-w-3xl mx-auto">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full border border-[#22c55e]/30 text-[#22c55e] bg-[#22c55e]/10">
            {categoryLabels[post.category]}
          </span>
          <span className="text-xs text-[#555]">{post.readTime} min read</span>
          <span className="text-xs text-[#555]">{formatDate(post.date)}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[0.95]">
          {post.title}
        </h1>

        <p className="text-lg text-[#b3b3b3] leading-relaxed mt-6 mb-12">
          {post.excerpt}
        </p>

        <div className="h-px bg-gradient-to-r from-[#22c55e]/40 via-[#22c55e]/20 to-transparent mb-12" />

        {/* Content */}
        <div className="prose-nerdmerch">{sections}</div>
      </article>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-3xl mx-auto mt-20">
          <div className="h-px bg-gradient-to-r from-transparent via-[#22c55e]/30 to-transparent mb-12" />
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#555] mb-6">
            Mentioned in This Post
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-3xl mx-auto mt-20">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#555] mb-6">
            Keep Reading
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {relatedPosts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      {/* Back to blog */}
      <div className="text-center mt-20">
        <a href="/blog" className="btn-neon">
          All Posts
        </a>
      </div>
    </div>
  );
}

function renderInline(text: string): React.ReactNode {
  // Handle **bold**, `code`, and *italic*
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Code
    const codeMatch = remaining.match(/`(.+?)`/);
    // Italic
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);

    const matches = [
      boldMatch ? { type: "bold", match: boldMatch, index: boldMatch.index! } : null,
      codeMatch ? { type: "code", match: codeMatch, index: codeMatch.index! } : null,
      italicMatch ? { type: "italic", match: italicMatch, index: italicMatch.index! } : null,
    ]
      .filter(Boolean)
      .sort((a, b) => a!.index - b!.index);

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const first = matches[0]!;
    if (first.index > 0) {
      parts.push(remaining.slice(0, first.index));
    }

    if (first.type === "bold") {
      parts.push(
        <strong key={key++} className="text-white font-bold">
          {first.match![1]}
        </strong>
      );
    } else if (first.type === "code") {
      parts.push(
        <code
          key={key++}
          className="bg-[#0a0a0a] border border-white/10 px-1.5 py-0.5 rounded text-[#22c55e] font-mono text-sm"
        >
          {first.match![1]}
        </code>
      );
    } else if (first.type === "italic") {
      parts.push(
        <em key={key++} className="text-[#e0e0e0] italic">
          {first.match![1]}
        </em>
      );
    }

    remaining = remaining.slice(first.index + first.match![0].length);
  }

  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : <>{parts}</>;
}
