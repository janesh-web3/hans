/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── Semantic tokens (CSS variables, defined in index.css) ─────────
        // These carry BOTH themes: the variable is redefined under `.dark`, so
        // `bg-background` is pale blue in light mode and deep navy in dark mode
        // with no `dark:` variant needed. Prefer these over the raw scales
        // below — they are what keeps one background across the whole site.
        background: {
          DEFAULT: "hsl(var(--background) / <alpha-value>)",
          secondary: "hsl(var(--background-secondary) / <alpha-value>)",
          card: "hsl(var(--card) / <alpha-value>)",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground) / <alpha-value>)",
          secondary: "hsl(var(--foreground-secondary) / <alpha-value>)",
          muted: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        border: {
          DEFAULT: "hsl(var(--border) / <alpha-value>)",
          strong: "hsl(var(--border-strong) / <alpha-value>)",
        },
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },

        // ── Accent — the 10% ──────────────────────────────────────────────
        // Reserved for highlighted text, key figures, active states and the
        // primary CTA. `accent-gradient-start/end` feed <GradientText>.
        accent: {
          // AA-safe: use for text, borders and rings.
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          // Brighter: fills, rules and active indicators only, never small
          // text — see the note in index.css.
          vivid: "hsl(var(--accent-vivid) / <alpha-value>)",
          "vivid-foreground": "hsl(var(--accent-vivid-foreground) / <alpha-value>)",
          gradient: {
            start: "hsl(var(--accent-gradient-start) / <alpha-value>)",
            end: "hsl(var(--accent-gradient-end) / <alpha-value>)",
          },
        },

        // ── Brand: sky blue (primary) ─────────────────────────────────────
        // Fixed scale for the numeric utilities (bg-primary-700 etc.) plus
        // DEFAULT/foreground so shadcn components (bg-primary) resolve too.
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
          DEFAULT: "#0284c7",
          foreground: "#ffffff",
        },

        // ── Brand: cyan (secondary) ───────────────────────────────────────
        secondary: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          950: "#083344",
          DEFAULT: "#0891b2",
          foreground: "#ffffff",
        },

        // ── Ink: deep navy for headings and photo overlays ────────────────
        // Replaces the old forest-green scale. ink-900 is the light-mode text
        // colour; ink-950 is the dark-mode page background.
        ink: {
          50: "#f4f8fc",
          100: "#e6eef7",
          200: "#c7d8ea",
          300: "#9db9d6",
          400: "#6d92ba",
          500: "#4a719c",
          600: "#365982",
          700: "#2b4869",
          800: "#223a55",
          900: "#1e293b",
          950: "#0f172a",
          DEFAULT: "#1e293b",
          foreground: "#ffffff",
        },

        // ── River: the accent blue as a fixed scale ───────────────────────
        // river-500/600 read well on the pale background, river-400 on navy.
        river: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
          DEFAULT: "#0ea5e9",
          foreground: "#ffffff",
        },

        // ── Surface: blue-tinted neutrals (light mode) ────────────────────
        // Cool greys only — a warm grey against this palette is what read as
        // "harsh". 50/100 are the two page backgrounds, 200 the border,
        // 500/600 the muted and secondary text, 900 the primary text.
        surface: {
          50: "#f5f9fc",
          100: "#e8f4f8",
          200: "#d1e3f0",
          300: "#b6cfe2",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#243044",
          900: "#1e293b",
          950: "#0f172a",
        },

        // ── Dark: navy surfaces (dark mode) ──────────────────────────────
        // 950 is the page background, 900 the card, 800 a border that stays
        // visible against the card, 300/400 the secondary and muted text.
        dark: {
          50: "#f8fafc",
          100: "#f8fafc",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#273449",
          900: "#1e293b",
          950: "#0f172a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Blue-tinted shadows in light mode, plain black in dark mode. Driven by
      // CSS variables so `shadow-sm` / `shadow-xl` switch with the theme
      // instead of keeping a grey cast on navy.
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        none: "none",
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
