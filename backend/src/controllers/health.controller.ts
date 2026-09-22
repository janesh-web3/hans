import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const getHealth = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "HANS API is running",
    statusCode: 200,
  });
});
