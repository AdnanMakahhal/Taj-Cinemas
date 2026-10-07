import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cinemaVenues } from "../services/cinemaRooms";
import { getBookingDate, isBookingDateAvailable } from "../services/bookingDates";
import { timeStamp } from "../services/timestamp";

export default function MoviesObsession() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const movie = state?.movie;
  const futureOnly = state?.bookingMode === "future";
  const [city, setCity] = useState(state?.draft?.city || "Amman");
  const [cinema, setCinema] = useState(state?.draft?.cinema || "TAJ Cinemas");
  const [choice, setChoice] = useState(state?.draft ? { roomId: state.draft.roomId, time: state.draft.showTime } : { roomId: "03", time: "19:00" });
  const [dateChoice, setDate] = useState(() => state?.draft?.showDate ? new Date(`${state.draft.showDate}T00:00:00`) : getBookingDate(futureOnly ? 1 : 0));
  const date = isBookingDateAvailable(dateChoice, futureOnly) ? dateChoice : getBookingDate(futureOnly ? 1 : 0);
  const venue = cinemaVenues.find((item) => item.name === cinema && item.city === city);
  const room = venue.rooms.find((item) => item.id === choice.roomId) || venue.rooms[0];
  const time = room.times.includes(choice.time) ? choice.time : room.times[0];
  const title = movie?.title || "Obsession";
  const selectClass = "h-12 w-full rounded-xl border border-white/10 bg-[#202226] px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-white/60";
  function continueToSeats() {
    if (!isBookingDateAvailable(date, futureOnly)) return;
    const showDate = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
    const sameShow = state?.draft?.cinema === cinema && state?.draft?.roomId === room.id && state?.draft?.showDate === showDate && state?.draft?.showTime === time;
    navigate("/BookingSeats", { state: { ...state, movie, bookingMode: state?.bookingMode, selectedSeats: sameShow ? state?.selectedSeats : [], draft: { movieId: movie?.id, movieTitle: title, posterUrl: movie?.poster_path, city, cinema, showDate, showTime: time, roomId: room.id, screen: room.name, format: room.format } } });
  }
  return <div className="mx-auto max-w-6xl px-5 pb-12 pt-24 text-white sm:px-8">
    <h1 className="mb-3 mt-7 text-3xl font-semibold">Make it a movie night.</h1>
    <p className="mb-8 text-xs text-white/45"><span className="text-white">01 SHOWTIME</span> / 02 SEATS / 03 FOOD / 04 CHECKOUT</p>
    <div className="grid items-start gap-8 md:grid-cols-[240px_minmax(0,1fr)]">
      <section aria-label="Movie details">
        {movie?.poster_path && <img src={movie.poster_path} alt={`${title} poster`} className="mx-auto aspect-[2/3] w-48 rounded-xl object-cover md:w-full" />}
        <h2 className="mt-5 text-2xl font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-white/55">{movie?.certification || "18+"}{movie?.runtime ? ` / ${timeStamp(movie.runtime)}` : ""}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/55">{movie?.overview}</p>
      </section>
      <section className="rounded-2xl border border-white/10 bg-[#141619] p-5 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs text-white/60">City<select value={city} className={`${selectClass} mt-2`} onChange={(event) => { setCity(event.target.value); setCinema(cinemaVenues.find((item) => item.city === event.target.value).name); setChoice({ roomId: "03", time: "19:00" }); }}>{[...new Set(cinemaVenues.map((item) => item.city))].map((name) => <option key={name}>{name}</option>)}</select></label>
          <label className="text-xs text-white/60">Cinema<select value={cinema} className={`${selectClass} mt-2`} onChange={(event) => { setCinema(event.target.value); setChoice({ roomId: "03", time: "19:00" }); }}>{cinemaVenues.filter((item) => item.city === city).map((item) => <option key={item.name}>{item.name}</option>)}</select></label>
        </div>
        <h2 className="mt-6 font-semibold">1. Choose your day</h2>
        <p className="mt-1 text-xs text-white/45">{futureOnly ? "Bookings start tomorrow. Today is closed." : "Book for today or plan further ahead."}</p>
        <div className="mt-3 flex flex-wrap gap-2">{[0,1,2,3,4].map((offset) => {
          const day = getBookingDate(offset);
          const closed = !isBookingDateAvailable(day, futureOnly);
          const active = day.getTime() === date.getTime();
          return <button key={offset} disabled={closed} aria-pressed={active} onClick={() => setDate(day)} className={`min-h-16 min-w-20 rounded-xl border px-3 py-2 text-xs transition focus-visible:outline-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-30 ${active ? "border-white bg-white text-black" : "border-white/10 bg-white/5 hover:bg-white/10"}`}><span className="block font-medium">{offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : day.toLocaleDateString("en-US", { weekday: "short" })}</span><span className="mt-1 block opacity-60">{day.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>{closed && <span className="block">Closed</span>}</button>;
        })}</div>
        <h2 className="mb-3 mt-6 font-semibold">2. Choose your room and showtime</h2>
        <div className="space-y-3">{venue.rooms.map((item) => <section key={item.id} className="rounded-xl border border-white/10 p-4">
          <h3 className="text-sm font-semibold">{item.name} / {item.label}</h3>
          <p className="mb-3 mt-1 text-xs text-white/45">{item.format} / Preview from JOD {item.price.toFixed(2)}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{item.times.map((showTime) => {
            const active = room.id === item.id && time === showTime;
            return <button key={showTime} aria-label={`${item.name}, ${showTime}`} aria-pressed={active} onClick={() => setChoice({ roomId: item.id, time: showTime })} className={`min-h-12 rounded-lg border text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-white ${active ? "border-white bg-white text-black" : "border-white/10 bg-white/5 hover:bg-white/10"}`}>{showTime}</button>;
          })}</div>
        </section>)}</div>
        <div className="mt-5 border-t border-white/10 pt-4"><p className="text-sm">{date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}, {time} / {room.name} / {room.format}</p><p className="mt-2 text-xs text-white/45">Choose your seats next. Room layouts and prices are previews.</p><button onClick={continueToSeats} className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-black transition hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Continue to seats<ArrowRight size={16} /></button></div>
      </section>
    </div>
  </div>;
}
