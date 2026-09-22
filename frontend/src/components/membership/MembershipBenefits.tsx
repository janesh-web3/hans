import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Award, Megaphone, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface BenefitItem {
  title: string;
  desc: string;
}

/** Icons in the same order as the copy in the locale files. */
const ICONS: LucideIcon[] = [Megaphone, TrendingUp, Users, Award];

/**
 * The four arguments for membership, set as an editorial two-column list.
 *
 * Typography carries the section: no cards, no borders, no shadows. On hover a
 * title drifts right and its icon warms to the accent blue, which
 * is the only movement in the section.
 */
export default function MembershipBenefits() {
  const { t } = useTranslation();
  const items = t("membership.benefits.items", { returnObjects: true }) as BenefitItem[];

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-16 max-w-2xl text-center lg:mb-24"
        >
          <span className="mb-4 block text-xs uppercase tracking-[0.2em] text-accent">
            {t("membership.benefits.eyebrow")}
          </span>
          <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
            {t("membership.benefits.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: (i % 2) * 0.15 }}
                className="group"
              >
                <Icon
                  size={32}
                  strokeWidth={1.25}
                  className="mb-6 text-accent transition-colors duration-500 group-hover:text-ink-700 dark:text-river-400 dark:group-hover:text-ink-400"
                />

                <h3 className="mb-3 font-serif text-2xl font-bold text-foreground transition-transform duration-500 ease-out group-hover:translate-x-2">
                  {item.title}
                </h3>

                <p className="text-lg leading-relaxed text-foreground-secondary">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
