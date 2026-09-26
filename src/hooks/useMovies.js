import { useEffect, useState } from "react";
import { getMovies, IMAGE_BASE } from "../services/apiMovies";

export function useMovies(endpoint) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getMovies(endpoint)
      .then((data) => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setIsLoading(false);
      });
  }, [endpoint]);

  return { movies, isLoading, IMAGE_BASE };
}
