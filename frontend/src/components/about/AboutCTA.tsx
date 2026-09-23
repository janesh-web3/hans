import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const BACKGROUND =
  "/district/surma_bhagang.jpg";

/**
 * Closing invitation, addressed to hoteliers and travellers alike.
 *
 * A warm lobby photograph sits under a heavy ink-green wash so the white
 * type keeps its contrast while the image still carries the mood.
 */
export default function AboutCTA() {
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

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
            {t("about.aboutCta.title")}
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-white/80">
            {t("about.aboutCta.subtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/membership"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-white dark:text-black px-8 py-4 font-medium text-foreground transition-all duration-300 hover:bg-surface-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
            >
              {t("about.aboutCta.primary")}
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-sm border border-white/50 px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
            >
              {t("about.aboutCta.secondary")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
