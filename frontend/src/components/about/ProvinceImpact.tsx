import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SUDURPASHCHIM_DISTRICTS } from "@/constants/districts";

/**
 * The association's coverage, set as a dark full-width plate.
 *
 * Eight districts reduced to name, rule, and a single line of description.
 * On hover the rule draws out and the block eases to the right, which is the
 * only movement in the section.
 */
export default function ProvinceImpact() {
  const { t } = useTranslation();

  return (
    <section className="bg-background-secondary py-24 text-foreground lg:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-20 max-w-2xl text-center"
        >
          <span className="mb-4 block text-xs uppercase tracking-widest text-accent">
            {t("about.provinceImpact.eyebrow")}
          </span>
          <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
            {t("about.provinceImpact.title")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground-secondary">
            {t("about.provinceImpact.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {SUDURPASHCHIM_DISTRICTS.map((district, i) => (
            <motion.div
              key={district}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: (i % 4) * 0.1 }}
            >
              <Link
                to={`/directory?district=${encodeURIComponent(district)}`}
                className="group block transition-transform duration-500 ease-out hover:translate-x-2"
              >
                <h3 className="mb-2 font-serif text-2xl font-bold text-foreground">{district}</h3>
                <span className="mb-4 block h-px w-12 bg-border-strong transition-all duration-500 ease-out group-hover:w-24 group-hover:bg-white/70" />
                <p className="text-sm leading-relaxed text-foreground-secondary">
                  {t(`about.provinceImpact.districts.${district}`)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
