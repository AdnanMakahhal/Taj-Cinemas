import MovieCard from "../components/MovieCard";
import { useMovies } from "../hooks/useMovies";
import { useTrandingMovies } from "../hooks/useTrandingMovies";
import { useComingSoonMovies } from "../hooks/useComingSoonMovies";
import SwiperAdnan from "../components/SwiperAdnan";

function Movies() {
  const { movies } = useMovies("movie/now_playing");
  const { moviesThisWeek } = useTrandingMovies("movie/top_rated");
  const { moviesComingSoon } = useComingSoonMovies("movie/upcoming");

  // || value.moviesThisWeek ==== "THIS WEEK" || value.moviesComingSoon === "COMING SOON"

  return (
    <>
      <div className="min-h-screen text-[#FFFFFF] pt-28 px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-3">
          Find your next big-screen moment.
        </h1>
        <p className="text-[#FFFFFF]]/70 mb-10">
          Choose a movie, pick a day, make it a cinema night.
        </p>

        <div className="flex justify-between items-end mb-3">
          <div className="flex flex-col gap-2 max-sm:w-50 h-full">
            <h1 className="text-3xl font-bold sm:text-3xl">Now Showing</h1>
            <p>On the big screen today. Your next seat is waiting.</p>
          </div>
          <p>{String(Math.min(movies.length, 10)).padStart(2, "0")} MOVIES</p>
        </div>

        <SwiperAdnan>
          {movies.length > 0 ? (
            movies
              .slice(0, 10)
              .map((movie) => (
                <MovieCard
                  movie={movie}
                  type="movies"
                  sectionTitle="NOW SHOWING"
                />
              ))
          ) : (
            <></>
          )}
        </SwiperAdnan>

        <div className="flex justify-between items-end mb-3">
          <div className="flex flex-col gap-2 max-sm:w-50 h-full">
            <h1 className="text-3xl font-bold sm:text-3xl">This Week</h1>
            <p>Plan ahead for your next cinema night.</p>
          </div>
          <p>
            {String(Math.min(moviesThisWeek.length, 10)).padStart(2, "0")}{" "}
            MOVIES
          </p>
        </div>

        <SwiperAdnan>
          {moviesThisWeek.length > 0 ? (
            moviesThisWeek
              .slice(0, 10)
              .map((movie) => (
                <MovieCard
                  movie={movie}
                  type="moviesThisWeek"
                  sectionTitle="NOW SHOWING"
                />
              ))
          ) : (
            <></>
          )}
        </SwiperAdnan>

        <div className="flex justify-between items-end mb-3">
          <div className="flex flex-col gap-2 max-sm:w-50 h-full">
            <h1 className="text-3xl font-bold sm:text-3xl">Coming Soon</h1>
            <p>A first look at what’s next on the big screen.</p>
          </div>
          <p>
            {String(Math.min(moviesComingSoon.length, 10)).padStart(2, "0")}{" "}
            MOVIES
          </p>
        </div>

        <SwiperAdnan>
          {moviesComingSoon.length > 0 ? (
            moviesComingSoon
              .slice(0, 10)
              .map((movie) => (
                <MovieCard
                  movie={movie}
                  type="moviesComingSoon"
                  sectionTitle="NOW SHOWING"
                />
              ))
          ) : (
            <></>
          )}
        </SwiperAdnan>
      </div>
    </>
  );
}

export default Movies;
