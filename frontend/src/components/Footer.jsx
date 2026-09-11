import { Link } from "react-router-dom";
import { MdHotel, MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-primary-600 text-white rounded-lg p-2">
                <MdHotel size={22} />
              </div>
              <div>
                <p className="font-bold text-white text-base leading-none">
                  HAN Sudurpashchim
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Province No. 7</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-5">
              Hotel Association of Nepal — Sudurpashchim Province represents
              and promotes the hospitality industry across all eight districts
              of Province No. 7.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <FiFacebook size={18} />, href: "#" },
                { icon: <FiTwitter size={18} />, href: "#" },
                { icon: <FiInstagram size={18} />, href: "#" },
                { icon: <FiYoutube size={18} />, href: "#" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="bg-gray-700 hover:bg-primary-600 text-gray-300 hover:text-white p-2 rounded-lg transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Member Hotels", to: "/membership" },
                { label: "Contact Us", to: "/contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="hover:text-primary-400 transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Districts */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">
              Districts Covered
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                "Kailali",
                "Kanchanpur",
                "Doti",
                "Achham",
                "Dadeldhura",
                "Baitadi",
                "Darchula",
                "Bajhang",
              ].map((d) => (
                <li key={d} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MdLocationOn className="text-primary-400 mt-0.5 flex-shrink-0" size={18} />
                <span className="text-gray-400">
                  Dhangadhi-4, Kailali<br />
                  Sudurpashchim Province, Nepal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MdPhone className="text-primary-400 flex-shrink-0" size={18} />
                <a href="tel:+977091521000" className="text-gray-400 hover:text-primary-400 transition-colors">
                  +977-091-521000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MdEmail className="text-primary-400 flex-shrink-0" size={18} />
                <a href="mailto:info@hansudurpashchim.org.np" className="text-gray-400 hover:text-primary-400 transition-colors">
                  info@hansudurpashchim.org.np
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Hotel Association of Nepal —
            Sudurpashchim Province. All rights reserved.
          </p>
          <p>
            Registered under Tourism Act, Government of Nepal
          </p>
        </div>
      </div>
    </footer>
  );
}
