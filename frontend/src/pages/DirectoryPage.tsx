import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Building2, Search, SlidersHorizontal } from "lucide-react";
import DirectoryHero from "@/components/directory/DirectoryHero";
import FiltersSidebar from "@/components/directory/FiltersSidebar";
import HotelCardGrid from "@/components/directory/HotelCardGrid";
import HotelCardList from "@/components/directory/HotelCardList";
import ResultsHeader, { type ActiveDirectoryFilter } from "@/components/directory/ResultsHeader";
import ProvinceMap from "@/components/ProvinceMap";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ALL_CATEGORIES } from "@/constants/hotelCategories";
import { SUDURPASHCHIM_DISTRICTS } from "@/constants/districts";
import { useHotels } from "@/hooks/useHotels";

const ALL_DISTRICTS = "All Districts";
const PAGE_SIZE = 9;
type ViewMode = "grid" | "list" | "map";

export default function DirectoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [district, setDistrict] = useState(searchParams.get("district") ?? ALL_DISTRICTS);
  const [category, setCategory] = useState(searchParams.get("category") ?? ALL_CATEGORIES);
  const [amenities, setAmenities] = useState(searchParams.getAll("amenity"));
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [sort, setSort] = useState("recommended");
  const [page, setPage] = useState(1);
  const [view, setView] = useState<ViewMode>("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { data, isLoading, isError, error, refetch, isFetching } = useHotels({ allPages: true });
  const hotels = data?.data ?? [];

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  // Restore a shareable URL's filters, including repeated amenity parameters.
  useEffect(() => {
    setDistrict(searchParams.get("district") ?? ALL_DISTRICTS);
    setCategory(searchParams.get("category") ?? ALL_CATEGORIES);
    setAmenities(searchParams.getAll("amenity"));
    setSearch(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => { setPage(1); }, [district, category, amenities, debouncedSearch, sort]);

  function syncUrl(next: { district?: string; category?: string; amenities?: string[]; search?: string }) {
    const params = new URLSearchParams();
    const nextDistrict = next.district ?? district;
    const nextCategory = next.category ?? category;
    const nextAmenities = next.amenities ?? amenities;
    const nextSearch = next.search ?? search;
    if (nextDistrict !== ALL_DISTRICTS) params.set("district", nextDistrict);
    if (nextCategory !== ALL_CATEGORIES) params.set("category", nextCategory);
    nextAmenities.forEach((amenity) => params.append("amenity", amenity));
    if (nextSearch.trim()) params.set("q", nextSearch.trim());
    setSearchParams(params, { replace: true });
  }

  function clearFilters() {
    setDistrict(ALL_DISTRICTS);
    setCategory(ALL_CATEGORIES);
    setAmenities([]);
    setSearch("");
    setDebouncedSearch("");
    setPage(1);
    setSearchParams({}, { replace: true });
  }

  const districtCounts = useMemo(() => Object.fromEntries(
    SUDURPASHCHIM_DISTRICTS.map((name) => [name, hotels.filter((hotel) => hotel.district === name).length])
  ), [hotels]);

  const filteredHotels = useMemo(() => {
    const needle = debouncedSearch.toLocaleLowerCase();
    const filtered = hotels.filter((hotel) => {
      if (district !== ALL_DISTRICTS && hotel.district !== district) return false;
      if (category !== ALL_CATEGORIES && hotel.category !== category) return false;
      if (!amenities.every((amenity) => hotel.amenities.includes(amenity))) return false;
      if (needle && ![hotel.name, hotel.district, hotel.description, hotel.contactInfo.address, hotel.category, ...hotel.amenities]
        .some((value) => value.toLocaleLowerCase().includes(needle))) return false;
      return true;
    });
    if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "newest") filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return filtered;
  }, [hotels, district, category, amenities, debouncedSearch, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredHotels.length / PAGE_SIZE));
  const visibleHotels = filteredHotels.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeFilters: ActiveDirectoryFilter[] = [
    ...(district !== ALL_DISTRICTS ? [{ key: "district", label: district, remove: () => { setDistrict(ALL_DISTRICTS); syncUrl({ district: ALL_DISTRICTS }); } }] : []),
    ...(category !== ALL_CATEGORIES ? [{ key: "category", label: category, remove: () => { setCategory(ALL_CATEGORIES); syncUrl({ category: ALL_CATEGORIES }); } }] : []),
    ...amenities.map((amenity) => ({ key: `amenity-${amenity}`, label: amenity, remove: () => { const next = amenities.filter((item) => item !== amenity); setAmenities(next); syncUrl({ amenities: next }); } })),
    ...(debouncedSearch ? [{ key: "search", label: `“${debouncedSearch}”`, remove: () => { setSearch(""); setDebouncedSearch(""); syncUrl({ search: "" }); } }] : []),
  ];
  const hasActiveFilters = activeFilters.length > 0;
  const filterProps = {
    district, category, amenities, districtCounts,
    onDistrictChange: (value: string) => { setDistrict(value); syncUrl({ district: value }); },
    onCategoryChange: (value: string) => { setCategory(value); syncUrl({ category: value }); },
    onAmenitiesChange: (value: string[]) => { setAmenities(value); syncUrl({ amenities: value }); },
    onClear: clearFilters, hasActiveFilters,
  };

  return (
    <div className="bg-background">
      <DirectoryHero propertyCount={isLoading ? null : hotels.length} />

      <main className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-10">
          <aside className="sticky top-24 hidden lg:block"><FiltersSidebar {...filterProps} /></aside>

          <section className="min-w-0" aria-label="Hotel directory results">
            <div className="mb-5 flex gap-3">
              <label className="relative min-w-0 flex-1">
                <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted" />
                <span className="sr-only">Search member properties</span>
                <input value={search} onChange={(event) => { setSearch(event.target.value); syncUrl({ search: event.target.value }); }} placeholder="Search properties, districts or amenities" className="h-12 w-full rounded-sm border border-border bg-background-card pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-accent focus:ring-2 focus:ring-accent/15" />
              </label>
              <button onClick={() => setMobileFiltersOpen(true)} className="inline-flex items-center gap-2 border border-border bg-background-card px-4 text-sm text-foreground lg:hidden"><SlidersHorizontal size={16} /> Filters{activeFilters.length > 0 ? ` (${activeFilters.length})` : ""}</button>
            </div>

            <ResultsHeader count={filteredHotels.length === 0 ? 0 : Math.min(PAGE_SIZE, filteredHotels.length - (page - 1) * PAGE_SIZE)} total={filteredHotels.length} filters={activeFilters} sort={sort} view={view} onSortChange={setSort} onViewChange={setView} onOpenFilters={() => setMobileFiltersOpen(true)} activeFilterCount={activeFilters.length} />

            {isError && <div className="border border-red-200 bg-red-50 p-6 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"><p className="font-semibold">We couldn’t load member properties.</p><p className="mt-1">{error instanceof Error ? error.message : "Please try again."}</p><Button variant="outline" className="mt-4" onClick={() => refetch()}>Try again</Button></div>}

            {isLoading && <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="overflow-hidden border border-border bg-background-card"><Skeleton className="aspect-[4/3] w-full rounded-none" /><div className="space-y-3 p-5"><Skeleton className="h-5 w-3/4" /><Skeleton className="h-3 w-1/2" /><Skeleton className="h-12 w-full" /><Skeleton className="h-8 w-full" /></div></div>)}</div>}

            {!isLoading && !isError && (filteredHotels.length === 0 ? (
              <div className="flex min-h-80 flex-col items-center justify-center border border-border bg-background-card px-6 text-center">
                <Building2 size={42} strokeWidth={1.2} className="text-sky-300 dark:text-sky-700" />
                <h2 className="mt-5 font-serif text-2xl font-semibold text-foreground">No properties found</h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-foreground-secondary">Try changing your search or removing a filter to discover more member stays.</p>
                <button onClick={clearFilters} className="mt-4 text-sm font-medium text-accent underline underline-offset-4">Clear all filters</button>
              </div>
            ) : view === "map" ? (
              <ProvinceMap hotels={filteredHotels} className="h-[65vh] min-h-[420px]" />
            ) : view === "list" ? (
              <div className="space-y-5">{visibleHotels.map((hotel) => <HotelCardList key={hotel._id} hotel={hotel} />)}</div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {visibleHotels.map((hotel, index) => <motion.div key={hotel._id} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.25, delay: index * 0.025 }}><HotelCardGrid hotel={hotel} /></motion.div>)}
                </AnimatePresence>
              </div>
            ))}

            {!isLoading && !isError && filteredHotels.length > 0 && view !== "map" && <div className="mt-10 flex flex-col items-center gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between"><p className="text-xs text-foreground-muted">Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filteredHotels.length)} of {filteredHotels.length} properties</p><div className="flex items-center gap-2"><Button variant="outline" size="sm" disabled={page <= 1 || isFetching} onClick={() => setPage((current) => Math.max(1, current - 1))}>Previous</Button><span className="px-2 text-xs text-foreground-muted">{page} / {totalPages}</span><Button variant="outline" size="sm" disabled={page >= totalPages || isFetching} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>Next</Button></div></div>}
          </section>
        </div>
      </main>

      <section className="border-y border-border bg-background-secondary">
        <div className="mx-auto grid max-w-screen-2xl items-center gap-7 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8 lg:py-14">
          <div><span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Become a member</span><h2 className="mt-2 font-serif text-3xl font-semibold text-foreground">Is your property not listed?</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">Join HAN Sudurpashchim to connect your hospitality business with visitors and fellow members across the province.</p></div>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent-vivid"><Link to="/contact">Apply for membership <ArrowRight size={15} /></Link></Button>
        </div>
      </section>

      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent side="bottom" className="h-[90dvh] overflow-y-auto rounded-t-xl px-4 pb-6 sm:px-6">
          <SheetHeader className="mb-5 border-b border-border pb-4 text-left"><SheetTitle className="font-serif text-2xl">Refine your search</SheetTitle></SheetHeader>
          <FiltersSidebar {...filterProps} />
          <div className="sticky bottom-0 mt-5 bg-background py-3"><Button className="h-12 w-full bg-accent text-accent-foreground hover:bg-accent-vivid" onClick={() => setMobileFiltersOpen(false)}>Show {filteredHotels.length} properties</Button></div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
