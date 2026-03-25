import { blogPosts, blogCategories, getFeaturedPosts } from "@/lib/blog";
import { BlogCard } from "@/components/BlogCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — NERDMERCH",
  description: "Dev culture, design stories, and tech humor from the NERDMERCH team.",
};

export default function BlogPage() {
  const featured = getFeaturedPosts();
  const latest = blogPosts.filter((p) => !p.featured);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-bold text-[#22c55e] border border-[#22c55e]/30 rounded-full mb-4">
          Blog
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase">
          The <span className="text-[#22c55e] neon-text-green">Terminal</span>
        </h1>
        <p className="mt-6 text-[#b3b3b3] text-lg max-w-2xl mx-auto leading-relaxed">
          Dev culture, design breakdowns, and the stories behind the shirts.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
        {blogCategories.map((cat) => (
          <span
            key={cat.slug}
            className="px-4 py-2 rounded-full border border-white/10 bg-[#1a1a1a] text-xs font-bold uppercase tracking-wider text-[#b3b3b3] hover:border-[#22c55e]/50 hover:text-[#22c55e] transition-all cursor-default"
          >
            {cat.name}
            <span className="ml-2 text-[#555]">{cat.count}</span>
          </span>
        ))}
      </div>

      {/* Featured posts */}
      {featured.length > 0 && (
        <section className="mb-20">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#555] mb-6">
            Featured
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {featured.map((post, i) => (
              <BlogCard key={post.slug} post={post} featured={i === 0} />
            ))}
          </div>
        </section>
      )}

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#22c55e]/30 to-transparent mb-20" />

      {/* All posts */}
      <section>
        <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#555] mb-6">
          All Posts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
