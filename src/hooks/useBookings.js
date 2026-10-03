import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMovieBooking,
  getMovieBookings,
} from "../services/apiBookings";

const BOOKINGS_QUERY_KEY = ["bookings"];

export function useBookings() {
  return useQuery({
    queryKey: BOOKINGS_QUERY_KEY,
    queryFn: getMovieBookings,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createMovieBooking,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY }),
  });

  return {
    createBooking: createMutation.mutate,
    isCreating: createMutation.isPending,
    createError: createMutation.error,
    resetCreate: createMutation.reset,
  };
}
