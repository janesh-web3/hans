import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiArrowRight, FiPhone, FiMail } from "react-icons/fi";
import { categories, locations } from "../data/hotels";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [megaOpen,      setMegaOpen]      = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const [scrolled,      setScrolled]      = useState(false);

  const megaWrapRef = useRef(null);
  const closeTimer  = useRef(null);
  const navigate    = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
    setMobileSubOpen(false);
  }, [pathname]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (megaWrapRef.current && !megaWrapRef.current.contains(e.target))
        setMegaOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const handleMouseEnter = () => { clearTimeout(closeTimer.current); setMegaOpen(true); };
  const handleMouseLeave = () => { closeTimer.current = setTimeout(() => setMegaOpen(false), 150); };

  const go = (path) => {
    setMegaOpen(false); setMenuOpen(false); setMobileSubOpen(false);
    navigate(path);
  };

  return (
    <header className={`sticky top-0 z-50 transition-shadow duration-200 ${scrolled ? "shadow-md" : ""}`}>

      {/* ── Utility bar ─────────────────────────────────────────────────── */}
      <div className="bg-primary-700 dark:bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <span className="text-[11px] font-medium tracking-wide text-white/80">
            Hotel Association of Nepal — Sudurpashchim Province (Province No. 7)
          </span>
          <div className="hidden sm:flex items-center gap-5">
            <a href="tel:+977091521000"
               className="flex items-center gap-1.5 text-[11px] text-white/80 hover:text-white transition-colors">
              <FiPhone size={11} /> +977-091-521000
            </a>
            <a href="mailto:info@hansudurpashchim.org.np"
               className="flex items-center gap-1.5 text-[11px] text-white/80 hover:text-white transition-colors">
              <FiMail size={11} /> info@hansudurpashchim.org.np
            </a>
          </div>
        </div>
      </div>

      {/* ── Main nav bar ─────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-dark-900 border-b-2 border-primary-600">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-8">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <img src="/logo.png" alt="HAN Sudurpashchim" className="h-10 w-auto object-contain" />
              <div className="hidden sm:block">
                <p className="font-bold text-surface-900 dark:text-white text-sm leading-none tracking-tight">
                  HAN Sudurpashchim
                </p>
                <p className="text-[11px] text-surface-500 dark:text-dark-400 mt-0.5 font-medium">
                  Province No. 7 · Nepal
                </p>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-0 flex-1 h-full">
              {[
                { to: "/",       label: "Home",    end: true },
                { to: "/about",  label: "About Us" },
                { to: "/contact",label: "Contact"  },
              ].map(({ to, label, end }) => (
                <NavLink
                  key={to} to={to} end={end}
                  className={({ isActive }) =>
                    `relative flex items-center h-full px-4 text-sm font-semibold transition-colors duration-150
                     after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-colors
                     ${isActive
                       ? "text-primary-700 dark:text-primary-400 after:bg-primary-600"
                       : "text-surface-700 dark:text-dark-300 hover:text-primary-700 dark:hover:text-primary-400 after:bg-transparent hover:after:bg-primary-200 dark:hover:after:bg-primary-900"
                     }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              {/* Membership mega-menu trigger */}
              <div
                ref={megaWrapRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative h-full flex items-center"
              >
                <button
                  className={`relative flex items-center gap-1.5 h-full px-4 text-sm font-semibold transition-colors duration-150
                    after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-colors
                    ${megaOpen
                      ? "text-primary-700 dark:text-primary-400 after:bg-primary-600"
                      : "text-surface-700 dark:text-dark-300 hover:text-primary-700 dark:hover:text-primary-400 after:bg-transparent hover:after:bg-primary-200"
                    }`}
                >
                  Member Hotels
                  <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.18 }}>
                    <FiChevronDown size={13} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.16 }}
                      className="absolute left-0 top-full z-50 w-[580px]
                        bg-white dark:bg-dark-900
                        border border-surface-200 dark:border-dark-700
                        shadow-xl"
                    >
                      <div className="absolute -top-2 left-0 right-0 h-2" />

                      {/* Dropdown header */}
                      <div className="bg-primary-600 px-6 py-4 flex items-center justify-between">
                        <div>
                          <p className="text-white font-bold text-sm">Member Hotels Directory</p>
                          <p className="text-white/70 text-xs mt-0.5">All 8 districts · Province No. 7</p>
                        </div>
                        <button
                          onClick={() => go("/membership")}
                          className="flex items-center gap-1.5 bg-white text-primary-700 text-xs font-bold px-4 py-2 hover:bg-primary-50 transition-colors"
                        >
                          View All <FiArrowRight size={11} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-0 divide-x divide-surface-100 dark:divide-dark-800">
                        {/* By Category */}
                        <div className="p-5">
                          <p className="text-[10px] font-bold text-surface-400 dark:text-dark-500 uppercase tracking-widest mb-3">
                            By Category
                          </p>
                          <div className="space-y-0.5">
                            {categories.map(cat => (
                              <button
                                key={cat}
                                onClick={() => go(cat === "All Categories" ? "/membership" : `/membership?category=${encodeURIComponent(cat)}`)}
                                className="w-full text-left px-3 py-2 text-sm
                                  text-surface-700 dark:text-dark-300
                                  hover:bg-primary-50 dark:hover:bg-primary-950/30
                                  hover:text-primary-700 dark:hover:text-primary-400
                                  transition-colors"
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* By Location */}
                        <div className="p-5">
                          <p className="text-[10px] font-bold text-surface-400 dark:text-dark-500 uppercase tracking-widest mb-3">
                            By District
                          </p>
                          <div className="space-y-0.5">
                            {locations.map(loc => (
                              <button
                                key={loc}
                                onClick={() => go(loc === "All Locations" ? "/membership" : `/membership?location=${encodeURIComponent(loc)}`)}
                                className="w-full text-left px-3 py-2 text-sm
                                  text-surface-700 dark:text-dark-300
                                  hover:bg-primary-50 dark:hover:bg-primary-950/30
                                  hover:text-primary-700 dark:hover:text-primary-400
                                  transition-colors truncate"
                              >
                                {loc}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right: theme toggle + CTA */}
            <div className="hidden lg:flex items-center gap-3 ml-auto">
              <ThemeToggle />
              <Link to="/contact" className="btn-primary text-xs px-5 py-2.5">
                Join the Association <FiArrowRight size={12} />
              </Link>
            </div>

            {/* Mobile: theme + burger */}
            <div className="lg:hidden ml-auto flex items-center gap-2">
              <ThemeToggle />
              <button
                className="w-9 h-9 flex items-center justify-center
                  text-surface-700 dark:text-dark-300 hover:text-primary-700 dark:hover:text-primary-400
                  transition-colors"
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={menuOpen ? "x" : "m"}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.12 }}
                  >
                    {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

          </div>
        </nav>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-white dark:bg-dark-900 border-b border-surface-200 dark:border-dark-800"
          >
            <div className="px-4 py-4 space-y-1">
              {[
                { to: "/",        label: "Home",    end: true },
                { to: "/about",   label: "About Us" },
                { to: "/contact", label: "Contact"  },
              ].map(({ to, label, end }) => (
                <NavLink
                  key={to} to={to} end={end}
                  className={({ isActive }) =>
                    `block py-3 px-4 text-sm font-semibold border-l-4 transition-colors
                     ${isActive
                       ? "border-primary-600 text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/20"
                       : "border-transparent text-surface-700 dark:text-dark-300 hover:border-primary-400 hover:text-primary-700 dark:hover:text-primary-400"
                     }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              {/* Membership accordion */}
              <div className="border-l-4 border-transparent">
                <button
                  onClick={() => setMobileSubOpen(o => !o)}
                  className={`w-full flex items-center justify-between py-3 px-4 text-sm font-semibold transition-colors
                    ${mobileSubOpen
                      ? "text-primary-700 dark:text-primary-400"
                      : "text-surface-700 dark:text-dark-300"
                    }`}
                >
                  Member Hotels
                  <motion.span animate={{ rotate: mobileSubOpen ? 180 : 0 }} transition={{ duration: 0.18 }}>
                    <FiChevronDown size={14} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {mobileSubOpen && (
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-surface-50 dark:bg-dark-800 border-t border-surface-200 dark:border-dark-700"
                    >
                      <button
                        onClick={() => go("/membership")}
                        className="w-full flex items-center gap-2 px-5 py-3
                          bg-primary-600 text-white text-sm font-semibold"
                      >
                        View All Member Hotels
                        <FiArrowRight className="ml-auto" size={13} />
                      </button>

                      <div className="p-4 grid grid-cols-2 gap-4 max-h-[45vh] overflow-y-auto">
                        <div>
                          <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-2">Category</p>
                          {categories.slice(1).map(cat => (
                            <button key={cat} onClick={() => go(`/membership?category=${encodeURIComponent(cat)}`)}
                              className="block w-full text-left py-1.5 text-sm text-surface-700 dark:text-dark-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
                              {cat}
                            </button>
                          ))}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-2">District</p>
                          {locations.slice(1).map(loc => (
                            <button key={loc} onClick={() => go(`/membership?location=${encodeURIComponent(loc)}`)}
                              className="block w-full text-left py-1.5 text-sm text-surface-700 dark:text-dark-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors truncate">
                              {loc}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-3 pb-1">
                <Link to="/contact" className="btn-primary w-full justify-center text-sm">
                  Join the Association <FiArrowRight size={13} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
