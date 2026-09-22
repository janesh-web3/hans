import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import type { ApiHotel, HotelInput, HotelsResponse } from "@/types/hotel";

interface HotelResponse {
  success: boolean;
  data: ApiHotel;
}

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

export function useCreateHotel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: HotelInput) => {
      const { data } = await api.post<HotelResponse>("/hotels", input);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
    },
  });
}

export function useUpdateHotel(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: HotelInput) => {
      const { data } = await api.put<HotelResponse>(`/hotels/${id}`, input);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
      queryClient.invalidateQueries({ queryKey: ["hotel", id] });
    },
  });
}

export function useDeleteHotel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/hotels/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
    },
  });
}
