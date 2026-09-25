import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Newspaper, Phone, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CONTACT, OFFICE_ADDRESS_LINES, telHref } from "@/constants/contact";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface CardCopy {
  title: string;
  desc: string;
  cta: string;
}

/**
 * Icon and destination per card, in the same order as the copy in the locale
 * files. `external` marks a mailto/tel target, which needs an anchor rather
 * than a router link.
 */
const CARD_TARGETS: { icon: LucideIcon; destination: "general" | "membership" | "press" | "join" | "emergency" }[] = [
  { icon: MessageCircle, destination: "general" },
  { icon: UserPlus, destination: "join" },
  { icon: Newspaper, destination: "press" },
  { icon: Phone, destination: "emergency" },
];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

/** One labelled detail in the left-hand column. */
function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <Icon size={20} strokeWidth={1.25} className="mt-1 shrink-0 text-accent" />
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-foreground-muted">
          {label}
        </p>
        <div className="space-y-0.5 text-foreground-secondary">{children}</div>
      </div>
    </div>
  );
}

/**
 * The office, and the four ways to reach it.
 *
 * Asymmetric by design: the address column takes two of five columns and the
 * card grid takes three, so the editorial block and the grid read as distinct
 * registers rather than a symmetrical two-up.
 */
export default function ContactInfoSplit() {
  const { t } = useTranslation();
  const { data: settings } = useSiteSettings();
  const contact = settings?.contact;
  const addressLines = contact?.addressLines?.filter(Boolean).length ? contact.addressLines : OFFICE_ADDRESS_LINES;
  const officePhone = contact?.officePhone || CONTACT.phone.office;
  const membershipPhone = contact?.membershipPhone || CONTACT.phone.membership;
  const generalEmail = contact?.generalEmail || CONTACT.email.general;
  const membershipEmail = contact?.membershipEmail || CONTACT.email.membership;
  const pressEmail = contact?.pressEmail || CONTACT.email.press;
  const emergencyPhone = contact?.emergencyPhone || CONTACT.phone.emergency;
  const cards = t("contact.infoSplit.cards", { returnObjects: true }) as CardCopy[];

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5 lg:gap-12">

          {/* ── Left: the office ──────────────────────────────────────── */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <span className="mb-4 block text-xs uppercase tracking-widest text-accent">
              {t("contact.infoSplit.eyebrow")}
            </span>
            <h2 className="mb-8 font-serif text-4xl font-bold leading-tight text-foreground">
              {t("contact.infoSplit.title")}
            </h2>

            <div className="space-y-8">
              <DetailRow icon={MapPin} label={t("contact.infoSplit.addressLabel")}>
                {addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </DetailRow>

              <DetailRow icon={Phone} label={t("contact.infoSplit.phoneLabel")}>
                <p>
                  <a
                    href={telHref(officePhone)}
                    className="transition-colors hover:text-accent"
                  >
                    {officePhone}
                  </a>
                  <span className="text-foreground-muted"> · {t("contact.infoSplit.officeLabel")}</span>
                </p>
                <p>
                  <a
                    href={telHref(membershipPhone)}
                    className="transition-colors hover:text-accent"
                  >
                    {membershipPhone}
                  </a>
                  <span className="text-foreground-muted">
                    {" "}
                    · {t("contact.infoSplit.membershipLabel")}
                  </span>
                </p>
              </DetailRow>

              <DetailRow icon={Mail} label={t("contact.infoSplit.emailLabel")}>
                <p>
                  <a
                    href={`mailto:${generalEmail}`}
                    className="break-all transition-colors hover:text-accent"
                  >
                    {generalEmail}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${membershipEmail}`}
                    className="break-all transition-colors hover:text-accent"
                  >
                    {membershipEmail}
                  </a>
                </p>
              </DetailRow>

              <DetailRow icon={Clock} label={t("contact.infoSplit.hoursLabel")}>
                <p>{contact?.officeHoursWeekday || t("contact.infoSplit.hoursWeekday")}</p>
                <p>{contact?.officeHoursWeekend || t("contact.infoSplit.hoursWeekend")}</p>
              </DetailRow>
            </div>
          </motion.div>

          {/* ── Right: the four routes in ─────────────────────────────── */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-3">
            {cards.map((card, i) => {
              const { icon: Icon, destination } = CARD_TARGETS[i % CARD_TARGETS.length];
              const href = destination === "join" ? "/membership" : destination === "emergency" ? telHref(emergencyPhone) : `mailto:${destination === "press" ? pressEmail : destination === "membership" ? membershipEmail : generalEmail}`;
              const external = destination !== "join";

              const body = (
                <>
                  <Icon
                    size={28}
                    strokeWidth={1.25}
                    className="mb-6 text-accent transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="mb-3 font-serif text-xl font-bold text-foreground">
                    {card.title}
                  </h3>
                  <p className="mb-6 flex-1 leading-relaxed text-foreground-secondary">
                    {card.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                    {card.cta}
                    <ArrowRight
                      size={15}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </>
              );

              const className =
                "group flex h-full flex-col rounded-sm border border-border bg-background-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

              return (
                <motion.div
                  key={card.title}
                  {...reveal}
                  transition={{ duration: 0.8, ease: "easeOut", delay: (i % 2) * 0.1 }}
                >
                  {external ? (
                    <a href={href} className={className}>
                      {body}
                    </a>
                  ) : (
                    <Link to={href} className={className}>
                      {body}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
