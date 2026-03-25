import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: "#22c55e",
        "neon-dim": "#16a34a",
        surface: "#131313",
        "surface-raised": "#1a1a1a",
        "surface-overlay": "#222222",
        "text-primary": "#f0f0f0",
        "text-secondary": "#888888",
        "text-muted": "#555555",
        border: "#2a2a2a",
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(34, 197, 94, 0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(34, 197, 94, 0.3)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
