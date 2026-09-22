// Mirrors the Hotel.category enum in backend/src/models/Hotel.ts
export const HOTEL_CATEGORIES = ["Star-Rated", "Resort", "Boutique", "Homestay", "Budget"] as const;

export type HotelCategoryValue = (typeof HOTEL_CATEGORIES)[number];

export const ALL_CATEGORIES = "All Categories";
