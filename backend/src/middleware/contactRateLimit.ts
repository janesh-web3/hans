import { NextFunction, Request, Response } from "express";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

export function contactRateLimit(req: Request, res: Response, next: NextFunction): void {
  const now = Date.now();
  const key = req.ip ?? req.socket.remoteAddress ?? "unknown";
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    next();
    return;
  }
  if (current.count >= MAX_REQUESTS) {
    res.setHeader("Retry-After", Math.ceil((current.resetAt - now) / 1000));
    res.status(429).json({ success: false, message: "Too many messages. Please try again later." });
    return;
  }
  current.count += 1;
  next();
}

// Periodically discard expired keys so the in-memory limiter remains bounded.
setInterval(() => {
  const now = Date.now();
  for (const [key, attempt] of attempts) if (attempt.resetAt <= now) attempts.delete(key);
}, WINDOW_MS).unref();
