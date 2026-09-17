import { useEffect, useState } from "react";
import { MdClose, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaFacebookF, FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa";

const SOCIALS = [
  { key: "facebook",  Icon: FaFacebookF, label: "Facebook",  bg: "#1877F2" },
  { key: "whatsapp",  Icon: FaWhatsapp,  label: "WhatsApp",  bg: "#25D366" },
  { key: "instagram", Icon: FaInstagram, label: "Instagram", bg: "linear-gradient(135deg,#833AB4,#FD1D1D,#FCAF45)" },
  { key: "tiktok",    Icon: FaTiktok,    label: "TikTok",    bg: "#111" },
];

export default function HotelModal({ hotel, onClose }) {
  const [idx, setIdx] = useState(0);
  const images = hotel.images || [];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const h = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const prev = () => setIdx(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIdx(i => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/50"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white dark:bg-dark-900 border border-surface-200 dark:border-dark-800
          w-full sm:max-w-xl max-h-[92vh] sm:max-h-[86vh]
          rounded-t-lg sm:rounded-lg overflow-hidden flex flex-col shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        {/* Gallery */}
        <div className="relative h-48 sm:h-56 bg-surface-200 dark:bg-dark-800 flex-shrink-0">
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
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/60
                      text-surface-800 dark:text-white rounded p-1 border border-surface-200 dark:border-dark-700"
                  >
                    <MdChevronLeft size={20} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/60
                      text-surface-800 dark:text-white rounded p-1 border border-surface-200 dark:border-dark-700"
                  >
                    <MdChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIdx(i)}
                        className={`rounded-full transition-all ${i === idx ? "w-3 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-surface-400 dark:text-dark-600 text-sm">No photos</span>
            </div>
          )}

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-2 right-2 bg-white/80 dark:bg-black/60
              text-surface-800 dark:text-white rounded p-1
              border border-surface-200 dark:border-dark-700"
          >
            <MdClose size={18} />
          </button>

          <span className="absolute top-2 left-2 bg-white/90 dark:bg-dark-900/90 text-surface-700 dark:text-dark-300 text-[10px] font-medium px-2 py-0.5 rounded">
            {hotel.category}
          </span>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-5">

          {/* Name & address */}
          <div className="mb-4">
            <h2 className="text-surface-900 dark:text-white text-lg font-bold">{hotel.name}</h2>
            <p className="text-surface-500 dark:text-dark-500 text-xs mt-0.5">{hotel.address}</p>
          </div>

          {/* Description */}
          <p className="text-surface-600 dark:text-dark-400 text-sm leading-relaxed mb-4">
            {hotel.description}
          </p>

          {/* Key info table */}
          <table className="w-full text-xs mb-4 border border-surface-200 dark:border-dark-700 rounded-md overflow-hidden">
            <tbody className="divide-y divide-surface-200 dark:divide-dark-700">
              {[
                { label: "Rooms",        value: hotel.rooms },
                { label: "Established",  value: hotel.established },
                { label: "Member Since", value: hotel.memberSince },
                { label: "District",     value: hotel.district },
                { label: "Email",        value: hotel.email, isEmail: true },
              ].map(({ label, value, isEmail }) => (
                <tr key={label}>
                  <td className="px-3 py-2 text-surface-500 dark:text-dark-500 bg-surface-50 dark:bg-dark-800 w-1/3">{label}</td>
                  <td className="px-3 py-2 text-surface-900 dark:text-white font-medium">
                    {isEmail
                      ? <a href={`mailto:${value}`} className="text-primary-600 dark:text-primary-400 hover:underline">{value}</a>
                      : value
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Amenities */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-surface-700 dark:text-dark-300 mb-2">Amenities</p>
            <p className="text-surface-600 dark:text-dark-400 text-xs leading-relaxed">
              {hotel.amenities.join(" · ")}
            </p>
          </div>

          {/* Footer row: socials + maps */}
          <div className="flex items-center justify-between pt-3 border-t border-surface-200 dark:border-dark-800">
            <div className="flex gap-2">
              {SOCIALS.map(({ key, Icon, label, bg }) => {
                const href = hotel.social?.[key];
                return href ? (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="w-8 h-8 rounded flex items-center justify-center text-white"
                    style={{ background: bg }}
                  >
                    <Icon size={13} />
                  </a>
                ) : null;
              })}
            </div>
            <a
              href={`https://maps.google.com/?q=${hotel.mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
