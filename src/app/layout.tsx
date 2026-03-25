import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NERDMERCH — Premium Internet Merchandise",
  description: "Your destination for premium printed apparel. Original designs, quality materials, $20 tees. Wear the internet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/40 flex items-center justify-center animate-glow-pulse">
                <span className="text-[#22c55e] font-black text-sm">N</span>
              </div>
              <span className="font-black text-xl tracking-tight uppercase">
                Nerd<span className="text-[#22c55e] neon-text-green">merch</span>
              </span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="text-sm font-medium text-[#b3b3b3] hover:text-[#22c55e] transition-colors uppercase tracking-wider">Home</a>
              <a href="/shop" className="text-sm font-medium text-[#b3b3b3] hover:text-[#22c55e] transition-colors uppercase tracking-wider">Shop</a>
              <a href="/shop?cat=dev-humor" className="text-sm font-medium text-[#b3b3b3] hover:text-[#22c55e] transition-colors uppercase tracking-wider">Dev Humor</a>
              <a href="/shop?cat=ai-culture" className="text-sm font-medium text-[#b3b3b3] hover:text-[#22c55e] transition-colors uppercase tracking-wider">AI Culture</a>
              <a href="/shop?cat=spicy" className="text-sm font-medium text-[#b3b3b3] hover:text-[#22c55e] transition-colors uppercase tracking-wider">Spicy</a>
            </div>
            <a href="/cart" className="relative group">
              <div className="w-11 h-11 rounded-xl border border-white/10 bg-[#1a1a1a] flex items-center justify-center hover:border-[#22c55e]/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b3b3b3] group-hover:text-[#22c55e] transition-colors">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </div>
            </a>
          </div>
        </nav>

        <main className="pt-16 md:pt-20">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-32 bg-black">
          <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-2">
                <span className="font-black text-2xl tracking-tight uppercase">
                  Nerd<span className="text-[#22c55e]">merch</span>
                </span>
                <p className="text-[#b3b3b3] text-sm mt-4 max-w-md leading-relaxed">
                  Premium internet merchandise for people who speak in code, think in algorithms, and dress in culture. Every design is original. Every tee is $20.
                </p>
                <div className="mt-6 flex gap-3">
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-[#1a1a1a] flex items-center justify-center hover:border-[#22c55e]/50 transition-all cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </div>
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-[#1a1a1a] flex items-center justify-center hover:border-[#22c55e]/50 transition-all cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </div>
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-[#1a1a1a] flex items-center justify-center hover:border-[#22c55e]/50 transition-all cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#b3b3b3] font-bold mb-5">Shop</h4>
                <div className="flex flex-col gap-3">
                  <a href="/shop" className="text-sm text-[#b3b3b3] hover:text-[#22c55e] transition-colors">All Designs</a>
                  <a href="/shop?cat=dev-humor" className="text-sm text-[#b3b3b3] hover:text-[#22c55e] transition-colors">Dev Humor</a>
                  <a href="/shop?cat=ai-culture" className="text-sm text-[#b3b3b3] hover:text-[#22c55e] transition-colors">AI Culture</a>
                  <a href="/shop?cat=spicy" className="text-sm text-[#b3b3b3] hover:text-[#22c55e] transition-colors">Spicy</a>
                </div>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#b3b3b3] font-bold mb-5">Contact</h4>
                <div className="flex flex-col gap-3">
                  <span className="text-sm text-[#b3b3b3]">nerdmerch.ca</span>
                  <span className="text-sm text-[#b3b3b3]">mikecerqua@gmail.com</span>
                  <span className="text-sm text-[#b3b3b3]">(437) 455-9131</span>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#b3b3b3]">&copy; {new Date().getFullYear()} Nerdmerch. All rights reserved.</p>
              <p className="text-xs text-[#b3b3b3]">Designed with <span className="text-[#22c55e]">AI</span> // Powered by <span className="text-[#22c55e]">JamBot</span></p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
