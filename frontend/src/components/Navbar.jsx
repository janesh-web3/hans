import { useState, useRef, useEffect, useCallback } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiArrowRight } from "react-icons/fi";
import { MdHotel, MdLocationOn, MdCategory, MdStar, MdGroups } from "react-icons/md";
import { categories, locations } from "../data/hotels";
import { megaDropdown } from "../lib/animations";

const categoryIcons = {
  "All Categories": <MdHotel size={14} />,
  "5 Star":         <MdStar  size={14} />,
  "4 Star":         <MdStar  size={14} />,
  "3 Star":         <MdStar  size={14} />,
  "2 Star":         <MdStar  size={14} />,
  "1 Star":         <MdStar  size={14} />,
  Resort:           <MdGroups size={14} />,
  "Guest House":    <MdHotel size={14} />,
  Lodge:            <MdHotel size={14} />,
  Homestay:         <MdGroups size={14} />,
};

export default function Navbar() {
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [megaOpen,      setMegaOpen]      = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const [scrolled,      setScrolled]      = useState(false);

  const openTimer  = useRef(null);
  const closeTimer = useRef(null);
  const headerRef  = useRef(null);
  const navigate   = useNavigate();
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
      if (headerRef.current && !headerRef.current.contains(e.target)) setMegaOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const onEnter = useCallback(() => {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setMegaOpen(true), 60);
  }, []);
  const onLeave = useCallback(() => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 260);
  }, []);

  const go = (path) => { setMegaOpen(false); setMenuOpen(false); setMobileSubOpen(false); navigate(path); };

  const linkCls = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-150 ${isActive ? "text-primary-400" : "text-dark-300 hover:text-white"}`;

  return (
    <header
      ref={headerRef}
      className={`bg-dark-900 sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-dark-800 shadow-[0_1px_10px_rgba(0,0,0,0.4)]" : "border-b border-dark-800/60"
      }`}
    >
      {/* Announcement bar */}
      <div className="bg-primary-700 text-white text-xs py-1 text-center font-medium tracking-wide">
        Hotel Association of Nepal — Sudurpashchim Province (Province No. 7)
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-[52px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 mr-6 group">
            <img src="/logo.png" alt="HAN" className="h-8 w-auto object-contain" />
            <div className="hidden sm:block leading-tight">
              <p className="font-bold text-white text-[13px] leading-none tracking-tight">HAN Sudurpashchim</p>
              <p className="text-[10px] text-dark-500 mt-0.5">Province No. 7 · Nepal</p>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {[{ to: "/", label: "Home", end: true }, { to: "/about", label: "About" }].map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={linkCls}>
                {({ isActive }) => (
                  <span className="relative px-3 py-1.5 rounded-lg hover:bg-dark-800 transition-colors block">
                    {label}
                    {isActive && <motion.span layoutId="nav-bar" className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary-500" />}
                  </span>
                )}
              </NavLink>
            ))}

            {/* Membership mega */}
            <div onMouseEnter={onEnter} onMouseLeave={onLeave} className="relative">
              <button
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                className={`relative text-sm font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-dark-800 transition-colors ${megaOpen ? "text-primary-400" : "text-dark-300 hover:text-white"}`}
              >
                Membership
                <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.18 }}>
                  <FiChevronDown size={13} />
                </motion.span>
                {megaOpen && <motion.span layoutId="nav-bar" className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary-500" />}
              </button>
            </div>

            {[{ to: "/contact", label: "Contact" }].map(({ to, label }) => (
              <NavLink key={to} to={to} className={linkCls}>
                {({ isActive }) => (
                  <span className="relative px-3 py-1.5 rounded-lg hover:bg-dark-800 transition-colors block">
                    {label}
                    {isActive && <motion.span layoutId="nav-bar" className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary-500" />}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Join Us */}
          <div className="hidden lg:flex ml-auto">
            <Link to="/contact" className="btn-primary">
              Join Us <FiArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile burger */}
          <button className="lg:hidden ml-auto w-9 h-9 flex items-center justify-center rounded-lg text-dark-400 hover:text-white hover:bg-dark-800 transition-colors"
            onClick={() => setMenuOpen(o => !o)}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={menuOpen ? "x" : "m"} initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.12 }}>
                {menuOpen ? <FiX size={19} /> : <FiMenu size={19} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mega dropdown — full width under header */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            variants={megaDropdown} initial="hidden" animate="visible" exit="exit"
            onMouseEnter={onEnter} onMouseLeave={onLeave}
            className="hidden lg:block absolute left-0 right-0 top-full z-40 bg-dark-900 border-t border-b border-dark-800"
          >
            <div className="max-w-5xl mx-auto px-6 py-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="HAN" className="h-7 w-auto object-contain" />
                  <div>
                    <p className="text-white font-bold text-sm">Member Hotels Directory</p>
                    <p className="text-dark-500 text-xs mt-0.5">Province No. 7 · All 8 districts</p>
                  </div>
                </div>
                <button onClick={() => go("/membership")} className="btn-primary text-xs px-3 py-1.5">
                  View All <FiArrowRight size={11} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* By Category */}
                <div>
                  <p className="flex items-center gap-1.5 text-[11px] font-bold text-dark-500 uppercase tracking-wider mb-2.5">
                    <MdCategory size={12} className="text-primary-500" /> By Category
                  </p>
                  <div className="grid grid-cols-2 gap-0.5">
                    {categories.map(cat => (
                      <button key={cat} onClick={() => go(cat === "All Categories" ? "/membership" : `/membership?category=${encodeURIComponent(cat)}`)}
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800 transition-colors text-left group">
                        <span className="w-5 h-5 flex items-center justify-center rounded-md bg-dark-800 group-hover:bg-dark-700 text-dark-500 group-hover:text-primary-400 flex-shrink-0 transition-colors">
                          {categoryIcons[cat]}
                        </span>
                        <span className="text-xs font-medium">{cat}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* By Location */}
                <div>
                  <p className="flex items-center gap-1.5 text-[11px] font-bold text-dark-500 uppercase tracking-wider mb-2.5">
                    <MdLocationOn size={12} className="text-secondary-500" /> By Location
                  </p>
                  <div className="grid grid-cols-2 gap-0.5">
                    {locations.map(loc => (
                      <button key={loc} onClick={() => go(loc === "All Locations" ? "/membership" : `/membership?location=${encodeURIComponent(loc)}`)}
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800 transition-colors text-left group">
                        <MdLocationOn size={12} className="text-dark-600 group-hover:text-secondary-400 flex-shrink-0 transition-colors" />
                        <span className="text-xs font-medium truncate">{loc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-dark-800 bg-dark-900">
            <div className="px-4 pt-3 pb-4 space-y-1">
              {[{ to: "/", l: "Home", end: true }, { to: "/about", l: "About" }, { to: "/contact", l: "Contact" }].map(({ to, l, end }) => (
                <NavLink key={to} to={to} end={end}
                  className={({ isActive }) => `block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-dark-800 text-primary-400" : "text-dark-300 hover:bg-dark-800 hover:text-white"}`}>
                  {l}
                </NavLink>
              ))}

              {/* Membership accordion */}
              <div className="rounded-lg border border-dark-800 overflow-hidden">
                <button onClick={() => setMobileSubOpen(o => !o)}
                  className={`w-full flex items-center justify-between py-2.5 px-3 text-sm font-medium transition-colors ${mobileSubOpen ? "bg-dark-800 text-primary-400" : "text-dark-300 hover:bg-dark-800 hover:text-white"}`}>
                  <span className="flex items-center gap-2"><MdHotel size={14} />Membership</span>
                  <motion.span animate={{ rotate: mobileSubOpen ? 180 : 0 }} transition={{ duration: 0.18 }}>
                    <FiChevronDown size={14} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileSubOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-dark-800">
                      <button onClick={() => go("/membership")} className="w-full flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold">
                        <MdHotel size={14} /> View All Member Hotels <FiArrowRight className="ml-auto" size={12} />
                      </button>
                      <div className="p-3 space-y-3 max-h-[50vh] overflow-y-auto">
                        <div>
                          <p className="text-[11px] font-bold text-dark-500 uppercase tracking-wider mb-1.5 flex items-center gap-1"><MdCategory size={11} />By Category</p>
                          <div className="grid grid-cols-2 gap-1">
                            {categories.slice(1).map(cat => (
                              <button key={cat} onClick={() => go(`/membership?category=${encodeURIComponent(cat)}`)}
                                className="flex items-center gap-1.5 text-xs text-dark-400 hover:text-primary-400 px-2 py-1.5 rounded hover:bg-dark-800 transition-colors">
                                <span className="text-dark-600">{categoryIcons[cat]}</span>{cat}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="h-px bg-dark-800" />
                        <div>
                          <p className="text-[11px] font-bold text-dark-500 uppercase tracking-wider mb-1.5 flex items-center gap-1"><MdLocationOn size={11} />By Location</p>
                          {locations.slice(1).map(loc => (
                            <button key={loc} onClick={() => go(`/membership?location=${encodeURIComponent(loc)}`)}
                              className="w-full flex items-center gap-1.5 text-xs text-dark-400 hover:text-secondary-400 px-2 py-1.5 rounded hover:bg-dark-800 transition-colors">
                              <MdLocationOn size={11} className="text-dark-600 flex-shrink-0" />{loc}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/contact" className="btn-primary w-full justify-center mt-1">
                Join the Association <FiArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
