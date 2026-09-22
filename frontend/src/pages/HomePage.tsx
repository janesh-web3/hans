import HeroSection from "@/components/home/HeroSection";
import StatsBand from "@/components/home/StatsBand";
import AboutStrip from "@/components/home/AboutStrip";
import FeaturedDistricts from "@/components/home/FeaturedDistricts";
import WhatWeDo from "@/components/home/WhatWeDo";
import FeaturedHotels from "@/components/home/FeaturedHotels";
import WhyVisit from "@/components/home/WhyVisit";
import Testimonials from "@/components/home/Testimonials";
import JoinCTA from "@/components/home/JoinCTA";

/**
 * Public homepage for the Hotel Association of Nepal, Sudurpashchim Province.
 *
 * Composed of nine self-contained sections, each living in
 * `src/components/home/`. The page itself only sets the running order and the
 * page background; every section owns its own copy, data fetching, and
 * scroll animation.
 */
export default function HomePage() {
  return (
    <div className="bg-white dark:bg-dark-950">
      <HeroSection />
      <StatsBand />
      <AboutStrip />
      <FeaturedDistricts />
      <WhatWeDo />
      <FeaturedHotels />
      <WhyVisit />
      <Testimonials />
      <JoinCTA />
    </div>
  );
}
