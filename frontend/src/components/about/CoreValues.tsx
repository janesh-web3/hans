import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ValueItem {
  title: string;
  desc: string;
}

/** Icons in the same order as the copy in the locale files. */
const ICONS: LucideIcon[] = [ShieldCheck, Leaf, Users];

/**
 * The association's three founding principles.
 *
 * Minimalist by design: no card borders and no shadows at rest. The lift and
 * the shift from accent blue to a deeper accent on hover are the only chrome.
 */
export default function CoreValues() {
  const { t } = useTranslation();
  const items = t("about.coreValues.items", { returnObjects: true }) as ValueItem[];

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="mb-4 block text-xs uppercase tracking-widest text-accent">
            {t("about.coreValues.eyebrow")}
          </span>
          <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
            {t("about.coreValues.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.15 }}
                className="group transition-transform duration-500 ease-out hover:-translate-y-2"
              >
                <Icon
                  size={40}
                  strokeWidth={1}
                  className="mb-6 text-accent transition-colors duration-500 group-hover:text-ink-700 dark:text-river-400 dark:group-hover:text-ink-400"
                />

                <h3 className="mb-4 font-serif text-2xl font-bold text-foreground">
                  {item.title}
                </h3>

                <p className="leading-relaxed text-foreground-secondary">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
