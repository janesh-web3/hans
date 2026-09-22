import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import HeroSlider from "@/components/HeroSlider";
import { HeroText } from "@/components/motion/HeroText";
import { Button } from "@/components/ui/button";

interface HeroCta {
  label: string;
  to: string;
  /** Renders an anchor instead of a route link — for same-page targets. */
  href?: string;
}

interface PageHeroProps {
  /** Single background image, or an array to crossfade through. */
  image?: string;
  images?: string[];
  /** Alt text for the photography. Falls back to the title. */
  imageAlt?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  scrollIndicator?: boolean;
}

/** Shared reveal timing, so every hero animates identically. */
const ease = [0.22, 1, 0.36, 1] as const;
const rise = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

/**
 * The hero used at the top of every page.
 *
 * One component so the frame, the colour layer over the photograph and the
 * reveal timing are identical site-wide: a viewport-tall frame minus the
 * sticky header (`hero-frame`), the shared navy wash (`hero-scrim`), and a
 * word-by-word headline followed by the supporting copy and calls to action.
 */
export default function PageHero({
  image,
  images,
  imageAlt,
  badge,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  scrollIndicator = true,
}: PageHeroProps) {
  const slides = images && images.length > 0 ? images : image ? [image] : [];

  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Parallax: the photograph drifts at roughly a fifth of the scroll speed
  // while the copy lifts and fades, which makes leaving the hero feel like one
  // continuous movement rather than a jump.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={sectionRef} className="hero-frame relative flex items-center overflow-hidden">
      {/* ── Photographic bed + the shared colour layer ─────────────────── */}
      {/* Taller than the frame so the parallax drift never exposes an edge. */}
      <motion.div
        style={reduceMotion ? undefined : { y: imageY }}
        className="absolute inset-x-0 top-0 z-0 h-[125%]"
      >
        <HeroSlider images={slides} alt={imageAlt ?? title} />
        <div className="hero-scrim absolute inset-0" />
      </motion.div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 pb-20 pt-24 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl">
          {badge && (
            <motion.div
              {...rise}
              transition={{ duration: 0.7, ease }}
              className="mb-5 flex items-center gap-3"
            >
              <span className="block h-[2px] w-8 bg-white/70" />
              <span className="text-xs font-bold uppercase tracking-luxury text-white/80">
                {badge}
              </span>
            </motion.div>
          )}

          <HeroText
            as="h1"
            text={title}
            delay={0.15}
            wordStagger={0.07}
            className="mb-5 block font-serif font-bold leading-tight text-white"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", letterSpacing: "-0.02em" }}
          />

          {subtitle && (
            <motion.p
              {...rise}
              transition={{ duration: 0.7, ease, delay: 0.45 }}
              className="mb-8 max-w-2xl text-base font-light leading-relaxed text-white/80 sm:text-lg"
            >
              {subtitle}
            </motion.p>
          )}

          {(primaryCta || secondaryCta) && (
            <motion.div
              {...rise}
              transition={{ duration: 0.7, ease, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {primaryCta && (
                <Button asChild size="lg">
                  {primaryCta.href ? (
                    <a href={primaryCta.href}>
                      {primaryCta.label} <FiArrowRight size={14} />
                    </a>
                  ) : (
                    <Link to={primaryCta.to}>
                      {primaryCta.label} <FiArrowRight size={14} />
                    </Link>
                  )}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  {secondaryCta.href ? (
                    <a href={secondaryCta.href}>{secondaryCta.label}</a>
                  ) : (
                    <Link to={secondaryCta.to}>{secondaryCta.label}</Link>
                  )}
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {scrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 animate-bounce-slow"
        >
          <span className="text-[10px] font-bold uppercase tracking-luxury text-white/50">
            Scroll
          </span>
          <FiArrowDown className="text-white/50" size={16} />
        </motion.div>
      )}
    </section>
  );
}
