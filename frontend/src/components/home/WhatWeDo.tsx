import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface MandateItem {
  title: string;
  desc: string;
}

/**
 * The association's three-part mandate, set as an unadorned typographic grid.
 *
 * No borders and no shadows — the structure comes entirely from the oversized
 * index numerals, the serif titles, and the whitespace between them. Hovering
 * a column nudges its title to the right.
 */
export default function WhatWeDo() {
  const { t } = useTranslation();
  const items = t("home.whatWeDo.items", { returnObjects: true }) as MandateItem[];

  return (
    <section className="bg-white py-24 lg:py-32 dark:bg-dark-950">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 max-w-2xl"
        >
          <span className="mb-4 block text-xs uppercase tracking-widest text-river-600 dark:text-river-400">
            {t("home.whatWeDo.eyebrow")}
          </span>
          <h2 className="font-serif text-4xl font-bold leading-tight text-forest-900 md:text-5xl dark:text-white">
            {t("home.whatWeDo.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
              className="group"
            >
              <span className="block font-serif text-5xl font-bold leading-none text-stone-200 transition-colors duration-300 group-hover:text-river-600 dark:text-dark-700 dark:group-hover:text-river-400">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="mb-4 mt-6 font-serif text-2xl font-bold text-forest-900 transition-transform duration-300 group-hover:translate-x-2 dark:text-white">
                {item.title}
              </h3>

              <p className="leading-relaxed text-stone-600 dark:text-dark-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
