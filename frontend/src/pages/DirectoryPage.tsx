import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { MdSearch, MdClose } from "react-icons/md";
import { FiArrowRight, FiFilter, FiAlertCircle, FiGrid, FiMap } from "react-icons/fi";
import HotelCard from "@/components/HotelCard";
import DirectoryFilters from "@/components/DirectoryFilters";
import PageHero from "@/components/PageHero";
import ProvinceMap from "@/components/ProvinceMap";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHotels } from "@/hooks/useHotels";

const ALL_DISTRICTS = "All Districts";
const ALL_CATEGORIES = "All Categories";
const PAGE_SIZE = 9;
// Map view has no pagination UI, so fetch a much larger page to approximate "all
// matching hotels" — the mock/seed dataset is small enough that this covers it.
const MAP_VIEW_LIMIT = 100;

type ViewMode = "grid" | "map";

export default function DirectoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState(ALL_DISTRICTS);
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [view, setView] = useState<ViewMode>("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const d = searchParams.get("district");
    const c = searchParams.get("category");
    if (d) setDistrict(d);
    if (c) setCategory(c);
  }, [searchParams]);

  // Any change to a server-side filter should reset back to page 1.
  useEffect(() => {
    setPage(1);
  }, [district, category]);

  function updateParams(nextDistrict: string, nextCategory: string) {
    const p: Record<string, string> = {};
    if (nextDistrict && nextDistrict !== ALL_DISTRICTS) p.district = nextDistrict;
    if (nextCategory && nextCategory !== ALL_CATEGORIES) p.category = nextCategory;
    setSearchParams(p);
  }

  function handleDistrictChange(value: string) {
    setDistrict(value);
    updateParams(value, category);
  }

  function handleCategoryChange(value: string) {
    setCategory(value);
    updateParams(district, value);
  }

  function clearFilters() {
    setDistrict(ALL_DISTRICTS);
    setCategory(ALL_CATEGORIES);
    setAmenities([]);
    setSearch("");
    setPage(1);
    setSearchParams({});
  }

  const { data, isLoading, isError, error, refetch, isFetching } = useHotels({
    district: district !== ALL_DISTRICTS ? district : undefined,
    category: category !== ALL_CATEGORIES ? category : undefined,
    page: view === "map" ? 1 : page,
    limit: view === "map" ? MAP_VIEW_LIMIT : PAGE_SIZE,
  });

  const hotels = data?.data ?? [];
  const pagination = data?.pagination;

  // Amenities + search are applied client-side on top of the current server page,
  // since GET /api/v1/hotels only supports district/category/page/limit server-side.
  const filtered = hotels.filter((h) => {
    const okAmenities = amenities.every((a) => h.amenities.includes(a));
    const okSearch =
      !search ||
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.district.toLowerCase().includes(search.toLowerCase());
    return okAmenities && okSearch;
  });

  const hasActiveFilters =
    district !== ALL_DISTRICTS || category !== ALL_CATEGORIES || amenities.length > 0 || Boolean(search);

  const activeFilterCount =
    (district !== ALL_DISTRICTS ? 1 : 0) + (category !== ALL_CATEGORIES ? 1 : 0) + amenities.length;

  const filterProps = {
    district,
    onDistrictChange: handleDistrictChange,
    category,
    onCategoryChange: handleCategoryChange,
    amenities,
    onAmenitiesChange: setAmenities,
    hasActiveFilters,
    onClear: clearFilters,
  };

  return (
    <div className="bg-background">
      <PageHero
        image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&auto=format&fit=crop&q=75"
        badge="Province No. 7"
        title="Hotel Directory"
        subtitle="A searchable directory of registered hotels, resorts, lodges, and guest houses across Sudurpashchim Province."
      />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="lg:flex lg:gap-10 lg:items-start">

          {/* ── Desktop sidebar ──────────────────────────────────────────── */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24">
            <DirectoryFilters {...filterProps} />
          </aside>

          {/* ── Main content ─────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Search + view toggle + mobile filter trigger */}
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="relative flex-1 min-w-[200px]">
                <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted" size={18} />
                <input
                  type="text"
                  placeholder="Search by name or district…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input pl-11 pr-9 py-3 text-sm rounded-xl"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground dark:hover:text-white"
                  >
                    <MdClose size={14} />
                  </button>
                )}
              </div>

              {/* Grid / Map view toggle */}
              <Tabs value={view} onValueChange={(v) => setView(v as ViewMode)}>
                <TabsList>
                  <TabsTrigger value="grid" className="gap-1.5">
                    <FiGrid size={14} /> Grid View
                  </TabsTrigger>
                  <TabsTrigger value="map" className="gap-1.5">
                    <FiMap size={14} /> Map View
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Mobile: filters drawer trigger */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden flex-shrink-0 relative">
                    <FiFilter size={15} /> Filters
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] sm:max-w-sm overflow-y-auto">
                  <SheetHeader className="mb-6">
                    <SheetTitle>Filter Hotels</SheetTitle>
                  </SheetHeader>
                  <DirectoryFilters {...filterProps} />
                </SheetContent>
              </Sheet>
            </div>

            {/* ── Error state ──────────────────────────────────────────── */}
            {isError && (
              <Alert variant="destructive" className="mb-6">
                <FiAlertCircle className="h-4 w-4" />
                <AlertTitle>Couldn't load hotels</AlertTitle>
                <AlertDescription className="flex items-center justify-between gap-4">
                  <span>{error instanceof Error ? error.message : "Something went wrong. Please try again."}</span>
                  <Button size="sm" variant="outline" onClick={() => refetch()} className="flex-shrink-0">
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* ── Loading state ────────────────────────────────────────── */}
            {isLoading && (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <div key={i} className="rounded-lg overflow-hidden border border-border">
                    <Skeleton className="h-[200px] w-full rounded-none" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Results ──────────────────────────────────────────────── */}
            {!isLoading && !isError && (
              <>
                <p className="text-foreground-muted text-sm mb-6 font-medium">
                  Showing{" "}
                  <strong className="text-foreground">{filtered.length}</strong>
                  {" "}of{" "}
                  <strong className="text-foreground">{pagination?.total ?? 0}</strong>
                  {" "}hotels
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="ml-4 text-accent hover:underline text-xs font-semibold">
                      Clear filters
                    </button>
                  )}
                </p>

                {filtered.length > 0 ? (
                  view === "grid" ? (
                    <RevealGroup className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filtered.map((hotel) => (
                        <RevealItem key={hotel._id}>
                          <HotelCard hotel={hotel} />
                        </RevealItem>
                      ))}
                    </RevealGroup>
                  ) : (
                    <ProvinceMap hotels={filtered} />
                  )
                ) : (
                  <div className="text-center py-20 border border-border rounded-xl bg-background-secondary">
                    <p className="text-foreground-secondary font-bold text-base mb-2">No hotels found</p>
                    <p className="text-foreground-muted text-sm mb-6">Try adjusting your filters.</p>
                    <Button onClick={clearFilters}>Clear Filters</Button>
                  </div>
                )}

                {/* Pagination (grid view only — map view fetches a wide, unpaginated set) */}
                {view === "grid" && pagination && pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-10">
                    <Button
                      variant="outline"
                      disabled={page <= 1 || isFetching}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-foreground-muted font-medium">
                      Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      disabled={page >= pagination.totalPages || isFetching}
                      onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Join CTA ─────────────────────────────────────────────────────── */}
      <section className="border-y border-border bg-background-secondary">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <span className="overline block mb-3">Membership</span>
              <h2
                className="font-serif text-foreground font-bold leading-tight mb-3"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", letterSpacing: "-0.02em" }}
              >
                Is Your Hotel Not Listed?
              </h2>
              <p className="text-foreground-secondary text-base max-w-xl">
                Register with HAN Sudurpashchim and gain visibility, training access, and membership benefits across Province No. 7.
              </p>
            </div>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent-vivid flex-shrink-0">
              <Link to="/contact">
                Apply for Membership <FiArrowRight size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
