import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import { HeroText } from "@/components/motion/HeroText";
import { HOME_HERO_IMAGES } from "@/constants/districtImages";
import { useSiteSettings } from "@/hooks/useSiteSettings";

/**
 * Full-bleed opening statement for the homepage.
 *
 * A slow crossfading photo bed sits behind a dark editorial gradient so the
 * headline stays legible over any frame. The headline reveals word by word,
 * the supporting copy and calls to action follow, and a bouncing chevron
 * invites the first scroll.
 */
export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const { data: settings } = useSiteSettings();
  const language = i18n.language.startsWith("np") || i18n.language.startsWith("ne") ? "np" : "en";
  const copy = settings?.hero?.[language];
  const title = copy?.title || t("home.hero.title");
  const images = settings?.hero?.images?.length ? settings.hero.images : HOME_HERO_IMAGES;

  return (
    <section className="hero-frame-home relative flex items-center overflow-hidden">
      {/* ── Photographic bed + the shared hero colour layer ────────────── */}
      <div className="absolute inset-0 z-0">
        <HeroSlider images={images} alt="Sudurpashchim Province, Nepal" />
        <div className="hero-scrim absolute inset-0" />
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 pb-20 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 flex items-center justify-center gap-4"
          >
            <span className="text-sm font-medium uppercase tracking-widest text-white/80">
              {copy?.eyebrow || t("home.hero.eyebrow")}
            </span>
          </motion.div>

          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <HeroText text={title} wordStagger={0.08} delay={0.15} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
            className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/90 md:text-xl"
          >
            {copy?.subtitle || t("home.hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
          >
            <Link
              to="/directory"
              className="inline-flex items-center justify-center rounded-sm bg-accent px-8 py-4 text-sm font-medium uppercase tracking-widest text-accent-foreground transition-all duration-300 hover:bg-accent-vivid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {copy?.primaryCta || t("home.hero.ctaPrimary")}
            </Link>
            <Link
              to="/membership"
              className="inline-flex items-center justify-center rounded-sm border border-white/50 px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {copy?.secondaryCta || t("home.hero.ctaSecondary")}
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
