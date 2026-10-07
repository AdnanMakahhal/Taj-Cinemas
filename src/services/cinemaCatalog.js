export const cinemaCategories = [
  { id: "today", label: "Now Showing", type: "movies" },
  { id: "week", label: "This Week", type: "moviesThisWeek" },
  { id: "soon", label: "Coming Soon", type: "moviesComingSoon" },
];

function normalizeSearch(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function filterCinemaList(movies, { query = "", genre = "all", minRating = 0, sort = "default" } = {}) {
  const search = normalizeSearch(query);
  const filtered = movies.filter((movie) =>
    normalizeSearch(movie.title || "").includes(search) &&
    (genre === "all" || (movie.genres || []).some(({ id }) => String(id) === String(genre))) &&
    (Number(movie.vote_average) || 0) >= Number(minRating),
  );
  if (sort === "rating") filtered.sort((a, b) => (Number(b.vote_average) || 0) - (Number(a.vote_average) || 0));
  if (sort === "latest") filtered.sort((a, b) => (b.release_date || "").localeCompare(a.release_date || ""));
  if (sort === "title") filtered.sort((a, b) => (a.title || "").localeCompare(b.title || "", "en", { sensitivity: "base" }));
  return filtered;
}

export function getCinemaLists(nowPlaying, upcoming, now = new Date()) {
  const today = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
  return {
    today: nowPlaying.slice(0, 10),
    week: [...nowPlaying].sort((a, b) => (b.release_date || "").localeCompare(a.release_date || "")).slice(0, 10),
    soon: upcoming.filter((movie) => movie.release_date > today).slice(0, 10),
  };
}

export function searchCinemaMovies(lists, query, category = "all") {
  const uniqueMovies = new Map();
  for (const { id } of cinemaCategories) {
    if (category !== "all" && category !== id) continue;
    for (const movie of lists[id] || []) {
      if (!uniqueMovies.has(movie.id)) uniqueMovies.set(movie.id, { movie, category: id });
    }
  }
  const search = normalizeSearch(query);
  return [...uniqueMovies.values()].filter(({ movie }) => normalizeSearch(movie.title || "").includes(search));
}
