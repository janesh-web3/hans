import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { ApiEvent, EventsResponse } from "@/types/event";

export interface UseEventsParams {
  page?: number;
  limit?: number;
}

/**
 * Events from GET /api/v1/events, sorted soonest-first by the backend.
 *
 * The endpoint has no date filter, so callers that want only upcoming events
 * request a generous `limit` and narrow the list client-side with the helpers
 * in `@/lib/events`.
 */
export function useEvents(params: UseEventsParams = {}) {
  return useQuery({
    queryKey: ["events", params],
    queryFn: async () => {
      const { data } = await api.get<EventsResponse>("/events", { params });
      return data;
    },
  });
}

interface EventResponse {
  success: boolean;
  data: ApiEvent;
}

export function useEvent(id: string | undefined) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const { data } = await api.get<EventResponse>(`/events/${id}`);
      return data.data;
    },
    enabled: Boolean(id),
  });
}
