import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const BACKGROUND =
  "/assets/hero5.jpg";

/**
 * Closing membership appeal.
 *
 * A darkened mountain photograph under a deep ink-green wash, so the
 * white type reads cleanly while the image still carries the mood of the
 * province.
 */
export default function JoinCTA() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-ink-900">
      <img
        src={BACKGROUND}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink-900/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      <div className="relative z-10 mx-auto max-w-screen-2xl px-6 py-24 text-center sm:px-8 lg:px-12 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="mx-auto max-w-3xl font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
            {t("home.joinCta.title")}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            {t("home.joinCta.subtitle")}
          </p>

          <Link
            to="/membership"
            className="group mt-8 inline-flex items-center gap-2 rounded-sm bg-white dark:text-black px-10 py-4 text-sm font-medium uppercase tracking-widest text-foreground transition-all duration-300 hover:bg-surface-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
          >
            {t("home.joinCta.button")}
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
