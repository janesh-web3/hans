import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Event from "../models/Event";
import { ApiError } from "../middleware/errorMiddleware";

// @desc    Get all events (paginated, soonest first)
// @route   GET /api/v1/events
export const getEvents = asyncHandler(async (req: Request, res: Response) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const skip = (page - 1) * limit;

  const [events, total] = await Promise.all([
    Event.find().sort({ startDate: 1 }).skip(skip).limit(limit),
    Event.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    data: events,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// @desc    Get a single event by id
// @route   GET /api/v1/events/:id
export const getEventById = asyncHandler(async (req: Request, res: Response) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    const error: ApiError = new Error("Event not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({ success: true, data: event });
});

// @desc    Create a new event
// @route   POST /api/v1/events
export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await Event.create(req.body);
  res.status(201).json({ success: true, data: event });
});

// @desc    Update an event
// @route   PUT /api/v1/events/:id
export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!event) {
    const error: ApiError = new Error("Event not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({ success: true, data: event });
});

// @desc    Delete an event
// @route   DELETE /api/v1/events/:id
export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    const error: ApiError = new Error("Event not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({ success: true, data: {} });
});
