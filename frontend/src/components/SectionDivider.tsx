type DividerVariant = "wave" | "wave2" | "tilt" | "curve" | "peaks";

interface SectionDividerProps {
  /** Shape of the divider. */
  variant?: DividerVariant;
  /** Tailwind bg token(s) for the section ABOVE. */
  from?: string;
  /** Tailwind bg token(s) for the section BELOW. */
  to?: string;
  /** Mirror the shape horizontally. */
  flip?: boolean;
  /** SVG viewBox height in px. */
  height?: number;
  /** Draw as a soft brand-colour stroke (no fill) — used for the mountain "peaks" motif. */
  accent?: boolean;
}

/**
 * SectionDivider
 * Renders a decorative SVG shape between two sections.
 */
export default function SectionDivider({
  variant = "wave",
  from = "bg-background-card",
  to = "bg-surface-100",
  flip = false,
  height = 60,
  accent = false,
}: SectionDividerProps) {
  const W = 1440;
  const H = height;

  // Path data – shapes fill from the bottom edge upward so they "bleed" into
  // the section below when used as background transitions.
  const paths: Record<DividerVariant, string> = {
    // Gentle rolling wave
    wave: `M0,${H * 0.55} C360,${H * 1.1} 1080,0 ${W},${H * 0.45}
           L${W},${H} L0,${H} Z`,

    // Tighter double wave
    wave2: `M0,${H * 0.6} C240,${H * 0.2} 480,${H} 720,${H * 0.5}
            C960,0 1200,${H * 0.85} ${W},${H * 0.4}
            L${W},${H} L0,${H} Z`,

    // Simple diagonal tilt
    tilt: `M0,${H * 0.7} L${W},0 L${W},${H} L0,${H} Z`,

    // Smooth arch / curve
    curve: `M0,${H} Q${W / 2},0 ${W},${H} Z`,

    // Mountain-range silhouette (open path for accent stroke mode)
    peaks: `M0,${H * 0.85} L${W * 0.1},${H * 0.55} L${W * 0.22},${H * 0.75}
            L${W * 0.35},${H * 0.25} L${W * 0.48},${H * 0.6}
            L${W * 0.58},${H * 0.15} L${W * 0.68},${H * 0.55}
            L${W * 0.8},${H * 0.35} L${W * 0.92},${H * 0.65} L${W},${H * 0.5}`,
  };

  // Closed version of peaks for fill mode
  const peaksFill = `M0,${H} L0,${H * 0.85} L${W * 0.1},${H * 0.55}
    L${W * 0.22},${H * 0.75} L${W * 0.35},${H * 0.25} L${W * 0.48},${H * 0.6}
    L${W * 0.58},${H * 0.15} L${W * 0.68},${H * 0.55} L${W * 0.8},${H * 0.35}
    L${W * 0.92},${H * 0.65} L${W},${H * 0.5} L${W},${H} Z`;

  const isAccentPeaks = accent && variant === "peaks";
  const d = isAccentPeaks
    ? paths.peaks // open path for stroke
    : variant === "peaks"
      ? peaksFill // closed path for fill
      : (paths[variant] ?? paths.wave);

  // ── Colour palette ───────────────────────────────────────────────────────
  const colorMap: Record<string, string> = {
    "bg-white": "#ffffff",
    "bg-surface-50": "#ffffff",
    "bg-surface-100": "#f9fafb",
    "bg-surface-200": "#f3f4f6",
    "bg-primary-50": "#f0fdf4",
    "dark:bg-dark-950": "#020617",
    "dark:bg-dark-900": "#0f172a",
    "dark:bg-dark-800": "#1e293b",
  };

  function resolveColor(token: string, isDark = false): string {
    const parts = token.split(" ");
    if (isDark) {
      const dk = parts.find((p) => p.startsWith("dark:bg-"));
      if (dk) return colorMap[dk] ?? "#020617";
    }
    const lt = parts.find((p) => p.startsWith("bg-") && !p.startsWith("bg-transparent"));
    return (lt && colorMap[lt]) ?? "#f9fafb";
  }

  const lightFill = resolveColor(to, false);
  const darkFill = resolveColor(to, true);

  // Brand green accent colours for stroke mode
  const accentLight = "#bbf7d0"; // primary-200 – very soft green
  const accentDark = "#166534"; // primary-800 – muted dark-mode green

  const transform = flip ? "scaleX(-1)" : undefined;

  if (accent) {
    // Decorative stroke-only layer – sits on top of the `from` background
    return (
      <div
        className={`relative w-full overflow-hidden leading-none pointer-events-none select-none ${from}`}
        style={{ height: `${H}px` }}
        aria-hidden="true"
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full dark:hidden"
          style={{ transform }}
        >
          <path d={d} fill="none" stroke={accentLight} strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full hidden dark:block"
          style={{ transform }}
        >
          <path d={d} fill="none" stroke={accentDark} strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden leading-none pointer-events-none select-none ${from}`}
      style={{ height: `${H}px` }}
      aria-hidden="true"
    >
      {/* Light mode fill */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full dark:hidden"
        style={{ transform }}
      >
        <path d={d} fill={lightFill} />
      </svg>

      {/* Dark mode fill */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full hidden dark:block"
        style={{ transform }}
      >
        <path d={d} fill={darkFill} />
      </svg>
    </div>
  );
}
