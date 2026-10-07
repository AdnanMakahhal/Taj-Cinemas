import { useEffect, useState } from "react";
import { getMovies, IMAGE_BASE } from "../services/apiMovies";

export function useMovies(endpoint) {
  const [result, setResult] = useState(() => ({
    endpoint,
    movies: [],
    isLoading: true,
    error: null,
  }));

  useEffect(() => {
    let isActive = true;

    getMovies(endpoint)
      .then((data) => {
        if (isActive) {
          setResult({ endpoint, movies: data, isLoading: false, error: null });
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        if (isActive) {
          setResult({ endpoint, movies: [], isLoading: false, error });
        }
      });

    return () => {
      isActive = false;
    };
  }, [endpoint]);

  const isCurrentEndpoint = result.endpoint === endpoint;

  return {
    movies: isCurrentEndpoint ? result.movies : [],
    isLoading: !isCurrentEndpoint || result.isLoading,
    error: isCurrentEndpoint ? result.error : null,
    IMAGE_BASE,
  };
}
