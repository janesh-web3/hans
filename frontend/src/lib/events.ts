import type { ApiEvent } from "@/types/event";

/**
 * Presentation helpers for events.
 *
 * The backend Event model (backend/src/models/Event.ts) stores only titles,
 * descriptions, dates, location and a registration link — it has no `category`
 * or `images` field. The events UI needs both: a category for the tag and the
 * filter tabs, and a photograph for every card.
 *
 * Until those columns exist, this module derives them deterministically from
 * the data that IS stored, so the page works against the live API today:
 *
 *   • `categoryOf` matches keywords in the English title.
 *   • `imageFor` picks from a per-category pool, keyed on the document id so a
 *     given event always shows the same photograph.
 *
 * Both are stopgaps. Adding `category` (enum) and `images` (string[]) to the
 * Event schema would let the admin panel set these explicitly and let the API
 * filter by category server-side — at which point this derivation should go.
 */

/** All events happen in Nepal, so times are always shown in Nepal time. */
const NEPAL_TIME_ZONE = "Asia/Kathmandu";

export const EVENT_CATEGORIES = ["training", "cultural", "networking"] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

/**
 * Keyword to category map, tested against a lowercased English title. Order
 * matters: the first category with a matching keyword wins, so the more
 * specific vocabulary sits above the more general.
 */
const CATEGORY_KEYWORDS: { category: EventCategory; keywords: string[] }[] = [
  {
    category: "training",
    keywords: ["training", "workshop", "seminar", "audit", "certification", "capacity", "course"],
  },
  {
    category: "cultural",
    keywords: ["festival", "expo", "celebration", "opening", "season", "cultural", "mela", "jatra", "fair"],
  },
  {
    category: "networking",
    keywords: ["meeting", "meet", "agm", "assembly", "networking", "dinner", "summit", "forum", "conference"],
  },
];

/** Derives a display category from an event's English title. */
export function categoryOf(event: ApiEvent): EventCategory {
  const title = event.titleEn.toLowerCase();
  const hit = CATEGORY_KEYWORDS.find((entry) =>
    entry.keywords.some((keyword) => title.includes(keyword))
  );
  // Anything unrecognised reads as a gathering, which is what `networking` covers.
  return hit?.category ?? "networking";
}

// Photography: reuses the Unsplash IDs already vetted elsewhere in the project,
// so every image is known to resolve. Grouped so the mood roughly suits the
// category — replace with real event photography via an `images` field.
const CATEGORY_IMAGES: Record<EventCategory, string[]> = {
  training: [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&auto=format&fit=crop&q=80",
  ],
  cultural: [
    "https://images.unsplash.com/photo-1626197031507-c17099753214?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80",
  ],
  networking: [
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&auto=format&fit=crop&q=80",
  ],
};

/** Stable small hash of a document id, so an event keeps the same photograph. */
function hash(value: string): number {
  let total = 0;
  for (let i = 0; i < value.length; i += 1) total += value.charCodeAt(i);
  return total;
}

export function imageFor(event: ApiEvent): string {
  const pool = CATEGORY_IMAGES[categoryOf(event)];
  return pool[hash(event._id) % pool.length];
}

/**
 * Maps the app's language code to a BCP-47 tag Intl understands. The i18n
 * config uses "np", which is not the Nepali language subtag — that is "ne" —
 * so it has to be translated or Intl silently falls back to the default locale.
 */
export function intlLocale(language: string): string {
  return language.startsWith("np") || language.startsWith("ne") ? "ne-NP" : "en-GB";
}

/** An event counts as upcoming until the moment it finishes. */
export function isUpcoming(event: ApiEvent, now: Date = new Date()): boolean {
  return new Date(event.endDate).getTime() >= now.getTime();
}

/** Upcoming events only, soonest first. */
export function upcomingEvents(events: ApiEvent[], now: Date = new Date()): ApiEvent[] {
  return events
    .filter((event) => isUpcoming(event, now))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

/** Past events only, most recent first. */
export function pastEvents(events: ApiEvent[], now: Date = new Date()): ApiEvent[] {
  return events
    .filter((event) => !isUpcoming(event, now))
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}

/** Day number and short month for the date badge, e.g. `{ day: "17", month: "Oct" }`. */
export function dateBadge(event: ApiEvent, language: string): { day: string; month: string } {
  const date = new Date(event.startDate);
  const locale = intlLocale(language);
  return {
    day: new Intl.DateTimeFormat(locale, { day: "numeric", timeZone: NEPAL_TIME_ZONE }).format(date),
    month: new Intl.DateTimeFormat(locale, { month: "short", timeZone: NEPAL_TIME_ZONE }).format(date),
  };
}

/**
 * Human date range, collapsing whatever the two dates share:
 *   same day    -> "12 December 2026"
 *   same month  -> "17 – 19 October 2026"
 *   same year   -> "28 October – 3 November 2026"
 *   otherwise   -> "28 December 2026 – 3 January 2027"
 *
 * `formatRange` does the collapsing per locale, which matters because Nepali
 * orders the parts year-month-day rather than day-month-year — assembling the
 * range by hand produces the wrong reading order in one language or the other.
 */
export function formatDateRange(event: ApiEvent, language: string): string {
  const formatter = new Intl.DateTimeFormat(intlLocale(language), {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: NEPAL_TIME_ZONE,
  });

  const start = new Date(event.startDate);
  const end = new Date(event.endDate);

  // formatRange throws if the range runs backwards, which bad data can do.
  if (end.getTime() < start.getTime()) return formatter.format(start);

  return formatter.formatRange(start, end);
}

/**
 * Start and end clock times in Nepal time, e.g. "09:30 – 16:30".
 *
 * Deliberately not `formatRange`: for an event spanning several days that
 * helpfully expands each side to a full date, which is already covered by
 * `formatDateRange` sitting next to it.
 */
export function formatTimeRange(event: ApiEvent, language: string): string {
  const formatter = new Intl.DateTimeFormat(intlLocale(language), {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: NEPAL_TIME_ZONE,
  });
  return `${formatter.format(new Date(event.startDate))} – ${formatter.format(new Date(event.endDate))}`;
}

/** Title in the active language, falling back to English if a translation is blank. */
export function titleFor(event: ApiEvent, language: string): string {
  const wantsNepali = intlLocale(language) === "ne-NP";
  return (wantsNepali ? event.titleNp : event.titleEn) || event.titleEn;
}

/** Description in the active language, falling back to English if blank. */
export function descriptionFor(event: ApiEvent, language: string): string {
  const wantsNepali = intlLocale(language) === "ne-NP";
  return (wantsNepali ? event.descriptionNp : event.descriptionEn) || event.descriptionEn;
}
