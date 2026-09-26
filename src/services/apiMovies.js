import { getCertification } from "./certification";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE = "https://image.tmdb.org/t/p";

export function getMoviesThisWeek() {
  return getMovies("movie/top_rated");
}
export function getComingSoonMovies() {
  return getMovies("movie/upcoming");
}

export async function getMovies(endpoint) {
  const res = await fetch(
    `${BASE_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`,
  );

  const data = await res.json();

  const movies = await Promise.all(
    (data.results || []).map(async (movie) => {
      const [detailRes, releaseDatesRes] = await Promise.all([
        fetch(
          `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&language=en-US&append_to_response=images,videos`,
        ),
        fetch(`${BASE_URL}/movie/${movie.id}/release_dates?api_key=${API_KEY}`),
      ]);

      const [detail, releaseDates] = await Promise.all([
        detailRes.json(),
        releaseDatesRes.json(),
      ]);

      const certification = getCertification(releaseDates);

      const logo =
        detail.images?.logos?.find((l) => l.iso_639_1 === "en") ||
        detail.images?.logos?.[0];
      const trailer = detail.videos?.results?.find(
        (v) => v.type === "Trailer" && v.site === "YouTube",
      );

      return {
        ...movie,
        certification,
        runtime: detail.runtime,
        backdrop_url: movie.backdrop_path
          ? `${IMAGE_BASE}/original${movie.backdrop_path}`
          : null,
        poster_path: movie.poster_path
          ? `${IMAGE_BASE}/original${movie.poster_path}`
          : null,
        logo_path: logo?.file_path || null,
        logo_url: logo ? `${IMAGE_BASE}/original${logo.file_path}` : null,
        trailer_url: trailer
          ? `https://www.youtube.com/watch?v=${trailer.key}`
          : null,
      };
    }),
  );

  return movies;
}
