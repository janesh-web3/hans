import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MdClose, MdLocationOn, MdHotel, MdMap, MdEmail,
  MdChevronLeft, MdChevronRight,
} from "react-icons/md";
import { FaFacebookF, FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa";
import { modalBackdrop, modalPanel } from "../lib/animations";

const categoryBadge = {
  "5 Star":     "text-yellow-400 border-yellow-800",
  "4 Star":     "text-purple-400 border-purple-800",
  "3 Star":     "text-blue-400   border-blue-800",
  "2 Star":     "text-green-400  border-green-800",
  "1 Star":     "text-dark-400   border-dark-700",
  Resort:       "text-teal-400   border-teal-800",
  "Guest House":"text-orange-400 border-orange-800",
  Lodge:        "text-amber-400  border-amber-800",
  Homestay:     "text-pink-400   border-pink-800",
};

const SOCIALS = [
  { key: "facebook",  Icon: FaFacebookF, label: "Facebook",  bg: "#1877F2" },
  { key: "whatsapp",  Icon: FaWhatsapp,  label: "WhatsApp",  bg: "#25D366" },
  { key: "instagram", Icon: FaInstagram, label: "Instagram", bg: "linear-gradient(135deg,#833AB4,#FD1D1D,#FCAF45)" },
  { key: "tiktok",    Icon: FaTiktok,    label: "TikTok",    bg: "#111" },
];

export default function HotelModal({ hotel, onClose }) {
  const [idx, setIdx] = useState(0);
  const images  = hotel.images || [];
  const badge   = categoryBadge[hotel.category] || "text-dark-400 border-dark-700";

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
    <AnimatePresence>
      <motion.div
        variants={modalBackdrop}
        initial="hidden" animate="visible" exit="exit"
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/70 backdrop-blur-sm"
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          variants={modalPanel}
          initial="hidden" animate="visible" exit="exit"
          className="bg-dark-900 border border-dark-800 w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Gallery */}
          <div className="relative h-52 sm:h-64 bg-dark-800 flex-shrink-0">
            {images.length > 0 ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={idx}
                    src={images[idx]}
                    alt={`${hotel.name} photo ${idx + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.85)" }}
                  />
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button onClick={prev}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-dark-900/70 hover:bg-dark-900 text-white rounded-full p-1.5 transition-colors border border-dark-700">
                      <MdChevronLeft size={20} />
                    </button>
                    <button onClick={next}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-dark-900/70 hover:bg-dark-900 text-white rounded-full p-1.5 transition-colors border border-dark-700">
                      <MdChevronRight size={20} />
                    </button>
                    {/* Dot indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button key={i} onClick={() => setIdx(i)}
                          className={`rounded-full transition-all duration-200 ${i === idx ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"}`} />
                      ))}
                    </div>
                    {/* Thumbnails */}
                    <div className="absolute bottom-3 right-3 hidden sm:flex gap-1.5">
                      {images.map((img, i) => (
                        <button key={i} onClick={() => setIdx(i)}
                          className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all ${i === idx ? "border-primary-500" : "border-dark-700 opacity-60 hover:opacity-100"}`}>
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <MdHotel size={56} className="text-dark-700" />
              </div>
            )}

            {/* Close */}
            <button onClick={onClose} aria-label="Close"
              className="absolute top-3 right-3 bg-dark-900/80 hover:bg-dark-900 text-white rounded-full p-1.5 transition-colors border border-dark-700 z-10">
              <MdClose size={18} />
            </button>

            {/* Category badge */}
            <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full border bg-dark-900/80 ${badge}`}>
              {hotel.category}
            </span>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 p-5 space-y-4">

            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-white text-xl font-bold leading-tight">{hotel.name}</h2>
                <div className="flex items-center gap-1.5 text-dark-500 text-xs mt-1">
                  <MdLocationOn className="text-primary-600 flex-shrink-0" size={13} />
                  {hotel.address}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <div className="bg-dark-800 border border-dark-700 rounded-lg px-3 py-1.5 text-center min-w-[48px]">
                  <p className="text-primary-400 font-bold text-base leading-none">{hotel.rooms}</p>
                  <p className="text-dark-600 text-[10px] mt-0.5">Rooms</p>
                </div>
                <div className="bg-dark-800 border border-dark-700 rounded-lg px-3 py-1.5 text-center min-w-[48px]">
                  <p className="text-dark-300 font-bold text-base leading-none">{hotel.established}</p>
                  <p className="text-dark-600 text-[10px] mt-0.5">Est.</p>
                </div>
              </div>
            </div>

            {/* About */}
            <div>
              <p className="text-[11px] font-bold text-dark-600 uppercase tracking-wider mb-1.5">About</p>
              <p className="text-dark-400 text-sm leading-relaxed">{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <p className="text-[11px] font-bold text-dark-600 uppercase tracking-wider mb-2">Amenities</p>
              <div className="flex flex-wrap gap-1.5">
                {hotel.amenities.map(a => (
                  <span key={a} className="text-xs text-primary-400 border border-primary-900 bg-primary-950/30 px-2.5 py-1 rounded-full font-medium">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta */}
            <div className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 grid grid-cols-3 gap-3 text-xs">
              <div>
                <p className="text-dark-600">Member Since</p>
                <p className="text-white font-semibold mt-0.5">{hotel.memberSince}</p>
              </div>
              <div>
                <p className="text-dark-600">District</p>
                <p className="text-white font-semibold mt-0.5">{hotel.district}</p>
              </div>
              <div className="min-w-0">
                <p className="text-dark-600">Email</p>
                <a href={`mailto:${hotel.email}`}
                  className="text-primary-400 hover:text-primary-300 font-semibold mt-0.5 block truncate transition-colors">
                  {hotel.email}
                </a>
              </div>
            </div>

            {/* Social + Maps */}
            <div className="flex items-center justify-between gap-3 pt-1 border-t border-dark-800">
              <div>
                <p className="text-[11px] text-dark-600 font-medium mb-2">Connect</p>
                <div className="flex gap-2">
                  {SOCIALS.map(({ key, Icon, label, bg }) => {
                    const href = hotel.social?.[key];
                    return href ? (
                      <motion.a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
                        style={{ background: bg }}
                      >
                        <Icon size={15} />
                      </motion.a>
                    ) : null;
                  })}
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${hotel.mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs px-4 py-2"
              >
                <MdMap size={15} /> Google Maps
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
