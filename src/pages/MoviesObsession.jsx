import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, Star } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { timeStamp } from "../services/timestamp";
import { useCreateBooking } from "../hooks/useBookings";

function getBookingDate(daysFromToday) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + daysFromToday);
  return date;
}

function formatBookingDate(date, options) {
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function MoviesObsession() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const movie = state?.movie;
  const title = movie?.title || "Obsession";
  const poster = movie?.poster_path;
  const runtime = movie?.runtime;
  const certification = movie?.certification || "18+";
  const rating =
    typeof movie?.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "7.8";
  const [city, setCity] = useState("Amman");
  const [cinema, setCinema] = useState("TAJ Cinemas");
  const [selectedDate, setSelectedDate] = useState(() => getBookingDate(0));
  const [selectedShowtime, setSelectedShowtime] = useState({
    time: "19:00",
    room: "Screen 03",
    format: "Standard 2D",
  });
  const { createBooking, isCreating, createError, resetCreate } =
    useCreateBooking();

  function changeCity(event) {
    const nextCity = event.target.value;
    setCity(nextCity);
    if (nextCity === "Amman") setCinema("TAJ Cinemas");
    if (nextCity === "Irbid") setCinema("Irbid City Center");
    if (nextCity === "Aqaba") setCinema("Aqaba City Center");
    if (nextCity === "Zarqa") setCinema("Zarqa Cinemas");
    if (nextCity === "Madaba") setCinema("Madaba Cinemas");
  }

  function handleContinueToSeats() {
    resetCreate();
    createBooking(
      {
        movieId: movie?.id,
        movieTitle: title,
        posterUrl: poster,
        city,
        cinema,
        showDate: [
          selectedDate.getFullYear(),
          String(selectedDate.getMonth() + 1).padStart(2, "0"),
          String(selectedDate.getDate()).padStart(2, "0"),
        ].join("-"),
        showTime: selectedShowtime.time,
        screen: selectedShowtime.room,
        format: selectedShowtime.format,
      },
      {
        onSuccess: () => navigate("/Bookings"),
      },
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 pb-12 pt-24 text-white sm:px-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          to="/Movies"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="size-4" />
          All movies
        </Link>
      </div>

      <h1 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">
        Make it a movie night.
      </h1>

      <ol
        aria-label="Booking progress"
        className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] tracking-wide text-white/40"
      >
        <li className="text-white/80">01 SHOWTIME</li>
        <li aria-hidden="true">/</li>
        <li>02 SEATS</li>
        <li aria-hidden="true">/</li>
        <li>03 FOOD</li>
        <li aria-hidden="true">/</li>
        <li>04 CHECKOUT</li>
      </ol>

      <div className="grid items-start gap-6 md:grid-cols-[minmax(200px,240px)_minmax(0,1fr)] lg:gap-10">
        <section aria-label={`${title} movie details`} className="flex flex-col gap-4 md:block">
          {poster ? (
            <img
              src={poster}
              alt={`${title} poster`}
              className="mx-auto aspect-[2/3] w-full max-w-[280px] rounded-xl object-cover shadow-xl sm:max-w-[320px] md:mx-0 md:max-w-full"
            />
          ) : (
            <div className="mx-auto aspect-[2/3] w-full max-w-[280px] rounded-xl bg-gradient-to-br from-red-950 via-[#241612] to-[#090b11] shadow-xl sm:max-w-[320px] md:mx-0 md:max-w-full" />
          )}
          <div className="flex min-w-0 flex-col md:block">
            <h2 className="mt-2 text-xl font-semibold sm:text-2xl md:mt-5">
              {title}
            </h2>
            {movie?.overview && (
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/55">
                {movie.overview}
              </p>
            )}
            <div className="mt-3 flex flex-nowrap gap-2">
              <span className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xl border border-white/[0.08] bg-[#191b1f] px-3 text-base text-white shadow-sm sm:px-4">
                <Star className="size-5 fill-amber-400 text-amber-400" />
                {rating}
              </span>
              {runtime > 0 && (
                <span className="inline-flex h-12 shrink-0 items-center rounded-xl border border-white/[0.08] bg-[#191b1f] px-3 text-base text-white shadow-sm sm:px-5">
                  {timeStamp(runtime)}
                </span>
              )}
              <span className="inline-flex h-12 min-w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#191b1f] px-3 text-base text-white shadow-sm sm:px-4">
                {certification}
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#141619]/90 p-4 sm:p-5">
          <div className="mb-5">
            <p className="mb-2 text-xs text-white/65">
              Select your city and cinema
            </p>
            <div className="grid max-w-xl gap-2 sm:grid-cols-2">
              <label className="relative">
                <span className="sr-only">City</span>
                <select
                  value={city}
                  onChange={changeCity}
                  className="h-10 w-full appearance-none rounded-lg border border-white/10 bg-[#202226] px-3 pr-9 text-center text-xs text-white/85 outline-none transition hover:border-white/20 focus:border-white/40 [color-scheme:dark]"
                >
                  <option value="Amman">Amman</option>
                  <option value="Irbid">Irbid</option>
                  <option value="Aqaba">Aqaba</option>
                  <option value="Zarqa">Zarqa</option>
                  <option value="Madaba">Madaba</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-white/50" />
              </label>
              <label className="relative">
                <span className="sr-only">Cinema</span>
                <select
                  value={cinema}
                  onChange={(event) => setCinema(event.target.value)}
                  className="h-10 w-full appearance-none rounded-lg border border-white/10 bg-[#202226] px-3 pr-9 text-center text-xs text-white/85 outline-none transition hover:border-white/20 focus:border-white/40 [color-scheme:dark]"
                >
                  {city === "Amman" ? (
                    <>
                      <option value="TAJ Cinemas">TAJ Cinemas</option>
                      <option value="Mecca Mall">Mecca Mall</option>
                      <option value="Abdali Mall">Abdali Mall</option>
                      <option value="City Mall">City Mall</option>
                      <option value="Baraka Mall">Baraka Mall</option>
                    </>
                  ) : city === "Irbid" ? (
                    <option value="Irbid City Center">Irbid City Center</option>
                  ) : city === "Aqaba" ? (
                    <option value="Aqaba City Center">Aqaba City Center</option>
                  ) : city === "Zarqa" ? (
                    <option value="Zarqa Cinemas">Zarqa Cinemas</option>
                  ) : (
                    <option value="Madaba Cinemas">Madaba Cinemas</option>
                  )}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-white/50" />
              </label>
            </div>
          </div>

          <section aria-labelledby="choose-day-heading" className="mb-5">
            <h2 id="choose-day-heading" className="text-base font-semibold">
              1. Choose your day
            </h2>
            <p className="mt-1 text-xs text-white/45">
              Book for today or plan a little further ahead.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
              <button
                type="button"
                aria-pressed={selectedDate.getTime() === getBookingDate(0).getTime()}
                onClick={() => setSelectedDate(getBookingDate(0))}
                className={`flex min-h-14 min-w-16 flex-col items-center justify-center rounded-lg border px-4 py-2 text-xs transition ${
                  selectedDate.getTime() === getBookingDate(0).getTime()
                    ? "border-white bg-white text-[#111214]"
                    : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/10"
                }`}
              >
                <span className="font-medium">Today</span>
                <span className="mt-1 text-[10px] opacity-65">
                  {formatBookingDate(getBookingDate(0), { month: "short", day: "numeric" })}
                </span>
              </button>
              <button
                type="button"
                aria-pressed={selectedDate.getTime() === getBookingDate(1).getTime()}
                onClick={() => setSelectedDate(getBookingDate(1))}
                className={`flex min-h-14 min-w-16 flex-col items-center justify-center rounded-lg border px-4 py-2 text-xs transition ${
                  selectedDate.getTime() === getBookingDate(1).getTime()
                    ? "border-white bg-white text-[#111214]"
                    : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/10"
                }`}
              >
                <span className="font-medium">Tomorrow</span>
                <span className="mt-1 text-[10px] opacity-65">
                  {formatBookingDate(getBookingDate(1), { month: "short", day: "numeric" })}
                </span>
              </button>
              <button
                type="button"
                aria-pressed={selectedDate.getTime() === getBookingDate(2).getTime()}
                onClick={() => setSelectedDate(getBookingDate(2))}
                className={`flex min-h-14 min-w-16 flex-col items-center justify-center rounded-lg border px-4 py-2 text-xs transition ${
                  selectedDate.getTime() === getBookingDate(2).getTime()
                    ? "border-white bg-white text-[#111214]"
                    : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/10"
                }`}
              >
                <span className="font-medium">
                  {formatBookingDate(getBookingDate(2), { weekday: "short" })}
                </span>
                <span className="mt-1 text-[10px] opacity-65">
                  {formatBookingDate(getBookingDate(2), { month: "short", day: "numeric" })}
                </span>
              </button>
              <button
                type="button"
                aria-pressed={selectedDate.getTime() === getBookingDate(3).getTime()}
                onClick={() => setSelectedDate(getBookingDate(3))}
                className={`flex min-h-14 min-w-16 flex-col items-center justify-center rounded-lg border px-4 py-2 text-xs transition ${
                  selectedDate.getTime() === getBookingDate(3).getTime()
                    ? "border-white bg-white text-[#111214]"
                    : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/10"
                }`}
              >
                <span className="font-medium">
                  {formatBookingDate(getBookingDate(3), { weekday: "short" })}
                </span>
                <span className="mt-1 text-[10px] opacity-65">
                  {formatBookingDate(getBookingDate(3), { month: "short", day: "numeric" })}
                </span>
              </button>
              <button
                type="button"
                aria-pressed={selectedDate.getTime() === getBookingDate(4).getTime()}
                onClick={() => setSelectedDate(getBookingDate(4))}
                className={`flex min-h-14 min-w-16 flex-col items-center justify-center rounded-lg border px-4 py-2 text-xs transition ${
                  selectedDate.getTime() === getBookingDate(4).getTime()
                    ? "border-white bg-white text-[#111214]"
                    : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/10"
                }`}
              >
                <span className="font-medium">
                  {formatBookingDate(getBookingDate(4), { weekday: "short" })}
                </span>
                <span className="mt-1 text-[10px] opacity-65">
                  {formatBookingDate(getBookingDate(4), { month: "short", day: "numeric" })}
                </span>
              </button>
            </div>
          </section>

          <section aria-labelledby="choose-showtime-heading">
            <h2 id="choose-showtime-heading" className="text-base font-semibold">
              2. Choose a showtime
            </h2>
            <div className="mb-3 mt-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-semibold text-white/85">{cinema}</h3>
              <span className="text-[10px] text-white/45">
                English · Arabic subtitles
              </span>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-white/[0.08] bg-black/10 p-3 sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-white/90">
                      Standard
                    </p>
                    <p className="mt-1 text-[10px] text-white/45">
                      2D · Screen 03
                    </p>
                  </div>
                  <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[9px] font-medium text-white/50">
                    STANDARD
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <button
                    type="button"
                    aria-pressed={selectedShowtime.time === "13:30"}
                    onClick={() =>
                      setSelectedShowtime({
                        time: "13:30",
                        room: "Screen 03",
                        format: "Standard 2D",
                      })
                    }
                    className={`flex min-h-14 flex-col items-center justify-center rounded-lg border px-3 py-2 transition ${
                      selectedShowtime.time === "13:30"
                        ? "border-amber-300/70 bg-amber-300/10 text-white ring-1 ring-amber-300/20"
                        : "border-white/10 bg-white/[0.035] text-white/85 hover:border-white/25 hover:bg-white/[0.07]"
                    }`}
                  >
                    <span className="text-sm font-semibold tabular-nums">13:30</span>
                    <span className={`mt-1 text-[9px] ${selectedShowtime.time === "13:30" ? "text-amber-100/70" : "text-white/40"}`}>
                      Select showtime
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={selectedShowtime.time === "16:15"}
                    onClick={() =>
                      setSelectedShowtime({
                        time: "16:15",
                        room: "Screen 03",
                        format: "Standard 2D",
                      })
                    }
                    className={`flex min-h-14 flex-col items-center justify-center rounded-lg border px-3 py-2 transition ${
                      selectedShowtime.time === "16:15"
                        ? "border-amber-300/70 bg-amber-300/10 text-white ring-1 ring-amber-300/20"
                        : "border-white/10 bg-white/[0.035] text-white/85 hover:border-white/25 hover:bg-white/[0.07]"
                    }`}
                  >
                    <span className="text-sm font-semibold tabular-nums">16:15</span>
                    <span className={`mt-1 text-[9px] ${selectedShowtime.time === "16:15" ? "text-amber-100/70" : "text-white/40"}`}>
                      Select showtime
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={selectedShowtime.time === "19:00"}
                    onClick={() =>
                      setSelectedShowtime({
                        time: "19:00",
                        room: "Screen 03",
                        format: "Standard 2D",
                      })
                    }
                    className={`flex min-h-14 flex-col items-center justify-center rounded-lg border px-3 py-2 transition ${
                      selectedShowtime.time === "19:00"
                        ? "border-amber-300/70 bg-amber-300/10 text-white ring-1 ring-amber-300/20"
                        : "border-white/10 bg-white/[0.035] text-white/85 hover:border-white/25 hover:bg-white/[0.07]"
                    }`}
                  >
                    <span className="text-sm font-semibold tabular-nums">19:00</span>
                    <span className={`mt-1 text-[9px] ${selectedShowtime.time === "19:00" ? "text-amber-100/70" : "text-white/40"}`}>
                      Select showtime
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={selectedShowtime.time === "21:45"}
                    onClick={() =>
                      setSelectedShowtime({
                        time: "21:45",
                        room: "Screen 03",
                        format: "Standard 2D",
                      })
                    }
                    className={`flex min-h-14 flex-col items-center justify-center rounded-lg border px-3 py-2 transition ${
                      selectedShowtime.time === "21:45"
                        ? "border-amber-300/70 bg-amber-300/10 text-white ring-1 ring-amber-300/20"
                        : "border-white/10 bg-white/[0.035] text-white/85 hover:border-white/25 hover:bg-white/[0.07]"
                    }`}
                  >
                    <span className="text-sm font-semibold tabular-nums">21:45</span>
                    <span className={`mt-1 text-[9px] ${selectedShowtime.time === "21:45" ? "text-amber-100/70" : "text-white/40"}`}>
                      Select showtime
                    </span>
                  </button>
                </div>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-black/10 p-3 sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-white/90">
                      IMAX
                    </p>
                    <p className="mt-1 text-[10px] text-white/45">
                      2D · Screen 01
                    </p>
                  </div>
                  <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[9px] font-medium text-white/50">
                    PREMIUM
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <button
                    type="button"
                    aria-pressed={selectedShowtime.time === "15:00"}
                    onClick={() =>
                      setSelectedShowtime({
                        time: "15:00",
                        room: "Screen 01",
                        format: "IMAX 2D",
                      })
                    }
                    className={`flex min-h-14 flex-col items-center justify-center rounded-lg border px-3 py-2 transition ${
                      selectedShowtime.time === "15:00"
                        ? "border-amber-300/70 bg-amber-300/10 text-white ring-1 ring-amber-300/20"
                        : "border-white/10 bg-white/[0.035] text-white/85 hover:border-white/25 hover:bg-white/[0.07]"
                    }`}
                  >
                    <span className="text-sm font-semibold tabular-nums">15:00</span>
                    <span className={`mt-1 text-[9px] ${selectedShowtime.time === "15:00" ? "text-amber-100/70" : "text-white/40"}`}>
                      Select showtime
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={selectedShowtime.time === "18:00"}
                    onClick={() =>
                      setSelectedShowtime({
                        time: "18:00",
                        room: "Screen 01",
                        format: "IMAX 2D",
                      })
                    }
                    className={`flex min-h-14 flex-col items-center justify-center rounded-lg border px-3 py-2 transition ${
                      selectedShowtime.time === "18:00"
                        ? "border-amber-300/70 bg-amber-300/10 text-white ring-1 ring-amber-300/20"
                        : "border-white/10 bg-white/[0.035] text-white/85 hover:border-white/25 hover:bg-white/[0.07]"
                    }`}
                  >
                    <span className="text-sm font-semibold tabular-nums">18:00</span>
                    <span className={`mt-1 text-[9px] ${selectedShowtime.time === "18:00" ? "text-amber-100/70" : "text-white/40"}`}>
                      Select showtime
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={selectedShowtime.time === "21:00"}
                    onClick={() =>
                      setSelectedShowtime({
                        time: "21:00",
                        room: "Screen 01",
                        format: "IMAX 2D",
                      })
                    }
                    className={`flex min-h-14 flex-col items-center justify-center rounded-lg border px-3 py-2 transition ${
                      selectedShowtime.time === "21:00"
                        ? "border-amber-300/70 bg-amber-300/10 text-white ring-1 ring-amber-300/20"
                        : "border-white/10 bg-white/[0.035] text-white/85 hover:border-white/25 hover:bg-white/[0.07]"
                    }`}
                  >
                    <span className="text-sm font-semibold tabular-nums">21:00</span>
                    <span className={`mt-1 text-[9px] ${selectedShowtime.time === "21:00" ? "text-amber-100/70" : "text-white/40"}`}>
                      Select showtime
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="text-xs font-medium text-white/90">
              {formatBookingDate(selectedDate, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
              , {selectedShowtime.time} · {selectedShowtime.room} ·{" "}
              {selectedShowtime.format}
            </p>
            <p className="mt-1 text-[11px] text-white/45">
              Your showtime will be saved as a pending booking. Seat selection
              and payment are not available yet.
            </p>
            {createError && (
              <p
                role="alert"
                className="mt-3 rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs text-red-200"
              >
                {createError.message}
                {createError.message.includes("Sign in") && (
                  <>
                    {" "}
                    <Link to="/Login" className="font-semibold underline">
                      Sign in
                    </Link>
                  </>
                )}
              </p>
            )}
            <button
              type="button"
              onClick={handleContinueToSeats}
              disabled={isCreating}
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white px-4 text-xs font-semibold text-[#111214] transition hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141619] disabled:cursor-wait disabled:opacity-60"
            >
              {isCreating ? "Saving booking..." : "Save showtime"}
              {!isCreating && <ArrowRight className="size-4" />}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default MoviesObsession;
