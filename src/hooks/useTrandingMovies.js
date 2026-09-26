import { useEffect, useState } from "react";
import { getMoviesThisWeek, IMAGE_BASE } from "../services/apiMovies";

export function useTrandingMovies() {
  const [moviesThisWeek, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMoviesThisWeek()
      .then((data) => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setIsLoading(false);
      });
  }, []);

  return { moviesThisWeek, isLoading, IMAGE_BASE };
}
