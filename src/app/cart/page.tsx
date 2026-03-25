"use client";

import { useState, useEffect } from "react";

interface CartItem {
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = JSON.parse(localStorage.getItem("nerdmerch-cart") || "[]");
    setCart(stored);
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("nerdmerch-cart", JSON.stringify(newCart));
  };

  const removeItem = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    updateCart(newCart);
  };

  const updateQuantity = (index: number, delta: number) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, newCart[index].quantity + delta);
    updateCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="inline-block px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-bold text-[#22c55e] border border-[#22c55e]/30 rounded-full mb-4">Cart</span>
        <h1 className="text-5xl font-black tracking-tight uppercase">
          Your <span className="text-[#22c55e]">Cart</span>
        </h1>
        <p className="text-[#b3b3b3] mt-2">{itemCount} {itemCount === 1 ? "item" : "items"}</p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-24 rounded-3xl border-2 border-white/10 bg-[#1a1a1a]">
          <div className="w-20 h-20 rounded-2xl bg-black border border-white/10 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </div>
          <p className="text-[#b3b3b3] text-lg">Your cart is empty</p>
          <a href="/shop" className="inline-block mt-8 btn-neon-solid">Start Shopping</a>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item, i) => (
            <div key={`${item.slug}-${item.size}-${item.color}`} className="flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-2xl border border-white/10 bg-[#1a1a1a] hover:border-[#22c55e]/20 transition-all">
              <a href={`/product/${item.slug}`} className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-[#0e0e0e] flex-shrink-0 border border-white/10">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </a>
              <div className="flex-1 min-w-0">
                <a href={`/product/${item.slug}`} className="font-bold text-sm uppercase tracking-wider hover:text-[#22c55e] transition-colors">{item.name}</a>
                <p className="text-xs text-[#b3b3b3] mt-1">{item.size} / {item.color}</p>
              </div>
              <div className="flex items-center border border-white/10 rounded-xl overflow-hidden bg-black">
                <button onClick={() => updateQuantity(i, -1)} className="w-9 h-9 flex items-center justify-center text-[#b3b3b3] hover:text-[#22c55e] text-sm font-bold">-</button>
                <span className="w-9 h-9 flex items-center justify-center text-xs font-bold border-x border-white/10 tabular-nums">{item.quantity}</span>
                <button onClick={() => updateQuantity(i, 1)} className="w-9 h-9 flex items-center justify-center text-[#b3b3b3] hover:text-[#22c55e] text-sm font-bold">+</button>
              </div>
              <span className="text-[#22c55e] font-black text-sm w-16 text-right tabular-nums">${item.price * item.quantity}</span>
              <button onClick={() => removeItem(i)} className="w-9 h-9 flex items-center justify-center text-white/20 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
          ))}

          {/* Summary */}
          <div className="mt-10 p-8 rounded-3xl border-2 border-[#22c55e]/20 bg-[#1a1a1a] glow-green">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#b3b3b3] uppercase tracking-wider text-sm">Subtotal ({itemCount} items)</span>
              <span className="font-black text-2xl">${total}</span>
            </div>
            <div className="flex items-center justify-between mb-6 text-sm">
              <span className="text-white/30">Shipping</span>
              <span className="text-[#b3b3b3]">Calculated at checkout</span>
            </div>
            <div className="border-t border-white/10 pt-6 flex items-center justify-between">
              <span className="font-black text-xl uppercase tracking-wider">Total</span>
              <span className="font-black text-3xl text-[#22c55e] neon-text-green">${total}</span>
            </div>
            <button className="w-full mt-8 h-16 rounded-xl bg-[#22c55e] text-black font-black text-sm uppercase tracking-[0.15em] hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all active:translate-y-px">
              Proceed to Checkout
            </button>
            <a href="/shop" className="block text-center mt-5 text-sm text-[#b3b3b3] hover:text-[#22c55e] transition-colors uppercase tracking-wider">
              Continue Shopping
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
