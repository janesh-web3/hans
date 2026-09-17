import { useState } from "react";
import { motion } from "framer-motion";
import { MdLocationOn, MdHotel } from "react-icons/md";
import { FaFacebookF, FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa";
import HotelModal from "./HotelModal";

const categoryBadge = {
  "5 Star":     "text-yellow-400 border-yellow-800 bg-yellow-950/40",
  "4 Star":     "text-purple-400 border-purple-800 bg-purple-950/40",
  "3 Star":     "text-blue-400   border-blue-800   bg-blue-950/40",
  "2 Star":     "text-green-400  border-green-800  bg-green-950/40",
  "1 Star":     "text-dark-400   border-dark-700   bg-dark-800/40",
  Resort:       "text-teal-400   border-teal-800   bg-teal-950/40",
  "Guest House":"text-orange-400 border-orange-800 bg-orange-950/40",
  Lodge:        "text-amber-400  border-amber-800  bg-amber-950/40",
  Homestay:     "text-pink-400   border-pink-800   bg-pink-950/40",
};

const socialDefs = [
  { key: "facebook",  Icon: FaFacebookF, label: "Facebook",  bg: "#1877F2" },
  { key: "whatsapp",  Icon: FaWhatsapp,  label: "WhatsApp",  bg: "#25D366" },
  { key: "instagram", Icon: FaInstagram, label: "Instagram", bg: "linear-gradient(135deg,#833AB4,#FD1D1D,#FCAF45)" },
  { key: "tiktok",    Icon: FaTiktok,    label: "TikTok",    bg: "#111" },
];

export default function HotelCard({ hotel }) {
  const [open, setOpen] = useState(false);

  const badge  = categoryBadge[hotel.category] || "text-dark-400 border-dark-700 bg-dark-800/40";
  const cover  = hotel.images?.[0];

  return (
    <>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="card-hover overflow-hidden cursor-pointer rounded-xl group"
        onClick={() => setOpen(true)}
      >
        {/* Cover */}
        <div className="relative h-44 overflow-hidden bg-dark-800">
          {cover ? (
            <img
              src={cover}
              alt={hotel.name}
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
              style={{ filter: "brightness(0.75)" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-dark-800">
              <MdHotel size={40} className="text-dark-700" />
            </div>
          )}

          {/* Category badge */}
          <span className={`absolute top-3 left-3 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badge}`}>
            {hotel.category}
          </span>

          {/* Social icons — stop propagation */}
          <div
            className="absolute bottom-3 right-3 flex gap-1.5"
            onClick={e => e.stopPropagation()}
          >
            {socialDefs.map(({ key, Icon, label, bg }) => {
              const href = hotel.social?.[key];
              return href ? (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-md"
                  style={{ background: bg }}
                  onClick={e => e.stopPropagation()}
                >
                  <Icon size={12} />
                </a>
              ) : null;
            })}
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-sm leading-snug mb-1 group-hover:text-primary-400 transition-colors line-clamp-1">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1 text-dark-500 text-xs mb-3">
            <MdLocationOn size={12} className="text-primary-600 flex-shrink-0" />
            {hotel.location}
          </div>

          <p className="text-dark-500 text-xs leading-relaxed mb-3 line-clamp-2">
            {hotel.description}
          </p>

          {/* Stats */}
          <div className="flex gap-2 mb-3">
            {[
              { v: hotel.rooms,       l: "Rooms",  c: "text-primary-400"   },
              { v: hotel.established, l: "Est.",    c: "text-dark-300"      },
              { v: hotel.memberSince, l: "Member",  c: "text-secondary-400" },
            ].map(({ v, l, c }) => (
              <div key={l} className="flex-1 bg-dark-800 rounded-lg px-2 py-1.5 text-center border border-dark-700">
                <p className={`font-bold text-sm leading-none ${c}`}>{v}</p>
                <p className="text-dark-600 text-[10px] mt-0.5">{l}</p>
              </div>
            ))}
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1">
            {hotel.amenities.slice(0, 3).map(a => (
              <span key={a} className="text-[10px] text-dark-500 border border-dark-800 px-2 py-0.5 rounded-full">
                {a}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="text-[10px] text-primary-600 border border-primary-900 px-2 py-0.5 rounded-full">
                +{hotel.amenities.length - 3}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {open && <HotelModal hotel={hotel} onClose={() => setOpen(false)} />}
    </>
  );
}
