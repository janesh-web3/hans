import { Link } from "react-router-dom";
import { FiMapPin, FiArrowUpRight } from "react-icons/fi";
import type { ApiHotel } from "@/types/hotel";

interface HotelCardProps {
  hotel: ApiHotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const cover = hotel.images?.[0];

  return (
    <Link
      to={`/hotel/${hotel._id}`}
      className="group bg-white dark:bg-dark-900 border border-surface-200 dark:border-dark-700
        rounded-xl overflow-hidden shadow-sm
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300 flex flex-col"
    >

      {/* Cover image */}
      <div className="relative overflow-hidden bg-surface-100 dark:bg-dark-800" style={{ aspectRatio: "4 / 3" }}>
        {cover ? (
          <img
            src={cover}
            alt={hotel.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-surface-300 dark:text-dark-600 text-xs font-medium">No photo</span>
          </div>
        )}

        {/* Verified badge — top left */}
        <span className="badge-gold absolute top-4 left-4 shadow-sm">Verified Member</span>

        {/* Category badge — top right */}
        <span className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold
          uppercase tracking-wide px-2.5 py-1 rounded-full">
          {hotel.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">

        {/* Name + district */}
        <h3 className="text-surface-900 dark:text-white font-bold text-base leading-snug mb-1.5 line-clamp-2 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
          {hotel.name}
        </h3>
        <p className="flex items-center gap-1.5 text-surface-400 dark:text-dark-500 text-xs font-medium mb-3">
          <FiMapPin size={11} className="flex-shrink-0" />
          {hotel.district} District
        </p>

        {/* Description */}
        <p className="text-surface-500 dark:text-dark-400 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
          {hotel.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-dark-800">
          <p className="text-surface-400 dark:text-dark-600 text-xs truncate">
            {hotel.contactInfo.address}
          </p>
          <span className="text-primary-600 dark:text-primary-400 text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-[-4px] transition-all flex-shrink-0 ml-2">
            View details <FiArrowUpRight size={12} />
          </span>
        </div>

        {/* Amenities */}
        {hotel.amenities.length > 0 && (
          <p className="text-surface-400 dark:text-dark-600 text-xs mt-2 line-clamp-1">
            {hotel.amenities.slice(0, 4).join("  ·  ")}
            {hotel.amenities.length > 4 && `  ·  +${hotel.amenities.length - 4} more`}
          </p>
        )}

      </div>
    </Link>
  );
}
