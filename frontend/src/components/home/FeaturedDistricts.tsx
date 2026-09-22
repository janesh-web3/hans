import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SUDURPASHCHIM_DISTRICTS, DISTRICT_INFO } from "@/constants/districts";
import type { District } from "@/constants/districts";
import { DISTRICT_IMAGES } from "@/constants/districtImages";
import { useHotels } from "@/hooks/useHotels";

/**
 * Column spans that turn a plain four-column grid into an editorial mosaic:
 * a wide plate, two uprights, two uprights, a wide plate, then a pair of
 * wide plates closing the section out.
 */
const SPANS: string[] = [
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

/**
 * The eight districts of Sudurpashchim as a magazine-style photo mosaic.
 *
 * Each plate links straight into the member directory pre-filtered to that
 * district, and carries a live count of verified member properties when the
 * directory data is available.
 */
export default function FeaturedDistricts() {
  const { t } = useTranslation();

  // One inexpensive read of the directory gives every card a real count.
  const { data } = useHotels({ limit: 100 });

  const countsByDistrict = useMemo(() => {
    const counts = {} as Record<District, number>;
    for (const hotel of data?.data ?? []) {
      counts[hotel.district] = (counts[hotel.district] ?? 0) + 1;
    }
    return counts;
  }, [data]);

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-8 lg:px-12">
        {/* ── Centred section header ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="mb-4 block text-xs uppercase tracking-widest text-accent">
            {t("home.districts.eyebrow")}
          </span>
          <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
            {t("home.districts.title")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground-secondary">
            {t("home.districts.subtitle")}
          </p>
        </motion.div>

        {/* ── Mosaic ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUDURPASHCHIM_DISTRICTS.map((district, i) => {
            const count = countsByDistrict[district];
            return (
              <motion.div
                key={district}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: (i % 4) * 0.08 }}
                className={SPANS[i]}
              >
                <Link
                  to={`/membership?district=${encodeURIComponent(district)}`}
                  className="group relative block h-[300px] overflow-hidden rounded-lg sm:h-[340px] lg:h-[400px]"
                >
                  <img
                    src={DISTRICT_IMAGES[district]}
                    alt={`${district} district, Sudurpashchim`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Base gradient, deepening on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-serif text-2xl font-bold text-white">{district}</h3>
                    <p className="mt-1 text-sm text-white/80">
                      {typeof count === "number" && count > 0
                        ? `${count} ${t("home.districts.propertiesLabel")}`
                        : DISTRICT_INFO[district].knownFor}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
