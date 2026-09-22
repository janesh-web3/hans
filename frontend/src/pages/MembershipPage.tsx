import MembershipHero from "@/components/membership/MembershipHero";
import MembershipBenefits from "@/components/membership/MembershipBenefits";

/**
 * Membership page for the Hotel Association of Nepal, Sudurpashchim Province.
 *
 * Composed of self-contained sections living in `src/components/membership/`.
 * This file sets only the running order and the page background; each section
 * owns its own copy and scroll animation.
 *
 * Still to come, in this order below MembershipBenefits: MembershipTiers,
 * ApplicationProcess (which carries `id="application"`, the hero CTA's
 * target), MemberTestimonial, MembershipFAQ, MembershipCTA.
 */
export default function MembershipPage() {
  return (
    <main className="bg-background">
      <MembershipHero />
      <MembershipBenefits />
    </main>
  );
}
