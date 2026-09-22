import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import {
  categoryOf,
  dateBadge,
  descriptionFor,
  formatDateRange,
  formatTimeRange,
  imageFor,
  isUpcoming,
  titleFor,
  upcomingEvents,
} from "@/lib/events";
import type { ApiEvent } from "@/types/event";

/** How many of the next events get the full-width editorial treatment. */
const FEATURED_COUNT = 3;

/**
 * The events endpoint has no date filter, so the whole calendar is fetched and
 * narrowed to upcoming entries in the browser. One page of this size covers
 * the association's calendar comfortably.
 */
const FETCH_LIMIT = 50;

/** Placeholder card shown while the events request is in flight. */
function EventSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-sm border border-border bg-background-card shadow-sm md:flex-row">
      <div className="aspect-video w-full animate-pulse bg-muted md:w-2/5" />
      <div className="flex-1 space-y-4 p-8 md:pl-12">
        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
        <div className="h-7 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-3 w-full animate-pulse rounded bg-muted" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

interface EventCardProps {
  event: ApiEvent;
  language: string;
}

function EventCard({ event, language }: EventCardProps) {
  const { t } = useTranslation();
  const category = categoryOf(event);
  const badge = dateBadge(event, language);
  const running = new Date(event.startDate).getTime() <= Date.now() && isUpcoming(event);

  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-border bg-background-card shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl md:flex-row">
      {/* ── Photograph ───────────────────────────────────────────────── */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-muted md:w-2/5">
        <img
          src={imageFor(event)}
          alt={titleFor(event, language)}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute left-4 top-4 rounded-sm bg-white p-3 text-center shadow-sm">
          <span className="block font-serif text-2xl font-bold leading-none text-foreground">
            {badge.day}
          </span>
          <span className="mt-1 block text-xs uppercase tracking-wider text-foreground/70">
            {badge.month}
          </span>
        </div>

        {running && (
          <span className="absolute bottom-4 left-4 rounded-full bg-ink-700 px-3 py-1 text-xs font-medium text-white">
            {t("events.featured.liveNow")}
          </span>
        )}
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col justify-center p-8 md:pl-12">
        <span className="mb-3 block text-xs uppercase tracking-widest text-accent">
          {t(`events.categories.${category}.tag`)}
        </span>

        <h3 className="mb-4 font-serif text-3xl font-bold leading-snug text-foreground">
          {titleFor(event, language)}
        </h3>

        <ul className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground-secondary">
          <li className="flex items-center gap-2">
            <Calendar size={15} strokeWidth={1.5} className="shrink-0 text-accent" />
            {formatDateRange(event, language)}
          </li>
          <li className="flex items-center gap-2">
            <MapPin size={15} strokeWidth={1.5} className="shrink-0 text-accent" />
            {event.location}
          </li>
          <li className="flex items-center gap-2">
            <Clock size={15} strokeWidth={1.5} className="shrink-0 text-accent" />
            {formatTimeRange(event, language)}
          </li>
        </ul>

        <p className="mb-8 max-w-xl leading-relaxed text-foreground-secondary">
          {descriptionFor(event, language)}
        </p>

        {/* Registration is an external link when the event carries one;
            otherwise the enquiry goes through the contact page. */}
        {event.registrationLink ? (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 border-b border-ink-900 pb-1 font-medium text-foreground transition-all duration-300 hover:border-ink-700 hover:text-ink-700 dark:border-white dark:hover:border-ink-400 dark:hover:text-ink-400"
          >
            {t("events.featured.register")}
            <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        ) : (
          <Link
            to="/contact"
            className="inline-flex w-fit items-center gap-2 border-b border-ink-900 pb-1 font-medium text-foreground transition-all duration-300 hover:border-ink-700 hover:text-ink-700 dark:border-white dark:hover:border-ink-400 dark:hover:text-ink-400"
          >
            {t("events.featured.learnMore")}
            <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </article>
  );
}

/**
 * The next three events, each given a full-width horizontal card.
 *
 * Pulled live from the events API and narrowed to entries that have not yet
 * finished, so the section empties itself as the calendar moves on rather than
 * showing a stale programme.
 */
export default function FeaturedEvents() {
  const { t, i18n } = useTranslation();
  const { data, isLoading, isError } = useEvents({ limit: FETCH_LIMIT });

  const featured = upcomingEvents(data?.data ?? []).slice(0, FEATURED_COUNT);

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* ── Header ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 max-w-2xl"
        >
          <span className="mb-4 block text-xs uppercase tracking-[0.2em] text-accent">
            {t("events.featured.eyebrow")}
          </span>
          <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
            {t("events.featured.title")}
          </h2>
        </motion.div>

        {/* ── Content states ───────────────────────────────────────── */}
        {isError ? (
          <div className="flex items-start gap-3 rounded-sm border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/30">
            <AlertCircle className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" size={18} />
            <div>
              <p className="font-medium text-red-800 dark:text-red-300">
                {t("events.featured.errorTitle")}
              </p>
              <p className="mt-1 text-sm text-red-700 dark:text-red-400">
                {t("events.featured.errorBody")}
              </p>
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col gap-12">
            {Array.from({ length: FEATURED_COUNT }).map((_, i) => (
              <EventSkeleton key={i} />
            ))}
          </div>
        ) : featured.length === 0 ? (
          <p className="rounded-sm border border-border bg-muted p-10 text-center text-foreground-muted">
            {t("events.featured.empty")}
          </p>
        ) : (
          <div className="flex flex-col gap-12">
            {featured.map((event, i) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.15 }}
              >
                <EventCard event={event} language={i18n.language} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
