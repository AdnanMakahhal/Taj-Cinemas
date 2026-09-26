import { useEffect, useState } from "react";
import { getComingSoonMovies, IMAGE_BASE } from "../services/apiMovies";

export function useComingSoonMovies() {
  const [moviesComingSoon, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComingSoonMovies()
      .then((data) => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setIsLoading(false);
      });
  }, []);

  return { moviesComingSoon, isLoading, IMAGE_BASE };
}
