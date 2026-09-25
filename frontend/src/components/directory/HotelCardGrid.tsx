import { Link } from "react-router-dom";
import { ArrowUpRight, Camera, MapPin, Wifi } from "lucide-react";
import type { ApiHotel } from "@/types/hotel";

export default function HotelCardGrid({ hotel }: { hotel: ApiHotel }) {
  const cover = hotel.images?.[0];
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-background-card shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/hotel/${hotel._id}`} aria-label={`View ${hotel.name}`} className="relative block aspect-[4/3] overflow-hidden bg-background-secondary">
        {cover ? <img src={cover} alt={hotel.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-sm text-foreground-muted">Photo coming soon</div>}
        <span className="absolute left-4 top-4 rounded-full bg-sky-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">HAN member</span>
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium text-slate-800 shadow-sm backdrop-blur">{hotel.category}</span>
        {hotel.images?.length > 1 && <span className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-slate-950/65 px-2.5 py-1 text-xs text-white"><Camera size={12} />{hotel.images.length}</span>}
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="line-clamp-1 font-serif text-xl font-semibold text-foreground transition-colors group-hover:text-accent"><Link to={`/hotel/${hotel._id}`}>{hotel.name}</Link></h2>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-foreground-muted"><MapPin size={13} className="text-accent" />{hotel.district} District</p>
        <p className="mt-4 line-clamp-2 flex-1 text-sm leading-6 text-foreground-secondary">{hotel.description}</p>
        <p className="mt-3 line-clamp-1 text-xs text-foreground-muted">{hotel.contactInfo.address}</p>
        {hotel.amenities.length > 0 && <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-foreground-muted">{hotel.amenities.slice(0, 3).map((amenity, index) => <span key={amenity} className="inline-flex items-center gap-1">{index === 0 && <Wifi size={12} className="text-accent" />}{amenity}</span>)}{hotel.amenities.length > 3 && <span>+{hotel.amenities.length - 3} more</span>}</div>}
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground-muted">Member property</span>
          <Link to={`/hotel/${hotel._id}`} className="inline-flex items-center gap-1.5 border border-accent/30 px-3 py-2 text-xs font-medium text-accent transition hover:bg-accent hover:text-accent-foreground">View details <ArrowUpRight size={13} /></Link>
        </div>
      </div>
    </article>
  );
}
