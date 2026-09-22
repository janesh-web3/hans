import type { Pagination } from "@/types/hotel";

/** Shape of an Event document as returned by GET /api/v1/events (mirrors backend/src/models/Event.ts). */
export interface ApiEvent {
  _id: string;
  titleEn: string;
  titleNp: string;
  descriptionEn: string;
  descriptionNp: string;
  /** ISO 8601 timestamp. */
  startDate: string;
  /** ISO 8601 timestamp. */
  endDate: string;
  location: string;
  registrationLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventsResponse {
  success: boolean;
  data: ApiEvent[];
  pagination: Pagination;
}
