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
}

export const protect = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      const error: ApiError = new Error("Not authorized, no token");
      error.statusCode = 401;
      throw error;
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
    if (!user) {
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
