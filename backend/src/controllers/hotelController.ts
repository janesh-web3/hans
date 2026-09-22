import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Hotel from "../models/Hotel";
import { ApiError } from "../middleware/errorMiddleware";

// @desc    Get all hotels (filterable by district/category, paginated)
// @route   GET /api/v1/hotels
export const getHotels = asyncHandler(async (req: Request, res: Response) => {
  const { district, category } = req.query;

  const filter: Record<string, unknown> = {};
  if (district) filter.district = district;
  if (category) filter.category = category;

  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const skip = (page - 1) * limit;

  const [hotels, total] = await Promise.all([
    Hotel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Hotel.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: hotels,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// @desc    Get a single hotel by id
// @route   GET /api/v1/hotels/:id
export const getHotelById = asyncHandler(async (req: Request, res: Response) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    const error: ApiError = new Error("Hotel not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({ success: true, data: hotel });
});

// @desc    Create a new hotel
// @route   POST /api/v1/hotels
export const createHotel = asyncHandler(async (req: Request, res: Response) => {
  const hotel = await Hotel.create(req.body);
  res.status(201).json({ success: true, data: hotel });
});

// @desc    Update a hotel
// @route   PUT /api/v1/hotels/:id
export const updateHotel = asyncHandler(async (req: Request, res: Response) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!hotel) {
    const error: ApiError = new Error("Hotel not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({ success: true, data: hotel });
});

// @desc    Delete a hotel
// @route   DELETE /api/v1/hotels/:id
export const deleteHotel = asyncHandler(async (req: Request, res: Response) => {
  const hotel = await Hotel.findByIdAndDelete(req.params.id);

  if (!hotel) {
    const error: ApiError = new Error("Hotel not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({ success: true, data: {} });
});
