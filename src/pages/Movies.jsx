import { useState } from "react";
import { Film, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import MovieListSection from "../components/MovieListSection";
import { useCinemaMovies } from "../hooks/useCinemaMovies";
import { cinemaCategories, filterCinemaList } from "../services/cinemaCatalog";

const descriptions = {
  today: "On the big screen today. Your next seat is waiting.",
  week: "Plan ahead for your next cinema night.",
  soon: "A first look at what's next on the big screen.",
};
const categories = [{ id: "all", label: "All movies" }, ...cinemaCategories];
const selectClass = "h-11 w-full rounded-lg border border-white/10 bg-[#202226] px-3 text-sm text-white/80 outline-none transition focus:border-white/35 focus:ring-2 focus:ring-white/10";

function Movies() {
  const { lists, loading, errors } = useCinemaMovies();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [genre, setGenre] = useState("all");
  const [minRating, setMinRating] = useState("0");
  const [sort, setSort] = useState("default");
  const hasFilters = Boolean(query.trim() || category !== "all" || genre !== "all" || minRating !== "0" || sort !== "default");
  const genres = [...new Map(Object.values(lists).flat().flatMap((movie) => movie.genres || []).map((item) => [item.id, item])).values()].sort((a, b) => a.name.localeCompare(b.name));
  const visibleCategories = cinemaCategories.filter(({ id }) => category === "all" || category === id);
  const filteredLists = Object.fromEntries(visibleCategories.map(({ id }) => [id, filterCinemaList(lists[id], { query, genre, minRating, sort })]));
  const isLoading = visibleCategories.some(({ id }) => loading[id]);
  const hasError = visibleCategories.some(({ id }) => errors[id]);
  const resultCount = new Set(Object.values(filteredLists).flat().map(({ id }) => id)).size;
  const sections = visibleCategories.filter(({ id }) => category !== "all" || !hasFilters || loading[id] || errors[id] || filteredLists[id].length > 0);

  function resetFilters() {
    setQuery("");
    setCategory("all");
    setGenre("all");
    setMinRating("0");
    setSort("default");
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-5 pb-4 pt-28 text-white sm:px-8">
      <h1 className="mb-3 text-3xl font-bold">Find your next big-screen moment.</h1>
      <p className="mb-7 text-white/70">Choose a movie, pick a day, make it a cinema night.</p>

      <section aria-label="Movie filters" className="mb-8 rounded-2xl border border-white/10 bg-[#141619]/90 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold"><SlidersHorizontal aria-hidden="true" className="size-4 text-white/60" />Find your movie</h2>
          <button type="button" onClick={resetFilters} disabled={!hasFilters} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-xs text-white/65 transition hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-white disabled:cursor-default disabled:opacity-30">
            <RotateCcw aria-hidden="true" className="size-3.5" />Reset
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
          <label className="block">
            <span className="mb-2 block text-xs text-white/50">Movie title</span>
            <span className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#202226] px-3 focus-within:border-white/35 focus-within:ring-2 focus-within:ring-white/10">
              <Search aria-hidden="true" className="size-4 shrink-0 text-white/40" />
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title..." className="h-11 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/35" />
            </span>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs text-white/50">Genre</span>
            <select value={genre} onChange={(event) => setGenre(event.target.value)} className={selectClass}>
              <option value="all">All genres</option>
              {genres.map(({ id, name }) => <option key={id} value={String(id)}>{name}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs text-white/50">Rating</span>
            <select value={minRating} onChange={(event) => setMinRating(event.target.value)} className={selectClass}>
              <option value="0">Any rating</option><option value="6">6+ stars</option><option value="7">7+ stars</option><option value="8">8+ stars</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs text-white/50">Sort by</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)} className={selectClass}>
              <option value="default">Featured</option><option value="rating">Highest rated</option><option value="latest">Latest release</option><option value="title">Title: A to Z</option>
            </select>
          </label>
        </div>
        <div aria-label="Movie category" className="mt-4 flex flex-wrap gap-2 border-t border-white/[0.07] pt-4">
          {categories.map(({ id, label }) => (
            <button key={id} type="button" onClick={() => setCategory(id)} aria-pressed={category === id} className={`min-h-10 rounded-full border px-4 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${category === id ? "border-white bg-white text-[#111214]" : "border-white/10 bg-white/[0.035] text-white/65 hover:bg-white/10 hover:text-white"}`}>
              {label}
            </button>
          ))}
        </div>
        <p role="status" className="mt-3 text-xs text-white/45">{isLoading ? "Loading cinema listings..." : `${resultCount} ${resultCount === 1 ? "movie" : "movies"} ${hasFilters ? (resultCount === 1 ? "matches your filters" : "match your filters") : "in our cinema listings"}`}</p>
      </section>

      {!isLoading && !hasError && sections.length === 0 && (
        <div role="status" className="mb-10 flex min-h-60 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] p-6 text-center">
          <Film aria-hidden="true" className="mb-4 size-8 text-white/35" />
          <h2 className="text-lg font-semibold">No movies match your filters</h2>
          <p className="mt-2 text-sm text-white/50">Try another title, genre, or rating.</p>
          <button type="button" onClick={resetFilters} className="mt-5 min-h-11 rounded-lg bg-white px-5 text-sm font-semibold text-[#111214] hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Reset filters</button>
        </div>
      )}
      {sections.map(({ id, label, type }) => (
        <MovieListSection key={id} title={label} description={descriptions[id]} movies={filteredLists[id]} isLoading={loading[id]} error={errors[id]} type={type} badge={label.toUpperCase()} isFiltered={hasFilters} />
      ))}
    </div>
  );
}

export default Movies;
