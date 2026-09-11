import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdSearch, MdHotel, MdLocationOn, MdClose } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import HotelCard from "../components/HotelCard";
import PageHero from "../components/PageHero";
import { hotels, categories, locations } from "../data/hotels";
import { fadeUp, staggerContainer } from "../lib/animations";

export default function Membership() {
  const [searchParams, setSearchParams]   = useSearchParams();
  const [searchQuery,   setSearchQuery]   = useState("");
  const [selCategory,   setSelCategory]   = useState("All Categories");
  const [selLocation,   setSelLocation]   = useState("All Locations");

  useEffect(() => {
    const cat = searchParams.get("category");
    const loc = searchParams.get("location");
    if (cat) setSelCategory(cat);
    if (loc) setSelLocation(loc);
  }, [searchParams]);

  function updateParams(cat, loc) {
    const p = {};
    if (cat && cat !== "All Categories") p.category = cat;
    if (loc && loc !== "All Locations")  p.location  = loc;
    setSearchParams(p);
  }
  const setCategory = (v) => { setSelCategory(v); updateParams(v, selLocation); };
  const setLocation = (v) => { setSelLocation(v); updateParams(selCategory, v); };
  const clearAll    = () => { setSelCategory("All Categories"); setSelLocation("All Locations"); setSearchQuery(""); setSearchParams({}); };

  const filtered = hotels.filter((h) => {
    const okCat = selCategory === "All Categories" || h.category === selCategory;
    const okLoc = selLocation === "All Locations"  || h.location  === selLocation;
    const okStr = !searchQuery ||
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.location.toLowerCase().includes(searchQuery.toLowerCase());
    return okCat && okLoc && okStr;
  });

  const hasFilters = selCategory !== "All Categories" || selLocation !== "All Locations" || searchQuery;

  const catCounts = categories.slice(1).reduce((acc, c) => {
    acc[c] = hotels.filter((h) => h.category === c).length;
    return acc;
  }, {});

  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&auto=format&fit=crop&q=75"
        badge="Member Hotels Directory"
        title="Our Member Hotels"
        subtitle="Browse all registered hotels, resorts, lodges, and guest houses across Sudurpashchim Province. Filter by category or district to find your perfect stay."
      />

      {/* Category pills */}
      <section className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setCategory("All Categories")}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                selCategory === "All Categories" ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600"
              }`}
            >
              All ({hotels.length})
            </button>
            {Object.entries(catCounts).filter(([, c]) => c > 0).map(([cat, count]) => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  selCategory === cat ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                }`}
              >
                {cat} ({count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-white border-b border-gray-100 py-4 sticky top-[97px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search by name or district…"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <MdClose size={16} />
                </button>
              )}
            </div>
            <select value={selCategory} onChange={(e) => setCategory(e.target.value)}
              className="py-2.5 px-3 border border-gray-200 rounded-xl bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-200 sm:min-w-[170px]">
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={selLocation} onChange={(e) => setLocation(e.target.value)}
              className="py-2.5 px-3 border border-gray-200 rounded-xl bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-200 sm:min-w-[190px]">
              {locations.map((l) => <option key={l}>{l}</option>)}
            </select>
            {hasFilters && (
              <button onClick={clearAll}
                className="flex items-center gap-1.5 px-3.5 py-2.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl text-xs font-medium transition-colors flex-shrink-0">
                <MdClose size={14} /> Clear
              </button>
            )}
          </div>

          {/* Active tags */}
          <AnimatePresence>
            {hasFilters && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2 mt-3 overflow-hidden">
                {selCategory !== "All Categories" && (
                  <span className="flex items-center gap-1 bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    {selCategory} <button onClick={() => setCategory("All Categories")}><MdClose size={12} /></button>
                  </span>
                )}
                {selLocation !== "All Locations" && (
                  <span className="flex items-center gap-1 bg-secondary-100 text-secondary-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    {selLocation} <button onClick={() => setLocation("All Locations")}><MdClose size={12} /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                    "{searchQuery}" <button onClick={() => setSearchQuery("")}><MdClose size={12} /></button>
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Results */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm">
              Showing <span className="font-semibold text-gray-800">{filtered.length}</span> of{" "}
              <span className="font-semibold text-gray-800">{hotels.length}</span> hotels
            </p>
          </div>

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key="grid"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((hotel) => (
                  <motion.div key={hotel.id} variants={fadeUp}>
                    <HotelCard hotel={hotel} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-20">
                <MdHotel className="text-gray-200 mx-auto mb-4" size={64} />
                <h3 className="text-lg font-bold text-gray-500 mb-2">No hotels found</h3>
                <p className="text-gray-400 text-sm mb-5">Adjust your search or clear filters.</p>
                <button onClick={clearAll} className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Join CTA */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="bg-primary-50 border-t border-primary-100 py-12"
      >
        <motion.div variants={fadeUp} className="max-w-xl mx-auto px-4 text-center">
          <img
            src="/logo.png"
            alt="HAN Sudurpashchim"
            className="h-14 w-auto object-contain mx-auto mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Is Your Hotel Not Listed?</h2>
          <p className="text-gray-500 text-sm mb-5">
            Register with HAN Sudurpashchim and gain visibility, training access, and membership benefits.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors">
            Apply for Membership <FiArrowRight size={13} />
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}
