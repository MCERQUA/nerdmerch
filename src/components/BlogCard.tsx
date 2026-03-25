import { BlogPost, formatDate } from "@/lib/blog";

const categoryColors: Record<string, string> = {
  "dev-culture": "#22c55e",
  "behind-the-design": "#4ade80",
  "merch-drops": "#86efac",
  "tech-humor": "#a7f3d0",
};

const categoryLabels: Record<string, string> = {
  "dev-culture": "Dev Culture",
  "behind-the-design": "Behind the Design",
  "merch-drops": "Merch Drops",
  "tech-humor": "Tech Humor",
};

export function BlogCard({ post, featured }: { post: BlogPost; featured?: boolean }) {
  const color = categoryColors[post.category] || "#22c55e";

  return (
    <a
      href={`/blog/${post.slug}`}
      className={`group block rounded-2xl border border-white/10 bg-[#1a1a1a] overflow-hidden transition-all duration-300 hover:border-[#22c55e] hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:-translate-y-1 ${
        featured ? "lg:col-span-2 lg:flex" : ""
      }`}
    >
      <div className={`p-6 ${featured ? "lg:p-8 flex flex-col justify-between" : ""}`}>
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full border"
              style={{
                color,
                borderColor: `${color}40`,
                background: `${color}15`,
              }}
            >
              {categoryLabels[post.category]}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#555]">
              {post.readTime} min read
            </span>
          </div>

          <h3
            className={`font-black uppercase tracking-tight group-hover:text-[#22c55e] transition-colors ${
              featured ? "text-2xl lg:text-3xl" : "text-lg"
            }`}
          >
            {post.title}
          </h3>

          <p className={`text-[#b3b3b3] leading-relaxed mt-3 ${featured ? "text-base" : "text-sm"}`}>
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
          <span className="text-xs text-[#555]">{formatDate(post.date)}</span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#22c55e] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            Read
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </span>
        </div>
      </div>
    </a>
  );
}
