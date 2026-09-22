import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { FiArrowRight, FiMapPin, FiAlertCircle } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";
import { useHotels } from "@/hooks/useHotels";
import SectionDivider from "@/components/SectionDivider";
import StatCounter from "@/components/StatCounter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const YEARS_OF_SERVICE = new Date().getFullYear() - 1998;

export default function HomePage() {
  const { t } = useTranslation();
  const { dark } = useTheme();
  const { data: featuredData, isLoading: featuredLoading, isError: featuredError } = useHotels({ limit: 3 });
  const featured = featuredData?.data ?? [];
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current || !cardRef.current) return;
      gsap.set(textRef.current.children, { opacity: 0, y: 20 });
      gsap.set(cardRef.current, { opacity: 0, x: 20 });
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(textRef.current.children, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 })
        .to(cardRef.current, { opacity: 1, x: 0, duration: 0.5 }, "-=0.4");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const heroStats = [
    { value: 15, suffix: "+", label: t("home.hero.stats.hotels") },
    { value: 8, suffix: "", label: t("home.hero.stats.districts") },
    { value: 500, suffix: "+", label: t("home.hero.stats.rooms") },
    { value: YEARS_OF_SERVICE, suffix: "+", label: t("home.hero.stats.years") },
  ];

  const services = t("home.services.items", { returnObjects: true }) as { title: string; desc: string }[];
  const highlights = t("home.whyVisit.highlights", { returnObjects: true }) as {
    name: string;
    district: string;
    desc: string;
  }[];

  return (
    <div className="bg-white dark:bg-dark-950">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ minHeight: "90vh", display: "flex", alignItems: "center" }}
      >
        {/* Background image placeholder — swap for real Sudurpashchim photography when available */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1800&auto=format&fit=crop&q=80"
            alt="Sudurpashchim Nepal"
            className="w-full h-full object-cover object-[55%_35%]"
            style={{ filter: dark ? "brightness(0.18)" : "brightness(0.45)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: dark
                ? "linear-gradient(105deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 55%, transparent 100%)"
                : "linear-gradient(105deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.40) 55%, transparent 100%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-[1fr_320px] gap-16 items-center">

            {/* Left — editorial headline */}
            <div ref={textRef}>
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-10 h-[3px] bg-primary-500" />
                <span className="text-primary-400 text-xs font-bold uppercase tracking-[0.22em]">
                  {t("home.hero.overline")}
                </span>
              </div>

              <h1
                className="font-serif font-bold text-white leading-none mb-6"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", letterSpacing: "-0.03em" }}
              >
                {t("home.hero.titlePrefix")}{" "}
                <span className="text-primary-400">{t("home.hero.titleHighlight")}</span>
              </h1>

              <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg">
                {t("home.hero.subtitle")}
              </p>

              <div className="flex flex-wrap gap-4 mb-14">
                <Button asChild size="lg">
                  <Link to="/membership">
                    {t("home.hero.ctaPrimary")} <FiArrowRight size={14} />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to="/contact">{t("home.hero.ctaSecondary")}</Link>
                </Button>
              </div>

              {/* Animated stats row */}
              <div className="grid grid-cols-4 gap-0 border-t border-white/20 pt-8 max-w-lg">
                {heroStats.map(({ value, suffix, label }) => (
                  <div key={label} className="pr-6">
                    <StatCounter value={value} suffix={suffix} label={label} variant="light" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right — membership quick info card */}
            <div ref={cardRef} className="hidden lg:block">
              <Card className="rounded-xl border-t-4 border-primary-700 shadow-xl overflow-hidden py-0">
                <div className="bg-primary-800 px-6 py-5 flex items-center gap-3">
                  <img src="/logo.png" alt="HAN" className="h-10 w-auto object-contain brightness-0 invert" />
                  <div>
                    <p className="text-white font-bold text-sm leading-none">{t("home.hero.card.title")}</p>
                    <p className="text-white/60 text-xs mt-1">{t("home.hero.card.subtitle")}</p>
                  </div>
                </div>

                <div className="divide-y divide-surface-100 dark:divide-dark-800">
                  {[
                    { label: t("home.hero.card.rows.hotels"), value: "15+" },
                    { label: t("home.hero.card.rows.districts"), value: "8" },
                    { label: t("home.hero.card.rows.categories"), value: "9" },
                    { label: t("home.hero.card.rows.established"), value: "1998" },
                    { label: t("home.hero.card.rows.events"), value: "12+" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between px-6 py-3.5">
                      <span className="text-sm text-surface-500 dark:text-dark-400">{label}</span>
                      <span className="text-sm font-bold text-surface-900 dark:text-white">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-5 border-t border-surface-100 dark:border-dark-800">
                  <Button asChild className="w-full">
                    <Link to="/contact">
                      {t("home.hero.card.cta")} <FiArrowRight size={13} />
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* Mountain-silhouette motif bridging the hero into the page body */}
      <SectionDivider variant="peaks" from="bg-transparent" to="bg-white dark:bg-dark-900" height={48} />

      {/* ── ABOUT STRIP ──────────────────────────────────────────────────── */}
      <section className="section-pad bg-white dark:bg-dark-900 border-b border-surface-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-start">

            <div>
              <span className="section-label">{t("home.aboutStrip.label")}</span>
              <h2 className="section-heading">
                {t("home.aboutStrip.titleLine1")}<br />{t("home.aboutStrip.titleLine2")}
              </h2>
              <p className="section-body mb-4">{t("home.aboutStrip.body1")}</p>
              <p className="section-body mb-8">{t("home.aboutStrip.body2")}</p>
              <Button asChild variant="ghost" className="text-primary-700 dark:text-primary-400 hover:text-primary-900 px-0 hover:bg-transparent">
                <Link to="/about">
                  {t("home.aboutStrip.cta")} <FiArrowRight size={14} />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-px bg-surface-200 dark:bg-dark-700 border border-surface-200 dark:border-dark-700 rounded-xl overflow-hidden">
              {[
                { label: t("home.aboutStrip.stats.established"), value: "1998" },
                { label: t("home.aboutStrip.stats.districts"), value: "8" },
                { label: t("home.aboutStrip.stats.hotelTypes"), value: "9" },
                { label: t("home.aboutStrip.stats.eventsPerYear"), value: "12+" },
              ].map((item) => (
                <div key={item.label} className="bg-white dark:bg-dark-900 px-8 py-8">
                  <p className="text-4xl font-bold text-primary-700 dark:text-primary-400 leading-none mb-2">
                    {item.value}
                  </p>
                  <p className="text-sm font-semibold text-surface-500 dark:text-dark-400 uppercase tracking-wide">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ───────────────────────────────────────────────────── */}
      <section className="section-pad bg-surface-50 dark:bg-dark-950 border-b border-surface-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-2xl mb-12">
            <span className="section-label">{t("home.services.label")}</span>
            <h2 className="section-heading">{t("home.services.title")}</h2>
            <p className="section-body">{t("home.services.subtitle")}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s) => (
              <Card
                key={s.title}
                className="px-8 py-8 group border-t-4 border-t-transparent hover:border-t-primary-600 rounded-lg transition-colors duration-200"
              >
                <h3 className="text-surface-900 dark:text-white font-bold text-base mb-3">{s.title}</h3>
                <p className="text-surface-500 dark:text-dark-400 text-sm leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED HOTELS ──────────────────────────────────────────────── */}
      <section className="section-pad bg-white dark:bg-dark-900 border-b border-surface-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="section-label">{t("home.featured.label")}</span>
              <h2 className="section-heading mb-0">{t("home.featured.title")}</h2>
            </div>
            <Button asChild variant="ghost" className="hidden sm:inline-flex text-primary-700 dark:text-primary-400 hover:bg-transparent hover:text-primary-900">
              <Link to="/membership">
                {t("home.featured.viewAll")} <FiArrowRight size={14} />
              </Link>
            </Button>
          </div>

          {featuredError && (
            <Alert variant="destructive" className="mb-6">
              <FiAlertCircle className="h-4 w-4" />
              <AlertTitle>Couldn't load featured hotels</AlertTitle>
              <AlertDescription>Please try refreshing the page.</AlertDescription>
            </Alert>
          )}

          {featuredLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-8 rounded-lg space-y-3">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((hotel) => (
                <Card key={hotel._id} className="p-8 rounded-lg hover:shadow-md transition-shadow">
                  <span className="text-[11px] font-bold text-primary-700 dark:text-primary-400 uppercase tracking-widest">
                    {hotel.category}
                  </span>
                  <h3 className="text-surface-900 dark:text-white font-bold text-base mt-4 mb-2 leading-snug">
                    {hotel.name}
                  </h3>
                  <p className="flex items-center gap-1.5 text-surface-400 dark:text-dark-500 text-xs mb-3 font-medium">
                    <FiMapPin size={11} /> {hotel.district} District
                  </p>
                  <p className="text-surface-600 dark:text-dark-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {hotel.description}
                  </p>
                  {hotel.amenities.length > 0 && (
                    <p className="text-surface-400 dark:text-dark-600 text-xs">
                      {hotel.amenities.slice(0, 4).join("  ·  ")}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          )}

          <div className="mt-6 sm:hidden">
            <Button asChild variant="ghost" className="w-full border border-surface-300 dark:border-dark-600">
              <Link to="/membership">
                {t("home.featured.viewAll")} <FiArrowRight size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── WHY VISIT ────────────────────────────────────────────────────── */}
      <section className="section-pad bg-surface-50 dark:bg-dark-950 border-b border-surface-100 dark:border-dark-800 bg-topo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-2xl mb-12">
            <span className="section-label">{t("home.whyVisit.label")}</span>
            <h2 className="section-heading">{t("home.whyVisit.title")}</h2>
            <p className="section-body">{t("home.whyVisit.subtitle")}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((h) => (
              <div key={h.name} className="flex gap-5">
                <div className="w-[3px] flex-shrink-0 bg-primary-500 mt-1 rounded-full" />
                <div>
                  <p className="text-xs font-bold text-primary-700 dark:text-primary-400 uppercase tracking-widest mb-1">
                    {h.district}
                  </p>
                  <h3 className="text-surface-900 dark:text-white font-bold text-base mb-2">{h.name}</h3>
                  <p className="text-surface-500 dark:text-dark-400 text-sm leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-primary-800 dark:bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <span className="block text-primary-300 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                {t("home.cta.label")}
              </span>
              <h2
                className="text-white font-bold leading-tight mb-4"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em" }}
              >
                {t("home.cta.title")}
              </h2>
              <p className="text-white/70 text-base leading-relaxed max-w-xl">{t("home.cta.body")}</p>
            </div>
            <div className="flex flex-wrap gap-4 lg:flex-col lg:items-start">
              <Button asChild size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                <Link to="/contact">
                  {t("home.cta.primary")} <FiArrowRight size={14} />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/about">{t("home.cta.secondary")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
