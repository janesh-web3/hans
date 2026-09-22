/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── shadcn/ui semantic tokens (CSS variables, defined in index.css) ──
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        // ── Brand: Forest Green (primary) ────────────────────────────────
        // Full numeric scale for existing utility classes (bg-primary-700 etc.)
        // plus DEFAULT/foreground so shadcn components (bg-primary) resolve too.
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
          DEFAULT: "#15803d",
          foreground: "#ffffff",
        },

        // ── Brand: River Blue (secondary) ────────────────────────────────
        secondary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
          DEFAULT: "#2563eb",
          foreground: "#ffffff",
        },

        // Light theme surface colors
        surface: {
          50: "#ffffff",
          100: "#f9fafb",
          200: "#f3f4f6",
          300: "#e5e7eb",
          400: "#d1d5db",
          500: "#9ca3af",
          600: "#6b7280",
          700: "#4b5563",
          800: "#374151",
          900: "#1f2937",
          950: "#111827",
        },
        // ── Accent: Gold/Amber — premium badges, ratings, quote marks ─────
        gold: {
          50: "#fbf7ef",
          100: "#f5ead4",
          200: "#ecd6ac",
          300: "#dfbc7d",
          400: "#d4a574",
          500: "#c9a961",
          600: "#b08d45",
          700: "#8f7038",
          800: "#725a30",
          900: "#5e4b2a",
          DEFAULT: "#c9a961",
          foreground: "#1a1206",
        },
        // ── Luxury editorial: Forest Green (deep, muted) ────────────────
        forest: {
          50: "#f2faf6",
          100: "#e5f4ec",
          200: "#cdebdc",
          300: "#a9dac2",
          400: "#7cc2a0",
          500: "#52a47b",
          600: "#3a8562",
          700: "#2D6A4F",
          800: "#235239",
          900: "#1B4332",
          950: "#0f2a1e",
          DEFAULT: "#2D6A4F",
          foreground: "#ffffff",
        },

        // ── Luxury editorial: River Blue (deep, muted) ──────────────────
        river: {
          50: "#f1f6fb",
          100: "#e1ecf5",
          200: "#c4d8ea",
          300: "#9bbcdb",
          400: "#6b99c6",
          500: "#3f76ab",
          600: "#2E5C8A",
          700: "#2a5180",
          800: "#254672",
          900: "#1E3A5F",
          950: "#14283f",
          DEFAULT: "#2E5C8A",
          foreground: "#ffffff",
        },

        // Dark theme surfaces
        dark: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ['"Playfair Display"', "Georgia", "serif"],
      },
      fontSize: {
        // Luxury editorial hero scale — fluid via clamp() so it works without a plugin
        hero: ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "hero-lg": ["clamp(2.75rem, 7vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
      },
      letterSpacing: {
        luxury: "0.18em",
        "luxury-lg": "0.24em",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.8" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease-out forwards",
        pulse: "pulse 2s ease-in-out infinite",
        "bounce-slow": "bounceSlow 2.2s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
