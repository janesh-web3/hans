import { useTranslation } from "react-i18next";
import PageHero from "@/components/PageHero";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1800&auto=format&fit=crop&q=80";

/**
 * Opening statement for the Contact page.
 *
 * Delegates to the shared PageHero so the frame, the colour layer over the
 * photograph and the reveal timing match every other page; only the image and
 * the copy differ.
 *
 * The headline is assembled from the three title parts in the locale files.
 * They exist so the accent gradient could fall on one word, which a
 * photographic hero has no use for — white type over the navy wash carries the
 * contrast instead. The parts still join cleanly in both languages, where the
 * highlighted word sits at opposite ends of the sentence.
 */
export default function ContactHero() {
  const { t } = useTranslation();

  const title = [
    t("contact.contactHero.titleBefore"),
    t("contact.contactHero.titleHighlight"),
    t("contact.contactHero.titleAfter"),
  ]
    .join("")
    .trim();

  return (
    <PageHero
      image={HERO_IMAGE}
      imageAlt="The HAN Sudurpashchim secretariat in Dhangadhi, Kailali"
      badge={t("contact.contactHero.eyebrow")}
      title={title}
      subtitle={t("contact.contactHero.subtitle")}
    />
  );
}
