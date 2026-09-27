import { Link } from "react-router-dom";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { FiFacebook, FiInstagram, FiYoutube, FiArrowRight } from "react-icons/fi";
import { SUDURPASHCHIM_DISTRICTS } from "@/constants/districts";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CONTACT, OFFICE_ADDRESS_LINES, telHref } from "@/constants/contact";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const QUICK_LINKS = [
  { l: "Home", to: "/" },
  { l: "About Us", to: "/about" },
  { l: "Events", to: "/events" },
  { l: "Member Hotels", to: "/directory" },
  { l: "Membership", to: "/membership" },
  { l: "Contact Us", to: "/contact" },
];

/**
 * Site footer.
 *
 * Carries the same background as every page rather than a colour block of its
 * own — a single rule and the section spacing do the separating. The only
 * saturated blue in here is the one call-to-action button.
 */
export default function Footer() {
  const { data: settings } = useSiteSettings();
  const contact = settings?.contact;
  const address = contact?.addressLines?.filter(Boolean).length ? contact.addressLines : OFFICE_ADDRESS_LINES;
  const phone = contact?.officePhone || CONTACT.phone.office;
  const email = contact?.generalEmail || CONTACT.email.general;
  const socialLinks = [
    { Icon: FiFacebook, label: "Facebook", href: contact?.facebookUrl },
    { Icon: FiInstagram, label: "Instagram", href: contact?.instagramUrl },
    { Icon: FiYoutube, label: "YouTube", href: contact?.youtubeUrl },
  ].filter((item) => item.href);

  return (
    <footer className="border-t border-blue-800 bg-blue-900 text-white">
      {/* ── Main footer body ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <RevealGroup className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <RevealItem className="lg:col-span-1">
            <Link to="/" className="mb-6 flex items-center gap-3">
              {/* The mark is dark artwork, so it only needs inverting on navy. */}
              <img
                src="/logo.png"
                alt="HAN Sudurpashchim"
                className="h-12 w-auto object-contain brightness-0 invert opacity-90"
              />
              <div>
                <p className="text-sm font-bold leading-none tracking-tight text-white">
                  HAN Sudurpashchim
                </p>
                <p className="mt-1 text-xs font-medium text-blue-200">
                  Province No. 7 · Nepal
                </p>
              </div>
            </Link>

            <p className="mb-6 text-sm leading-relaxed text-blue-100">
              Hotel Association of Nepal — Sudurpashchim Province. The unified voice of
              hospitality across all nine districts of Sudurpashchim Province.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg
                    border border-blue-700 text-blue-100
                    transition-colors duration-300
                    hover:border-white hover:text-white"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </RevealItem>

          {/* Quick links */}
          <RevealItem>
            <h4 className="mb-6 border-b border-blue-700 pb-3 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ l, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="group flex items-center gap-2 text-sm text-blue-100 transition-colors hover:text-white"
                  >
                    <FiArrowRight
                      size={11}
                      className="-ml-3 opacity-0 transition-opacity group-hover:ml-0 group-hover:opacity-100"
                    />
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </RevealItem>

          {/* Districts */}
          <RevealItem>
            <h4 className="mb-6 border-b border-blue-700 pb-3 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Districts Covered
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {SUDURPASHCHIM_DISTRICTS.map((d) => (
                <li key={d} className="flex items-center gap-2 text-sm text-blue-100">
                  <span className="h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                  {d}
                </li>
              ))}
            </ul>
          </RevealItem>

          {/* Contact */}
          <RevealItem>
            <h4 className="mb-6 border-b border-blue-700 pb-3 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MdLocationOn className="mt-0.5 flex-shrink-0 text-blue-200" size={17} />
                <span className="text-sm leading-relaxed text-blue-100">
                  {address.map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MdPhone className="flex-shrink-0 text-blue-200" size={17} />
                <a
                  href={telHref(phone)}
                  className="text-sm text-blue-100 transition-colors hover:text-white"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MdEmail className="mt-0.5 flex-shrink-0 text-blue-200" size={17} />
                <a
                  href={`mailto:${email}`}
                  className="break-all text-sm leading-relaxed text-blue-100 transition-colors hover:text-white"
                >
                  {email}
                </a>
              </li>
            </ul>

            {/* The one saturated element in the footer. */}
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-2.5
                  text-xs font-bold text-white
                  transition-colors duration-300 hover:bg-sky-400"
              >
                Join the Association <FiArrowRight size={11} />
              </Link>
            </div>
          </RevealItem>

        </RevealGroup>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────── */}
      <div className="border-t border-blue-800 bg-blue-950">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-2 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted">
            &copy; {new Date().getFullYear()} Hotel Association of Nepal — Sudurpashchim Province.
            All rights reserved.
          </p>
          <p className="text-xs text-foreground-muted">
            Registered under Tourism Act, Government of Nepal
          </p>
        </div>
      </div>
    </footer>
  );
}
