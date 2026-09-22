import { useCountUp } from "@/hooks/useCountUp";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  /** "light" = white text for use over a dark/image background. "dark" = brand-colored text for light backgrounds. */
  variant?: "light" | "dark";
}

export default function StatCounter({ value, suffix = "", label, variant = "light" }: StatCounterProps) {
  const [count, ref] = useCountUp(value);

  return (
    <div ref={ref}>
      <p
        className={
          variant === "light"
            ? "text-3xl font-bold text-white leading-none"
            : "text-4xl font-bold text-primary-700 dark:text-primary-400 leading-none mb-2"
        }
      >
        {count}
        {suffix}
      </p>
      <p
        className={
          variant === "light"
            ? "text-white/50 text-xs mt-1.5 font-medium uppercase tracking-wide"
            : "text-sm font-semibold text-surface-500 dark:text-dark-400 uppercase tracking-wide"
        }
      >
        {label}
      </p>
    </div>
  );
}
