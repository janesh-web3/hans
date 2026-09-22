import type { District } from "@/constants/districts";
import type { HotelCategoryValue } from "@/constants/hotelCategories";

export interface HotelContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface HotelCoordinates {
  lat: number;
  lng: number;
}

/** Shape of a Hotel document as returned by the API (mirrors backend/src/models/Hotel.ts). */
export interface ApiHotel {
  _id: string;
  name: string;
  district: District;
  category: HotelCategoryValue;
  coordinates: HotelCoordinates;
  amenities: string[];
  images: string[];
  description: string;
  contactInfo: HotelContactInfo;
  websiteUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface HotelsResponse {
  success: boolean;
  data: ApiHotel[];
  pagination: Pagination;
}

/** Payload sent to POST /hotels and PUT /hotels/:id. */
export interface HotelInput {
  name: string;
  district: District;
  category: HotelCategoryValue;
  coordinates: HotelCoordinates;
  amenities: string[];
  images: string[];
  description: string;
  contactInfo: HotelContactInfo;
  websiteUrl?: string;
  isActive: boolean;
}
