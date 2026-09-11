import { MdPhone, MdEmail, MdLocationOn, MdHotel, MdStar } from "react-icons/md";
import { FiWifi } from "react-icons/fi";

const categoryColors = {
  "5 Star": "bg-yellow-100 text-yellow-700",
  "4 Star": "bg-purple-100 text-purple-700",
  "3 Star": "bg-secondary-100 text-secondary-700",
  "2 Star": "bg-primary-100 text-primary-700",
  "1 Star": "bg-gray-100 text-gray-600",
  Resort: "bg-teal-100 text-teal-700",
  "Guest House": "bg-orange-100 text-orange-700",
  Lodge: "bg-amber-100 text-amber-700",
  Homestay: "bg-pink-100 text-pink-700",
};

// Generate a deterministic gradient from hotel id
const gradients = [
  "from-primary-400 to-primary-600",
  "from-secondary-400 to-secondary-600",
  "from-teal-400 to-primary-600",
  "from-primary-500 to-secondary-500",
  "from-emerald-400 to-primary-600",
  "from-secondary-500 to-primary-500",
];

export default function HotelCard({ hotel }) {
  const gradient = gradients[(hotel.id - 1) % gradients.length];
  const badgeClass =
    categoryColors[hotel.category] || "bg-gray-100 text-gray-600";

  return (
    <div className="card overflow-hidden group">
      {/* Decorative header */}
      <div className={`bg-gradient-to-br ${gradient} h-36 flex items-center justify-center relative`}>
        <MdHotel className="text-white/30 absolute" size={100} />
        <div className="relative z-10 text-center px-4">
          <MdHotel className="text-white mx-auto mb-1" size={32} />
          <p className="text-white font-bold text-sm leading-tight drop-shadow">
            {hotel.name}
          </p>
        </div>
        <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass}`}>
          {hotel.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-800 text-lg leading-snug mb-1 group-hover:text-primary-600 transition-colors">
          {hotel.name}
        </h3>
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
          <MdLocationOn className="text-primary-500 flex-shrink-0" size={16} />
          <span>{hotel.location}</span>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {hotel.description}
        </p>

        {/* Stats row */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-primary-50 rounded-lg px-3 py-2 text-center">
            <p className="text-primary-700 font-bold text-lg leading-none">{hotel.rooms}</p>
            <p className="text-primary-500 text-xs mt-0.5">Rooms</p>
          </div>
          <div className="flex-1 bg-secondary-50 rounded-lg px-3 py-2 text-center">
            <p className="text-secondary-700 font-bold text-lg leading-none">{hotel.established}</p>
            <p className="text-secondary-500 text-xs mt-0.5">Est.</p>
          </div>
          <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-center">
            <p className="text-gray-700 font-bold text-lg leading-none">{hotel.memberSince}</p>
            <p className="text-gray-400 text-xs mt-0.5">Member</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hotel.amenities.slice(0, 4).map((a) => (
            <span
              key={a}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full"
            >
              {a}
            </span>
          ))}
          {hotel.amenities.length > 4 && (
            <span className="bg-primary-50 text-primary-600 text-xs px-2 py-0.5 rounded-full">
              +{hotel.amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Contact */}
        <div className="border-t border-gray-100 pt-4 space-y-1.5">
          <a
            href={`tel:${hotel.phone}`}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
          >
            <MdPhone className="text-primary-500 flex-shrink-0" size={16} />
            {hotel.phone}
          </a>
          <a
            href={`mailto:${hotel.email}`}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
          >
            <MdEmail className="text-primary-500 flex-shrink-0" size={16} />
            {hotel.email}
          </a>
        </div>
      </div>
    </div>
  );
}
