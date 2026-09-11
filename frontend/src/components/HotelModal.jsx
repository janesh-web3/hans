import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MdClose, MdLocationOn, MdHotel, MdMap, MdEmail,
  MdChevronLeft, MdChevronRight,
} from "react-icons/md";
import { FaFacebookF, FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa";
import { modalBackdrop, modalPanel } from "../lib/animations";

const categoryColors = {
  "5 Star":     "bg-yellow-50 text-yellow-700 border-yellow-200",
  "4 Star":     "bg-purple-50 text-purple-700 border-purple-200",
  "3 Star":     "bg-blue-50   text-blue-700   border-blue-200",
  "2 Star":     "bg-green-50  text-green-700  border-green-200",
  "1 Star":     "bg-gray-100  text-gray-600   border-gray-200",
  Resort:       "bg-teal-50   text-teal-700   border-teal-200",
  "Guest House":"bg-orange-50 text-orange-700 border-orange-200",
  Lodge:        "bg-amber-50  text-amber-700  border-amber-200",
  Homestay:     "bg-pink-50   text-pink-700   border-pink-200",
};

const socialLinks = (hotel) => [
  { href: hotel.social?.facebook,  icon: <FaFacebookF size={15} />, label: "Facebook",  bg: "bg-[#1877F2] hover:bg-[#0d65d9]" },
  { href: hotel.social?.whatsapp,  icon: <FaWhatsapp  size={15} />, label: "WhatsApp",  bg: "bg-[#25D366] hover:bg-[#1ebe57]" },
  { href: hotel.social?.instagram, icon: <FaInstagram size={15} />, label: "Instagram", bg: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-90" },
  { href: hotel.social?.tiktok,    icon: <FaTiktok    size={15} />, label: "TikTok",    bg: "bg-gray-900 hover:bg-gray-700" },
];

export default function HotelModal({ hotel, onClose }) {
  const [activeImg, setActiveImg] = useState(0);
  const images   = hotel.images || [];
  const badge    = categoryColors[hotel.category] || "bg-gray-100 text-gray-600 border-gray-200";

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Escape key
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  function prev() { setActiveImg((i) => (i === 0 ? images.length - 1 : i - 1)); }
  function next() { setActiveImg((i) => (i === images.length - 1 ? 0 : i + 1)); }

  return (
    <AnimatePresence>
      <motion.div
        variants={modalBackdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-[3px]"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          variants={modalPanel}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image gallery */}
          <div className="relative h-52 sm:h-64 bg-gray-100 flex-shrink-0">
            {images.length > 0 ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={images[activeImg]}
                    alt={`${hotel.name} photo ${activeImg + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {images.length > 1 && (
                  <>
                    <button onClick={prev} className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors" aria-label="Previous">
                      <MdChevronLeft size={20} />
                    </button>
                    <button onClick={next} className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors" aria-label="Next">
                      <MdChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button key={i} onClick={() => setActiveImg(i)}
                          className={`rounded-full transition-all ${i === activeImg ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Thumbnails */}
                <div className="absolute bottom-3 right-3 hidden sm:flex gap-1.5">
                  {images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? "border-white" : "border-transparent opacity-60 hover:opacity-100"}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary-50">
                <MdHotel className="text-primary-200" size={72} />
              </div>
            )}

            {/* Overlays */}
            <button onClick={onClose} aria-label="Close"
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors z-10">
              <MdClose size={18} />
            </button>
            <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full border ${badge}`}>
              {hotel.category}
            </span>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 p-5 space-y-4">

            {/* Title + stats */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-xl font-bold text-gray-800 leading-tight truncate">{hotel.name}</h2>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-1">
                  <MdLocationOn className="text-primary-500 flex-shrink-0" size={13} />
                  {hotel.address}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <div className="bg-primary-50 rounded-lg px-3 py-1.5 text-center min-w-[52px]">
                  <p className="text-primary-700 font-bold text-base leading-none">{hotel.rooms}</p>
                  <p className="text-primary-400 text-[10px] mt-0.5">Rooms</p>
                </div>
                <div className="bg-gray-50 rounded-lg px-3 py-1.5 text-center min-w-[52px]">
                  <p className="text-gray-700 font-bold text-base leading-none">{hotel.established}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">Est.</p>
                </div>
              </div>
            </div>

            {/* About */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">About</p>
              <p className="text-gray-600 text-sm leading-relaxed">{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Amenities</p>
              <div className="flex flex-wrap gap-1.5">
                {hotel.amenities.map((a) => (
                  <span key={a} className="bg-primary-50 text-primary-700 border border-primary-100 text-xs font-medium px-2.5 py-1 rounded-full">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta row */}
            <div className="bg-gray-50 rounded-xl px-4 py-3 grid grid-cols-3 gap-3 text-xs">
              <div>
                <p className="text-gray-400">Member Since</p>
                <p className="font-semibold text-gray-700 mt-0.5">{hotel.memberSince}</p>
              </div>
              <div>
                <p className="text-gray-400">District</p>
                <p className="font-semibold text-gray-700 mt-0.5">{hotel.district}</p>
              </div>
              <div className="col-span-1 min-w-0">
                <p className="text-gray-400">Email</p>
                <a href={`mailto:${hotel.email}`} className="font-semibold text-primary-600 hover:underline mt-0.5 block truncate">
                  {hotel.email}
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-1 border-t border-gray-100">
              <div>
                <p className="text-[11px] text-gray-400 font-medium mb-2">Connect</p>
                <div className="flex gap-2">
                  {socialLinks(hotel).map(({ href, icon, label, bg }) =>
                    href ? (
                      <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                        aria-label={label} title={label}
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                        className={`${bg} text-white w-9 h-9 rounded-xl flex items-center justify-center shadow-sm`}
                      >
                        {icon}
                      </motion.a>
                    ) : null
                  )}
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${hotel.mapQuery}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
              >
                <MdMap size={16} /> Google Maps
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
