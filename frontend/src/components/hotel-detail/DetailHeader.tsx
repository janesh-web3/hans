import { MapPin, Share2 } from "lucide-react";
import type { ApiHotel } from "@/types/hotel";

export default function DetailHeader({ hotel }: { hotel: ApiHotel }) {
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: hotel.name, url });
      else if (navigator.clipboard) await navigator.clipboard.writeText(url);
    } catch {
      // Sharing can be dismissed by the visitor; keep the page interaction quiet.
    }
  };
  return (
    <div className="relative z-0 border-b border-border bg-background">
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="truncate font-serif text-xl font-semibold text-foreground sm:text-2xl">{hotel.name}</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-foreground-muted"><MapPin size={13} className="shrink-0 text-accent" />{hotel.contactInfo.address}, {hotel.district} District, Sudurpashchim</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={share} className="inline-flex h-10 items-center gap-2 border border-border px-3 text-xs font-medium text-foreground-secondary transition hover:border-accent hover:text-accent"><Share2 size={15} /> <span className="hidden sm:inline">Share</span></button>
        </div>
      </div>
    </div>
  );
}
