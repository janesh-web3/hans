import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import SiteSettings from "../models/SiteSettings";
import { ApiError } from "../middleware/errorMiddleware";

export const getSiteSettings = asyncHandler(async (_req: Request, res: Response) => {
  const record = await SiteSettings.findOne({ key: "public" }).lean();
  res.json({ success: true, data: record?.settings ?? {} });
});

export const updateSiteSettings = asyncHandler(async (req: Request, res: Response) => {
  const settings = req.body?.settings;
  if (!settings || typeof settings !== "object" || Array.isArray(settings)) {
    const error: ApiError = new Error("A settings object is required.");
    error.statusCode = 400;
    throw error;
  }
  if (JSON.stringify(settings).length > 28_000) {
    const error: ApiError = new Error("Settings are too large to save.");
    error.statusCode = 413;
    throw error;
  }
  const record = await SiteSettings.findOneAndUpdate(
    { key: "public" },
    { $set: { settings } },
    { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
  ).lean();
  res.json({ success: true, data: record?.settings ?? settings });
});
