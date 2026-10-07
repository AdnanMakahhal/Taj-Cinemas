import { useState } from "react";
import { ArrowRight, Ticket } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCinemaRoom, getSeatRows, getPreviewUnavailableSeats, getSeatTotal } from "../services/cinemaRooms";
import { isBookingDateAvailable } from "../services/bookingDates";
import { timeStamp } from "../services/timestamp";

export default function BookingSeats() {
  const { state, key } = useLocation();
  return <SeatSelection key={key} state={state} />;
}

function SeatSelection({ state }) {
  const draft = state?.draft;
  const room = draft && getCinemaRoom(draft.cinema, draft.roomId);
  const [selected, setSelected] = useState(state?.selectedSeats || []);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const validDate = draft && isBookingDateAvailable(new Date(`${draft.showDate}T00:00:00`), state?.bookingMode === "future");
  if (!room || !validDate || !room.times.includes(draft.showTime)) return <div className="mx-auto max-w-xl px-5 py-32 text-center text-white"><Ticket className="mx-auto mb-5 size-10 text-white/40" /><h1 className="text-2xl font-semibold">Choose a showtime first</h1><p className="mt-3 text-white/55">Select your movie, cinema, room and date to see the seating map.</p><Link to="/Movies" className="mt-6 inline-block rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black">Browse movies</Link></div>;
  const rows = getSeatRows(room);
  const allSeats = rows.flatMap((row) => row.blocks.flat());
  const unavailable = getPreviewUnavailableSeats(room, `${draft.cinema}/${draft.roomId}/${draft.showDate}/${draft.showTime}`);
  const chosen = allSeats.filter((seat) => selected.includes(seat.id) && !unavailable.has(seat.id));
  const total = getSeatTotal(chosen);
  const day = new Date(`${draft.showDate}T00:00:00`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  function toggleSeat(seat) {
    if (unavailable.has(seat.id)) return;
    if (selected.includes(seat.id)) { setSelected(selected.filter((id) => id !== seat.id)); setMessage(""); }
    else if (chosen.length < 8) { setSelected([...selected, seat.id]); setMessage(""); }
    else setMessage("You can choose up to 8 seats per booking.");
  }
  const nextState = { ...state, selectedSeats: chosen.map((seat) => seat.id) };
  return <div className="mx-auto max-w-[1440px] px-5 pb-14 pt-24 text-white sm:px-8 lg:px-14">
    <h1 className="mb-3 mt-7 text-3xl font-semibold">Choose your seats <span className="text-white/60">/ {room.label}</span></h1>
    <p aria-label="Booking progress" className="mb-8 text-xs text-white/45"><span>01 SHOWTIME</span> / <span aria-current="step" className="text-white">02 SEATS</span> / <span>03 FOOD</span> / <span>04 CHECKOUT</span></p>
    <p className="mb-7 mt-3 text-sm leading-6 text-white/55">{draft.movieTitle} / {day}, {draft.showTime} / {draft.cinema}, {draft.city} / {room.name}</p>
    <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_340px]">
      <section aria-label={`${room.name} seating map`} className="min-w-0">
        <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#101216]">
          <div className="px-8 pb-7 pt-7 sm:px-20"><svg viewBox="0 0 640 45" className="mx-auto w-full max-w-[640px] text-white/75" aria-hidden="true"><path d="M 4 30 Q 320 -10 636 30" fill="none" stroke="currentColor" strokeWidth="3" /></svg><p className="mt-1 text-center text-[10px] text-white/45">SCREEN</p></div>
          <p className="px-5 pb-3 text-center text-xs text-white/40 xl:hidden">Swipe across the map to view all seats</p>
          <div className="scroll-area overflow-x-auto px-5 pb-12 pt-4 sm:px-8 sm:pb-16" tabIndex={0} aria-label="Scrollable seat map">
            <div className="mx-auto flex w-max min-w-full flex-col items-center gap-2">
              {rows.map((row) => <div key={row.label} className="flex items-center gap-3"><span className="w-4 shrink-0 text-center text-xs text-white/45">{row.label}</span><div className={`flex justify-center ${room.blocks.length === 3 ? "gap-6" : "gap-8"}`}>
                {row.blocks.map((block, index) => <div key={index} className="flex gap-2">{block.map((seat) => {
                  const blocked = unavailable.has(seat.id);
                  const active = chosen.some((item) => item.id === seat.id);
                  return <button key={seat.id} disabled={blocked} aria-label={`Seat ${seat.id}, ${seat.wide ? "wide" : "standard"}, ${blocked ? "unavailable" : `JOD ${seat.price.toFixed(2)}`}`} aria-pressed={active} onClick={() => toggleSeat(seat)} className={`${row.wide ? "h-11 w-12 rounded-xl" : "size-9 rounded-lg"} shrink-0 border text-[10px] font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${blocked ? "cursor-not-allowed border-white/5 bg-[#353535] text-white/25" : active ? "border-white bg-white text-black" : "border-white/15 bg-[#1e2024] text-white/85 hover:border-white/60 hover:bg-white/15"}`}>{seat.number}</button>;
                })}</div>)}
              </div></div>)}
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-5 text-xs text-white/55">{[["Available", "bg-[#1e2024] border-white/25"], ["Selected", "bg-white border-white"], ["Unavailable", "bg-[#353535] border-white/20"]].map(([label, classes]) => <span key={label} className="inline-flex items-center gap-2"><span className={`size-4 rounded border ${classes}`} aria-hidden="true" />{label}</span>)}</div>
        <p className="mt-5 text-xs leading-6 text-white/45">{allSeats.length} seats / {room.description}</p>
        <p className="mt-1 text-xs leading-6 text-white/35">Preview layout, prices and availability. Seats are not held or reserved.</p>
      </section>
      <aside aria-label="Your booking" className="rounded-[22px] border border-white/15 bg-[#15171c] p-6 sm:p-7 xl:sticky xl:top-24">
        <h2 className="text-xl font-semibold">Your booking</h2><h3 className="mt-5 text-xl font-semibold">{draft.movieTitle}</h3><p className="mt-2 text-sm text-white/50">{state.movie?.certification || "18+"}{state.movie?.runtime ? ` / ${timeStamp(state.movie.runtime)}` : ""}</p>
        <p className="mt-5 text-sm text-white/80">{draft.city} / {draft.cinema}</p><p className="mt-4 text-sm leading-6 text-white/50">{day}, {draft.showTime}<br />{room.name} / {room.format}</p>
        <div className="mt-5" aria-live="polite" aria-atomic="true"><p className="text-[11px] uppercase text-white/40">Your seats</p><p className="mt-2 min-h-12 text-sm leading-6">{chosen.length ? chosen.map((seat) => seat.id).join(", ") : "Select your seats on the map"}</p><p className="mt-1 text-xs text-white/45">{chosen.length ? `${chosen.length} seat${chosen.length === 1 ? "" : "s"} selected` : "Choose up to 8 seats"}</p>
          <div className="mt-5 border-t border-white/10 pt-5">{chosen.length > 0 && <div className="mb-5 flex justify-between gap-4 text-sm text-white/55"><span>Tickets / {chosen.length}</span><span className="text-white">JOD {total.toFixed(2)}</span></div>}<div className="flex justify-between text-sm font-semibold"><span>Total</span><span>JOD {total.toFixed(2)}</span></div></div>
        </div>
        {message && <p role="alert" className="mt-4 text-xs text-amber-200">{message}</p>}
        <button disabled={!chosen.length} onClick={() => navigate("/BookingFood", { state: nextState })} className="mt-6 flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-white px-3 text-sm font-semibold text-black transition hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-35">Continue to food & drinks<ArrowRight size={16} /></button>
        {chosen.length > 0 && <button onClick={() => { setSelected([]); setMessage(""); }} className="mt-3 min-h-10 w-full text-xs text-white/55 hover:text-white">Clear selection</button>}
      </aside>
    </div>

  </div>;
}
