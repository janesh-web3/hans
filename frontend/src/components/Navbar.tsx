import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiArrowRight, FiPhone, FiMail } from "react-icons/fi";
import { SUDURPASHCHIM_DISTRICTS } from "@/constants/districts";
import { HOTEL_CATEGORIES, ALL_CATEGORIES } from "@/constants/hotelCategories";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About Us" },
  { to: "/events", label: "Events" },
  { to: "/membership", label: "Membership" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const megaWrapRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  /**
   * Publish the real header height as --nav-height, used as the page's
   * scroll-padding so anchor targets land below this header rather than
   * underneath it. (Heroes no longer subtract it — `.hero-frame` is a flat
   * 70vh, which leaves room for this header inside one screen.)
   *
   * Measured rather than hardcoded: the two bars are 36px and 64px but each
   * carries a 1px bottom border, and the total shifts again if a bar is
   * hidden at a breakpoint or the font renders taller. A ResizeObserver keeps
   * it correct through every one of those.
   */
  useLayoutEffect(() => {
    const el = barsRef.current;
    if (!el) return;

    const apply = () => {
      document.documentElement.style.setProperty("--nav-height", `${el.offsetHeight}px`);
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
    const fn = (e: MouseEvent) => {
      if (megaWrapRef.current && !megaWrapRef.current.contains(e.target as Node))
        setMegaOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const go = (path: string) => {
    setMegaOpen(false);
    setMenuOpen(false);
    setMobileSubOpen(false);
    navigate(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-200 ${scrolled ? "shadow-md" : ""}`}
    >

      {/* The measured region: the two permanent bars only. The mobile drawer
          below is deliberately outside it, so opening the menu does not
          change --nav-height and resize every hero on the page. */}
      <div ref={barsRef}>

      {/* ── Utility bar ─────────────────────────────────────────────────── */}
      <div className="border-b border-border bg-background">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
          {/* Truncates rather than wrapping — wrapping would overflow the
              fixed 36px bar on narrow phones and throw off the header height. */}
          <span className="min-w-0 truncate text-[11px] font-medium tracking-wide text-foreground-secondary">
            Hotel Association of Nepal — Sudurpashchim Province (Province No. 7)
          </span>
          <div className="hidden sm:flex items-center gap-5">
            <a href="tel:+977091521000"
               className="flex items-center gap-1.5 text-[11px] text-foreground-secondary hover:text-accent transition-colors">
              <FiPhone size={11} /> +977-091-521000
            </a>
            <a href="mailto:info@hansudurpashchim.org.np"
               className="flex items-center gap-1.5 text-[11px] text-foreground-secondary hover:text-accent transition-colors">
              <FiMail size={11} /> info@hansudurpashchim.org.np
            </a>
          </div>
        </div>
      </div>

      {/* ── Main nav bar ─────────────────────────────────────────────────── */}
      <div className="bg-background border-b border-border">
        <nav className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-8">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <img src="/logo.png" alt="HANS" className="h-10 w-auto object-contain" />
              <span className="font-serif text-xl font-bold leading-none tracking-tight text-foreground">
                HANS
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-0 flex-1 h-full">
              {NAV_ITEMS.map(({ to, label, end }) => (
                <NavLink
                  key={to} to={to} end={end}
                  className={({ isActive }) =>
                    `relative flex items-center h-full px-4 text-sm font-semibold transition-colors duration-150
                     after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-colors
                     ${isActive
                       ? "text-accent after:bg-accent"
                       : "text-foreground-secondary hover:text-accent after:bg-transparent hover:after:bg-border-strong"
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
                      ? "text-accent after:bg-accent"
                      : "text-foreground-secondary hover:text-accent after:bg-transparent hover:after:bg-border-strong"
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
                      className="absolute left-0 top-full z-50 w-[580px] mt-2
                        bg-background-card
                        border border-border
                        rounded-xl shadow-xl overflow-hidden"
                    >
                      {/* Dropdown header */}
                      <div className="border-b border-border bg-muted px-6 py-4 flex items-center justify-between">
                        <div>
                          <p className="text-foreground font-bold text-sm">Member Hotels Directory</p>
                          <p className="text-foreground-secondary text-xs mt-0.5">All 8 districts · Province No. 7</p>
                        </div>
                        <button
                          onClick={() => go("/directory")}
                          className="flex items-center gap-1.5 bg-accent text-accent-foreground text-xs font-bold px-4 py-2 rounded-lg hover:bg-accent-vivid transition-colors"
                        >
                          View All <FiArrowRight size={11} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-0 divide-x divide-border">
                        {/* By Category */}
                        <div className="p-5">
                          <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest mb-3">
                            By Category
                          </p>
                          <div className="space-y-0.5">
                            {[ALL_CATEGORIES, ...HOTEL_CATEGORIES].map((cat) => (
                              <button
                                key={cat}
                                onClick={() => go(cat === ALL_CATEGORIES ? "/directory" : `/directory?category=${encodeURIComponent(cat)}`)}
                                className="w-full text-left px-3 py-2 text-sm rounded-md
                                  text-foreground-secondary
                                  hover:bg-muted
                                  hover:text-accent
                                  transition-colors"
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* By District */}
                        <div className="p-5">
                          <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest mb-3">
                            By District
                          </p>
                          <div className="space-y-0.5">
                            {SUDURPASHCHIM_DISTRICTS.map((d) => (
                              <button
                                key={d}
                                onClick={() => go(`/directory?district=${encodeURIComponent(d)}`)}
                                className="w-full text-left px-3 py-2 text-sm rounded-md
                                  text-foreground-secondary
                                  hover:bg-muted
                                  hover:text-accent
                                  transition-colors truncate"
                              >
                                {d}
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

            {/* Right: language + theme toggle + CTA */}
            <div className="hidden lg:flex items-center gap-3 ml-auto">
              <LanguageToggle />
              <ThemeToggle />
              <Link to="/contact" className="btn-primary text-xs px-5 py-2.5">
                Join the Association <FiArrowRight size={12} />
              </Link>
            </div>

            {/* Mobile: language + theme + burger */}
            <div className="lg:hidden ml-auto flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
              <button
                className="w-9 h-9 flex items-center justify-center rounded-lg
                  text-foreground-secondary hover:text-accent
                  transition-colors"
                onClick={() => setMenuOpen((o) => !o)}
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

      </div>
      {/* ── end measured region ───────────────────────────────────────────── */}

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-background-card border-b border-border"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_ITEMS.map(({ to, label, end }) => (
                <NavLink
                  key={to} to={to} end={end}
                  className={({ isActive }) =>
                    `block py-3 px-4 text-sm font-semibold border-l-4 rounded-r-lg transition-colors
                     ${isActive
                       ? "border-accent text-accent bg-muted"
                       : "border-transparent text-foreground-secondary hover:border-accent hover:text-accent"
                     }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              {/* Membership accordion */}
              <div className="border-l-4 border-transparent">
                <button
                  onClick={() => setMobileSubOpen((o) => !o)}
                  className={`w-full flex items-center justify-between py-3 px-4 text-sm font-semibold rounded-r-lg transition-colors
                    ${mobileSubOpen
                      ? "text-accent"
                      : "text-foreground-secondary"
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
                      className="overflow-hidden bg-muted border-t border-border rounded-lg"
                    >
                      <button
                        onClick={() => go("/directory")}
                        className="w-full flex items-center gap-2 px-5 py-3
                          bg-accent text-accent-foreground text-sm font-semibold"
                      >
                        View All Member Hotels
                        <FiArrowRight className="ml-auto" size={13} />
                      </button>

                      <div className="p-4 grid grid-cols-2 gap-4 max-h-[45vh] overflow-y-auto">
                        <div>
                          <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest mb-2">Category</p>
                          {HOTEL_CATEGORIES.map((cat) => (
                            <button key={cat} onClick={() => go(`/directory?category=${encodeURIComponent(cat)}`)}
                              className="block w-full text-left py-1.5 text-sm text-foreground-secondary hover:text-accent transition-colors">
                              {cat}
                            </button>
                          ))}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest mb-2">District</p>
                          {SUDURPASHCHIM_DISTRICTS.map((d) => (
                            <button key={d} onClick={() => go(`/directory?district=${encodeURIComponent(d)}`)}
                              className="block w-full text-left py-1.5 text-sm text-foreground-secondary hover:text-accent transition-colors truncate">
                              {d}
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
