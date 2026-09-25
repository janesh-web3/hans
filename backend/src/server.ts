import dotenv from "dotenv";

dotenv.config();

import cors from "cors";
import express, { Application } from "express";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import healthRoutes from "./routes/health.routes";
import hotelRoutes from "./routes/hotelRoutes";
import contactRoutes from "./routes/contactRoutes";
import User from "./models/User";
import siteSettingsRoutes from "./routes/siteSettingsRoutes";

const app: Application = express();

// CORS: allow only the frontend (5173) and admin (5174) dev origins.
const allowedOrigins = [
  process.env.FRONTEND_URL ?? "http://localhost:5173",
  process.env.ADMIN_URL ?? "http://localhost:5190",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) callback(null, true);
      else callback(null, false);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true }));

// ── Routes ──────────────────────────────────────────────────────────────
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/hotels", hotelRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/site-settings", siteSettingsRoutes);

// ── Global error handling ──────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function ensureInitialAdmin(): Promise<void> {
  if (await User.exists({})) return;
  const email = process.env.INITIAL_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.INITIAL_ADMIN_PASSWORD;
  if (!email || !password) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("No admin account exists. Set INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD for the first secure bootstrap.");
    }
    console.warn("No admin exists yet; set INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD to create the first account.");
    return;
  }
  if (password.length < 12) throw new Error("INITIAL_ADMIN_PASSWORD must contain at least 12 characters.");
  const hashedPassword = await bcrypt.hash(password, 12);
  await User.create({
    name: process.env.INITIAL_ADMIN_NAME?.trim() || "HAN Administrator",
    email,
    password: hashedPassword,
    role: "admin",
  });
  console.log(`Created the initial admin account for ${email}. Remove INITIAL_ADMIN_PASSWORD from the server environment after first startup.`);
}

const startServer = async (): Promise<void> => {
  try {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      throw new Error("JWT_SECRET must be configured with at least 32 characters.");
    }
    await connectDB();
    await ensureInitialAdmin();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
