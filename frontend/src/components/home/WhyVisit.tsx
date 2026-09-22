import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface VisitReason {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
}

/** One photograph per reason, in the order the copy is written. */
const IMAGES: string[] = [
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&auto=format&fit=crop&q=80",
];

/**
 * Three reasons to travel to the far-west, told as alternating full-width
 * rows: image left then text right, reversed on the next row, and so on.
 * Each block carries a short checked list of the specific places or
 * practicalities behind the claim.
 */
export default function WhyVisit() {
  const { t } = useTranslation();
  const items = t("home.whyVisit.items", { returnObjects: true }) as VisitReason[];

  return (
    <section className="bg-white py-24 lg:py-32 dark:bg-dark-950">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-20 max-w-2xl text-center"
        >
          <span className="mb-4 block text-xs uppercase tracking-widest text-river-600 dark:text-river-400">
            {t("home.whyVisit.eyebrow")}
          </span>
          <h2 className="font-serif text-4xl font-bold leading-tight text-forest-900 md:text-5xl dark:text-white">
            {t("home.whyVisit.title")}
          </h2>
        </motion.div>

        <div className="space-y-24 lg:space-y-32">
          {items.map((item, i) => {
            const imageFirst = i % 2 === 0;
            return (
              <div
                key={item.title}
                className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
              >
                {/* ── Photograph ─────────────────────────────────────── */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={imageFirst ? "lg:order-1" : "lg:order-2"}
                >
                  <div className="overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={IMAGES[i % IMAGES.length]}
                      alt={item.title}
                      loading="lazy"
                      className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[480px]"
                    />
                  </div>
                </motion.div>

                {/* ── Copy ───────────────────────────────────────────── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
                  className={imageFirst ? "lg:order-2" : "lg:order-1"}
                >
                  <span className="mb-4 block text-xs uppercase tracking-widest text-river-600 dark:text-river-400">
                    {item.eyebrow}
                  </span>

                  <h3 className="font-serif text-3xl font-bold leading-tight text-forest-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-6 text-lg leading-relaxed text-stone-600 dark:text-dark-300">
                    {item.body}
                  </p>

                  <ul className="mt-8 space-y-4">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-100 dark:bg-forest-900">
                          <Check
                            size={12}
                            strokeWidth={2.5}
                            className="text-forest-700 dark:text-forest-300"
                          />
                        </span>
                        <span className="leading-relaxed text-stone-600 dark:text-dark-300">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
