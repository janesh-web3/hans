import { Link, useParams } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import GalleryHero from "@/components/hotel-detail/GalleryHero";
import DetailHeader from "@/components/hotel-detail/DetailHeader";
import BookingWidget from "@/components/hotel-detail/BookingWidget";
import MainContentTabs from "@/components/hotel-detail/MainContentTabs";
import SimilarProperties from "@/components/hotel-detail/SimilarProperties";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useHotel } from "@/hooks/useHotels";

export default function HotelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: hotel, isLoading, isError, error, refetch } = useHotel(id);

  if (isLoading) return <main className="min-h-screen bg-background">
    <Skeleton className="h-[58vh] min-h-[420px] w-full rounded-none" />
    <div className="mx-auto max-w-screen-2xl space-y-5 px-4 py-10 sm:px-6 lg:px-8"><Skeleton className="h-8 w-2/3" /><Skeleton className="h-4 w-1/3" /><div className="grid gap-10 pt-8 lg:grid-cols-[minmax(0,1fr)_350px]"><div className="space-y-5"><Skeleton className="h-8 w-1/2" /><Skeleton className="h-28 w-full" /><Skeleton className="h-48 w-full" /></div><Skeleton className="h-72 w-full" /></div></div>
  </main>;

  if (isError || !hotel) return <main className="mx-auto flex min-h-[65vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
    <AlertCircle size={36} className="text-accent" /><h1 className="mt-5 font-serif text-3xl font-semibold text-foreground">Property details unavailable</h1>
    <p className="mt-3 text-sm leading-6 text-foreground-secondary">{error instanceof Error ? error.message : "This property may have been removed or is temporarily unavailable."}</p>
    <div className="mt-6 flex gap-3"><Button variant="outline" onClick={() => refetch()}>Try again</Button><Button asChild><Link to="/directory">Back to directory</Link></Button></div>
  </main>;

  return <main className="min-h-screen bg-background pb-24 lg:pb-0">
    <GalleryHero name={hotel.name} category={hotel.category} images={hotel.images ?? []} />
    <div className="border-b border-border bg-background"><div className="mx-auto max-w-screen-2xl px-4 py-3 sm:px-6 lg:px-8"><Link to="/directory" className="inline-flex items-center gap-2 text-xs font-medium text-foreground-muted transition hover:text-accent"><ArrowLeft size={14} /> Back to member properties</Link></div></div>
    <DetailHeader hotel={hotel} />
    <div className="mx-auto grid max-w-screen-2xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-14 lg:px-8">
      <MainContentTabs hotel={hotel} />
      <div className="pt-8"><BookingWidget hotel={hotel} /></div>
    </div>
    <SimilarProperties hotel={hotel} />
  </main>;
}
