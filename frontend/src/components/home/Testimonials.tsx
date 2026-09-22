import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const AUTOPLAY_MS = 8000;

/**
 * A single quotation at a time, centred under an oversized decorative
 * quote mark, with arrows and dots below.
 *
 * The carousel advances on its own every eight seconds and stops the moment
 * a visitor takes manual control, so nothing moves out from under them.
 */
export default function Testimonials() {
  const { t } = useTranslation();
  const items = t("home.testimonials.items", { returnObjects: true }) as Testimonial[];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = items.length;

  const go = useCallback(
    (next: number) => {
      setPaused(true);
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  if (count === 0) return null;

  const current = items[index];

  return (
    <section className="relative overflow-hidden bg-stone-50 py-24 lg:py-32 dark:bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <span className="mb-4 block text-xs uppercase tracking-widest text-river-600 dark:text-river-400">
            {t("home.testimonials.eyebrow")}
          </span>
          <h2 className="font-serif text-4xl font-bold leading-tight text-forest-900 md:text-5xl dark:text-white">
            {t("home.testimonials.title")}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Decorative opening quote, sitting behind the text */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 select-none font-serif text-8xl leading-none text-forest-700/20 dark:text-forest-400/20"
          >
            &ldquo;
          </span>

          <div className="relative z-10 min-h-[260px] sm:min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto max-w-4xl text-center"
              >
                <p className="font-serif text-2xl italic leading-relaxed text-forest-900 md:text-3xl dark:text-white">
                  {current.quote}
                </p>
                <footer className="mt-8">
                  <p className="font-bold text-forest-900 dark:text-white">{current.name}</p>
                  <p className="mt-1 text-sm text-stone-500 dark:text-dark-400">{current.role}</p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* ── Navigation ─────────────────────────────────────────── */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={t("home.testimonials.prev")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition-colors duration-300 hover:border-forest-700 hover:text-forest-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 dark:border-dark-700 dark:text-dark-300 dark:hover:border-forest-400 dark:hover:text-forest-400"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>

            <div className="flex items-center gap-2">
              {items.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={item.name}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 ${
                    i === index
                      ? "w-8 bg-forest-700 dark:bg-forest-400"
                      : "w-2 bg-stone-300 hover:bg-stone-400 dark:bg-dark-700 dark:hover:bg-dark-600"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={t("home.testimonials.next")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition-colors duration-300 hover:border-forest-700 hover:text-forest-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 dark:border-dark-700 dark:text-dark-300 dark:hover:border-forest-400 dark:hover:text-forest-400"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
