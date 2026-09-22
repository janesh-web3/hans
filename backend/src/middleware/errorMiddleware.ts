import { NextFunction, Request, Response } from "express";

export interface ApiError extends Error {
  statusCode?: number;
}

export const notFound = (req: Request, _res: Response, next: NextFunction): void => {
  const error: ApiError = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

interface MongooseValidationError extends ApiError {
  errors?: Record<string, { message: string }>;
}

interface MongoDuplicateKeyError extends ApiError {
  code?: number;
}

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = err.statusCode && err.statusCode !== 200 ? err.statusCode : 500;
  let message = err.message || "Internal Server Error";

  // Invalid Mongoose ObjectId (e.g. GET /hotels/:id with a malformed id)
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Resource not found";
  }

  // Mongoose schema validation failure
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values((err as MongooseValidationError).errors ?? {})
      .map((e) => e.message)
      .join(", ");
  }

  // MongoDB duplicate key (e.g. unique email already registered)
  if ((err as MongoDuplicateKeyError).code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
};
