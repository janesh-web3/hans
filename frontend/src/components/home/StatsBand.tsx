import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { Hotel, Map, Star, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Stat {
  icon: LucideIcon;
  value: number;
  suffix: string;
  labelKey: string;
  /** Per-cell rules so the grid reads as one divided band at every breakpoint. */
  rules: string;
}

const STATS: Stat[] = [
  {
    icon: Hotel,
    value: 150,
    suffix: "+",
    labelKey: "home.statsBand.hotels",
    rules: "",
  },
  {
    icon: Map,
    value: 8,
    suffix: "",
    labelKey: "home.statsBand.districts",
    rules: "border-t sm:border-t-0 sm:border-l",
  },
  {
    icon: Star,
    value: 25,
    suffix: "+",
    labelKey: "home.statsBand.years",
    rules: "border-t lg:border-t-0 lg:border-l",
  },
  {
    icon: Users,
    value: 40,
    suffix: "K+",
    labelKey: "home.statsBand.guests",
    rules: "border-t sm:border-l lg:border-t-0",
  },
];

const DURATION_MS = 1600;

/** Ease-out cubic — quick off the mark, settling gently on the final figure. */
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

interface CountUpProps {
  to: number;
  suffix: string;
  active: boolean;
}

/** Counts from zero up to `to` once `active` flips true, then holds. */
function CountUp({ to, suffix, active }: CountUpProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;

    // Anyone who asked the OS to reduce motion just gets the final number.
    const reduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setDisplay(to);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      setDisplay(Math.round(easeOut(progress) * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, to]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

/**
 * The band of headline figures directly beneath the hero.
 *
 * Four columns on desktop, two on tablet, one stacked column on mobile,
 * separated by hairline rules. Each figure counts up the first time the
 * band scrolls into view.
 */
export default function StatsBand() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="border-y border-border bg-background-secondary">
      <div ref={ref} className="mx-auto max-w-screen-2xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                className={`flex flex-col items-center border-border px-6 py-12 text-center lg:py-16 ${stat.rules}`}
              >
                <Icon
                  className="mb-5 text-accent"
                  size={28}
                  strokeWidth={1.25}
                />
                <p className="font-serif text-4xl font-bold leading-none text-foreground md:text-5xl">
                  <CountUp to={stat.value} suffix={stat.suffix} active={inView} />
                </p>
                <p className="mt-3 text-xs uppercase tracking-widest text-foreground-muted">
                  {t(stat.labelKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
