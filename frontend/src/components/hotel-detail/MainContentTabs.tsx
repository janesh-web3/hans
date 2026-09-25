import { useState } from "react";
import { motion } from "framer-motion";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ArrowUpRight, Check, Compass, Hotel, MapPin, Phone, Sparkles } from "lucide-react";
import type { ApiHotel } from "@/types/hotel";

const hotelPin = L.divIcon({
  className: "",
  html: '<div style="width:28px;height:28px;border:3px solid white;border-radius:50% 50% 50% 0;background:#0284c7;transform:rotate(-45deg);box-shadow:0 2px 8px #0f172a66"><div style="width:7px;height:7px;border-radius:50%;background:white;margin:7px"></div></div>',
  iconSize: [28, 28], iconAnchor: [14, 28], popupAnchor: [0, -25],
});

const tabs = [
  ["overview", "Overview"], ["rooms", "Rooms & rates"], ["amenities", "Amenities"], ["location", "Location"], ["reviews", "Reviews"],
] as const;

const sectionMotion = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.55 } };

function Overview({ hotel }: { hotel: ApiHotel }) {
  return <motion.section id="overview" {...sectionMotion} className="hotel-detail-section py-10 sm:py-14">
    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">A stay in Sudurpashchim</p>
    <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">About this property</h2>
    <p className="mt-6 max-w-3xl whitespace-pre-line text-base leading-8 text-foreground-secondary sm:text-lg">{hotel.description}</p>
    <div className="mt-9 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
      {[
        { label: "Property type", value: hotel.category, Icon: Hotel },
        { label: "District", value: hotel.district, Icon: MapPin },
        { label: "Association", value: "HAN member", Icon: Sparkles },
        { label: "Coordinates", value: `${hotel.coordinates.lat.toFixed(3)}°, ${hotel.coordinates.lng.toFixed(3)}°`, Icon: Compass },
      ].map(({ label, value, Icon }) => <div key={label} className="bg-background-card p-4 sm:p-5"><Icon size={18} className="text-accent" /><p className="mt-3 text-[10px] font-medium uppercase tracking-[0.15em] text-foreground-muted">{label}</p><p className="mt-1 text-sm font-medium text-foreground">{value}</p></div>)}
    </div>
  </motion.section>;
}

function RoomsSection({ hotel }: { hotel: ApiHotel }) {
  return <motion.section id="rooms" {...sectionMotion} className="hotel-detail-section border-t border-border py-10 sm:py-14">
    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Find your room</p>
    <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Rooms &amp; rates</h2>
    <div className="mt-7 border border-border bg-background-card p-6 sm:p-8">
      <p className="max-w-2xl text-sm leading-7 text-foreground-secondary">Room types, availability and nightly rates are provided directly by each property and are not published in this member directory. Contact {hotel.name} for current options and booking details.</p>
      <div className="mt-5 flex flex-wrap gap-3"><a href={`tel:${hotel.contactInfo.phone}`} className="inline-flex h-11 items-center gap-2 bg-accent px-5 text-sm font-medium text-accent-foreground hover:bg-accent-vivid"><Phone size={15} /> Ask about rooms</a></div>
    </div>
  </motion.section>;
}

function AmenitiesSection({ hotel }: { hotel: ApiHotel }) {
  const groups = [
    { title: "Comfort & services", matches: ["room", "laundry", "housekeeping", "front desk", "service"] },
    { title: "Food & drink", matches: ["restaurant", "bar", "breakfast", "cafe", "food"] },
    { title: "Property features", matches: ["pool", "spa", "gym", "garden", "conference", "parking"] },
    { title: "Connectivity", matches: ["wifi", "internet", "wi-fi", "ac", "air condition"] },
  ];
  const assigned = new Set<string>();
  const categorized = groups.map((group) => ({ ...group, items: hotel.amenities.filter((amenity) => {
    const match = group.matches.some((word) => amenity.toLowerCase().includes(word));
    if (match) assigned.add(amenity);
    return match;
  }) })).filter((group) => group.items.length > 0);
  const otherItems = hotel.amenities.filter((amenity) => !assigned.has(amenity));
  if (otherItems.length) categorized.push({ title: "More to enjoy", matches: [], items: otherItems });
  return <motion.section id="amenities" {...sectionMotion} className="hotel-detail-section border-t border-border py-10 sm:py-14">
    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Thoughtful details</p><h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Amenities</h2>
    {hotel.amenities.length ? <div className="mt-8 grid gap-8 sm:grid-cols-2">{categorized.map((group) => <div key={group.title}><h3 className="mb-4 text-sm font-semibold text-foreground">{group.title}</h3><ul className="space-y-3">{group.items.map((item) => <li key={item} className="flex items-center gap-3 text-sm text-foreground-secondary"><Check size={15} strokeWidth={1.7} className="text-accent" />{item}</li>)}</ul></div>)}</div> : <p className="mt-6 text-sm leading-7 text-foreground-secondary">Amenity information has not been added for this property. Contact the hotel directly for details.</p>}
  </motion.section>;
}

function LocationSection({ hotel }: { hotel: ApiHotel }) {
  const position: [number, number] = [hotel.coordinates.lat, hotel.coordinates.lng];
  const mapUrl = `https://www.openstreetmap.org/?mlat=${hotel.coordinates.lat}&mlon=${hotel.coordinates.lng}#map=14/${hotel.coordinates.lat}/${hotel.coordinates.lng}`;
  return <motion.section id="location" {...sectionMotion} className="hotel-detail-section border-t border-border py-10 sm:py-14">
    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Find your way</p><h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Location</h2>
    <div className="mt-7 grid gap-7 lg:grid-cols-[1.35fr_0.65fr]">
      <div className="hotel-detail-map relative z-0 isolate h-[360px] overflow-hidden border border-border sm:h-[420px]"><MapContainer key={hotel._id} center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full"><TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><Marker position={position} icon={hotelPin}><Popup>{hotel.name}</Popup></Marker></MapContainer></div>
      <div className="flex flex-col justify-center border border-border bg-background-card p-6 sm:p-8"><MapPin size={21} className="text-accent" /><h3 className="mt-4 font-serif text-2xl font-semibold text-foreground">Getting here</h3><p className="mt-3 text-sm leading-7 text-foreground-secondary">{hotel.contactInfo.address}<br />{hotel.district} District, Sudurpashchim Province, Nepal</p><a href={mapUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">Open map <ArrowUpRight size={15} /></a></div>
    </div>
  </motion.section>;
}

function ReviewsSection() {
  return <motion.section id="reviews" {...sectionMotion} className="hotel-detail-section border-t border-border py-10 sm:py-14">
    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Guest experiences</p><h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Reviews</h2>
    <div className="mt-7 border border-border bg-background-secondary p-6 sm:p-8"><p className="max-w-2xl text-sm leading-7 text-foreground-secondary">Guest ratings and reviews are not collected in the HAN member directory. For first-hand information about a stay, please contact the property directly.</p></div>
  </motion.section>;
}

export default function MainContentTabs({ hotel }: { hotel: ApiHotel }) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number][0]>("overview");
  const navigateTo = (id: string) => {
    setActiveTab(id as typeof activeTab);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return <div className="min-w-0">
    <nav aria-label="Property details" className="sticky top-[var(--nav-height,100px)] z-30 -mx-4 overflow-x-auto border-b border-border bg-background/95 px-4 backdrop-blur sm:mx-0 sm:px-0">
      <div className="flex min-w-max gap-7 sm:gap-9">{tabs.map(([id, label]) => <button key={id} type="button" onClick={() => navigateTo(id)} className={`border-b-2 py-4 text-xs font-medium transition sm:text-sm ${activeTab === id ? "border-accent text-accent" : "border-transparent text-foreground-secondary hover:text-foreground"}`}>{label}</button>)}</div>
    </nav>
    <Overview hotel={hotel} /><RoomsSection hotel={hotel} /><AmenitiesSection hotel={hotel} /><LocationSection hotel={hotel} /><ReviewsSection />
  </div>;
}
