import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import { HeroText } from "@/components/motion/HeroText";
import { HOME_HERO_IMAGES } from "@/constants/districtImages";

/**
 * Full-bleed opening statement for the homepage.
 *
 * A slow crossfading photo bed sits behind a dark editorial gradient so the
 * headline stays legible over any frame. The headline reveals word by word,
 * the supporting copy and calls to action follow, and a bouncing chevron
 * invites the first scroll.
 */
export default function HeroSection() {
  const { t } = useTranslation();
  const title = t("home.hero.title");

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* ── Photographic bed + editorial gradients ─────────────────────── */}
      <div className="absolute inset-0 z-0">
        <HeroSlider images={HOME_HERO_IMAGES} alt="Sudurpashchim Province, Nepal" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 sm:px-8 lg:px-12 lg:py-36">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="block h-px w-12 bg-gold-400" />
            <span className="text-sm font-medium uppercase tracking-widest text-white/80">
              {t("home.hero.eyebrow")}
            </span>
          </motion.div>

          <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
            <HeroText text={title} wordStagger={0.08} delay={0.15} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
            className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/90 md:text-xl"
          >
            {t("home.hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              to="/membership"
              className="inline-flex items-center justify-center rounded-sm bg-forest-700 px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-forest-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {t("home.hero.ctaPrimary")}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-sm border border-white/50 px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-forest-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {t("home.hero.ctaSecondary")}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] font-medium uppercase tracking-widest text-white/60">
          {t("home.hero.scroll")}
        </span>
        <ChevronDown className="animate-bounce-slow text-white/70" size={20} strokeWidth={1.25} />
      </motion.div>
    </section>
  );
}
