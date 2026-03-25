"use client";

import { useState, useEffect } from "react";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [curateMode, setCurateMode] = useState(false);
  const [removed, setRemoved] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat");
    if (cat && categories.some((c) => c.slug === cat)) {
      setActiveCategory(cat);
    }
    if (params.get("curate") === "1") {
      setCurateMode(true);
    }
    fetch("/api/curation").then(r => r.json()).then(d => setRemoved(d.removed || []));
  }, []);

  const toggleRemove = async (slug: string) => {
    const isRemoved = removed.includes(slug);
    const action = isRemoved ? "restore" : "remove";
    const res = await fetch("/api/curation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, action }),
    });
    const data = await res.json();
    setRemoved(data.removed);
  };

  const filtered = products.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const notRemoved = curateMode || !removed.includes(p.slug);
    return matchesCategory && matchesSearch && notRemoved;
  });

  const visibleCount = products.filter(p => !removed.includes(p.slug)).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Curate Mode Banner */}
      {curateMode && (
        <div className="mb-8 p-4 rounded-xl border-2 border-amber-500/40 bg-amber-500/5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <span className="text-amber-400 font-black text-sm uppercase tracking-wider">Curation Mode</span>
              <p className="text-[#b3b3b3] text-xs mt-1">
                Click designs to mark/unmark for removal. <span className="text-amber-400 font-bold">{removed.length} marked.</span>
              </p>
            </div>
            <button
              onClick={() => setCurateMode(false)}
              className="px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
            >
              Exit Curate
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-16">
        <span className="inline-block px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-bold text-[#22c55e] border border-[#22c55e]/30 rounded-full mb-4">Collection</span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase">
          All <span className="text-[#22c55e] neon-text-green">Designs</span>
        </h1>
        <p className="text-[#b3b3b3] mt-3 text-lg">
          {visibleCount} original designs. Every tee{" "}
          <span className="text-[#22c55e] font-bold">$20</span>.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 pb-8 border-b border-white/10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat.slug
                  ? "bg-[#22c55e] text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                  : "bg-[#1a1a1a] border border-white/10 text-[#b3b3b3] hover:border-[#22c55e]/30 hover:text-[#22c55e]"
              }`}
            >
              {cat.name}
              <span className={`ml-1.5 ${activeCategory === cat.slug ? "text-black/60" : "text-white/30"}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search designs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#1a1a1a] border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#22c55e]/50 focus:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all"
          />
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-[#b3b3b3] text-lg">No designs found.</p>
          <button
            onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
            className="mt-4 text-[#22c55e] text-sm hover:underline uppercase tracking-wider font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product) => {
            const isMarked = removed.includes(product.slug);
            if (curateMode) {
              return (
                <div
                  key={product.slug}
                  onClick={() => toggleRemove(product.slug)}
                  className={`cursor-pointer relative block overflow-hidden transition-all duration-300 product-card ${
                    isMarked ? "opacity-40" : ""
                  }`}
                  style={isMarked ? { borderColor: "rgba(239,68,68,0.5)" } : undefined}
                >
                  {isMarked && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-red-900/30 pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-red-500/80 flex items-center justify-center">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </div>
                    </div>
                  )}
                  <div className="relative aspect-square overflow-hidden bg-[#0e0e0e]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        isMarked
                          ? "bg-red-500/80 text-white border-red-500"
                          : "bg-[#22c55e]/80 text-black border-[#22c55e]"
                      }`}>
                        {isMarked ? "REMOVED" : "KEEP"}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className={`font-bold text-base uppercase tracking-wider truncate ${isMarked ? "line-through text-red-400" : ""}`}>
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#b3b3b3] mt-1 truncate italic">{product.tagline}</p>
                  </div>
                </div>
              );
            }
            return <ProductCard key={product.slug} product={product} />;
          })}
        </div>
      )}

      {/* Footer info */}
      <div className="mt-20 text-center">
        <p className="text-sm text-[#b3b3b3]">
          Showing {filtered.length} of {products.length} designs
          {removed.length > 0 && !curateMode && (
            <span className="text-white/30"> ({removed.length} hidden)</span>
          )}
        </p>
      </div>
    </div>
  );
}
