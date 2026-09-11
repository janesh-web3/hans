import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { MdHotel } from "react-icons/md";
import { categories, locations } from "../data/hotels";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const categoryRef = useRef(null);
  const locationRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setLocationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary-600 font-semibold border-b-2 border-primary-600 pb-0.5"
      : "text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200";

  function handleCategorySelect(cat) {
    setCategoryOpen(false);
    setMenuOpen(false);
    const param = cat === "All Categories" ? "" : `?category=${encodeURIComponent(cat)}`;
    navigate(`/membership${param}`);
  }

  function handleLocationSelect(loc) {
    setLocationOpen(false);
    setMenuOpen(false);
    const param = loc === "All Locations" ? "" : `?location=${encodeURIComponent(loc)}`;
    navigate(`/membership${param}`);
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-700 text-white text-xs py-1.5 px-4 text-center">
        Hotel Association of Nepal — Sudurpashchim Province (Province No. 7)
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
            <div className="bg-primary-600 text-white rounded-lg p-2">
              <MdHotel size={22} />
            </div>
            <div className="leading-tight">
              <p className="font-bold text-gray-800 text-sm sm:text-base leading-none">
                HAN Sudurpashchim
              </p>
              <p className="text-xs text-gray-500">Province No. 7</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>

            {/* Members by Category dropdown */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => {
                  setCategoryOpen((o) => !o);
                  setLocationOpen(false);
                }}
                className="flex items-center gap-1 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                By Category <FiChevronDown className={`transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
              </button>
              {categoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Members by Location dropdown */}
            <div className="relative" ref={locationRef}>
              <button
                onClick={() => {
                  setLocationOpen((o) => !o);
                  setCategoryOpen(false);
                }}
                className="flex items-center gap-1 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                By Location <FiChevronDown className={`transition-transform ${locationOpen ? "rotate-180" : ""}`} />
              </button>
              {locationOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 max-h-80 overflow-y-auto">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => handleLocationSelect(loc)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/membership" className={navLinkClass}>
              Members
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
            <Link
              to="/membership"
              className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Join Us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-700 hover:text-primary-600 p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 pt-2 space-y-2 shadow-lg">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block py-2 px-3 rounded-lg font-medium ${isActive ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-50"}`
            }
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block py-2 px-3 rounded-lg font-medium ${isActive ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-50"}`
            }
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>

          {/* Mobile Category */}
          <div>
            <button
              onClick={() => setCategoryOpen((o) => !o)}
              className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              By Category <FiChevronDown className={`transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
            </button>
            {categoryOpen && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-primary-200 pl-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className="w-full text-left py-1.5 text-sm text-gray-600 hover:text-primary-600"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Location */}
          <div>
            <button
              onClick={() => setLocationOpen((o) => !o)}
              className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              By Location <FiChevronDown className={`transition-transform ${locationOpen ? "rotate-180" : ""}`} />
            </button>
            {locationOpen && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-primary-200 pl-3 max-h-48 overflow-y-auto">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handleLocationSelect(loc)}
                    className="w-full text-left py-1.5 text-sm text-gray-600 hover:text-primary-600"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/membership"
            className={({ isActive }) =>
              `block py-2 px-3 rounded-lg font-medium ${isActive ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-50"}`
            }
            onClick={() => setMenuOpen(false)}
          >
            Members
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `block py-2 px-3 rounded-lg font-medium ${isActive ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-50"}`
            }
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>
          <Link
            to="/membership"
            onClick={() => setMenuOpen(false)}
            className="block bg-primary-600 text-white text-center py-2.5 px-3 rounded-lg font-semibold mt-2"
          >
            Join Us
          </Link>
        </div>
      )}
    </header>
  );
}
