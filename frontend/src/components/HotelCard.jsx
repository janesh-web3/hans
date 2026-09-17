import { useState } from "react";
import { FiMapPin, FiExternalLink } from "react-icons/fi";
import { FaFacebookF, FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa";
import HotelModal from "./HotelModal";

const socialDefs = [
  { key: "facebook",  Icon: FaFacebookF, label: "Facebook",  color: "#1877F2" },
  { key: "whatsapp",  Icon: FaWhatsapp,  label: "WhatsApp",  color: "#25D366" },
  { key: "instagram", Icon: FaInstagram, label: "Instagram", color: "#E1306C" },
  { key: "tiktok",    Icon: FaTiktok,    label: "TikTok",    color: "#111"    },
];

export default function HotelCard({ hotel }) {
  const [open, setOpen] = useState(false);
  const cover = hotel.images?.[0];

  return (
    <>
      <article
        className="group bg-white dark:bg-dark-900 border border-surface-200 dark:border-dark-700
          hover:border-primary-400 dark:hover:border-primary-700
          hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col"
        onClick={() => setOpen(true)}
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
          <span className="absolute top-0 left-0 bg-primary-600 text-white text-[10px] font-bold
            uppercase tracking-widest px-3 py-1.5">
            {hotel.category}
          </span>

          {/* Social links — bottom right */}
          <div
            className="absolute bottom-3 right-3 flex gap-1.5"
            onClick={e => e.stopPropagation()}
          >
            {socialDefs.map(({ key, Icon, label, color }) => {
              const href = hotel.social?.[key];
              return href ? (
                <a
                  key={key} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label} title={label}
                  className="w-7 h-7 flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: color }}
                >
                  <Icon size={11} />
                </a>
              ) : null;
            })}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">

          {/* Name + location */}
          <h3 className="text-surface-900 dark:text-white font-bold text-base leading-snug mb-1.5 line-clamp-2 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
            {hotel.name}
          </h3>
          <p className="flex items-center gap-1.5 text-surface-400 dark:text-dark-500 text-xs font-medium mb-3">
            <FiMapPin size={11} className="flex-shrink-0" />
            {hotel.location}
          </p>

          {/* Description */}
          <p className="text-surface-500 dark:text-dark-400 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
            {hotel.description}
          </p>

          {/* Meta row */}
          <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-dark-800">
            <p className="text-surface-400 dark:text-dark-600 text-xs">
              {hotel.rooms} rooms &nbsp;·&nbsp; Est. {hotel.established}
            </p>
            <span className="text-primary-600 dark:text-primary-400 text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              View details <FiExternalLink size={10} />
            </span>
          </div>

          {/* Amenities */}
          <p className="text-surface-400 dark:text-dark-600 text-xs mt-2 line-clamp-1">
            {hotel.amenities.slice(0, 4).join("  ·  ")}
            {hotel.amenities.length > 4 && `  ·  +${hotel.amenities.length - 4} more`}
          </p>

        </div>
      </article>

      {open && <HotelModal hotel={hotel} onClose={() => setOpen(false)} />}
    </>
  );
}
