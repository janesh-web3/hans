import { useTranslation } from "react-i18next";
import PageHero from "@/components/PageHero";

const HERO_IMAGE =
  "/assets/hero7.jpg";

/**
 * Opening statement for the About page.
 *
 * Delegates to the shared PageHero so the frame, the colour layer over the
 * photograph and the reveal timing match every other page; only the image and
 * the copy differ.
 */
export default function AboutHero() {
  const { t } = useTranslation();

  return (
    <PageHero
      image={HERO_IMAGE}
      imageAlt="The Himalaya of Sudurpashchim Province, Nepal"
      badge={t("about.aboutHero.eyebrow")}
      title={t("about.aboutHero.title")}
      subtitle={t("about.aboutHero.subtitle")}
    />
  );
}
