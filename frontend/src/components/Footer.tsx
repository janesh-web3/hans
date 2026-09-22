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
  { l: "Member Hotels", to: "/membership" },
  { l: "Contact Us", to: "/contact" },
];

export default function Footer() {
  return (
    <footer>

      {/* ── Main footer body — dark green ──────────────────────────────── */}
      <div className="bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <img
                  src="/logo.png"
                  alt="HAN Sudurpashchim"
                  className="h-12 w-auto object-contain brightness-0 invert opacity-90"
                />
                <div>
                  <p className="font-bold text-white text-sm leading-none tracking-tight">
                    HAN Sudurpashchim
                  </p>
                  <p className="text-primary-300 text-xs mt-1 font-medium">
                    Province No. 7 · Nepal
                  </p>
                </div>
              </Link>

              <p className="text-primary-200/70 text-sm leading-relaxed mb-6">
                Hotel Association of Nepal — Sudurpashchim Province. The unified voice of
                hospitality across all eight districts of Province No. 7.
              </p>

              {/* Social icons */}
              <div className="flex gap-2">
                {SOCIAL_LINKS.map(({ Icon, label }) => (
                  <a
                    key={label} href="#" aria-label={label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center
                      border border-primary-700 hover:border-white
                      text-primary-300 hover:text-white
                      transition-colors duration-150"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.18em] mb-6 pb-3 border-b border-primary-700">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {QUICK_LINKS.map(({ l, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="flex items-center gap-2 text-sm text-primary-200/70 hover:text-white transition-colors group"
                    >
                      <FiArrowRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-3 group-hover:ml-0" />
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Districts */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.18em] mb-6 pb-3 border-b border-primary-700">
                Districts Covered
              </h4>
              <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                {SUDURPASHCHIM_DISTRICTS.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-sm text-primary-200/70">
                    <span className="w-1 h-1 rounded-full bg-primary-500 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.18em] mb-6 pb-3 border-b border-primary-700">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MdLocationOn className="text-primary-400 flex-shrink-0 mt-0.5" size={17} />
                  <span className="text-sm text-primary-200/70 leading-relaxed">
                    Dhangadhi-4, Kailali<br />Sudurpashchim Province, Nepal
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <MdPhone className="text-primary-400 flex-shrink-0" size={17} />
                  <a href="tel:+977091521000"
                    className="text-sm text-primary-200/70 hover:text-white transition-colors">
                    +977-091-521000
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MdEmail className="text-primary-400 flex-shrink-0 mt-0.5" size={17} />
                  <a href="mailto:info@hansudurpashchim.org.np"
                    className="text-sm text-primary-200/70 hover:text-white transition-colors break-all leading-relaxed">
                    info@hansudurpashchim.org.np
                  </a>
                </li>
              </ul>

              <div className="mt-6">
                <Link to="/contact" className="inline-flex items-center gap-2
                  bg-primary-700 hover:bg-primary-600 text-white text-xs font-bold
                  px-5 py-2.5 rounded-lg transition-colors">
                  Join the Association <FiArrowRight size={11} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────── */}
      <div className="bg-primary-950 dark:bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4
          flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-primary-300/60 font-medium">
            &copy; {new Date().getFullYear()} Hotel Association of Nepal — Sudurpashchim Province.
            All rights reserved.
          </p>
          <p className="text-xs text-primary-300/60">
            Registered under Tourism Act, Government of Nepal
          </p>
        </div>
      </div>

    </footer>
  );
}
