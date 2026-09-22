import { Link } from "react-router-dom";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import HeroSlider from "@/components/HeroSlider";
import { HeroText } from "@/components/motion/HeroText";
import { Button } from "@/components/ui/button";

interface HeroCta {
  label: string;
  to: string;
}

interface PageHeroProps {
  /** Single background image, or an array to crossfade through. */
  image?: string;
  images?: string[];
  badge?: string;
  title: string;
  subtitle?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  scrollIndicator?: boolean;
}

/**
 * PageHero – full-screen immersive banner used at the top of every page.
 * Crossfading background slider, top-to-bottom vignette, staggered headline reveal.
 */
export default function PageHero({
  image,
  images,
  badge,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  scrollIndicator = true,
}: PageHeroProps) {
  const slides = images && images.length > 0 ? images : image ? [image] : [];

  return (
    <section className="relative overflow-hidden flex items-center" style={{ minHeight: "100vh" }}>

      {/* Background slider */}
      <div className="absolute inset-0 z-0">
        <HeroSlider images={slides} alt={title} />

        {/* Legibility gradient — darker toward the text edge */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(105deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)" }}
        />
        {/* Spec vignette — transparent top to dark bottom, ~50% */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.5) 100%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">

        <div className="flex items-center gap-3 mb-5">
          <span className="block w-8 h-[2px] bg-gold-400" />
          <span className="text-gold-400 text-xs font-bold uppercase tracking-luxury">
            {badge ?? "HAN Sudurpashchim"}
          </span>
        </div>

        <HeroText
          as="h1"
          text={title}
          className="font-serif font-bold text-white leading-tight mb-5 block"
          style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", letterSpacing: "-0.02em" }}
        />

        {subtitle && (
          <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            {subtitle}
          </p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="flex flex-wrap gap-4">
            {primaryCta && (
              <Button asChild size="lg">
                <Link to={primaryCta.to}>
                  {primaryCta.label} <FiArrowRight size={14} />
                </Link>
              </Button>
            )}
            {secondaryCta && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link to={secondaryCta.to}>{secondaryCta.label}</Link>
              </Button>
            )}
          </div>
        )}
      </div>

      {scrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce-slow">
          <span className="text-white/50 text-[10px] font-bold uppercase tracking-luxury">Scroll</span>
          <FiArrowDown className="text-white/50" size={16} />
        </div>
      )}
    </section>
  );
}
