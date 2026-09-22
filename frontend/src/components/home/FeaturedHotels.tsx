import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  BedDouble,
  Car,
  Coffee,
  Dumbbell,
  MapPin,
  Snowflake,
  Tv,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useHotels } from "@/hooks/useHotels";
import type { ApiHotel } from "@/types/hotel";

/**
 * Keyword to icon map for the amenity row. Matching is done on a lowercased
 * substring so backend values like "Free Wi-Fi" or "Airport pickup" still
 * resolve to something meaningful.
 */
const AMENITY_ICONS: { match: string; icon: LucideIcon }[] = [
  { match: "wifi", icon: Wifi },
  { match: "wi-fi", icon: Wifi },
  { match: "internet", icon: Wifi },
  { match: "breakfast", icon: Coffee },
  { match: "coffee", icon: Coffee },
  { match: "restaurant", icon: Utensils },
  { match: "dining", icon: Utensils },
  { match: "parking", icon: Car },
  { match: "airport", icon: Car },
  { match: "pool", icon: Waves },
  { match: "spa", icon: Waves },
  { match: "gym", icon: Dumbbell },
  { match: "fitness", icon: Dumbbell },
  { match: "air condition", icon: Snowflake },
  { match: "ac", icon: Snowflake },
  { match: "tv", icon: Tv },
];

function iconFor(amenity: string): LucideIcon {
  const needle = amenity.toLowerCase();
  return AMENITY_ICONS.find((entry) => needle.includes(entry.match))?.icon ?? BedDouble;
}

/** Placeholder card shown while the directory request is in flight. */
function HotelSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background-card shadow-sm">
      <div className="aspect-[4/3] w-full animate-pulse bg-muted" />
      <div className="space-y-4 p-6">
        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

interface HotelCardProps {
  hotel: ApiHotel;
  verifiedLabel: string;
  detailsLabel: string;
}

function HotelCard({ hotel, verifiedLabel, detailsLabel }: HotelCardProps) {
  const amenities = hotel.amenities.slice(0, 3);

  return (
    <Link
      to={`/hotel/${hotel._id}`}
      className="group block overflow-hidden rounded-lg border border-border bg-background-card shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      {/* ── Photograph ───────────────────────────────────────────────── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {hotel.images?.[0] ? (
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BedDouble className="text-foreground-muted/60" size={32} strokeWidth={1.25} />
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-ink-700 px-3 py-1 text-xs font-medium text-white">
          {verifiedLabel}
        </span>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="p-6">
        <h3 className="mb-2 font-serif text-xl font-bold leading-snug text-foreground">
          {hotel.name}
        </h3>

        <p className="mb-4 flex items-center gap-1.5 text-sm text-foreground-muted">
          <MapPin size={14} strokeWidth={1.5} />
          {hotel.district}, Sudurpashchim
        </p>

        {amenities.length > 0 && (
          <ul className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            {amenities.map((amenity) => {
              const Icon = iconFor(amenity);
              return (
                <li
                  key={amenity}
                  className="flex items-center gap-1.5 text-xs text-foreground-muted"
                >
                  <Icon size={14} strokeWidth={1.5} className="text-accent" />
                  <span className="line-clamp-1">{amenity}</span>
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="font-bold text-accent">{hotel.category}</span>
          <span className="inline-flex items-center gap-1 text-sm text-foreground-secondary underline underline-offset-4 transition-colors duration-300 group-hover:text-ink-700 dark:group-hover:text-ink-400">
            {detailsLabel}
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Three verified member properties pulled live from the directory API,
 * presented as a clean three-column grid with the directory link sitting
 * at the top right of the section header.
 */
export default function FeaturedHotels() {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useHotels({ limit: 3 });
  const hotels = data?.data ?? [];

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* ── Header ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <span className="mb-4 block text-xs uppercase tracking-widest text-accent">
              {t("home.featured.eyebrow")}
            </span>
            <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
              {t("home.featured.title")}
            </h2>
          </div>

          <Link
            to="/membership"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent underline-offset-4 transition-colors duration-300 hover:underline dark:text-river-400"
          >
            {t("home.featured.viewAll")}
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* ── Content states ───────────────────────────────────────── */}
        {isError ? (
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/30">
            <AlertCircle className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" size={18} />
            <div>
              <p className="font-medium text-red-800 dark:text-red-300">
                {t("home.featured.errorTitle")}
              </p>
              <p className="mt-1 text-sm text-red-700 dark:text-red-400">
                {t("home.featured.errorBody")}
              </p>
            </div>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <HotelSkeleton key={i} />
            ))}
          </div>
        ) : hotels.length === 0 ? (
          <p className="rounded-lg border border-border bg-background-card p-10 text-center text-foreground-muted">
            {t("home.featured.empty")}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel, i) => (
              <motion.div
                key={hotel._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
              >
                <HotelCard
                  hotel={hotel}
                  verifiedLabel={t("home.featured.verified")}
                  detailsLabel={t("home.featured.details")}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
