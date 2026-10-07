import HeroSkeleton from "./HeroSkeleton";
import {
  Calendar,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useMovies } from "../hooks/useMovies";
import { timeStamp } from "../services/timestamp";

function Hero() {
  const { movies, isLoading, error } = useMovies("trending/movie/week");

  if (isLoading && movies.length === 0) {
    return <HeroSkeleton />;
  }

  return (
    <div className="relative w-full h-screen min-h-[500px] 2xl:max-h-[1200px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".hero-swiper-button-prev",
          nextEl: ".hero-swiper-button-next",
          enabled: movies.length > 1,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper hero-carousel w-full h-full"
      >
        {movies.length > 0 ? (
          movies.slice(0, 7).map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <div className="relative w-full h-full">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={movie.backdrop_url}
                  alt={movie.title}
                  width="1280"
                  height="720"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                />
                <div className="absolute inset-0 bg-[#010101]/25" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 z-10 flex flex-col justify-center px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-44 text-[#ffffff]">
                  <div className="mb-3 sm:mb-5">
                    <img
                      className="w-auto max-w-[220px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[480px] xl:max-w-[560px] 2xl:max-w-[640px] max-h-16 sm:max-h-24 md:max-h-32 lg:max-h-40 xl:max-h-48 2xl:max-h-56 object-contain object-left drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
                      src={movie.logo_url}
                      alt={`${movie.title} logo`}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-3 sm:gap-3 md:gap-5 sm:mb-5">
                    <div className="flex gap-2 items-center rounded-full border border-[#FFFFFF]/5 bg-[#202a30]/40 px-3 py-1 text-[10px] shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-xs sm:px-4 sm:py-1.5 sm:text-xs md:px-5 md:py-2 md:text-sm lg:text-base 2xl:px-6 2xl:py-2.5 2xl:text-lg">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3 text-[#F0B100] sm:w-4 sm:h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6"
                      >
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                      <p>
                        Rating:{" "}
                        {movie.vote_average
                          ? movie.vote_average.toFixed(1)
                          : "N/A"}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center rounded-full border border-white/5 bg-[#202a30]/40 px-3 py-1 text-[10px] shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-xs sm:px-4 sm:py-1.5 sm:text-xs md:px-5 md:py-2 md:text-sm lg:text-base 2xl:px-6 2xl:py-2.5 2xl:text-lg">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
                      <p>
                        Date:{" "}
                        {movie.release_date
                          ? movie.release_date.split("-")[0]
                          : "N/A"}
                      </p>
                    </div>

                    <div className="flex items-center rounded-full border border-white/5 bg-[#202a30]/40 px-3 py-1 text-[10px] shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-xs sm:px-4 sm:py-1.5 sm:text-xs md:px-5 md:py-2 md:text-sm lg:text-base 2xl:px-6 2xl:py-2.5 2xl:text-lg">
                      <p>{timeStamp(movie.runtime)}</p>
                    </div>
                  </div>

                  <div className="w-full mb-4 sm:mb-5 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white/80 leading-normal sm:leading-6 md:leading-7 2xl:leading-9 sm:w-[85%] md:w-[65%] lg:w-[50%] xl:w-[45%] 2xl:w-[40%]">
                    <p>
                      {movie.overview
                        ? `${movie.overview.split(" ").slice(0, 25).join(" ")}...`
                        : "No description available."}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 sm:gap-5">
                    <button className="flex items-center font-semibold rounded-xl border text-[#0F0F0F] border-white/5 bg-[#FFFFFF] px-4 py-2 text-xs sm:px-6 sm:py-2.5 sm:text-base md:px-7 md:py-3 md:text-lg lg:text-xl 2xl:px-9 2xl:py-4 2xl:text-2xl shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-xs cursor-pointer hover:bg-[#FFFFFF]/80 transition">
                      Buy Ticket
                    </button>
                    <a
                      href={movie.trailer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-white/5 bg-[#202a30]/40 px-4 py-2 text-xs sm:px-6 sm:py-2.5 sm:text-base md:px-7 md:py-3 md:text-lg lg:text-xl 2xl:px-9 2xl:py-4 2xl:text-2xl shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-xs cursor-pointer hover:bg-[#202a30]/70 transition"
                    >
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 2xl:w-7 2xl:h-7 fill-white" />
                      <span>Watch Trailer</span>
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div
              className="flex h-full w-full items-center justify-center bg-[#11161B] px-6 text-center text-white"
              role={error ? "alert" : "status"}
            >
              <div className="max-w-md">
                <h2 className="text-xl font-semibold sm:text-2xl">
                  {error ? "Movies are unavailable right now" : "No movies to show"}
                </h2>
                <p className="mt-2 text-sm text-white/60 sm:text-base">
                  {error
                    ? "Please try again in a moment."
                    : "Check back soon for the latest movies."}
                </p>
              </div>
            </div>
          </SwiperSlide>
        )}

        {movies.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous movie"
              title="Previous movie"
              className="hero-swiper-button-prev swiper-nav-button"
            >
              <ChevronLeft aria-hidden="true" strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label="Next movie"
              title="Next movie"
              className="hero-swiper-button-next swiper-nav-button"
            >
              <ChevronRight aria-hidden="true" strokeWidth={2.25} />
            </button>
          </>
        )}
      </Swiper>
    </div>
  );
}

export default Hero;
