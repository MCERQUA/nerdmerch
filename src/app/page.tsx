import { getFeaturedProducts, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#22c55e]/5 via-transparent to-black" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#22c55e]/5 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 99px, rgba(255,255,255,0.5) 100px), repeating-linear-gradient(90deg, transparent, transparent 99px, rgba(255,255,255,0.5) 100px)' }} />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/5 backdrop-blur-sm mb-10 animate-glow-pulse">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-xs font-bold text-[#22c55e] tracking-[0.15em] uppercase">
              {products.length} Original Designs
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase">
            Wear The<br />
            <span className="text-[#22c55e] neon-text-green">Internet</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-[#b3b3b3] max-w-2xl mx-auto leading-relaxed">
            Premium printed tees for developers, gamers, and internet culture enthusiasts.
            Every design original. Every shirt{" "}
            <span className="text-[#22c55e] font-bold neon-text-green">$20</span>.
          </p>

          {/* CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/shop" className="btn-neon-solid">
              Shop All Designs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a href="#featured" className="btn-neon">
              Featured Picks
            </a>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: `${products.length}`, label: "Designs" },
              { value: "$20", label: "Every Tee" },
              { value: "S–2XL", label: "Sizes" },
              { value: "100%", label: "Original Art" },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-2xl border border-white/10 bg-[#1a1a1a]/50 backdrop-blur-sm">
                <div className="text-2xl md:text-3xl font-black text-[#22c55e] neon-text-green">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#b3b3b3] mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section id="featured" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-bold text-[#22c55e] border border-[#22c55e]/30 rounded-full mb-4">Featured</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase">
              Editor&apos;s <span className="text-[#22c55e]">Picks</span>
            </h2>
          </div>
          <a href="/shop" className="hidden sm:flex items-center gap-2 text-sm text-[#b3b3b3] hover:text-[#22c55e] transition-colors uppercase tracking-wider font-medium">
            View all
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} featured />
          ))}
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#22c55e]/30 to-transparent" />
      </div>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-bold text-[#22c55e] border border-[#22c55e]/30 rounded-full mb-4">Browse</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase">
            Shop by <span className="text-[#22c55e]">Category</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { name: "Dev Humor", desc: "Git jokes, terminal puns & code culture", cat: "dev-humor", count: products.filter(p => p.category === "dev-humor").length, color: "#22c55e" },
            { name: "AI Culture", desc: "LLM roasts, token jokes & agent memes", cat: "ai-culture", count: products.filter(p => p.category === "ai-culture").length, color: "#4ade80" },
            { name: "Spicy", desc: "Double entendres & innuendo for tech nerds", cat: "spicy", count: products.filter(p => p.category === "spicy").length, color: "#86efac" },
          ].map((category) => (
            <a
              key={category.cat}
              href={`/shop?cat=${category.cat}`}
              className="group category-card"
              style={{ ['--cat-color' as string]: category.color }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold tracking-wider px-3 py-1 rounded-full border" style={{ borderColor: `${category.color}40`, color: category.color, background: `${category.color}15` }}>
                  {category.count} DESIGNS
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-[#22c55e] transition-colors"><path d="m9 18 6-6-6-6"/></svg>
              </div>
              <h3 className="text-xl font-black uppercase tracking-wider">{category.name}</h3>
              <p className="text-sm text-[#b3b3b3] mt-2 leading-relaxed">{category.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* All Products Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-bold text-[#22c55e] border border-[#22c55e]/30 rounded-full mb-4">Collection</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase">
              Latest <span className="text-[#22c55e]">Drops</span>
            </h2>
          </div>
          <a href="/shop" className="hidden sm:flex items-center gap-2 text-sm text-[#b3b3b3] hover:text-[#22c55e] transition-colors uppercase tracking-wider font-medium">
            All {products.length} designs
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.slice(0, 12).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <div className="text-center mt-16">
          <a href="/shop" className="btn-neon">
            View All {products.length} Designs
          </a>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="relative rounded-3xl border-2 border-[#22c55e]/20 bg-gradient-to-br from-[#22c55e]/5 via-[#1a1a1a] to-black p-12 md:p-20 text-center overflow-hidden glow-green">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#22c55e]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#22c55e]/10 rounded-full blur-[100px]" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight uppercase">
              Every tee. <span className="text-[#22c55e] neon-text-green">$20</span>.
            </h2>
            <p className="mt-6 text-[#b3b3b3] text-lg max-w-xl mx-auto leading-relaxed">
              Premium cotton. Direct-to-garment printing for vivid, lasting color.
              No subscriptions. No upsells. Just great shirts.
            </p>
            <a href="/shop" className="mt-10 btn-neon-solid">
              Start Shopping
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
