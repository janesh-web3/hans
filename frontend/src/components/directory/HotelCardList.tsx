import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { ApiHotel } from "@/types/hotel";

export default function HotelCardList({ hotel }: { hotel: ApiHotel }) {
  return (
    <article className="group grid overflow-hidden rounded-sm border border-border bg-background-card shadow-sm transition hover:shadow-lg md:grid-cols-[minmax(220px,34%)_1fr]">
      <Link to={`/hotel/${hotel._id}`} className="relative block aspect-[16/10] overflow-hidden bg-background-secondary md:aspect-auto md:min-h-[240px]">
        {hotel.images?.[0] ? <img src={hotel.images[0]} alt={hotel.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" /> : <div className="flex h-full min-h-48 items-center justify-center text-sm text-foreground-muted">Photo coming soon</div>}
        <span className="absolute left-4 top-4 rounded-full bg-sky-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">HAN member</span>
      </Link>
      <div className="flex flex-col justify-center p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">{hotel.category}</span><span className="text-xs text-foreground-muted">{hotel.images?.length ?? 0} photos</span></div>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground"><Link to={`/hotel/${hotel._id}`}>{hotel.name}</Link></h2>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-foreground-muted"><MapPin size={14} className="text-accent" />{hotel.district} District · {hotel.contactInfo.address}</p>
        <p className="mt-4 text-sm leading-6 text-foreground-secondary">{hotel.description}</p>
        {hotel.amenities.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{hotel.amenities.map((item) => <span key={item} className="rounded-full bg-background-secondary px-3 py-1 text-xs text-foreground-secondary">{item}</span>)}</div>}
        <div className="mt-6 flex justify-end border-t border-border pt-4"><Link to={`/hotel/${hotel._id}`} className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">Explore property <ArrowUpRight size={15} /></Link></div>
      </div>
    </article>
  );
}
