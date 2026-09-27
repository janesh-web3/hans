import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiArrowRight, FiPhone, FiMail, FiGrid, FiMapPin } from "react-icons/fi";
import { SUDURPASHCHIM_DISTRICTS } from "@/constants/districts";
import { HOTEL_CATEGORIES, ALL_CATEGORIES } from "@/constants/hotelCategories";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { CONTACT, telHref } from "@/constants/contact";
import { useSiteSettings } from "@/hooks/useSiteSettings";

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
  const { data: siteSettings } = useSiteSettings();
  const officePhone = siteSettings?.contact?.officePhone || CONTACT.phone.office;
  const officialEmail = siteSettings?.contact?.generalEmail || CONTACT.email.general;

  /**
   * Publish the real header height as --nav-height, used as the page's
   * scroll-padding so anchor targets land below this header rather than
   * underneath it. Heroes use their own viewport-based heights.
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
      <div className="border-b border-blue-800 bg-blue-700 text-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
          {/* Truncates rather than wrapping — wrapping would overflow the
              fixed 36px bar on narrow phones and throw off the header height. */}
          <span className="min-w-0 truncate text-[11px] font-medium tracking-wide text-white/90">
            Hotel Association of Nepal — Sudurpashchim Province (Province No. 7)
          </span>
          <div className="hidden sm:flex items-center gap-5">
            <a href={telHref(officePhone)}
               className="flex items-center gap-1.5 text-[11px] text-white/90 hover:text-white transition-colors">
              <FiPhone size={11} /> {officePhone}
            </a>
            <a href={`mailto:${officialEmail}`}
               className="flex items-center gap-1.5 text-[11px] text-white/90 hover:text-white transition-colors">
              <FiMail size={11} /> {officialEmail}
            </a>
          </div>
        </div>
      </div>

      {/* ── Main nav bar ─────────────────────────────────────────────────── */}
      <div className="bg-background border-b border-border">
        <nav className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-8">

            {/* Logo */}
            <Link to="/" className="flex flex-shrink-0 items-center gap-3" aria-label="Hotel Association Nepal, Sudurpashchim">
              <img src="/logo.png" alt="" aria-hidden="true" className="h-10 w-auto object-contain" />
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-bold tracking-tight text-foreground sm:text-base">Hotel Association Nepal</span>
                <span className="mt-0.5 text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-300">Sudurpashchim</span>
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
                      className="absolute left-auto right-0 top-full z-50 mt-2 max-h-[min(75vh,640px)]
                        w-[min(600px,calc(100vw-2rem))] overflow-y-auto rounded-xl border border-border
                        bg-background-card shadow-xl"
                    >
                      <div className="flex items-center justify-between gap-4 border-b border-blue-700 bg-blue-800 px-5 py-4 text-white sm:px-6">
                        <div className="min-w-0">
                          <p className="text-sm font-bold">Member Hotels Directory</p>
                          <p className="mt-1 text-xs text-blue-100">Explore stays across all 9 districts of Sudurpashchim.</p>
                        </div>
                        <button
                          onClick={() => go("/directory")}
                          className="flex shrink-0 items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-blue-800 transition hover:bg-blue-50 sm:px-4"
                        >
                          View All <FiArrowRight size={12} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                        <div className="p-4 sm:p-5">
                          <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground-muted">
                            <FiGrid size={13} className="text-blue-700 dark:text-blue-300" /> By Category
                          </p>
                          <div className="space-y-1">
                            {[ALL_CATEGORIES, ...HOTEL_CATEGORIES].map((cat) => (
                              <button
                                key={cat}
                                onClick={() => go(cat === ALL_CATEGORIES ? "/directory" : `/directory?category=${encodeURIComponent(cat)}`)}
                                className="group flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-foreground-secondary transition hover:bg-blue-50 hover:text-blue-800 dark:hover:bg-blue-950/40 dark:hover:text-blue-200"
                              >
                                {cat}
                                <FiArrowRight size={12} className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 sm:p-5">
                          <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground-muted">
                            <FiMapPin size={13} className="text-blue-700 dark:text-blue-300" /> By District
                          </p>
                          <div className="grid grid-cols-2 gap-1.5">
                            {SUDURPASHCHIM_DISTRICTS.map((d) => (
                              <button
                                key={d}
                                onClick={() => go(`/directory?district=${encodeURIComponent(d)}`)}
                                className="truncate rounded-md px-3 py-2 text-left text-sm text-foreground-secondary transition hover:bg-blue-50 hover:text-blue-800 dark:hover:bg-blue-950/40 dark:hover:text-blue-200"
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

                      <div className="grid max-h-[45vh] grid-cols-1 gap-5 overflow-y-auto p-4 sm:grid-cols-2">
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
