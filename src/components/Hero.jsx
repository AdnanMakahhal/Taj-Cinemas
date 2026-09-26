import { useRef } from "react";
import { Calendar, Play, ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useMovies } from "../hooks/useMovies";
import { timeStamp } from "../services/timestamp";

function Hero() {
  const { movies } = useMovies("trending/movie/week");

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative w-full h-screen min-h-[500px] 2xl:max-h-[1200px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full h-full"
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== "boolean"
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            }
          });
        }}
      >
        {movies.length > 0 ? (
          movies.slice(0, 7).map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="relative w-full h-full">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={movie.backdrop_url}
                  alt={movie.title}
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
              className="relative w-full h-full bg-[#11161B]"
              role="status"
              aria-label="Loading trending movies"
            >
              <span className="sr-only">Loading trending movies...</span>

              <div aria-hidden="true" className="absolute inset-0">
                <div className="absolute inset-0 animate-pulse bg-[#202a30]/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute inset-0 z-10 flex flex-col justify-center px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-44">
                  <div className="animate-pulse motion-reduce:animate-none">
                    <div className="mb-3 sm:mb-5 h-16 w-[220px] max-w-full rounded-xl bg-white/10 sm:h-24 sm:w-[320px] md:h-32 md:w-[400px] lg:h-40 lg:w-[480px] xl:h-48 xl:w-[560px] 2xl:h-56 2xl:w-[640px]" />

                    <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-5 sm:gap-3 md:gap-5">
                      {["w-24 sm:w-32", "w-24 sm:w-32", "w-20 sm:w-28"].map(
                        (width, index) => (
                          <div
                            key={index}
                            className={`${width} flex items-center rounded-full border border-white/5 bg-[#202a30]/40 px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 2xl:px-6 2xl:py-2.5`}
                          >
                            <div className="h-3 w-full rounded bg-white/10 sm:h-4 md:h-5 lg:h-6 2xl:h-7" />
                          </div>
                        ),
                      )}
                    </div>

                    <div className="mb-4 w-full space-y-2 sm:mb-5 sm:w-[85%] md:w-[65%] md:space-y-3 lg:w-[50%] xl:w-[45%] 2xl:w-[40%]">
                      <div className="h-3 w-full rounded bg-white/10 sm:h-4 md:h-5 lg:h-6 2xl:h-8" />
                      <div className="h-3 w-full rounded bg-white/10 sm:h-4 md:h-5 lg:h-6 2xl:h-8" />
                      <div className="h-3 w-2/3 rounded bg-white/10 sm:h-4 md:h-5 lg:h-6 2xl:h-8" />
                    </div>

                    <div className="flex flex-wrap gap-3 sm:gap-5">
                      <div className="rounded-xl border border-white/5 bg-white/20 px-4 py-2 sm:px-6 sm:py-2.5 md:px-7 md:py-3 2xl:px-9 2xl:py-4">
                        <div className="h-4 w-16 rounded bg-white/10 sm:h-6 sm:w-20 md:h-7 lg:w-24 2xl:h-8 2xl:w-28" />
                      </div>

                      <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-[#202a30]/40 px-4 py-2 sm:px-6 sm:py-2.5 md:px-7 md:py-3 2xl:px-9 2xl:py-4">
                        <div className="h-4 w-4 rounded-full bg-white/10 sm:h-5 sm:w-5 lg:h-6 lg:w-6 2xl:h-7 2xl:w-7" />
                        <div className="h-4 w-20 rounded bg-white/10 sm:h-6 sm:w-24 md:h-7 lg:w-28 2xl:h-8 2xl:w-36" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )}

        <div
          ref={prevRef}
          className="hero-swiper-button-prev swiper-nav-button absolute left-3 sm:left-5 md:left-8 lg:left-10 2xl:left-14 top-1/2 -translate-y-1/2 z-30 hidden sm:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border border-white/20 bg-black/40 backdrop-blur-md cursor-pointer text-white shadow-lg"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
        </div>
        <div
          ref={nextRef}
          className="hero-swiper-button-next swiper-nav-button absolute right-3 sm:right-5 md:right-8 lg:right-10 2xl:right-14 top-1/2 -translate-y-1/2 z-30 hidden sm:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border border-white/20 bg-black/40 backdrop-blur-md cursor-pointer text-white shadow-lg"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
        </div>
      </Swiper>
    </div>
  );
}

export default Hero;
