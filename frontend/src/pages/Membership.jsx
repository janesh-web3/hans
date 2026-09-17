import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdSearch, MdHotel, MdClose } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import HotelCard from "../components/HotelCard";
import PageHero from "../components/PageHero";
import { hotels, categories, locations } from "../data/hotels";
import { fadeUp, staggerContainer } from "../lib/animations";

export default function Membership() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search,    setSearch]    = useState("");
  const [selCat,    setSelCat]    = useState("All Categories");
  const [selLoc,    setSelLoc]    = useState("All Locations");

  useEffect(() => {
    const cat = searchParams.get("category");
    const loc = searchParams.get("location");
    if (cat) setSelCat(cat);
    if (loc) setSelLoc(loc);
  }, [searchParams]);

  function updateParams(cat, loc) {
    const p = {};
    if (cat && cat !== "All Categories") p.category = cat;
    if (loc && loc !== "All Locations")  p.location  = loc;
    setSearchParams(p);
  }
  const setCat = v => { setSelCat(v); updateParams(v, selLoc); };
  const setLoc = v => { setSelLoc(v); updateParams(selCat, v); };
  const clear  = () => { setSelCat("All Categories"); setSelLoc("All Locations"); setSearch(""); setSearchParams({}); };

  const filtered = hotels.filter(h => {
    const okC = selCat === "All Categories" || h.category === selCat;
    const okL = selLoc === "All Locations"  || h.location  === selLoc;
    const okS = !search || h.name.toLowerCase().includes(search.toLowerCase()) || h.district.toLowerCase().includes(search.toLowerCase());
    return okC && okL && okS;
  });

  const hasFilters = selCat !== "All Categories" || selLoc !== "All Locations" || search;

  const catCounts = categories.slice(1).reduce((acc, c) => {
    acc[c] = hotels.filter(h => h.category === c).length;
    return acc;
  }, {});

  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&auto=format&fit=crop&q=75"
        badge="Member Hotels Directory"
        title="Our Member Hotels"
        subtitle="Browse all registered hotels, resorts, lodges, and guest houses across Sudurpashchim Province."
      />

      {/* Category pills */}
      <div className="bg-dark-900 border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <button onClick={() => setCat("All Categories")}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${selCat === "All Categories" ? "bg-primary-600 text-white" : "bg-dark-800 text-dark-400 border border-dark-700 hover:text-white hover:border-dark-600"}`}>
              All ({hotels.length})
            </button>
            {Object.entries(catCounts).filter(([, c]) => c > 0).map(([cat, count]) => (
              <button key={cat} onClick={() => setCat(cat)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${selCat === cat ? "bg-primary-600 text-white" : "bg-dark-800 text-dark-400 border border-dark-700 hover:text-white hover:border-dark-600"}`}>
                {cat} ({count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Filter — NOT sticky, just a normal block */}
      <div className="bg-dark-900 border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-2.5">
            {/* Search */}
            <div className="relative flex-1">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" size={17} />
              <input type="text" placeholder="Search by name or district…"
                value={search} onChange={e => setSearch(e.target.value)}
                className="input pl-9 pr-8" />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-dark-500 hover:text-white">
                  <MdClose size={15} />
                </button>
              )}
            </div>
            {/* Category select */}
            <select value={selCat} onChange={e => setCat(e.target.value)}
              className="input sm:w-44">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {/* Location select */}
            <select value={selLoc} onChange={e => setLoc(e.target.value)}
              className="input sm:w-52">
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            {hasFilters && (
              <button onClick={clear}
                className="flex items-center gap-1.5 px-3 py-2.5 bg-dark-800 border border-dark-700 text-dark-400 hover:text-white hover:border-dark-600 rounded-lg text-xs font-medium transition-colors flex-shrink-0">
                <MdClose size={13} /> Clear
              </button>
            )}
          </div>

          {/* Active tags */}
          <AnimatePresence>
            {hasFilters && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2 mt-3 overflow-hidden">
                {selCat !== "All Categories" && (
                  <span className="flex items-center gap-1 bg-primary-900 text-primary-300 border border-primary-800 text-xs font-medium px-2.5 py-1 rounded-full">
                    {selCat} <button onClick={() => setCat("All Categories")}><MdClose size={11} /></button>
                  </span>
                )}
                {selLoc !== "All Locations" && (
                  <span className="flex items-center gap-1 bg-secondary-900 text-secondary-300 border border-secondary-800 text-xs font-medium px-2.5 py-1 rounded-full">
                    {selLoc} <button onClick={() => setLoc("All Locations")}><MdClose size={11} /></button>
                  </span>
                )}
                {search && (
                  <span className="flex items-center gap-1 bg-dark-800 text-dark-300 border border-dark-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    "{search}" <button onClick={() => setSearch("")}><MdClose size={11} /></button>
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-dark-500 text-sm">
            Showing <span className="text-white font-semibold">{filtered.length}</span> of{" "}
            <span className="text-white font-semibold">{hotels.length}</span> hotels
          </p>
        </div>

        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div key="grid" variants={staggerContainer} initial="hidden" animate="visible"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(hotel => (
                <motion.div key={hotel.id} variants={fadeUp}>
                  <HotelCard hotel={hotel} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20">
              <MdHotel className="text-dark-800 mx-auto mb-4" size={56} />
              <h3 className="text-dark-400 font-semibold mb-2">No hotels found</h3>
              <p className="text-dark-600 text-sm mb-5">Adjust your search or clear filters.</p>
              <button onClick={clear} className="btn-primary">Clear Filters</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Join CTA */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="border-t border-dark-800 py-12">
        <motion.div variants={fadeUp} className="max-w-lg mx-auto px-4 text-center">
          <img src="/logo.png" alt="HAN" className="h-10 w-auto object-contain mx-auto mb-4" />
          <h2 className="section-title mb-2">Is Your Hotel Not Listed?</h2>
          <p className="section-sub mb-5 mx-auto">Register with HAN Sudurpashchim and gain visibility, training access, and membership benefits.</p>
          <Link to="/contact" className="btn-primary">Apply for Membership <FiArrowRight size={13} /></Link>
        </motion.div>
      </motion.section>
    </div>
  );
}
