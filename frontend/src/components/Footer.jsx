import { Link } from "react-router-dom";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from "react-icons/fi";

const districts = ["Kailali", "Kanchanpur", "Doti", "Achham", "Dadeldhura", "Baitadi", "Darchula", "Bajhang"];

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="HAN Sudurpashchim" className="h-10 w-auto object-contain" />
              <div className="leading-tight">
                <p className="font-bold text-white text-sm leading-none">HAN Sudurpashchim</p>
                <p className="text-xs text-dark-500 mt-0.5">Province No. 7 · Nepal</p>
              </div>
            </Link>
            <p className="text-sm text-dark-500 leading-relaxed mb-5">
              Hotel Association of Nepal — Sudurpashchim Province represents and promotes
              the hospitality industry across all eight districts of Province No. 7.
            </p>
            <div className="flex gap-2">
              {[
                { icon: <FiFacebook size={16} />, href: "#" },
                { icon: <FiTwitter  size={16} />, href: "#" },
                { icon: <FiInstagram size={16} />, href: "#" },
                { icon: <FiYoutube  size={16} />, href: "#" },
              ].map((s, i) => (
                <a key={i} href={s.href}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-dark-800 border border-dark-700 text-dark-400 hover:text-primary-400 hover:border-primary-700 transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[{ l: "Home", to: "/" }, { l: "About Us", to: "/about" }, { l: "Member Hotels", to: "/membership" }, { l: "Contact Us", to: "/contact" }].map(({ l, to }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-dark-500 hover:text-primary-400 transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Districts */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Districts Covered</h4>
            <ul className="space-y-2">
              {districts.map(d => (
                <li key={d} className="flex items-center gap-2 text-sm text-dark-500">
                  <span className="w-1 h-1 rounded-full bg-primary-600 flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-dark-500">
                <MdLocationOn className="text-primary-600 mt-0.5 flex-shrink-0" size={16} />
                <span>Dhangadhi-4, Kailali<br />Sudurpashchim Province, Nepal</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MdPhone className="text-primary-600 flex-shrink-0" size={16} />
                <a href="tel:+977091521000" className="text-sm text-dark-500 hover:text-primary-400 transition-colors">+977-091-521000</a>
              </li>
              <li className="flex items-center gap-2.5">
                <MdEmail className="text-primary-600 flex-shrink-0" size={16} />
                <a href="mailto:info@hansudurpashchim.org.np" className="text-sm text-dark-500 hover:text-primary-400 transition-colors break-all">info@hansudurpashchim.org.np</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-dark-600">
          <p>&copy; {new Date().getFullYear()} Hotel Association of Nepal — Sudurpashchim Province. All rights reserved.</p>
          <p>Registered under Tourism Act, Government of Nepal</p>
        </div>
      </div>
    </footer>
  );
}
