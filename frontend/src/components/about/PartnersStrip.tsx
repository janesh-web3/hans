import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Building2, Compass, Landmark, Mountain } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** One mark per partner, in the same order as the names in the locale files. */
const MARKS: LucideIcon[] = [Building2, Landmark, Compass, Mountain];

/**
 * Affiliations strip.
 *
 * Deliberately typographic rather than logo-based: the association does not
 * hold redistribution rights to these organisations' marks, so each partner
 * is set as a thin-stroke glyph beside its name. Swap in real artwork once
 * permission is on file.
 */
export default function PartnersStrip() {
  const { t } = useTranslation();
  const partners = t("about.partners.items", { returnObjects: true }) as string[];

  return (
    <section className="border-y border-stone-100 bg-white py-16 dark:border-dark-800 dark:bg-dark-950">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 text-center text-xs uppercase tracking-widest text-stone-400 dark:text-dark-500"
        >
          {t("about.partners.label")}
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-12 md:gap-24"
        >
          {partners.map((partner, i) => {
            const Mark = MARKS[i % MARKS.length];
            return (
              <li
                key={partner}
                className="flex items-center gap-3 opacity-50 grayscale transition-all duration-500 ease-out hover:opacity-100 hover:grayscale-0"
              >
                <Mark
                  size={28}
                  strokeWidth={1}
                  className="shrink-0 text-forest-700 dark:text-forest-400"
                />
                <span className="max-w-[10rem] font-serif text-base font-bold leading-snug text-forest-900 dark:text-white">
                  {partner}
                </span>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
