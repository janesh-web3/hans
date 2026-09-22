import { Link } from "react-router-dom";
import { FiMapPin, FiExternalLink } from "react-icons/fi";
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
        rounded-lg overflow-hidden shadow-sm
        hover:border-primary-400 dark:hover:border-primary-700
        hover:shadow-lg transition-all duration-200 flex flex-col"
    >

      {/* Cover image */}
      <div className="relative overflow-hidden bg-surface-100 dark:bg-dark-800" style={{ height: "200px" }}>
        {cover ? (
          <img
            src={cover}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-surface-300 dark:text-dark-600 text-xs font-medium">No photo</span>
          </div>
        )}

        {/* Category badge — top left */}
        <span className="absolute top-0 left-0 bg-primary-700 text-white text-[10px] font-bold
          uppercase tracking-widest px-3 py-1.5 rounded-br-lg">
          {hotel.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">

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
          <span className="text-primary-600 dark:text-primary-400 text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2">
            View details <FiExternalLink size={10} />
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
