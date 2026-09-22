import { Document, Model, Schema, model } from "mongoose";
import { District, SUDURPASHCHIM_DISTRICTS } from "../constants/districts";

export type HotelCategory = "Star-Rated" | "Resort" | "Boutique" | "Homestay" | "Budget";

export interface IHotelCoordinates {
  lat: number;
  lng: number;
}

export interface IHotelContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface IHotel extends Document {
  name: string;
  district: District;
  category: HotelCategory;
  coordinates: IHotelCoordinates;
  amenities: string[];
  images: string[];
  description: string;
  contactInfo: IHotelContactInfo;
  websiteUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const hotelSchema = new Schema<IHotel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      enum: SUDURPASHCHIM_DISTRICTS,
      required: true,
    },
    category: {
      type: String,
      enum: ["Star-Rated", "Resort", "Boutique", "Homestay", "Budget"],
      required: true,
    },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    contactInfo: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
    },
    websiteUrl: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Hotel: Model<IHotel> = model<IHotel>("Hotel", hotelSchema);

export default Hotel;
