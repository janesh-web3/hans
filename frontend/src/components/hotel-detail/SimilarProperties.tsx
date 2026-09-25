import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useHotels } from "@/hooks/useHotels";
import HotelCardGrid from "@/components/directory/HotelCardGrid";
import type { ApiHotel } from "@/types/hotel";

export default function SimilarProperties({ hotel }: { hotel: ApiHotel }) {
  const { data } = useHotels({ allPages: true });
  const others = (data?.data ?? []).filter((item) => item._id !== hotel._id);
  const similar = [
    ...others.filter((item) => item.district === hotel.district && item.category === hotel.category),
    ...others.filter((item) => item.district === hotel.district && item.category !== hotel.category),
    ...others.filter((item) => item.district !== hotel.district),
  ].filter((item, index, all) => all.findIndex((candidate) => candidate._id === item._id) === index).slice(0, 3);
  if (similar.length === 0) return null;
  return <section className="border-y border-border bg-background-secondary py-14 sm:py-16">
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Continue exploring</p><h2 className="mt-2 font-serif text-3xl font-semibold text-foreground">You may also like</h2></div><Link to="/directory" className="hidden items-center gap-2 text-sm font-medium text-accent hover:underline sm:inline-flex">Browse all <ArrowRight size={15} /></Link></div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{similar.map((item) => <HotelCardGrid key={item._id} hotel={item} />)}</div>
      <Link to="/directory" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline sm:hidden">Browse all properties <ArrowRight size={15} /></Link>
    </div>
  </section>;
}
