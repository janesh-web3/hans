import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EDITORIAL_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&auto=format&fit=crop&q=80";

/**
 * Asymmetric editorial split introducing the association.
 *
 * Narrow column of copy on the left that sticks while the taller image
 * column on the right scrolls past it, with an "established" badge
 * overlapping the lower-left corner of the photograph.
 */
export default function AboutStrip() {
  const { t } = useTranslation();

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
          {/* ── Left: sticky copy column ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="self-start lg:sticky lg:top-28"
          >
            <span className="mb-4 block text-xs uppercase tracking-widest text-accent">
              {t("home.aboutStrip.eyebrow")}
            </span>

            <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
              {t("home.aboutStrip.title")}
            </h2>

            <div className="mt-8 space-y-6">
              <p className="text-lg leading-relaxed text-foreground-secondary">
                {t("home.aboutStrip.body1")}
              </p>
              <p className="text-lg leading-relaxed text-foreground-secondary">
                {t("home.aboutStrip.body2")}
              </p>
              <p className="text-lg leading-relaxed text-foreground-secondary">
                {t("home.aboutStrip.body3")}
              </p>
            </div>

            <Link
              to="/about"
              className="group mt-10 inline-flex items-center gap-2 font-medium text-accent underline-offset-4 transition-colors duration-300 hover:underline dark:text-river-400"
            >
              {t("home.aboutStrip.cta")}
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          {/* ── Right: editorial image with overlapping badge ─────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={EDITORIAL_IMAGE}
                alt="Member hotel interior in Sudurpashchim Province"
                loading="lazy"
                className="h-[420px] w-full object-cover sm:h-[560px] lg:h-[720px]"
              />
            </div>

            <div className="absolute -bottom-6 left-6 rounded-xl bg-background-card px-8 py-6 shadow-xl sm:-left-8">
              <p className="font-serif text-2xl font-bold leading-none text-foreground">
                {t("home.aboutStrip.badge")}
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-foreground-muted">
                {t("home.aboutStrip.badgeSub")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
