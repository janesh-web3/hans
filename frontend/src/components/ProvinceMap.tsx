import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import type { ApiHotel } from "@/types/hotel";

// Centered on Sudurpashchim Province, Nepal.
const SUDURPASHCHIM_CENTER: [number, number] = [28.9, 80.5];
const DEFAULT_ZOOM = 8;

// Custom ink-green pin (SVG divIcon) — avoids Leaflet's classic broken
// default-marker-image issue under bundlers, and matches the brand color.
const greenIcon = L.divIcon({
  className: "",
  html: `<svg width="26" height="34" viewBox="0 0 26 34" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 0C5.82 0 0 5.82 0 13c0 9.75 13 21 13 21s13-11.25 13-21C26 5.82 20.18 0 13 0z" fill="#15803d" stroke="#ffffff" stroke-width="1.5"/>
    <circle cx="13" cy="13" r="4.5" fill="#ffffff"/>
  </svg>`,
  iconSize: [26, 34],
  iconAnchor: [13, 34],
  popupAnchor: [0, -30],
});

interface ProvinceMapProps {
  hotels: ApiHotel[];
  className?: string;
}

export default function ProvinceMap({ hotels, className = "h-[560px]" }: ProvinceMapProps) {
  const withCoordinates = hotels.filter(
    (h) => typeof h.coordinates?.lat === "number" && typeof h.coordinates?.lng === "number"
  );

  return (
    <div className={`${className} w-full rounded-xl overflow-hidden border border-border`}>
      <MapContainer
        center={SUDURPASHCHIM_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {withCoordinates.map((hotel) => (
          <Marker
            key={hotel._id}
            position={[hotel.coordinates.lat, hotel.coordinates.lng]}
            icon={greenIcon}
          >
            <Popup>
              <div className="min-w-[160px]">
                <p className="font-bold text-foreground text-sm mb-1">{hotel.name}</p>
                <p className="text-xs text-foreground-muted mb-2">
                  {hotel.district} District · {hotel.category}
                </p>
                <Link
                  to={`/hotel/${hotel._id}`}
                  className="text-primary-700 text-xs font-semibold hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
