import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured }: ProductCardProps) {
  return (
    <a
      href={`/product/${product.slug}`}
      className={`group block overflow-hidden transition-all duration-300 ${
        featured
          ? "rounded-[24px] border-2 border-[#22c55e]/30 bg-black shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:border-[#22c55e]/60"
          : "product-card"
      }`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#0e0e0e]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Quick view button */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22c55e] text-black text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(34,197,94,0.4)]">
            View Design
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </span>
        </div>
        {/* Badges */}
        {featured && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-[#22c55e] text-black text-[10px] font-black uppercase tracking-[0.15em] shadow-[0_0_10px_rgba(34,197,94,0.4)]">
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-[#22c55e] text-xs font-bold border border-[#22c55e]/30">
            ${product.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-base uppercase tracking-wider group-hover:text-[#22c55e] transition-colors truncate">
          {product.name}
        </h3>
        <p className="text-xs text-[#b3b3b3] mt-1 truncate italic">{product.tagline}</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#22c55e] font-bold px-2.5 py-1 rounded-full border border-[#22c55e]/20 bg-[#22c55e]/5">
            {product.category}
          </span>
          <span className="text-[10px] text-[#b3b3b3]">
            {product.sizes[0]}–{product.sizes[product.sizes.length - 1]}
          </span>
        </div>
      </div>
    </a>
  );
}
