import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { MdSearch, MdClose } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import HotelCard from "../components/HotelCard";
import PageHero from "../components/PageHero";
import { hotels, categories, locations } from "../data/hotels";

export default function Membership() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search,  setSearch]  = useState("");
  const [selCat,  setSelCat]  = useState("All Categories");
  const [selLoc,  setSelLoc]  = useState("All Locations");

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
    <div className="bg-white dark:bg-dark-950">
      <PageHero
        image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&auto=format&fit=crop&q=75"
        badge="Province No. 7"
        title="Member Hotels"
        subtitle="All registered hotels, resorts, lodges, and guest houses across Sudurpashchim Province."
      />

      {/* ── Filter bar ───────────────────────────────────────────────────── */}
      <div className="sticky top-[105px] z-30 bg-white dark:bg-dark-900 border-b-2 border-primary-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category tabs */}
          <div className="flex gap-0 overflow-x-auto scrollbar-hide border-b border-surface-100 dark:border-dark-800">
            <button
              onClick={() => setCat("All Categories")}
              className={`flex-shrink-0 px-5 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 -mb-px
                ${selCat === "All Categories"
                  ? "border-primary-600 text-primary-700 dark:text-primary-400"
                  : "border-transparent text-surface-500 dark:text-dark-400 hover:text-surface-900 dark:hover:text-white"
                }`}
            >
              All ({hotels.length})
            </button>
            {Object.entries(catCounts).filter(([, c]) => c > 0).map(([cat, count]) => (
              <button
                key={cat}
                onClick={() => setCat(cat)}
                className={`flex-shrink-0 px-5 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 -mb-px
                  ${selCat === cat
                    ? "border-primary-600 text-primary-700 dark:text-primary-400"
                    : "border-transparent text-surface-500 dark:text-dark-400 hover:text-surface-900 dark:hover:text-white"
                  }`}
              >
                {cat} ({count})
              </button>
            ))}
          </div>

          {/* Search + location filter */}
          <div className="flex flex-col sm:flex-row gap-2 py-3">
            <div className="relative flex-1">
              <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400 dark:text-dark-500" size={17} />
              <input
                type="text"
                placeholder="Search by name or district…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input pl-10 pr-8 py-2.5 text-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-700 dark:text-dark-500 dark:hover:text-white"
                >
                  <MdClose size={14} />
                </button>
              )}
            </div>
            <select value={selLoc} onChange={e => setLoc(e.target.value)}
              className="input sm:w-52 py-2.5 text-sm">
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            {hasFilters && (
              <button onClick={clear}
                className="flex items-center gap-1.5 px-4 py-2.5 border border-surface-300 dark:border-dark-600
                  text-surface-600 dark:text-dark-300 hover:text-primary-700 hover:border-primary-500
                  text-xs font-semibold transition-colors flex-shrink-0">
                <MdClose size={13} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Results ──────────────────────────────────────────────────────── */}
      <div className="bg-surface-50 dark:bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-surface-500 dark:text-dark-400 text-sm mb-8 font-medium">
            Showing{" "}
            <strong className="text-surface-900 dark:text-white">{filtered.length}</strong>
            {" "}of{" "}
            <strong className="text-surface-900 dark:text-white">{hotels.length}</strong>
            {" "}hotels
            {hasFilters && (
              <button onClick={clear}
                className="ml-4 text-primary-600 dark:text-primary-400 hover:underline text-xs font-semibold">
                Clear filters
              </button>
            )}
          </p>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-surface-200 dark:border-dark-700 bg-white dark:bg-dark-900">
              <p className="text-surface-600 dark:text-dark-300 font-bold text-base mb-2">No hotels found</p>
              <p className="text-surface-400 dark:text-dark-500 text-sm mb-6">Try adjusting your filters.</p>
              <button onClick={clear} className="btn-primary">Clear Filters</button>
            </div>
          )}
        </div>
      </div>

      {/* ── Join CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-primary-700 dark:bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h2
                className="text-white font-bold leading-tight mb-3"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", letterSpacing: "-0.02em" }}
              >
                Is Your Hotel Not Listed?
              </h2>
              <p className="text-white/70 text-base max-w-xl">
                Register with HAN Sudurpashchim and gain visibility, training access, and membership benefits across Province No. 7.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold text-sm px-8 py-4 hover:bg-primary-50 transition-colors flex-shrink-0"
            >
              Apply for Membership <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
