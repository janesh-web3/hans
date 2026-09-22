import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { ApiHotel, HotelsResponse } from "@/types/hotel";

export interface UseHotelsParams {
  district?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export function useHotels(params: UseHotelsParams = {}) {
  return useQuery({
    queryKey: ["hotels", params],
    queryFn: async () => {
      const { data } = await api.get<HotelsResponse>("/hotels", { params });
      return data;
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
