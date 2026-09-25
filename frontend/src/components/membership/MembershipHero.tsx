import { useTranslation } from "react-i18next";
import PageHero from "@/components/PageHero";

const HERO_IMAGE =
  "/district/surma.jfif";

/**
 * Opening statement for the Membership page.
 *
 * Delegates to the shared PageHero so the frame, the colour layer over the
 * photograph and the reveal timing match every other page. The call to action
 * scrolls down to the application steps rather than leaving the page.
 */
export default function MembershipHero() {
  const { t } = useTranslation();

  return (
    <PageHero
      image={HERO_IMAGE}
      imageAlt={t("membership.hero.imageAlt")}
      badge={t("membership.hero.eyebrow")}
      title={t("membership.hero.title")}
      subtitle={t("membership.hero.subtitle")}
      primaryCta={{ label: t("membership.hero.cta"), to: "/contact" }}
    />
  );
}
