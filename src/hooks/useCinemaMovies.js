import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../services/apiMovies";
import { getCinemaLists } from "../services/cinemaCatalog";

export function useCinemaMovies() {
  const nowPlaying = useQuery({
    queryKey: ["cinema-movies", "now-playing"],
    queryFn: () => getMovies("movie/now_playing"),
    staleTime: 5 * 60 * 1000,
  });
  const upcoming = useQuery({
    queryKey: ["cinema-movies", "upcoming"],
    queryFn: () => getMovies("movie/upcoming"),
    staleTime: 5 * 60 * 1000,
  });
  return {
    lists: getCinemaLists(nowPlaying.data || [], upcoming.data || []),
    loading: { today: nowPlaying.isPending, week: nowPlaying.isPending, soon: upcoming.isPending },
    errors: { today: nowPlaying.error, week: nowPlaying.error, soon: upcoming.error },
    retry: () => { nowPlaying.refetch(); upcoming.refetch(); },
  };
}
