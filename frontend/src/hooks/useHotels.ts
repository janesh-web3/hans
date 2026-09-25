import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { ApiHotel, HotelsResponse } from "@/types/hotel";

export interface UseHotelsParams {
  district?: string;
  category?: string;
  page?: number;
  limit?: number;
  allPages?: boolean;
}

export function useHotels(params: UseHotelsParams = {}) {
  return useQuery({
    queryKey: ["hotels", params],
    queryFn: async () => {
      const { allPages, ...requestParams } = params;
      const { data: firstPage } = await api.get<HotelsResponse>("/hotels", {
        params: allPages ? { ...requestParams, page: 1, limit: 100 } : requestParams,
      });
      if (!allPages || firstPage.pagination.totalPages <= 1) return firstPage;

      const pages = await Promise.all(
        Array.from({ length: firstPage.pagination.totalPages - 1 }, (_, index) =>
          api.get<HotelsResponse>("/hotels", {
            params: { ...requestParams, page: index + 2, limit: 100 },
          }).then((response) => response.data.data)
        )
      );
      return { ...firstPage, data: [...firstPage.data, ...pages.flat()] };
    },
  });
}

interface HotelResponse {
  success: boolean;
  data: ApiHotel;
}

export function useHotel(id: string | undefined) {
  return useQuery({
    queryKey: ["hotel", id],
    queryFn: async () => {
      const { data } = await api.get<HotelResponse>(`/hotels/${id}`);
      return data.data;
    },
    enabled: Boolean(id),
  });
}
