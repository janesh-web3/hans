import { Link } from "react-router-dom";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiArrowRight } from "react-icons/fi";
import { SUDURPASHCHIM_DISTRICTS } from "@/constants/districts";

const SOCIAL_LINKS = [
  { Icon: FiFacebook, label: "Facebook" },
  { Icon: FiTwitter, label: "Twitter" },
  { Icon: FiInstagram, label: "Instagram" },
  { Icon: FiYoutube, label: "YouTube" },
];

const QUICK_LINKS = [
  { l: "Home", to: "/" },
  { l: "About Us", to: "/about" },
  { l: "Events", to: "/events" },
  { l: "Member Hotels", to: "/membership" },
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
  return (
    <footer className="border-t border-border bg-background">
      {/* ── Main footer body ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="mb-6 flex items-center gap-3">
              {/* The mark is dark artwork, so it only needs inverting on navy. */}
              <img
                src="/logo.png"
                alt="HAN Sudurpashchim"
                className="h-12 w-auto object-contain dark:brightness-0 dark:invert dark:opacity-90"
              />
              <div>
                <p className="text-sm font-bold leading-none tracking-tight text-foreground">
                  HAN Sudurpashchim
                </p>
                <p className="mt-1 text-xs font-medium text-foreground-muted">
                  Province No. 7 · Nepal
                </p>
              </div>
            </Link>

            <p className="mb-6 text-sm leading-relaxed text-foreground-secondary">
              Hotel Association of Nepal — Sudurpashchim Province. The unified voice of
              hospitality across all eight districts of Province No. 7.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg
                    border border-border text-foreground-muted
                    transition-colors duration-300
                    hover:border-accent hover:text-accent"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-6 border-b border-border pb-3 text-xs font-bold uppercase tracking-[0.18em] text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ l, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="group flex items-center gap-2 text-sm text-foreground-secondary transition-colors hover:text-accent"
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
          </div>

          {/* Districts */}
          <div>
            <h4 className="mb-6 border-b border-border pb-3 text-xs font-bold uppercase tracking-[0.18em] text-foreground">
              Districts Covered
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {SUDURPASHCHIM_DISTRICTS.map((d) => (
                <li key={d} className="flex items-center gap-2 text-sm text-foreground-secondary">
                  <span className="h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 border-b border-border pb-3 text-xs font-bold uppercase tracking-[0.18em] text-foreground">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MdLocationOn className="mt-0.5 flex-shrink-0 text-foreground-muted" size={17} />
                <span className="text-sm leading-relaxed text-foreground-secondary">
                  Dhangadhi-4, Kailali
                  <br />
                  Sudurpashchim Province, Nepal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MdPhone className="flex-shrink-0 text-foreground-muted" size={17} />
                <a
                  href="tel:+977091521000"
                  className="text-sm text-foreground-secondary transition-colors hover:text-accent"
                >
                  +977-091-521000
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MdEmail className="mt-0.5 flex-shrink-0 text-foreground-muted" size={17} />
                <a
                  href="mailto:info@hansudurpashchim.org.np"
                  className="break-all text-sm leading-relaxed text-foreground-secondary transition-colors hover:text-accent"
                >
                  info@hansudurpashchim.org.np
                </a>
              </li>
            </ul>

            {/* The one saturated element in the footer. */}
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5
                  text-xs font-bold text-accent-foreground
                  transition-colors duration-300 hover:bg-accent-vivid"
              >
                Join the Association <FiArrowRight size={11} />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────── */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
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
