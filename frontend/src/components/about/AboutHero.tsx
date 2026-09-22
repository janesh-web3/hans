import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HeroText } from "@/components/motion/HeroText";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1800&auto=format&fit=crop&q=80";

/**
 * Understated opening statement for the About page.
 *
 * Deliberately quieter than the homepage hero: a single still image rather
 * than a slider, a left-weighted gradient, and copy that sits at four-fifths
 * of the viewport rather than filling it.
 */
export default function AboutHero() {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="The Himalaya of Sudurpashchim Province, Nepal"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="block h-px w-12 bg-gold-400" />
            <span className="text-sm uppercase tracking-[0.2em] text-white/80">
              {t("about.aboutHero.eyebrow")}
            </span>
          </motion.div>

          <h1 className="font-serif text-5xl font-bold leading-[1.1] text-white md:text-7xl">
            <HeroText text={t("about.aboutHero.title")} wordStagger={0.07} delay={0.15} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="mt-6 text-lg font-light leading-relaxed text-white/90 md:text-xl"
          >
            {t("about.aboutHero.subtitle")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
