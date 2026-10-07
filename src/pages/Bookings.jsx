import { useState } from "react";
import { Link } from "react-router-dom";
import { Ticket } from "lucide-react";
import { useBookings } from "../hooks/useBookings";

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
  }).format(new Date(`${date}T00:00:00`));
}

function formatTime(time) {
  return time.slice(0, 5);
}

function isPastBooking(booking, now) {
  return (
    booking.status === "cancelled" ||
    new Date(`${booking.show_date}T${booking.show_time}`) < now
  );
}

function Bookings() {
  const [filter, setFilter] = useState("all");
  const { data: bookings = [], isLoading, error } = useBookings();
  const now = new Date();
  const upcomingBookings = bookings.filter(
    (booking) => !isPastBooking(booking, now),
  );
  const pastBookings = bookings.filter(
    (booking) => isPastBooking(booking, now),
  );
  const visibleBookings =
    filter === "upcoming"
      ? upcomingBookings
      : filter === "past"
        ? pastBookings
        : bookings;

  function filterClass(name) {
    return `rounded-lg px-4 py-2 text-xs font-medium transition ${
      filter === name
        ? "bg-white text-[#111214]"
        : "border border-white/10 bg-white/[0.05] text-white/70 hover:bg-white/10"
    }`;
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 pb-12 pt-24 text-white sm:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Your cinema plans, all in one place.
        </h1>
        <p className="mt-1 text-sm text-white/50">
          Keep track of your showtimes and booking references.
        </p>
      </header>

      <nav aria-label="Filter bookings" className="mb-5 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
          className={filterClass("all")}
        >
          All · {bookings.length}
        </button>
        <button
          type="button"
          aria-pressed={filter === "upcoming"}
          onClick={() => setFilter("upcoming")}
          className={filterClass("upcoming")}
        >
          Upcoming · {upcomingBookings.length}
        </button>
        <button
          type="button"
          aria-pressed={filter === "past"}
          onClick={() => setFilter("past")}
          className={filterClass("past")}
        >
          Past · {pastBookings.length}
        </button>
      </nav>

      {isLoading ? (
        <div
          aria-busy="true"
          className="space-y-3"
        >
          <span className="sr-only">Loading bookings...</span>
          <div className="h-28 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04]" />
          <div className="h-28 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04]" />
        </div>
      ) : error ? (
        <div
          role="alert"
          className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200"
        >
          <p>{error.message}</p>
          {error.message.includes("Sign in") && (
            <Link to="/Login" className="mt-2 inline-block font-semibold underline">
              Sign in to view your bookings
            </Link>
          )}
        </div>
      ) : visibleBookings.length === 0 ? (
        <div role="status" className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#141619]/90 px-5 py-12 text-center sm:min-h-[360px]">
          <div aria-hidden="true" className="mb-5 flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/50">
            <Ticket className="size-7" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-semibold tracking-tight">
            {filter === "past"
              ? "No past reservations yet"
              : filter === "upcoming"
                ? "No upcoming reservations"
                : "No reservations yet"}
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-white/50">
            {filter === "past"
              ? "Your past cinema reservations will appear here."
              : "Your next cinema night is waiting. Choose a movie and showtime to make your first reservation."}
          </p>
          <Link
            to="/Movies"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#111214] transition hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Browse movies
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleBookings.map((booking) => {
            const isPast = isPastBooking(booking, now);
            const statusLabel =
              booking.status === "cancelled"
                ? "Cancelled"
                : booking.status === "confirmed"
                  ? "Confirmed"
                  : isPast
                    ? "Showtime passed"
                    : "Pending seat selection";

            return (
              <article
                key={booking.id}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#141619]/90 p-3 sm:flex-row sm:items-center sm:p-4"
              >
                {booking.poster_url ? (
                  <img
                    src={booking.poster_url}
                    alt=""
                    className="h-28 w-20 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="h-28 w-20 shrink-0 rounded-lg bg-gradient-to-br from-red-950 via-[#241612] to-[#090b11]"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-base font-semibold">
                    {booking.movie_title}
                  </h2>
                  <p className="mt-1 text-sm text-white/80">
                    {formatDate(booking.show_date)} · {formatTime(booking.show_time)} ·{" "}
                    {booking.city}, {booking.cinema}
                  </p>
                  <p className="mt-1.5 text-xs text-white/45">
                    {booking.screen} · {booking.format}
                  </p>
                  <p className="mt-1.5 text-[11px] text-white/35">
                    Booking {booking.booking_reference}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-3 sm:w-44 sm:shrink-0 sm:flex-col sm:items-stretch sm:border-0 sm:pt-0">
                  <span
                    className={`rounded-md border px-2.5 py-1 text-center text-[10px] ${
                      booking.status === "confirmed"
                        ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200"
                        : booking.status === "cancelled"
                          ? "border-red-300/20 bg-red-300/10 text-red-200"
                          : "border-amber-300/20 bg-amber-300/10 text-amber-100"
                    }`}
                  >
                    {statusLabel}
                  </span>
                  {!isPast && (
                    <span className="text-xs text-white/45 sm:text-right">
                      Seats and payment not completed
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default Bookings;
