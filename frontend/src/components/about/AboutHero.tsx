import { useTranslation } from "react-i18next";
import PageHero from "@/components/PageHero";
import { useSiteSettings } from "@/hooks/useSiteSettings";

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
  const { t, i18n } = useTranslation();
  const { data: settings } = useSiteSettings();
  const language = i18n.language.startsWith("np") || i18n.language.startsWith("ne") ? "np" : "en";
  const copy = settings?.about?.[language];

  return (
    <PageHero
      image={HERO_IMAGE}
      imageAlt="The Himalaya of Sudurpashchim Province, Nepal"
      badge={copy?.eyebrow || t("about.aboutHero.eyebrow")}
      title={copy?.title || t("about.aboutHero.title")}
      subtitle={copy?.subtitle || t("about.aboutHero.subtitle")}
    />
  );
}
