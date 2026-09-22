import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const STORY_IMAGES: { src: string; alt: string }[] = [
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&auto=format&fit=crop&q=80",
    alt: "Member hotel interior in Sudurpashchim Province",
  },
  {
    src: "https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?w=1400&auto=format&fit=crop&q=80",
    alt: "Highland landscape in the far-western hills",
  },
];

/**
 * Asymmetric mission statement.
 *
 * The copy column sticks to the top of the viewport on desktop while the
 * taller image column scrolls past it. The lower photograph is offset to the
 * right and pulled up so the two plates overlap rather than stack squarely.
 */
export default function OurStory() {
  const { t } = useTranslation();

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-20">
          {/* ── Left: sticky mission copy ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="self-start lg:sticky lg:top-32"
          >
            <span className="mb-4 block text-xs uppercase tracking-widest text-accent">
              {t("about.ourStory.eyebrow")}
            </span>

            <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
              {t("about.ourStory.title")}
            </h2>

            <div className="mt-8 space-y-6">
              <p className="text-lg leading-relaxed text-foreground-secondary">
                {t("about.ourStory.body1")}
              </p>
              <p className="text-lg leading-relaxed text-foreground-secondary">
                {t("about.ourStory.body2")}
              </p>
            </div>
          </motion.div>

          {/* ── Right: offset image stack ─────────────────────────────── */}
          {/* No space-y here: its `> * + *` rule outranks the negative
              margin that creates the overlap on desktop. */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="overflow-hidden rounded-sm shadow-2xl"
            >
              <img
                src={STORY_IMAGES[0].src}
                alt={STORY_IMAGES[0].alt}
                loading="lazy"
                className="h-[360px] w-full object-cover sm:h-[460px] lg:h-[520px]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="relative mt-8 overflow-hidden rounded-sm shadow-2xl lg:-mt-16 lg:ml-[10%] lg:w-[90%]"
            >
              <img
                src={STORY_IMAGES[1].src}
                alt={STORY_IMAGES[1].alt}
                loading="lazy"
                className="h-[320px] w-full object-cover sm:h-[400px] lg:h-[460px]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
