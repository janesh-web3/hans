import { MapPin, Sparkles } from "lucide-react";

interface DirectoryHeroProps {
  propertyCount: number | null;
}

export default function DirectoryHero({ propertyCount }: DirectoryHeroProps) {
  return (
    <section className="hero-frame relative flex items-center overflow-hidden border-b border-border bg-[linear-gradient(135deg,#F5F9FC_0%,#E8F4F8_60%,#D8EEF6_100%)] px-4 py-20 dark:bg-[linear-gradient(135deg,#0F172A_0%,#14243B_60%,#1E3A5F_100%)] sm:px-6 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 h-[28rem] w-[28rem] rounded-full border border-sky-500/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-24 h-[22rem] w-[22rem] rounded-full border border-sky-500/10" />
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
          <Sparkles size={14} strokeWidth={1.7} /> Explore &amp; discover
        </div>
        <h1 className="font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Find Your <span className="text-gradient">Perfect Stay</span> in Sudurpashchim
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-foreground-secondary sm:text-lg">
          Discover member hotels, resorts and homestays across the landscapes and communities of western Nepal.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-foreground-muted">
          <span><strong className="font-semibold text-foreground">{propertyCount ?? "—"}</strong> member properties</span>
          <span className="hidden h-1 w-1 rounded-full bg-accent/60 sm:block" />
          <span><strong className="font-semibold text-foreground">8</strong> districts</span>
          <span className="hidden h-1 w-1 rounded-full bg-accent/60 sm:block" />
          <span className="inline-flex items-center gap-1"><MapPin size={14} className="text-accent" /> Sudurpashchim, Nepal</span>
        </div>
      </div>
    </section>
  );
}
