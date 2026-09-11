import { useState, useRef, useEffect, useCallback } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiArrowRight } from "react-icons/fi";
import { MdHotel, MdLocationOn, MdCategory, MdStar, MdGroups } from "react-icons/md";
import { categories, locations } from "../data/hotels";
import { megaDropdown } from "../lib/animations";

const categoryIcons = {
  "All Categories": <MdHotel size={15} />,
  "5 Star":         <MdStar  size={15} />,
  "4 Star":         <MdStar  size={15} />,
  "3 Star":         <MdStar  size={15} />,
  "2 Star":         <MdStar  size={15} />,
  "1 Star":         <MdStar  size={15} />,
  Resort:           <MdGroups size={15} />,
  "Guest House":    <MdHotel size={15} />,
  Lodge:            <MdHotel size={15} />,
  Homestay:         <MdGroups size={15} />,
};

export default function Navbar() {
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [megaOpen,      setMegaOpen]      = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const [scrolled,      setScrolled]      = useState(false);

  const openTimerRef  = useRef(null);
  const closeTimerRef = useRef(null);
  // Ref on the HEADER so we can position the panel relative to full width
  const headerRef     = useRef(null);
  const megaBtnRef    = useRef(null);
  const navigate      = useNavigate();
  const { pathname }  = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
    setMobileSubOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega on outside click
  useEffect(() => {
    const handler = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMegaEnter = useCallback(() => {
    clearTimeout(closeTimerRef.current);
    openTimerRef.current = setTimeout(() => setMegaOpen(true), 60);
  }, []);

  const handleMegaLeave = useCallback(() => {
    clearTimeout(openTimerRef.current);
    closeTimerRef.current = setTimeout(() => setMegaOpen(false), 250);
  }, []);

  function handleCategorySelect(cat) {
    setMegaOpen(false); setMenuOpen(false); setMobileSubOpen(false);
    const param = cat === "All Categories" ? "" : `?category=${encodeURIComponent(cat)}`;
    navigate(`/membership${param}`);
  }
  function handleLocationSelect(loc) {
    setMegaOpen(false); setMenuOpen(false); setMobileSubOpen(false);
    const param = loc === "All Locations" ? "" : `?location=${encodeURIComponent(loc)}`;
    navigate(`/membership${param}`);
  }

  const active = "text-primary-600 font-semibold";
  const idle   = "text-gray-600 hover:text-primary-600 font-medium";
  const linkCls = ({ isActive }) =>
    `relative text-sm transition-colors duration-200 ${isActive ? active : idle}`;

  return (
    <header
      ref={headerRef}
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-[0_1px_12px_rgba(0,0,0,0.07)]" : "border-b border-gray-100"
      }`}
    >
      {/* Announcement bar */}
      <div className="bg-primary-700 text-white text-xs py-1 text-center tracking-wide font-medium">
        Hotel Association of Nepal — Sudurpashchim Province (Province No. 7)
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-[52px]">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group mr-6">
            <img
              src="/logo.png"
              alt="HAN Sudurpashchim"
              className="h-8 w-auto object-contain flex-shrink-0"
            />
            <div className="hidden sm:block leading-tight">
              <p className="font-bold text-gray-800 text-[13px] leading-none tracking-tight">HAN Sudurpashchim</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Province No. 7 · Nepal</p>
            </div>
          </Link>

          {/* ── Center links ── */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">

            <NavLink to="/" end className={linkCls}>
              {({ isActive }) => (
                <span className="relative px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors block">
                  Home
                  {isActive && <motion.span layoutId="underline" className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary-500" />}
                </span>
              )}
            </NavLink>

            <NavLink to="/about" className={linkCls}>
              {({ isActive }) => (
                <span className="relative px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors block">
                  About
                  {isActive && <motion.span layoutId="underline" className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary-500" />}
                </span>
              )}
            </NavLink>

            {/* Membership — trigger only, panel is in header */}
            <button
              ref={megaBtnRef}
              onMouseEnter={handleMegaEnter}
              onMouseLeave={handleMegaLeave}
              className={`relative text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors ${megaOpen ? active : idle}`}
              aria-expanded={megaOpen}
            >
              Membership
              <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <FiChevronDown size={13} />
              </motion.span>
              {megaOpen && <motion.span layoutId="underline" className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary-500" />}
            </button>

            <NavLink to="/contact" className={linkCls}>
              {({ isActive }) => (
                <span className="relative px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors block">
                  Contact
                  {isActive && <motion.span layoutId="underline" className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary-500" />}
                </span>
              )}
            </NavLink>
          </div>

          {/* ── Join Us ── */}
          <div className="hidden lg:flex items-center ml-auto">
            <Link to="/contact" className="flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors">
              Join Us <FiArrowRight size={12} />
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="lg:hidden ml-auto w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={menuOpen ? "x" : "m"} initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.15 }}>
                {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mega panel — full-width, centered under entire navbar ── */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            variants={megaDropdown}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ originY: 0 }}
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleMegaLeave}
            className="hidden lg:block absolute left-0 right-0 top-full z-40 border-t border-gray-100 bg-white shadow-2xl"
          >
            <div className="max-w-5xl mx-auto px-6 py-6">
              {/* Header row */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="HAN Sudurpashchim"
                    className="h-9 w-auto object-contain flex-shrink-0"
                  />
                  <div>
                    <p className="font-bold text-gray-800 text-sm leading-none">Member Hotels Directory</p>
                    <p className="text-gray-400 text-xs mt-0.5">Province No. 7 · All 8 districts</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/membership")}
                  className="flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                >
                  View All Hotels <FiArrowRight size={11} />
                </button>
              </div>

              {/* Two columns */}
              <div className="grid grid-cols-2 gap-8">
                {/* By Category */}
                <div>
                  <p className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 pb-2 border-b border-gray-100">
                    <MdCategory size={12} className="text-primary-500" /> By Category
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-primary-50 transition-colors group/c"
                      >
                        <span className="w-6 h-6 rounded-lg bg-gray-100 group-hover/c:bg-primary-100 flex items-center justify-center text-gray-400 group-hover/c:text-primary-600 transition-colors flex-shrink-0">
                          {categoryIcons[cat]}
                        </span>
                        <span className="text-sm font-medium text-gray-700 group-hover/c:text-primary-700 transition-colors">{cat}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* By Location */}
                <div>
                  <p className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 pb-2 border-b border-gray-100">
                    <MdLocationOn size={12} className="text-secondary-500" /> By Location
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleLocationSelect(loc)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-left hover:bg-secondary-50 transition-colors group/l"
                      >
                        <MdLocationOn size={13} className="text-gray-300 group-hover/l:text-secondary-400 flex-shrink-0 transition-colors" />
                        <span className="text-sm font-medium text-gray-700 group-hover/l:text-secondary-700 transition-colors truncate">{loc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-gray-100 bg-white"
          >
            <div className="px-4 pt-3 pb-5 space-y-1">
              {[{ to: "/", label: "Home", end: true }, { to: "/about", label: "About" }, { to: "/contact", label: "Contact" }].map(({ to, label, end }) => (
                <NavLink key={to} to={to} end={end}
                  className={({ isActive }) => `flex items-center py-2.5 px-3.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-50"}`}>
                  {label}
                </NavLink>
              ))}

              <div className="rounded-xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setMobileSubOpen((o) => !o)}
                  className={`w-full flex items-center justify-between py-2.5 px-3.5 text-sm font-medium transition-colors ${mobileSubOpen ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-50"}`}
                >
                  <span className="flex items-center gap-2.5">
                    <MdHotel size={15} className={mobileSubOpen ? "text-primary-500" : "text-gray-400"} />
                    Membership
                  </span>
                  <motion.span animate={{ rotate: mobileSubOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <FiChevronDown size={15} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {mobileSubOpen && (
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden border-t border-gray-100"
                    >
                      <button onClick={() => navigate("/membership")}
                        className="w-full flex items-center gap-2 px-4 py-3 bg-primary-600 text-white text-sm font-semibold">
                        <MdHotel size={15} /> View All Member Hotels
                        <FiArrowRight className="ml-auto" size={13} />
                      </button>
                      <div className="p-4 space-y-4 max-h-[55vh] overflow-y-auto">
                        <div>
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <MdCategory size={11} /> By Category
                          </p>
                          <div className="grid grid-cols-2 gap-1">
                            {categories.slice(1).map((cat) => (
                              <button key={cat} onClick={() => handleCategorySelect(cat)}
                                className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary-600 px-2.5 py-1.5 rounded-lg hover:bg-primary-50 transition-colors">
                                <span className="text-gray-300">{categoryIcons[cat]}</span>{cat}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="h-px bg-gray-100" />
                        <div>
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <MdLocationOn size={11} /> By Location
                          </p>
                          {locations.slice(1).map((loc) => (
                            <button key={loc} onClick={() => handleLocationSelect(loc)}
                              className="w-full flex items-center gap-2 text-xs text-gray-600 hover:text-secondary-600 px-2.5 py-1.5 rounded-lg hover:bg-secondary-50 transition-colors">
                              <MdLocationOn size={11} className="text-gray-300 flex-shrink-0" />{loc}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/contact" className="flex items-center justify-center gap-2 bg-primary-600 text-white text-sm font-semibold py-2.5 px-4 rounded-xl mt-1">
                Join the Association <FiArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
