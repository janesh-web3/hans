import dotenv from "dotenv";

dotenv.config();

import cors from "cors";
import express, { Application } from "express";
import { connectDB } from "./config/db";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import healthRoutes from "./routes/health.routes";
import hotelRoutes from "./routes/hotelRoutes";

const app: Application = express();

// CORS: allow only the frontend (5173) and admin (5174) dev origins.
const allowedOrigins = [
  process.env.FRONTEND_URL ?? "http://localhost:5173",
  process.env.ADMIN_URL ?? "http://localhost:5174",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ──────────────────────────────────────────────────────────────
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/hotels", hotelRoutes);
app.use("/api/v1/events", eventRoutes);

// ── Global error handling ──────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
