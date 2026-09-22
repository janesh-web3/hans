/** Shape of an Event document as returned by the API (mirrors backend/src/models/Event.ts). */
export interface ApiEvent {
  _id: string;
  titleEn: string;
  titleNp: string;
  descriptionEn: string;
  descriptionNp: string;
  startDate: string;
  endDate: string;
  location: string;
  registrationLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface EventsResponse {
  success: boolean;
  data: ApiEvent[];
  pagination: Pagination;
}

/** Payload sent to POST /events and PUT /events/:id. */
export interface EventInput {
  titleEn: string;
  titleNp: string;
  descriptionEn: string;
  descriptionNp: string;
  startDate: string;
  endDate: string;
  location: string;
  registrationLink?: string;
}
