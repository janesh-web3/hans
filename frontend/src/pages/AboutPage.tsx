import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import CoreValues from "@/components/about/CoreValues";
import LeadershipTeam from "@/components/about/LeadershipTeam";
import ProvinceImpact from "@/components/about/ProvinceImpact";
import PartnersStrip from "@/components/about/PartnersStrip";
import AboutCTA from "@/components/about/AboutCTA";

/**
 * About page for the Hotel Association of Nepal, Sudurpashchim Province.
 *
 * Composed of seven self-contained sections living in
 * `src/components/about/`. This file sets only the running order and the page
 * background; each section owns its own copy and scroll animation.
 */
export default function AboutPage() {
  return (
    <main className="bg-white dark:bg-dark-950">
      <AboutHero />
      <OurStory />
      <CoreValues />
      <LeadershipTeam />
      <ProvinceImpact />
      <PartnersStrip />
      <AboutCTA />
    </main>
  );
}
