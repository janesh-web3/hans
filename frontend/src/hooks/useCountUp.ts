import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Counts up from 0 to `target` once the returned ref scrolls into view.
 */
export function useCountUp(target: number, durationMs = 1500): [number, RefObject<HTMLDivElement>] {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          setValue(Math.floor(progress * target));
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setValue(target);
          }
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, durationMs]);

  return [value, ref];
}
