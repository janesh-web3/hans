import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import ContactSubmission, { ContactStatus } from "../models/ContactSubmission";
import { ApiError } from "../middleware/errorMiddleware";

const cleanString = (value: unknown, maxLength: number): string =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export const submitContact = asyncHandler(async (req: Request, res: Response) => {
  // Honeypot for simple bots. Silently accept and discard to avoid teaching them the field.
  if (cleanString(req.body.website, 200)) {
    res.status(201).json({ success: true, message: "Your message has been received." });
    return;
  }

  const name = cleanString(req.body.name, 120);
  const email = cleanString(req.body.email, 254).toLowerCase();
  const phone = cleanString(req.body.phone, 40);
  const district = cleanString(req.body.district, 40);
  const hotelName = cleanString(req.body.hotelName, 160);
  const reason = cleanString(req.body.reason, 120);
  const message = cleanString(req.body.message, 5000);

  if (!name || !email || !reason || !message) {
    const error: ApiError = new Error("Name, email, reason and message are required.");
    error.statusCode = 400;
    throw error;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const error: ApiError = new Error("Enter a valid email address.");
    error.statusCode = 400;
    throw error;
  }

  const submission = await ContactSubmission.create({ name, email, phone, district, hotelName, reason, message });
  res.status(201).json({ success: true, message: "Your message has been received.", data: { id: submission._id } });
});

export const listContactSubmissions = asyncHandler(async (req: Request, res: Response) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 25, 1), 100);
  const status = req.query.status;
  const filter: { status?: ContactStatus } = status && ["new", "in_progress", "resolved"].includes(String(status))
    ? { status: String(status) as ContactStatus }
    : {};
  const [items, total] = await Promise.all([
    ContactSubmission.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    ContactSubmission.countDocuments(filter),
  ]);
  res.json({ success: true, data: items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
});

export const updateContactStatus = asyncHandler(async (req: Request, res: Response) => {
  const allowed: ContactStatus[] = ["new", "in_progress", "resolved"];
  if (!allowed.includes(req.body.status)) {
    const error: ApiError = new Error("Status must be new, in_progress, or resolved.");
    error.statusCode = 400;
    throw error;
  }
  const submission = await ContactSubmission.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  ).lean();
  if (!submission) {
    const error: ApiError = new Error("Contact submission not found.");
    error.statusCode = 404;
    throw error;
  }
  res.json({ success: true, data: submission });
});
