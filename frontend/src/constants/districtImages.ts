import type { District } from "@/constants/districts";

/** Curated placeholder photography per district — swap for real Sudurpashchim photography when available. */
export const DISTRICT_IMAGES: Record<District, string> = {
  Kailali: "/district/kailali.jpg",
  Kanchanpur: "/district/kanchanpur.JPG",
  Doti: "/district/doti.jpg",
  Bajhang: "/district/bhajang.jfif",
  Bajura: "/district/bajura.jfif",
  Achham: "/district/achham.jfif",
  Dadeldhura: "/district/dadeldhura.webp",
  Baitadi: "/district/baitadi.webp",
};

/**
 * Rotating background set for the homepage hero slider — Api/Khaptad mountain
 * sunrise (Bajhang), highland lakes (Achham), temple country (Bajura), and
 * the Terai gateway (Kailali). Reuses the same vetted district photography
 * above so every slide is guaranteed to resolve.
 */
export const HOME_HERO_IMAGES: string[] = [
  "/assets/hero8.jpg",
  "/assets/hero2.webp",
  "/assets/hero3.webp",
  "/assets/hero6.jpg",
  
];
