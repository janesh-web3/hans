import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User, { IUser } from "../models/User";
import { ApiError } from "./errorMiddleware";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

interface JwtPayload {
  id: string;
  tokenVersion?: number;
}

export const protect = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;

    const cookieHeader = req.headers.cookie ?? "";
    const session = cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith("hans_admin_session="));
    token = session?.slice("hans_admin_session=".length);

    if (!token) {
      const error: ApiError = new Error("Not authorized, no token");
      error.statusCode = 401;
      throw error;
    }

    // Reject cross-origin state changes even if a browser sends an ambient cookie.
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
      const origin = req.get("origin");
      const allowedOrigins = [
        process.env.FRONTEND_URL ?? "http://localhost:5173",
        process.env.ADMIN_URL ?? "http://localhost:5190",
      ];
      if (origin && !allowedOrigins.includes(origin)) {
        const error: ApiError = new Error("Request origin is not allowed.");
        error.statusCode = 403;
        throw error;
      }
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    } catch {
      const error: ApiError = new Error("Not authorized, token failed");
      error.statusCode = 401;
      throw error;
    }

    const user = await User.findById(decoded.id);
    if (!user || (decoded.tokenVersion ?? 0) !== (user.tokenVersion ?? 0)) {
      const error: ApiError = new Error("Not authorized, user not found");
      error.statusCode = 401;
      throw error;
    }

    req.user = user;
    next();
  }
);

export const adminOnly = (req: Request, _res: Response, next: NextFunction): void => {
  if (req.user?.role !== "admin") {
    const error: ApiError = new Error("Not authorized as an admin");
    error.statusCode = 403;
    throw error;
  }
  next();
};
