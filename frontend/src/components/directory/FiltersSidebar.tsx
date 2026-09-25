import { useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { COMMON_AMENITIES } from "@/constants/amenities";
import { SUDURPASHCHIM_DISTRICTS } from "@/constants/districts";
import { HOTEL_CATEGORIES, ALL_CATEGORIES } from "@/constants/hotelCategories";

interface FiltersSidebarProps {
  district: string;
  category: string;
  amenities: string[];
  districtCounts: Record<string, number>;
  onDistrictChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onAmenitiesChange: (value: string[]) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export default function FiltersSidebar({
  district, category, amenities, districtCounts,
  onDistrictChange, onCategoryChange, onAmenitiesChange, onClear, hasActiveFilters,
}: FiltersSidebarProps) {
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const shownAmenities = showAllAmenities ? COMMON_AMENITIES : COMMON_AMENITIES.slice(0, 6);

  function toggleAmenity(amenity: string) {
    onAmenitiesChange(amenities.includes(amenity)
      ? amenities.filter((item) => item !== amenity)
      : [...amenities, amenity]);
  }

  return (
    <aside className="rounded-sm border border-border bg-background-card p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground"><SlidersHorizontal size={15} /> Filters</h2>
        {hasActiveFilters && <button onClick={onClear} className="text-xs font-medium text-accent hover:underline">Clear all</button>}
      </div>

      <section className="mb-7">
        <label htmlFor="district-filter" className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">District</label>
        <div className="relative">
          <select id="district-filter" value={district} onChange={(event) => onDistrictChange(event.target.value)} className="h-12 w-full appearance-none rounded-sm border border-border bg-background px-3 pr-9 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15">
            <option value="All Districts">All Districts · {Object.values(districtCounts).reduce((sum, n) => sum + n, 0)}</option>
            {SUDURPASHCHIM_DISTRICTS.map((name) => <option key={name} value={name}>{name} · {districtCounts[name] ?? 0}</option>)}
          </select>
          <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
        </div>
      </section>

      <section className="mb-7">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Property type</p>
        <div className="space-y-1">
          {[ALL_CATEGORIES, ...HOTEL_CATEGORIES].map((item) => (
            <button key={item} type="button" aria-pressed={category === item} onClick={() => onCategoryChange(item)} className={`flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-left text-sm transition ${category === item ? "bg-accent/10 font-medium text-accent" : "text-foreground-secondary hover:bg-background-secondary hover:text-foreground"}`}>
              {item}<span className={`h-1.5 w-1.5 rounded-full ${category === item ? "bg-accent" : "bg-transparent"}`} />
            </button>
          ))}
        </div>
      </section>

      <section>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">Amenities</p>
        <div className="grid grid-cols-2 gap-x-2 gap-y-3">
          {shownAmenities.map((amenity) => (
            <label key={amenity} className="flex cursor-pointer items-center gap-2 text-xs text-foreground-secondary">
              <input type="checkbox" checked={amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} className="h-4 w-4 rounded-sm border-border accent-sky-600 focus:ring-accent" />
              {amenity}
            </label>
          ))}
        </div>
        <button type="button" onClick={() => setShowAllAmenities((value) => !value)} className="mt-4 text-xs font-medium text-accent hover:underline">{showAllAmenities ? "Show fewer" : "Show all amenities"}</button>
      </section>

      {hasActiveFilters && <button type="button" onClick={onClear} className="mt-6 flex w-full items-center justify-center gap-2 border-t border-border pt-4 text-xs text-foreground-muted hover:text-foreground"><X size={13} /> Reset selections</button>}
    </aside>
  );
}
