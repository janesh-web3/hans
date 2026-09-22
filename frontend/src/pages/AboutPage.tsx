import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight } from "react-icons/fi";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SUDURPASHCHIM_DISTRICTS, DISTRICT_INFO } from "@/constants/districts";

interface TeamMember {
  name: string;
  role: string;
  district: string;
  initials: string;
}

const team: TeamMember[] = [
  { name: "Mr. Ram Bahadur Bista", role: "President", district: "Kailali", initials: "RB" },
  { name: "Mrs. Sita Devi Chand", role: "Vice President", district: "Kanchanpur", initials: "SD" },
  { name: "Mr. Hari Prasad Joshi", role: "General Secretary", district: "Doti", initials: "HP" },
  { name: "Mr. Gopal Singh Dhami", role: "Treasurer", district: "Dadeldhura", initials: "GS" },
  { name: "Mrs. Kamla Buda", role: "Joint Secretary", district: "Achham", initials: "KB" },
  { name: "Mr. Surya Bahadur Rokaya", role: "Exec. Member", district: "Bajhang", initials: "SR" },
  { name: "Mr. Dhan Bahadur Karki", role: "Exec. Member", district: "Baitadi", initials: "DK" },
  { name: "Mrs. Mina Rawal", role: "Exec. Member", district: "Bajura", initials: "MR" },
];

interface TimelineEntry {
  year: string;
  event: string;
  desc: string;
}

export default function AboutPage() {
  const { t } = useTranslation();

  const missionPoints = t("about.missionVision.mission.points", { returnObjects: true }) as string[];
  const visionPoints = t("about.missionVision.vision.points", { returnObjects: true }) as string[];
  const timeline = t("about.history.timeline", { returnObjects: true }) as TimelineEntry[];

  return (
    <div className="bg-white dark:bg-dark-950">
      <PageHero
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&auto=format&fit=crop&q=75"
        badge={t("about.hero.badge")}
        title={t("about.hero.title")}
        subtitle={t("about.hero.subtitle")}
      />

      {/* ── Mission & Vision ─────────────────────────────────────────────── */}
      <section className="section-pad bg-white dark:bg-dark-900 border-b border-surface-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <Reveal className="max-w-xl mb-12">
            <span className="overline mb-3">{t("about.missionVision.label")}</span>
            <h2 className="section-heading">{t("about.missionVision.title")}</h2>
          </Reveal>

          <RevealGroup className="grid md:grid-cols-2 gap-6">

            {/* Mission */}
            <RevealItem>
              <Card className="p-10 rounded-xl border-t-4 border-t-primary-600 h-full">
                <h3 className="text-surface-900 dark:text-white font-bold text-xl mb-4">
                  {t("about.missionVision.mission.title")}
                </h3>
                <p className="text-surface-600 dark:text-dark-400 text-sm leading-relaxed mb-6">
                  {t("about.missionVision.mission.body")}
                </p>
                <ul className="space-y-3">
                  {missionPoints.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-surface-600 dark:text-dark-400">
                      <span className="w-[3px] h-4 bg-primary-500 flex-shrink-0 mt-0.5 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </RevealItem>

            {/* Vision */}
            <RevealItem>
              <Card className="p-10 rounded-xl border-t-4 border-t-gold-500 h-full">
                <h3 className="text-surface-900 dark:text-white font-bold text-xl mb-4">
                  {t("about.missionVision.vision.title")}
                </h3>
                <p className="text-surface-600 dark:text-dark-400 text-sm leading-relaxed mb-6">
                  {t("about.missionVision.vision.body")}
                </p>
                <ul className="space-y-3">
                  {visionPoints.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-surface-600 dark:text-dark-400">
                      <span className="w-[3px] h-4 bg-gold-500 flex-shrink-0 mt-0.5 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </RevealItem>

          </RevealGroup>
        </div>
      </section>

      {/* ── History & Milestones ─────────────────────────────────────────── */}
      <section className="section-pad bg-surface-50 dark:bg-dark-950 border-b border-surface-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-[380px_1fr] gap-16">

            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <span className="overline mb-3">{t("about.history.label")}</span>
              <h2 className="section-heading">{t("about.history.title")}</h2>
              <p className="section-body">{t("about.history.subtitle")}</p>
            </Reveal>

            <div className="relative">
              <div className="absolute left-[18px] top-0 bottom-0 w-px bg-surface-200 dark:bg-dark-700" />

              <RevealGroup className="space-y-0">
                {timeline.map((item, i) => (
                  <RevealItem key={item.year} className="flex gap-8 pb-10 last:pb-0">
                    <div className="relative flex-shrink-0 mt-1">
                      <div
                        className={`w-9 h-9 rounded-full bg-white dark:bg-dark-950 border-2 flex items-center justify-center z-10 relative ${
                          i === timeline.length - 1 ? "border-gold-500" : "border-primary-500"
                        }`}
                      >
                        <span
                          className={`text-[10px] font-bold ${
                            i === timeline.length - 1
                              ? "text-gold-600 dark:text-gold-400"
                              : "text-primary-600 dark:text-primary-400"
                          }`}
                        >
                          {item.year.slice(2)}
                        </span>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="text-xs font-bold text-primary-600 dark:text-primary-500 uppercase tracking-widest mb-1">
                        {item.year}
                      </p>
                      <h3 className="text-surface-900 dark:text-white font-bold text-base mb-1.5">
                        {item.event}
                      </h3>
                      <p className="text-surface-500 dark:text-dark-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* ── Executive Committee ──────────────────────────────────────────── */}
      <section className="section-pad bg-white dark:bg-dark-900 border-b border-surface-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <Reveal className="max-w-xl mb-12">
            <span className="overline mb-3">{t("about.committee.label")}</span>
            <h2 className="section-heading">{t("about.committee.title")}</h2>
            <p className="section-body">{t("about.committee.subtitle")}</p>
          </Reveal>

          <RevealGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {team.map((m) => (
              <RevealItem key={m.name}>
                <Card className="p-6 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full">
                  <div className="w-12 h-12 rounded-full bg-primary-700 ring-2 ring-gold-400/60 ring-offset-2 ring-offset-white dark:ring-offset-dark-900 flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-sm">{m.initials}</span>
                  </div>
                  <p className="text-surface-900 dark:text-white font-bold text-sm leading-snug mb-1">{m.name}</p>
                  <p className="text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-wide mb-1">
                    {t(`about.committee.roles.${m.role}`)}
                  </p>
                  <p className="text-surface-400 dark:text-dark-500 text-xs">{m.district}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Districts ────────────────────────────────────────────────────── */}
      <section className="section-pad bg-surface-50 dark:bg-dark-950 border-b border-surface-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <Reveal className="max-w-xl mb-12">
            <span className="overline mb-3">{t("about.districts.label")}</span>
            <h2 className="section-heading">{t("about.districts.title")}</h2>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SUDURPASHCHIM_DISTRICTS.map((name, i) => (
              <RevealItem key={name}>
                <Card className="p-6 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full">
                  <p className="text-3xl font-bold text-surface-200 dark:text-dark-700 leading-none mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-surface-900 dark:text-white font-bold text-base mb-1">{name}</h3>
                  <p className="text-surface-400 dark:text-dark-500 text-xs font-medium mb-2">{DISTRICT_INFO[name].hq}</p>
                  <p className="text-surface-500 dark:text-dark-400 text-sm leading-relaxed">{DISTRICT_INFO[name].knownFor}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-primary-800 dark:bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <Reveal className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <span className="overline-light block mb-4">
                {t("about.cta.label")}
              </span>
              <h2
                className="font-serif text-white font-bold leading-tight mb-4"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em" }}
              >
                {t("about.cta.title")}
              </h2>
              <p className="text-white/70 text-base leading-relaxed max-w-xl">{t("about.cta.body")}</p>
            </div>
            <div className="flex flex-wrap gap-4 lg:flex-col">
              <Button asChild size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                <Link to="/contact">
                  {t("about.cta.primary")} <FiArrowRight size={14} />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/membership">{t("about.cta.secondary")}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
