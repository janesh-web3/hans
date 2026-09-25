import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { ApiError } from "../middleware/errorMiddleware";

const generateToken = (id: string, tokenVersion: number): string => {
  return jwt.sign({ id, tokenVersion }, process.env.JWT_SECRET as string, {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? "7d") as jwt.SignOptions["expiresIn"],
  });
};

const sessionCookieName = "hans_admin_session";

function setSessionCookie(res: Response, token: string): void {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader("Set-Cookie", `${sessionCookieName}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800${secure}`);
}

export const logoutUser = (_req: Request, res: Response): void => {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader("Set-Cookie", `${sessionCookieName}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`);
  res.json({ success: true });
};

// @desc    Authenticate user & return a JWT
// @route   POST /api/v1/auth/login
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error: ApiError = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email: String(email).trim().toLowerCase() }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error: ApiError = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  setSessionCookie(res, generateToken(user._id.toString(), user.tokenVersion ?? 0));
  res.status(200).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body as { currentPassword?: string; newPassword?: string };
  if (!currentPassword || !newPassword || newPassword.length < 12) {
    const error: ApiError = new Error("Enter your current password and a new password of at least 12 characters.");
    error.statusCode = 400;
    throw error;
  }
  const user = await User.findById(req.user?._id).select("+password");
  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    const error: ApiError = new Error("Current password is incorrect.");
    error.statusCode = 401;
    throw error;
  }
  user.password = await bcrypt.hash(newPassword, 12);
  user.tokenVersion = (user.tokenVersion ?? 0) + 1;
  await user.save();
  setSessionCookie(res, generateToken(user._id.toString(), user.tokenVersion));
  res.json({ success: true, message: "Password changed." });
});

// @desc    Get the currently authenticated user
// @route   GET /api/v1/auth/me
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});
