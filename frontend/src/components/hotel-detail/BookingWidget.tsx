import { MapPin, Phone, Send } from "lucide-react";
import type { ApiHotel } from "@/types/hotel";

export default function BookingWidget({ hotel }: { hotel: ApiHotel }) {
  return (
    <>
      <aside className="sticky top-28 hidden rounded-sm border border-border bg-background-card p-6 shadow-lg lg:block">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Plan your stay</p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground">Contact the property</h2>
        <p className="mt-2 text-sm leading-6 text-foreground-secondary">Reach out directly to ask about availability, room options and current rates.</p>
        <div className="mt-6 space-y-3">
          <a href={`tel:${hotel.contactInfo.phone}`} className="flex min-h-12 items-center justify-center gap-2 bg-accent px-4 text-sm font-medium text-accent-foreground transition hover:bg-accent-vivid"><Phone size={15} /> Call the hotel</a>
        </div>
        <div className="mt-5 flex items-start gap-2 border-t border-border pt-4 text-xs leading-5 text-foreground-muted"><MapPin size={14} className="mt-0.5 shrink-0 text-accent" />{hotel.contactInfo.address}, {hotel.district}</div>
        {hotel.websiteUrl && <a href={hotel.websiteUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-accent hover:underline"><Send size={13} /> Visit property website</a>}
      </aside>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 shadow-2xl backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-lg gap-2">
          <a href={`tel:${hotel.contactInfo.phone}`} className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-accent px-4 text-sm font-medium text-accent-foreground"><Phone size={15} /> Call hotel</a>
          {hotel.websiteUrl && <a href={hotel.websiteUrl} target="_blank" rel="noreferrer" className="flex min-h-12 flex-1 items-center justify-center gap-2 border border-border px-4 text-sm font-medium text-foreground">Website <Send size={14} /></a>}
        </div>
      </div>
    </>
  );
}
