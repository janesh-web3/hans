import { FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SUDURPASHCHIM_DISTRICTS } from "@/constants/districts";
import { HOTEL_CATEGORIES, ALL_CATEGORIES } from "@/constants/hotelCategories";
import { COMMON_AMENITIES } from "@/constants/amenities";

interface DirectoryFiltersProps {
  district: string;
  onDistrictChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  amenities: string[];
  onAmenitiesChange: (value: string[]) => void;
  hasActiveFilters: boolean;
  onClear: () => void;
}

export default function DirectoryFilters({
  district,
  onDistrictChange,
  category,
  onCategoryChange,
  amenities,
  onAmenitiesChange,
  hasActiveFilters,
  onClear,
}: DirectoryFiltersProps) {
  function toggleAmenity(amenity: string, checked: boolean) {
    onAmenitiesChange(
      checked ? [...amenities, amenity] : amenities.filter((a) => a !== amenity)
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground font-bold text-sm uppercase tracking-widest">
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
          >
            <FiX size={12} /> Clear all
          </button>
        )}
      </div>

      {/* District */}
      <div className="space-y-2.5">
        <Label className="text-xs font-bold text-foreground-muted uppercase tracking-wide">
          District
        </Label>
        <Select value={district} onValueChange={onDistrictChange}>
          <SelectTrigger className="rounded-lg h-10">
            <SelectValue placeholder="All Districts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Districts">All Districts</SelectItem>
            {SUDURPASHCHIM_DISTRICTS.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category */}
      <div className="space-y-2.5">
        <Label className="text-xs font-bold text-foreground-muted uppercase tracking-wide">
          Category
        </Label>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="rounded-lg h-10">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_CATEGORIES}>{ALL_CATEGORIES}</SelectItem>
            {HOTEL_CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Amenities */}
      <div className="space-y-3">
        <Label className="text-xs font-bold text-foreground-muted uppercase tracking-wide">
          Amenities
        </Label>
        <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
          {COMMON_AMENITIES.map((amenity) => (
            <div key={amenity} className="flex items-center gap-2.5">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={amenities.includes(amenity)}
                onCheckedChange={(checked) => toggleAmenity(amenity, checked === true)}
              />
              <Label
                htmlFor={`amenity-${amenity}`}
                className="text-sm font-normal text-foreground-secondary cursor-pointer"
              >
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={onClear}>
          Clear Filters
        </Button>
      )}
    </div>
  );
}
