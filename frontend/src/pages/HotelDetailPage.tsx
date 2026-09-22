import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FiArrowLeft, FiMapPin, FiPhone, FiMail, FiGlobe, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { useHotel } from "@/hooks/useHotels";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function HotelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: hotel, isLoading, isError, error, refetch } = useHotel(id);
  const [idx, setIdx] = useState(0);

  const images = hotel?.images ?? [];
  const prev = () => setIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <Link
          to="/membership"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 dark:text-primary-400 hover:underline mb-6"
        >
          <FiArrowLeft size={14} /> Back to Directory
        </Link>

        {isLoading && (
          <div className="space-y-6">
            <Skeleton className="h-72 sm:h-96 w-full rounded-xl" />
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        )}

        {isError && (
          <Alert variant="destructive">
            <FiAlertCircle className="h-4 w-4" />
            <AlertTitle>Couldn't load this hotel</AlertTitle>
            <AlertDescription className="flex items-center justify-between gap-4">
              <span>
                {error instanceof Error ? error.message : "It may not exist, or something went wrong."}
              </span>
              <Button size="sm" variant="outline" onClick={() => refetch()} className="flex-shrink-0">
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {hotel && (
          <>
            {/* ── Gallery ──────────────────────────────────────────────── */}
            <div className="relative h-80 sm:h-[28rem] rounded-xl overflow-hidden bg-muted mb-6">
              {images.length > 0 ? (
                <>
                  <img
                    key={idx}
                    src={images[idx]}
                    alt={`${hotel.name} photo ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        aria-label="Previous photo"
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/85 dark:bg-black/60 text-foreground rounded-full p-2 border border-border"
                      >
                        <MdChevronLeft size={22} />
                      </button>
                      <button
                        onClick={next}
                        aria-label="Next photo"
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/85 dark:bg-black/60 text-foreground rounded-full p-2 border border-border"
                      >
                        <MdChevronRight size={22} />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setIdx(i)}
                            aria-label={`Photo ${i + 1}`}
                            className={`rounded-full transition-all ${i === idx ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-foreground-muted text-sm">No photos available</span>
                </div>
              )}
              <span className="badge-accent absolute top-4 left-4 shadow-sm">Verified Member</span>
              <Badge className="absolute top-4 right-4 bg-black/50 hover:bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-[11px] uppercase tracking-widest">
                {hotel.category}
              </Badge>
            </div>

            <div className="grid lg:grid-cols-[1fr_320px] gap-10">

              {/* ── Main content ─────────────────────────────────────── */}
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2 tracking-tight">
                  {hotel.name}
                </h1>
                <p className="flex items-center gap-1.5 text-foreground-muted text-sm mb-6">
                  <FiMapPin size={14} className="flex-shrink-0" />
                  {hotel.district} District — {hotel.contactInfo.address}
                </p>

                <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-3">
                  About
                </h2>
                <p className="text-foreground-secondary text-sm leading-relaxed mb-8">
                  {hotel.description}
                </p>

                {hotel.amenities.length > 0 && (
                  <>
                    <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-3">
                      Amenities
                    </h2>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4 mb-8">
                      {hotel.amenities.map((a) => (
                        <li key={a} className="flex items-center gap-2 text-sm text-foreground-secondary">
                          <FiCheckCircle size={14} className="text-primary-600 dark:text-primary-400 flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {/* ── Contact card ─────────────────────────────────────── */}
              <div>
                <Card className="rounded-xl overflow-hidden border-t-4 border-t-river-500 shadow-lg sticky top-24">
                  <div className="bg-primary-800 px-6 py-4">
                    <p className="text-white font-bold text-sm">Contact Details</p>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <FiMapPin className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" size={16} />
                      <span className="text-sm text-foreground-secondary leading-relaxed">
                        {hotel.contactInfo.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiPhone className="text-primary-600 dark:text-primary-400 flex-shrink-0" size={16} />
                      <a href={`tel:${hotel.contactInfo.phone}`} className="text-sm text-foreground-secondary hover:text-primary-700 dark:hover:text-primary-400">
                        {hotel.contactInfo.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiMail className="text-primary-600 dark:text-primary-400 flex-shrink-0" size={16} />
                      <a href={`mailto:${hotel.contactInfo.email}`} className="text-sm text-foreground-secondary hover:text-primary-700 dark:hover:text-primary-400 break-all">
                        {hotel.contactInfo.email}
                      </a>
                    </div>
                    {hotel.websiteUrl && (
                      <div className="flex items-center gap-3">
                        <FiGlobe className="text-primary-600 dark:text-primary-400 flex-shrink-0" size={16} />
                        <a href={hotel.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-foreground-secondary hover:text-primary-700 dark:hover:text-primary-400 break-all">
                          Visit Website
                        </a>
                      </div>
                    )}

                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(`${hotel.name} ${hotel.contactInfo.address}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-xs font-semibold text-primary-700 dark:text-primary-400 hover:underline pt-2"
                    >
                      View on Google Maps →
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
