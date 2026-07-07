/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#04060d",
        surface: "#080c18",
        elevated: "#0d1324",
        border: "rgba(255,255,255,0.08)",
        neon: {
          50: "#e6f4ff",
          100: "#b3ddff",
          200: "#80c6ff",
          300: "#4dafff",
          400: "#1a99ff",
          500: "#0080ff",
          600: "#0066cc",
          700: "#004c99",
          800: "#003366",
          900: "#001a33",
        },
        electric: {
          400: "#a855f7",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
        },
        cyan: {
          glow: "#22d3ee",
        },
        accent: {
          purple: "#7c3aed",
          cyan: "#06b6d4",
          pink: "#ec4899",
          magenta: "#d946ef",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "SF Pro Display",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Menlo", "Monaco", "Consolas", "monospace"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "neon-gradient":
          "linear-gradient(135deg, #0080ff 0%, #22d3ee 50%, #a855f7 100%)",
        "aurora":
          "conic-gradient(from 90deg at 50% 50%, #0080ff, #22d3ee, #a855f7, #d946ef, #0080ff)",
        "hero-grid":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        neon: "0 0 24px rgba(0,128,255,0.35), 0 0 48px rgba(0,128,255,0.2)",
        "neon-strong":
          "0 0 32px rgba(0,128,255,0.55), 0 0 64px rgba(0,128,255,0.35)",
        purple:
          "0 0 24px rgba(168,85,247,0.35), 0 0 48px rgba(168,85,247,0.2)",
        cyan:
          "0 0 24px rgba(34,211,238,0.35), 0 0 48px rgba(34,211,238,0.2)",
        glass: "0 8px 32px rgba(0,0,0,0.35)",
        "glass-hover":
          "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(26,153,255,0.15)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        floatSlow: {
          "0%,100%": { transform: "translate(0,0) rotate(0deg)" },
          "50%": { transform: "translate(6px,-14px) rotate(1.5deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        pulseGlow: {
          "0%,100%": {
            boxShadow:
              "0 0 24px rgba(0,128,255,0.35), 0 0 48px rgba(0,128,255,0.15)",
          },
          "50%": {
            boxShadow:
              "0 0 40px rgba(0,128,255,0.55), 0 0 80px rgba(0,128,255,0.3)",
          },
        },
        gradientMove: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        auroraSpin: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.08)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        blob: {
          "0%,100%": {
            transform: "translate(0,0) scale(1)",
            borderRadius: "42% 58% 63% 37% / 41% 41% 59% 59%",
          },
          "33%": {
            transform: "translate(30px,-20px) scale(1.05)",
            borderRadius: "63% 37% 41% 59% / 55% 45% 55% 45%",
          },
          "66%": {
            transform: "translate(-20px,20px) scale(0.95)",
            borderRadius: "41% 59% 55% 45% / 62% 44% 56% 38%",
          },
        },
        twinkle: {
          "0%,100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        lightSweep: {
          "0%": { transform: "translateX(-120%) skewX(-12deg)" },
          "100%": { transform: "translateX(220%) skewX(-12deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        floatSlow: "floatSlow 12s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        gradientMove: "gradientMove 8s ease infinite",
        marquee: "marquee 40s linear infinite",
        auroraSpin: "auroraSpin 22s linear infinite",
        blob: "blob 16s ease-in-out infinite",
        twinkle: "twinkle 3.5s ease-in-out infinite",
        lightSweep: "lightSweep 1.4s ease-out",
      },
    },
  },
  plugins: [],
};
