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
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 max-w-2xl"
        >
          <span className="mb-4 block text-xs uppercase tracking-widest text-accent">
            {t("home.whatWeDo.eyebrow")}
          </span>
          <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
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
              <span className="block font-serif text-5xl font-bold leading-none text-border-strong transition-colors duration-300 group-hover:text-accent dark:text-dark-700 dark:group-hover:text-river-400">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="mb-4 mt-6 font-serif text-2xl font-bold text-foreground transition-transform duration-300 group-hover:translate-x-2">
                {item.title}
              </h3>

              <p className="leading-relaxed text-foreground-secondary">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
