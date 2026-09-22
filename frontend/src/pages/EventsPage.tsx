import EventsHero from "@/components/events/EventsHero";
import FeaturedEvents from "@/components/events/FeaturedEvents";

/**
 * Events page for the Hotel Association of Nepal, Sudurpashchim Province.
 *
 * Composed of self-contained sections living in `src/components/events/`. This
 * file sets only the running order and the page background; each section owns
 * its own copy, data fetching and scroll animation.
 *
 * Still to come, in this order below FeaturedEvents: EventsList (filterable
 * calendar), PastEventsGallery, HostEventCTA, EventsNewsletter.
 */
export default function EventsPage() {
  return (
    <main className="bg-background">
      <EventsHero />
      <FeaturedEvents />
    </main>
  );
}
