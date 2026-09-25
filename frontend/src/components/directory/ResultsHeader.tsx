import { Grid2X2, List, SlidersHorizontal, X } from "lucide-react";

export interface ActiveDirectoryFilter { key: string; label: string; remove: () => void }
interface ResultsHeaderProps {
  count: number;
  total: number;
  filters: ActiveDirectoryFilter[];
  sort: string;
  view: "grid" | "list" | "map";
  onSortChange: (value: string) => void;
  onViewChange: (value: "grid" | "list" | "map") => void;
  onOpenFilters: () => void;
  activeFilterCount: number;
}

export default function ResultsHeader({ count, total, filters, sort, view, onSortChange, onViewChange, onOpenFilters, activeFilterCount }: ResultsHeaderProps) {
  return (
    <div className="mb-6 border-b border-border pb-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <p className="text-sm text-foreground-secondary">Showing <strong className="font-semibold text-foreground">{count}</strong> of <strong className="font-semibold text-foreground">{total}</strong> properties</p>
          <button onClick={onOpenFilters} className="inline-flex items-center gap-1.5 border border-border px-3 py-2 text-xs text-foreground-secondary lg:hidden"><SlidersHorizontal size={13} /> Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}</button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="directory-sort" className="sr-only">Sort properties</label>
          <select id="directory-sort" value={sort} onChange={(event) => onSortChange(event.target.value)} className="h-10 border border-border bg-background-card px-3 text-xs text-foreground outline-none focus:border-accent">
            <option value="recommended">Recommended</option><option value="name">Name A–Z</option><option value="newest">Newest</option>
          </select>
          <div className="flex border border-border" aria-label="Results view">
            {([ ["grid", Grid2X2, "Grid"], ["list", List, "List"] ] as const).map(([mode, Icon, label]) => <button key={mode} type="button" aria-label={`${label} view`} aria-pressed={view === mode} onClick={() => onViewChange(mode)} className={`grid h-10 w-10 place-items-center transition ${view === mode ? "bg-accent text-accent-foreground" : "text-foreground-muted hover:bg-background-secondary"}`}><Icon size={16} /></button>)}
          </div>
          <button type="button" aria-pressed={view === "map"} onClick={() => onViewChange(view === "map" ? "grid" : "map")} className={`h-10 px-3 text-xs transition ${view === "map" ? "bg-accent text-accent-foreground" : "border border-border text-foreground-secondary hover:bg-background-secondary"}`}>Map</button>
        </div>
      </div>
      {filters.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{filters.map((filter) => <button key={filter.key} type="button" onClick={filter.remove} className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1.5 text-xs text-sky-800 transition hover:bg-sky-200 dark:bg-sky-950 dark:text-sky-200 dark:hover:bg-sky-900">{filter.label}<X size={12} /></button>)}</div>}
    </div>
  );
}
