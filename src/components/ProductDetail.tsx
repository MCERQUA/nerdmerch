"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";

interface Props {
  product: Product;
}

export function ProductDetail({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("nerdmerch-cart") || "[]");
    const existing = cart.find(
      (item: { slug: string; size: string; color: string }) =>
        item.slug === product.slug && item.size === selectedSize && item.color === selectedColor
    );
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        slug: product.slug,
        name: product.name,
        image: product.image,
        price: product.price,
        size: selectedSize,
        color: selectedColor,
        quantity,
      });
    }
    localStorage.setItem("nerdmerch-cart", JSON.stringify(cart));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      {/* Image */}
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#0e0e0e] border-2 border-[#22c55e]/20 glow-green">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs uppercase tracking-[0.15em] font-bold text-[#22c55e] px-3 py-1.5 bg-[#22c55e]/10 rounded-full border border-[#22c55e]/30">
            {product.category}
          </span>
          {product.featured && (
            <span className="text-xs uppercase tracking-[0.15em] font-bold text-amber-400 px-3 py-1.5 bg-amber-400/10 rounded-full border border-amber-400/30">
              Featured
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase">{product.name}</h1>
        <p className="text-lg text-[#b3b3b3] mt-2 italic">{product.tagline}</p>

        <div className="flex items-baseline gap-4 mt-8">
          <span className="text-5xl font-black text-[#22c55e] neon-text-green">${product.price}</span>
          <span className="text-lg text-[#b3b3b3] line-through">$35</span>
          <span className="text-xs font-bold text-[#22c55e] bg-[#22c55e]/10 px-3 py-1 rounded-full border border-[#22c55e]/30 uppercase tracking-wider">Save 43%</span>
        </div>

        <p className="text-[#b3b3b3] leading-relaxed mt-8">{product.tagline}</p>

        {/* Size selector */}
        <div className="mt-10">
          <label className="text-xs uppercase tracking-[0.2em] text-[#b3b3b3] font-bold block mb-3">Size</label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-14 h-14 rounded-xl text-sm font-bold uppercase transition-all duration-300 ${
                  selectedSize === size
                    ? "border-2 border-[#22c55e] bg-[#22c55e]/10 text-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                    : "border border-white/10 bg-[#1a1a1a] text-[#b3b3b3] hover:border-[#22c55e]/30"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color selector */}
        <div className="mt-6">
          <label className="text-xs uppercase tracking-[0.2em] text-[#b3b3b3] font-bold block mb-3">Color</label>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  selectedColor === color
                    ? "border-2 border-[#22c55e] bg-[#22c55e]/10 text-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                    : "border border-white/10 bg-[#1a1a1a] text-[#b3b3b3] hover:border-[#22c55e]/30"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity + Add to cart */}
        <div className="mt-10 flex items-center gap-4">
          <div className="flex items-center border border-white/10 rounded-xl overflow-hidden bg-[#1a1a1a]">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-14 flex items-center justify-center text-[#b3b3b3] hover:text-[#22c55e] hover:bg-[#22c55e]/5 transition-colors text-lg font-bold"
            >
              -
            </button>
            <span className="w-14 h-14 flex items-center justify-center text-sm font-bold border-x border-white/10 tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-14 flex items-center justify-center text-[#b3b3b3] hover:text-[#22c55e] hover:bg-[#22c55e]/5 transition-colors text-lg font-bold"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className={`flex-1 h-14 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
              addedToCart
                ? "bg-[#22c55e]/10 text-[#22c55e] border-2 border-[#22c55e]/40 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                : "bg-[#22c55e] text-black hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] active:translate-y-px"
            }`}
          >
            {addedToCart ? "Added to Cart" : `Add to Cart — $${product.price * quantity}`}
          </button>
        </div>

        {/* Tags */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="text-xs text-[#b3b3b3] px-3 py-1.5 rounded-full border border-white/10 bg-[#1a1a1a]">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Shipping info */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { label: "DTG Printed" },
            { label: "Premium Cotton" },
            { label: "Fast Shipping" },
          ].map((item) => (
            <div key={item.label} className="text-center p-3 rounded-xl border border-white/10 bg-[#1a1a1a]">
              <span className="text-[10px] text-[#b3b3b3] uppercase tracking-[0.15em] font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
