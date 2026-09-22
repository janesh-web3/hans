import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HeroText } from "@/components/motion/HeroText";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1800&auto=format&fit=crop&q=80";

/**
 * Opening statement for the Membership page.
 *
 * Understated by intent: one still image, a left-weighted ink-green wash,
 * and copy held to three-quarters of the viewport. The call to action scrolls
 * down to the application steps rather than leaving the page, so the hero
 * reads as an invitation into the page rather than away from it.
 */
export default function MembershipHero() {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt={t("membership.hero.imageAlt")}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/60 to-transparent" />
        {/* The gradient above clears to transparent on the right, which leaves
            full-width mobile copy sitting over bare photography. This flat wash
            keeps that text legible below md and steps aside on wider screens. */}
        <div className="absolute inset-0 bg-ink-900/50 md:hidden" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="block h-px w-12 bg-white/70" />
            <span className="text-sm uppercase tracking-[0.2em] text-white/80">
              {t("membership.hero.eyebrow")}
            </span>
          </motion.div>

          <h1 className="font-serif text-5xl font-bold leading-[1.1] text-white md:text-7xl">
            <HeroText text={t("membership.hero.title")} wordStagger={0.07} delay={0.15} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="mt-6 text-lg font-light leading-relaxed text-white/90 md:text-xl"
          >
            {t("membership.hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
            className="mt-8"
          >
            <a
              href="#application"
              className="inline-block rounded-sm bg-white px-8 py-4 font-medium text-foreground transition-all duration-300 hover:bg-surface-100"
            >
              {t("membership.hero.cta")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
