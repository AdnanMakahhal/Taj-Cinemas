import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Film, Search, X } from "lucide-react";
import HeaderPanel from "./HeaderPanel";
import Skeleton from "../ui/Skeleton";
import { useCinemaMovies } from "../hooks/useCinemaMovies";
import { cinemaCategories, searchCinemaMovies } from "../services/cinemaCatalog";

const filters = [{ id: "all", label: "All movies" }, ...cinemaCategories];

function SearchWindow({ onClose }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const { lists, loading, errors, retry } = useCinemaMovies();
  const results = searchCinemaMovies(lists, query, filter);
  const categories = filter === "all" ? cinemaCategories.map(({ id }) => id) : [filter];
  const isLoading = categories.some((id) => loading[id]);
  const hasError = categories.some((id) => errors[id]);

  return (
    <HeaderPanel id="search-panel" labelledBy="search-heading">
      <div className="flex items-center justify-between gap-3">
        <h2 id="search-heading" className="text-base font-semibold">Find a movie</h2>
        <button onClick={onClose} type="button" aria-label="Close search" className="flex size-9 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white">
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>
      <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/15 bg-black/15 px-3 focus-within:border-white/40">
        <Search aria-hidden="true" className="size-4 shrink-0 text-white/45" />
        <input
          autoFocus
          type="search"
          aria-label="Search cinema movies by title"
          placeholder="Search cinema movies..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="h-10 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
        />
      </div>
      <div aria-label="Filter movie results" className="mt-2 flex flex-wrap gap-1.5">
        {filters.map(({ id, label }) => (
          <button key={id} type="button" onClick={() => setFilter(id)} aria-pressed={filter === id} className={`min-h-8 rounded-full border px-3 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${filter === id ? "border-white bg-white font-medium text-[#11161b]" : "border-white/10 bg-white/[0.04] text-white/65 hover:bg-white/10 hover:text-white"}`}>
            {label}
          </button>
        ))}
      </div>
      <p role="status" className="mt-3 text-xs text-white/40">
        {isLoading ? "Loading cinema listings..." : `${results.length} ${results.length === 1 ? "movie" : "movies"} found`}
      </p>
      {hasError && !isLoading && (
        <div role="alert" className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-red-400/10 px-3 py-2 text-xs text-red-200">
          <span>Some movie listings could not be loaded.</span>
          <button type="button" onClick={retry} className="shrink-0 rounded font-semibold underline focus-visible:outline-2 focus-visible:outline-white">Try again</button>
        </div>
      )}
      <div aria-busy={isLoading} className="scroll-area mt-2 max-h-[min(28dvh,220px)] space-y-1 overflow-y-auto pr-1">
        {results.map(({ movie, category }) => {
          const categoryLabel = cinemaCategories.find(({ id }) => id === category).label;
          const comingSoon = category === "soon";
          const content = (
            <>
              {movie.poster_path ? (
                <img src={movie.poster_path} alt="" width="32" height="48" loading="lazy" className="h-12 w-8 shrink-0 rounded-md object-cover" />
              ) : (
                <span className="flex h-12 w-8 shrink-0 items-center justify-center rounded-md bg-white/10"><Film aria-hidden="true" className="size-5 text-white/40" /></span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{movie.title}</p>
                <p className="mt-1 text-xs text-white/45">{categoryLabel}{movie.release_date ? ` · ${movie.release_date.slice(0, 4)}` : ""}</p>
                <p className="mt-1 text-[11px] text-white/55">{comingSoon ? "Bookings open soon" : category === "week" ? "Choose a future day" : "Book tickets"}</p>
              </div>
              {!comingSoon && <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-white/40" />}
            </>
          );
          return comingSoon ? (
            <div key={movie.id} className="flex items-center gap-3 rounded-xl p-2">{content}</div>
          ) : (
            <Link key={movie.id} to="/MoviesObsession" state={{ movie, bookingMode: category === "week" ? "future" : "today" }} onClick={onClose} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white">
              {content}
            </Link>
          );
        })}
        {isLoading && Array.from({ length: 3 }, (_, index) => (
          <div key={index} aria-hidden="true" className="flex items-center gap-3 p-2">
            <Skeleton className="h-12 w-8 shrink-0" />
            <div className="flex-1 space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-3 w-2/5" /></div>
          </div>
        ))}
        {!isLoading && !hasError && results.length === 0 && (
          <div className="py-5 text-center">
            <Film aria-hidden="true" className="mx-auto mb-3 size-7 text-white/30" />
            <p className="text-sm font-medium">{query.trim() ? "No matching cinema movies" : "No movies in this category yet"}</p>
            <p className="mt-2 text-xs leading-5 text-white/45">Try another title or category. Search includes only movies listed in our cinema sections.</p>
          </div>
        )}
      </div>
    </HeaderPanel>
  );
}

export default SearchWindow;
