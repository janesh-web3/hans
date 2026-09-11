import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { MdSearch, MdFilterList, MdHotel, MdLocationOn, MdClose } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import HotelCard from "../components/HotelCard";
import { hotels, categories, locations } from "../data/hotels";

export default function Membership() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [showFilters, setShowFilters] = useState(false);

  // Sync state from URL params (from navbar dropdown)
  useEffect(() => {
    const cat = searchParams.get("category");
    const loc = searchParams.get("location");
    if (cat) setSelectedCategory(cat);
    if (loc) setSelectedLocation(loc);
  }, [searchParams]);

  function updateParams(cat, loc) {
    const params = {};
    if (cat && cat !== "All Categories") params.category = cat;
    if (loc && loc !== "All Locations") params.location = loc;
    setSearchParams(params);
  }

  function handleCategory(val) {
    setSelectedCategory(val);
    updateParams(val, selectedLocation);
  }

  function handleLocation(val) {
    setSelectedLocation(val);
    updateParams(selectedCategory, val);
  }

  function clearFilters() {
    setSelectedCategory("All Categories");
    setSelectedLocation("All Locations");
    setSearchQuery("");
    setSearchParams({});
  }

  const filtered = hotels.filter((hotel) => {
    const matchCat = selectedCategory === "All Categories" || hotel.category === selectedCategory;
    const matchLoc = selectedLocation === "All Locations" || hotel.location === selectedLocation;
    const matchSearch =
      !searchQuery ||
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchLoc && matchSearch;
  });

  const hasActiveFilters =
    selectedCategory !== "All Categories" ||
    selectedLocation !== "All Locations" ||
    searchQuery !== "";

  // Count by category for summary
  const categoryCounts = categories.slice(1).reduce((acc, cat) => {
    acc[cat] = hotels.filter((h) => h.category === cat).length;
    return acc;
  }, {});

  return (
    <div>
      {/* ── Page Hero ── */}
      <section className="bg-gradient-to-br from-primary-700 to-secondary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-5">
              <MdHotel size={16} /> Member Hotels Directory
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Member Hotels</h1>
            <p className="text-primary-100 text-lg">
              Explore all registered member hotels, resorts, lodges, and guest
              houses across Sudurpashchim Province. Filter by category or district
              to find the perfect stay.
            </p>
          </div>
        </div>
      </section>

      {/* ── Category Quick Stats ── */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => handleCategory("All Categories")}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedCategory === "All Categories"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600"
              }`}
            >
              All ({hotels.length})
            </button>
            {Object.entries(categoryCounts)
              .filter(([, count]) => count > 0)
              .map(([cat, count]) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                  }`}
                >
                  {cat} ({count})
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* ── Search & Filter Bar ── */}
      <section className="bg-gray-50 py-6 sticky top-[105px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search hotels by name, district…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <MdClose size={18} />
                </button>
              )}
            </div>

            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => handleCategory(e.target.value)}
              className="py-2.5 px-4 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 text-sm text-gray-700 min-w-[180px]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Location filter */}
            <select
              value={selectedLocation}
              onChange={(e) => handleLocation(e.target.value)}
              className="py-2.5 px-4 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 text-sm text-gray-700 min-w-[200px]"
            >
              {locations.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-medium transition-colors flex-shrink-0"
              >
                <MdClose size={16} /> Clear
              </button>
            )}
          </div>

          {/* Active filter tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedCategory !== "All Categories" && (
                <span className="flex items-center gap-1 bg-primary-100 text-primary-700 text-xs font-medium px-3 py-1 rounded-full">
                  {selectedCategory}
                  <button onClick={() => handleCategory("All Categories")}><MdClose size={14} /></button>
                </span>
              )}
              {selectedLocation !== "All Locations" && (
                <span className="flex items-center gap-1 bg-secondary-100 text-secondary-700 text-xs font-medium px-3 py-1 rounded-full">
                  {selectedLocation}
                  <button onClick={() => handleLocation("All Locations")}><MdClose size={14} /></button>
                </span>
              )}
              {searchQuery && (
                <span className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery("")}><MdClose size={14} /></button>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Results ── */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600 text-sm">
              Showing <span className="font-semibold text-gray-800">{filtered.length}</span> of{" "}
              <span className="font-semibold text-gray-800">{hotels.length}</span> member hotels
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <MdHotel className="text-gray-200 mx-auto mb-4" size={72} />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No hotels found</h3>
              <p className="text-gray-400 mb-6">
                No member hotels match your current filters. Try adjusting your search.
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Join CTA ── */}
      <section className="bg-primary-50 border-t border-primary-100 py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <MdHotel className="text-primary-300 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Is Your Hotel Not Listed?</h2>
          <p className="text-gray-500 mb-6">
            Register your hotel with the Hotel Association of Nepal — Sudurpashchim
            Province and gain visibility, access to training, and official membership
            benefits.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Apply for Membership <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
