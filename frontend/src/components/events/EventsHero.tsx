import { useTranslation } from "react-i18next";
import PageHero from "@/components/PageHero";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop&q=80";

/**
 * Opening statement for the Events page.
 *
 * Delegates to the shared PageHero so the frame, the colour layer over the
 * photograph and the reveal timing match every other page; only the image and
 * the copy differ.
 */
export default function EventsHero() {
  const { t } = useTranslation();

  return (
    <PageHero
      image={HERO_IMAGE}
      imageAlt={t("events.hero.imageAlt")}
      badge={t("events.hero.eyebrow")}
      title={t("events.hero.title")}
      subtitle={t("events.hero.subtitle")}
    />
  );
}
