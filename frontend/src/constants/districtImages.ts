import type { District } from "@/constants/districts";

/** Curated placeholder photography per district — swap for real Sudurpashchim photography when available. */
export const DISTRICT_IMAGES: Record<District, string> = {
  Kailali: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&auto=format&fit=crop&q=80",
  Kanchanpur: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&auto=format&fit=crop&q=80",
  Doti: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900&auto=format&fit=crop&q=80",
  Bajhang: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80",
  Bajura: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=900&auto=format&fit=crop&q=80",
  Achham: "https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?w=900&auto=format&fit=crop&q=80",
  Dadeldhura: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=900&auto=format&fit=crop&q=80",
  Baitadi: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900&auto=format&fit=crop&q=80",
};

/**
 * Rotating background set for the homepage hero slider — Api/Khaptad mountain
 * sunrise (Bajhang), highland lakes (Achham), temple country (Bajura), and
 * the Terai gateway (Kailali). Reuses the same vetted district photography
 * above so every slide is guaranteed to resolve.
 */
export const HOME_HERO_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?w=1800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1626197031507-c17099753214?w=1800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1800&auto=format&fit=crop&q=80",
];
