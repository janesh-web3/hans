import { District } from "../constants/districts";
import { HotelCategory } from "../models/Hotel";

export interface SeedHotel {
  name: string;
  district: District;
  category: HotelCategory;
  coordinates: { lat: number; lng: number };
  amenities: string[];
  images: string[];
  description: string;
  contactInfo: { phone: string; email: string; address: string };
  websiteUrl?: string;
  isActive: boolean;
}

/**
 * Sample member-hotel records for local development and demos.
 *
 * These are FICTIONAL properties. Names, phone numbers, e-mail addresses and
 * websites are invented so that no real business has placeholder contact
 * details published against it — replace this file with verified member data
 * before it reaches production. Coordinates, district headquarters and
 * landmarks are genuine so the Leaflet directory map plots sensibly.
 *
 * Coverage is deliberate: all 8 Sudurpashchim districts and all 5 category
 * enum values across 16 records, enough to exercise the district and category
 * filters plus pagination at the API default limit of 10.
 */

// Photography: reuses Unsplash IDs already vetted elsewhere in the project,
// so every image is known to resolve.
const IMG = {
  terai: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&auto=format&fit=crop&q=80",
  park: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop&q=80",
  bridge: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&auto=format&fit=crop&q=80",
  himal: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80",
  temple: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=1200&auto=format&fit=crop&q=80",
  lakes: "https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?w=1200&auto=format&fit=crop&q=80",
  pool: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
  resort: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&auto=format&fit=crop&q=80",
  room: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&auto=format&fit=crop&q=80",
  lodge: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80",
};

export const SEED_HOTELS: SeedHotel[] = [
  // ── Kailali (HQ Dhangadhi) ──────────────────────────────────────────────
  {
    name: "Karnali Grand Dhangadhi",
    district: "Kailali",
    category: "Star-Rated",
    coordinates: { lat: 28.7052, lng: 80.5967 },
    amenities: [
      "WiFi",
      "Restaurant",
      "Parking",
      "AC",
      "Swimming Pool",
      "Bar",
      "Gym",
      "Conference Hall",
      "Room Service",
    ],
    images: [IMG.pool, IMG.room, IMG.terai],
    description:
      "The provincial capital's flagship business address, a short drive from Dhangadhi Airport. Eighty-four air-conditioned rooms, two banquet halls seating 400, and the largest conference floor in the region make it the default choice for government delegations and corporate retreats. The rooftop restaurant looks north towards the Shivalik foothills.",
    contactInfo: {
      phone: "+977-91-521840",
      email: "reservations@karnaligrand.com.np",
      address: "Ratopul, Ward 4, Dhangadhi, Kailali",
    },
    websiteUrl: "https://karnaligrand.com.np",
    isActive: true,
  },
  {
    name: "Tikapur Garden Retreat",
    district: "Kailali",
    category: "Resort",
    coordinates: { lat: 28.5241, lng: 81.1234 },
    amenities: ["WiFi", "Restaurant", "Parking", "Garden", "Swimming Pool", "Room Service", "Bar"],
    images: [IMG.resort, IMG.terai, IMG.pool],
    description:
      "Twenty cottages across four acres of mature gardens beside Tikapur Park, on the banks of the Karnali. Built for slow stays: cycling routes along the embankment, birdwatching at dawn, and a kitchen that cooks Tharu thali to order. A favourite stopover for travellers moving between Bardiya and the far-western hills.",
    contactInfo: {
      phone: "+977-91-560233",
      email: "stay@tikapurretreat.com.np",
      address: "Tikapur Park Road, Tikapur Municipality, Kailali",
    },
    websiteUrl: "https://tikapurretreat.com.np",
    isActive: true,
  },
  {
    name: "Attariya Transit Inn",
    district: "Kailali",
    category: "Budget",
    coordinates: { lat: 28.7901, lng: 80.5712 },
    amenities: ["WiFi", "Restaurant", "Parking"],
    images: [IMG.lodge, IMG.room],
    description:
      "A clean, honestly priced 22-room halt at the Attariya junction where the East-West Highway meets the road north to Dadeldhura. Round-the-clock reception for late bus arrivals, secure parking for private vehicles, and a dal-bhat kitchen that opens at five in the morning for onward travellers.",
    contactInfo: {
      phone: "+977-91-550117",
      email: "frontdesk@attariyatransit.com.np",
      address: "Highway Chowk, Godawari Municipality, Attariya, Kailali",
    },
    isActive: true,
  },

  // ── Kanchanpur (HQ Bhimdatta / Mahendranagar) ───────────────────────────
  {
    name: "Shuklaphanta Safari Lodge",
    district: "Kanchanpur",
    category: "Resort",
    coordinates: { lat: 28.8512, lng: 80.2043 },
    amenities: ["WiFi", "Restaurant", "Parking", "Garden", "Bar", "Room Service"],
    images: [IMG.park, IMG.resort, IMG.lodge],
    description:
      "Fourteen timber-and-thatch chalets on the buffer-zone edge of Shuklaphanta National Park, home to the largest swamp deer herd in the country. Resident naturalists lead jeep safaris and machan night-watches, and the open phanta grassland begins ten minutes from the gate.",
    contactInfo: {
      phone: "+977-99-521066",
      email: "bookings@shuklaphantalodge.com.np",
      address: "Buffer Zone Road, Shuklaphanta, Kanchanpur",
    },
    websiteUrl: "https://shuklaphantalodge.com.np",
    isActive: true,
  },
  {
    name: "Mahakali Riverside Boutique",
    district: "Kanchanpur",
    category: "Boutique",
    coordinates: { lat: 28.9644, lng: 80.1811 },
    amenities: ["WiFi", "Restaurant", "AC", "Garden", "Spa", "Room Service"],
    images: [IMG.room, IMG.bridge, IMG.resort],
    description:
      "Eleven individually furnished rooms in a restored 1960s residence near the Mahakali embankment in Bhimdatta. Far-western weaving and Doteli woodwork throughout, an intimate courtyard restaurant, and a two-room spa working with local herbs. Twenty minutes from the Gaddachowki border crossing.",
    contactInfo: {
      phone: "+977-99-523471",
      email: "hello@mahakaliboutique.com.np",
      address: "Campus Road, Ward 6, Bhimdatta, Kanchanpur",
    },
    websiteUrl: "https://mahakaliboutique.com.np",
    isActive: true,
  },

  // ── Doti (HQ Dipayal Silgadhi) ──────────────────────────────────────────
  {
    name: "Dipayal Heritage House",
    district: "Doti",
    category: "Boutique",
    coordinates: { lat: 29.2564, lng: 80.9336 },
    amenities: ["WiFi", "Restaurant", "Parking", "Garden", "Room Service"],
    images: [IMG.bridge, IMG.room, IMG.temple],
    description:
      "A nine-room stone-and-slate house on the Seti river terrace, built in the vernacular style of the far-western hills and restored with the original beams intact. The terrace restaurant serves Doteli home cooking, and Shaileshwari Temple is a fifteen-minute walk upstream.",
    contactInfo: {
      phone: "+977-94-440258",
      email: "stay@dipayalheritage.com.np",
      address: "Seti Riverside, Dipayal Silgadhi, Doti",
    },
    isActive: true,
  },
  {
    name: "Silgadhi Hillview Homestay",
    district: "Doti",
    category: "Homestay",
    coordinates: { lat: 29.2698, lng: 80.9401 },
    amenities: ["WiFi", "Restaurant", "Garden"],
    images: [IMG.lodge, IMG.himal],
    description:
      "Six guest rooms in a working family farmhouse above Silgadhi bazaar, run by the household that has farmed this ridge for four generations. Guests eat what the fields produce, join the morning milking if they like, and wake to an unbroken view of the Api-Saipal range.",
    contactInfo: {
      phone: "+977-9848-431207",
      email: "silgadhihillview@gmail.com",
      address: "Upper Silgadhi, Ward 3, Dipayal Silgadhi Municipality, Doti",
    },
    isActive: true,
  },

  // ── Bajhang (HQ Chainpur) ───────────────────────────────────────────────
  {
    name: "Api Himal Base Lodge",
    district: "Bajhang",
    category: "Resort",
    coordinates: { lat: 29.5386, lng: 81.2108 },
    amenities: ["WiFi", "Restaurant", "Parking", "Garden", "Room Service"],
    images: [IMG.himal, IMG.lodge, IMG.resort],
    description:
      "The last full-service lodge before the high trails, at the northern end of Chainpur. Sixteen heated rooms, a drying room for wet gear, packed breakfasts from four in the morning, and a standing porter and guide roster for the Api Base Camp and Khaptad approaches.",
    contactInfo: {
      phone: "+977-92-421135",
      email: "trek@apihimalbase.com.np",
      address: "Chainpur Bazaar North, Jayaprithvi Municipality, Bajhang",
    },
    websiteUrl: "https://apihimalbase.com.np",
    isActive: true,
  },
  {
    name: "Chainpur Community Homestay",
    district: "Bajhang",
    category: "Homestay",
    coordinates: { lat: 29.541, lng: 81.2155 },
    amenities: ["WiFi", "Restaurant", "Garden"],
    images: [IMG.temple, IMG.himal],
    description:
      "Twelve households on the Chainpur ridge taking guests in rotation, so every booking supports a different family and the income stays in the village. Evenings bring Deuda singing around the courtyard fire. Rooms are simple, hot water comes by bucket, and the welcome is why people return.",
    contactInfo: {
      phone: "+977-9849-372640",
      email: "chainpurhomestay@gmail.com",
      address: "Ward 2, Jayaprithvi Municipality, Chainpur, Bajhang",
    },
    isActive: true,
  },

  // ── Bajura (HQ Martadi) ─────────────────────────────────────────────────
  {
    name: "Badimalika Pilgrim Lodge",
    district: "Bajura",
    category: "Budget",
    coordinates: { lat: 29.4167, lng: 81.5167 },
    amenities: ["Restaurant", "Parking", "WiFi"],
    images: [IMG.temple, IMG.lodge],
    description:
      "Eighteen plain, warm rooms in Martadi serving the Badimalika pilgrimage, which draws thousands during Janai Purnima. The owners arrange registered guides and pack ponies for the two-day walk to the shrine at 4,200 metres, and hold luggage for pilgrims travelling light.",
    contactInfo: {
      phone: "+977-97-690142",
      email: "badimalikalodge@gmail.com",
      address: "Martadi Bazaar, Budhiganga Municipality, Bajura",
    },
    isActive: true,
  },

  // ── Achham (HQ Mangalsen) ───────────────────────────────────────────────
  {
    name: "Ramaroshan Eco Resort",
    district: "Achham",
    category: "Resort",
    coordinates: { lat: 29.251, lng: 81.352 },
    amenities: ["Restaurant", "Parking", "Garden", "WiFi", "Room Service"],
    images: [IMG.lakes, IMG.resort, IMG.himal],
    description:
      "Ten off-grid cabins above the Ramaroshan lake basin — twelve lakes and twelve meadows, as the local saying goes. Solar power, rainwater harvesting, and a kitchen supplied by the surrounding villages. Guided walks cover the full lake circuit and the rhododendron forest below the Bhairav ridge.",
    contactInfo: {
      phone: "+977-97-620318",
      email: "reserve@ramaroshaneco.com.np",
      address: "Ramaroshan Rural Municipality, Ward 4, Achham",
    },
    websiteUrl: "https://ramaroshaneco.com.np",
    isActive: true,
  },
  {
    name: "Mangalsen Valley Inn",
    district: "Achham",
    category: "Budget",
    coordinates: { lat: 29.1397, lng: 81.2939 },
    amenities: ["WiFi", "Restaurant", "Parking"],
    images: [IMG.lodge, IMG.room],
    description:
      "A steady 24-room inn in the district headquarters, mostly hosting officials, health-camp teams and NGO staff working across Achham. Reliable back-up power, a quiet first-floor dining room, and one of the few printing and meeting facilities available to guests in town.",
    contactInfo: {
      phone: "+977-97-620255",
      email: "mangalsenvalleyinn@gmail.com",
      address: "Mangalsen Municipality, Ward 5, Achham",
    },
    isActive: true,
  },

  // ── Dadeldhura (HQ Amargadhi) ───────────────────────────────────────────
  {
    name: "Tripurasundari Boutique Stay",
    district: "Dadeldhura",
    category: "Boutique",
    coordinates: { lat: 29.3014, lng: 80.5817 },
    amenities: ["WiFi", "Restaurant", "Garden", "Spa", "Room Service", "Parking"],
    images: [IMG.room, IMG.temple, IMG.resort],
    description:
      "Eight rooms in a pine-shaded compound a short walk from Tripurasundari Temple, at 1,900 metres where the air stays cool even in June. Handwoven far-western textiles, a library of regional history, and a garden restaurant that grows most of its own vegetables.",
    contactInfo: {
      phone: "+977-96-420719",
      email: "hello@tripurasundaristay.com.np",
      address: "Temple Road, Amargadhi Municipality, Dadeldhura",
    },
    websiteUrl: "https://tripurasundaristay.com.np",
    isActive: true,
  },
  {
    name: "Amargadhi Fort View Hotel",
    district: "Dadeldhura",
    category: "Star-Rated",
    coordinates: { lat: 29.305, lng: 80.585 },
    amenities: [
      "WiFi",
      "Restaurant",
      "Parking",
      "AC",
      "Conference Hall",
      "Gym",
      "Bar",
      "Room Service",
    ],
    images: [IMG.pool, IMG.room, IMG.himal],
    description:
      "Forty-six rooms on the ridge below the historic Amargadhi fort, the largest graded property on the highway between Dhangadhi and Darchula. A 150-seat conference hall, two restaurants, and a terrace from which the Api and Saipal peaks are visible on clear winter mornings.",
    contactInfo: {
      phone: "+977-96-420488",
      email: "reservations@amargadhifortview.com.np",
      address: "Fort Ridge, Amargadhi Municipality, Ward 5, Dadeldhura",
    },
    websiteUrl: "https://amargadhifortview.com.np",
    isActive: true,
  },

  // ── Baitadi (HQ Dasharathchand) ─────────────────────────────────────────
  {
    name: "Pancheshwar Confluence Resort",
    district: "Baitadi",
    category: "Resort",
    coordinates: { lat: 29.5253, lng: 80.4694 },
    amenities: ["WiFi", "Restaurant", "Parking", "Garden", "Bar", "Room Service"],
    images: [IMG.bridge, IMG.resort, IMG.lakes],
    description:
      "Twelve river-facing rooms where the Mahakali and Sarju meet, a site of pilgrimage at Makar Sankranti and of serious angling the rest of the year. The resort runs licensed catch-and-release trips for golden mahseer and rafts the gentler lower section between October and March.",
    contactInfo: {
      phone: "+977-95-520364",
      email: "stay@pancheshwarresort.com.np",
      address: "Pancheshwar, Dasharathchand Municipality, Baitadi",
    },
    websiteUrl: "https://pancheshwarresort.com.np",
    isActive: true,
  },
  {
    name: "Dasharathchand Hillside Homestay",
    district: "Baitadi",
    category: "Homestay",
    coordinates: { lat: 29.53, lng: 80.475 },
    amenities: ["WiFi", "Restaurant", "Garden"],
    images: [IMG.himal, IMG.lodge],
    description:
      "Five rooms above the terraced fields of Dasharathchand, hosted by a family that also runs the orange orchard below the house. Winter guests pick their own fruit and the kitchen mills its own mustard oil. A working introduction to hill life in the far west, half an hour from the district headquarters.",
    contactInfo: {
      phone: "+977-9858-450931",
      email: "hillsidebaitadi@gmail.com",
      address: "Ward 7, Dasharathchand Municipality, Baitadi",
    },
    isActive: true,
  },
];
