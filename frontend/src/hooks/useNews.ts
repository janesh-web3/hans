import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

/**
 * Speculative shape — there is no News model/API in /backend yet (only User, Hotel,
 * Event exist per claude.md §5). This hook is wired to the conventional REST path so
 * it's ready to use once that API exists; until then it will resolve with an error
 * (404) via React Query's error state.
 */
export interface ApiNews {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface NewsResponse {
  success: boolean;
  data: ApiNews[];
  pagination: Pagination;
}

export interface UseNewsParams {
  page?: number;
  limit?: number;
}

export function useNews(params: UseNewsParams = {}) {
  return useQuery({
    queryKey: ["news", params],
    queryFn: async () => {
      const { data } = await api.get<NewsResponse>("/news", { params });
      return data;
    },
  });
}
