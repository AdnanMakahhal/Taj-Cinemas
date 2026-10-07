import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import SwiperAdnan from "./SwiperAdnan";
import Skeleton from "../ui/Skeleton";

function MovieListSection({ title, description, movies, isLoading, error, type, badge, isFiltered = false }) {
  return (
    <section aria-label={title} aria-busy={isLoading}>
      <div className="mb-3 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mt-2 text-sm text-white/65 sm:text-base">{description}</p>
        </div>
        {isLoading ? (
          <Skeleton className="h-5 w-20 shrink-0" />
        ) : (
          <p className="shrink-0 text-xs text-white/55 sm:text-sm">
            {String(Math.min(movies.length, 10)).padStart(2, "0")} MOVIES
          </p>
        )}
      </div>
      {isLoading && <span role="status" className="sr-only">Loading {title.toLowerCase()} movies...</span>}
      {isLoading || movies.length > 0 ? (
        <SwiperAdnan key={isLoading ? "loading" : movies.map(({ id }) => id).join("-")}>
          {isLoading
            ? Array.from({ length: 4 }, (_, index) => <MovieCardSkeleton key={index} />)
            : movies.slice(0, 10).map((movie) => (
                <MovieCard key={movie.id} movie={movie} type={type} sectionTitle={badge} />
              ))}
        </SwiperAdnan>
      ) : (
        <p role={error ? "alert" : "status"} className="mb-10 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-10 text-center text-sm text-white/55">
          {error ? "Movies could not be loaded. Please try again shortly." : isFiltered ? "No movies match these filters. Try another title or reset your filters." : "No movies to show yet. Check back soon."}
        </p>
      )}
    </section>
  );
}

export default MovieListSection;
