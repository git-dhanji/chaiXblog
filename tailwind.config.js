/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

/**
 * Semantic color tokens are driven by CSS variables (see src/index.css).
 * Each variable holds an "R G B" triplet so Tailwind can apply opacity via
 * the <alpha-value> placeholder.
 *
 * The whole UI runs on a deliberately small palette: a neutral paper/ink
 * scale plus ONE green accent. No secondary brand ramp, no multi-stop
 * gradients — the accent is always applied as a flat colour so the design
 * reads calm and editorial rather than decorative.
 */
const withAlpha = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        // Semantic surface / text tokens
        bg: withAlpha("--bg"),
        surface: withAlpha("--surface"),
        "surface-2": withAlpha("--surface-2"),
        fg: withAlpha("--fg"),
        "fg-muted": withAlpha("--fg-muted"),
        "fg-subtle": withAlpha("--fg-subtle"),
        border: withAlpha("--border"),
        ring: withAlpha("--ring"),
        // The single green accent — used flat, never as a gradient.
        accent: {
          DEFAULT: withAlpha("--accent"),
          hover: withAlpha("--accent-hover"),
          soft: withAlpha("--accent-soft"),
          fg: withAlpha("--accent-fg"),
        },
      },
      fontFamily: {
        sans: ["'Geist'", "system-ui", "sans-serif"],
        display: ["'Geist'", "system-ui", "sans-serif"],
        mono: ["'Geist Mono'", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(20 17 14 / 0.04), 0 4px 16px -4px rgb(20 17 14 / 0.08)",
        lift: "0 8px 30px -8px rgb(20 17 14 / 0.18)",
      },
      maxWidth: { prose: "68ch" },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.5s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [typography],
};
