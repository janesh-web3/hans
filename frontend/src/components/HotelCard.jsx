import { useState } from "react";
import { motion } from "framer-motion";
import { MdLocationOn, MdHotel } from "react-icons/md";
import { FaFacebookF, FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa";
import HotelModal from "./HotelModal";

const categoryColors = {
  "5 Star":     "bg-yellow-50 text-yellow-700",
  "4 Star":     "bg-purple-50 text-purple-700",
  "3 Star":     "bg-blue-50   text-blue-700",
  "2 Star":     "bg-green-50  text-green-700",
  "1 Star":     "bg-gray-100  text-gray-600",
  Resort:       "bg-teal-50   text-teal-700",
  "Guest House":"bg-orange-50 text-orange-700",
  Lodge:        "bg-amber-50  text-amber-700",
  Homestay:     "bg-pink-50   text-pink-700",
};

const gradients = [
  "from-primary-500 to-primary-700",
  "from-secondary-500 to-secondary-700",
  "from-teal-500 to-primary-600",
  "from-primary-400 to-secondary-600",
  "from-emerald-500 to-primary-600",
];

const socialDefs = [
  { key: "facebook",  icon: <FaFacebookF size={13} />, label: "Facebook",  bg: "bg-[#1877F2]" },
  { key: "whatsapp",  icon: <FaWhatsapp  size={13} />, label: "WhatsApp",  bg: "bg-[#25D366]" },
  { key: "instagram", icon: <FaInstagram size={13} />, label: "Instagram", bg: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]" },
  { key: "tiktok",    icon: <FaTiktok    size={13} />, label: "TikTok",    bg: "bg-gray-900" },
];

export default function HotelCard({ hotel }) {
  const [modalOpen, setModalOpen] = useState(false);
  const gradient   = gradients[(hotel.id - 1) % gradients.length];
  const badge      = categoryColors[hotel.category] || "bg-gray-100 text-gray-600";
  const coverImage = hotel.images?.[0];

  return (
    <>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden cursor-pointer transition-shadow duration-300 group"
        onClick={() => setModalOpen(true)}
      >
        {/* Cover */}
        <div className="relative h-44 overflow-hidden">
          {coverImage ? (
            <>
              <img
                src={coverImage}
                alt={hotel.name}
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            </>
          ) : (
            <div className={`bg-gradient-to-br ${gradient} w-full h-full flex items-center justify-center`}>
              <MdHotel className="text-white/20 absolute" size={80} />
              <MdHotel className="text-white relative z-10" size={36} />
            </div>
          )}

          {/* Category badge */}
          <span className={`absolute top-3 left-3 text-[11px] font-semibold px-2 py-0.5 rounded-full ${badge}`}>
            {hotel.category}
          </span>

          {/* Social icons — stop propagation */}
          <div
            className="absolute bottom-3 right-3 flex gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            {socialDefs.map(({ key, icon, label, bg }) => {
              const href = hotel.social?.[key];
              return href ? (
                <motion.a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className={`${bg} text-white w-7 h-7 rounded-lg flex items-center justify-center shadow`}
                >
                  {icon}
                </motion.a>
              ) : null;
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-gray-800 text-base leading-snug mb-0.5 group-hover:text-primary-600 transition-colors line-clamp-1">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
            <MdLocationOn className="text-primary-500 flex-shrink-0" size={13} />
            {hotel.location}
          </div>

          <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
            {hotel.description}
          </p>

          {/* Stats row */}
          <div className="flex gap-2 mb-3">
            {[
              { val: hotel.rooms,      label: "Rooms",  cls: "bg-primary-50 text-primary-700"   },
              { val: hotel.established, label: "Est.",   cls: "bg-gray-50   text-gray-700"       },
              { val: hotel.memberSince, label: "Member", cls: "bg-secondary-50 text-secondary-700" },
            ].map(({ val, label, cls }) => (
              <div key={label} className={`flex-1 ${cls} rounded-lg px-2 py-1.5 text-center`}>
                <p className="font-bold text-sm leading-none">{val}</p>
                <p className="text-[10px] mt-0.5 opacity-70">{label}</p>
              </div>
            ))}
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1">
            {hotel.amenities.slice(0, 3).map((a) => (
              <span key={a} className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">{a}</span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="bg-primary-50 text-primary-600 text-[10px] px-2 py-0.5 rounded-full">
                +{hotel.amenities.length - 3}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {modalOpen && <HotelModal hotel={hotel} onClose={() => setModalOpen(false)} />}
    </>
  );
}
