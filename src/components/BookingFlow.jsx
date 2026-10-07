import { Link } from "react-router-dom";
import { timeStamp } from "../services/timestamp";

export const bookingCard = "rounded-[22px] border border-white/10 bg-[#141619] p-5 sm:p-7";
export const bookingButton = "flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-black transition hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-35";

export function MissingBooking() {
  return <div className="mx-auto max-w-xl px-5 py-32 text-center text-white"><h1 className="text-2xl font-semibold">Choose your seats first</h1><p className="mt-3 text-white/55">Start with a movie and showtime to build your booking.</p><Link to="/Movies" className="mt-6 inline-block rounded-xl bg-white px-5 py-3 font-semibold text-black">Browse movies</Link></div>;
}

export function BookingFlow({ step, title, subtitle, children }) {
  return <div className="mx-auto max-w-[1440px] px-5 pb-14 pt-24 text-white sm:px-8 lg:px-14"><h1 className="mb-3 mt-7 text-3xl font-semibold">{title}</h1><p aria-label="Booking progress" className={`${subtitle ? "mb-3" : "mb-8"} text-xs text-white/45`}>{["SHOWTIME", "SEATS", "FOOD", "CHECKOUT"].map((name, index) => <span key={name} aria-current={index + 1 === step ? "step" : undefined} className={index + 1 === step ? "text-white" : ""}>{index > 0 && <span aria-hidden="true"> / </span>}0{index + 1} {name}</span>)}</p>{subtitle && <p className="mb-7 text-sm leading-6 text-white/55">{subtitle}</p>}{children}</div>;
}

export function BookingSummary({ order, movie, children }) {
  const { draft, room, seats, ticketsTotal, foodTotal, total, cart } = order;
  const date = new Date(`${draft.showDate}T00:00:00`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  return <aside aria-label="Your booking" className={`${bookingCard} xl:sticky xl:top-24`}><h2 className="text-xl font-semibold">Your booking</h2><h3 className="mt-5 text-xl font-semibold">{draft.movieTitle}</h3><p className="mt-2 text-sm text-white/50">{movie?.certification || "18+"}{movie?.runtime ? ` / ${timeStamp(movie.runtime)}` : ""}</p><p className="mt-5 text-sm text-white/80">{draft.city} / {draft.cinema}</p><p className="mt-4 text-sm leading-6 text-white/50">{date}, {draft.showTime}<br />{room.name} / {room.format}</p><p className="mt-5 text-[11px] uppercase text-white/40">Your seats</p><p className="mt-2 text-sm">{seats.map((seat) => seat.id).join(", ")} / {seats.length} seats</p><div aria-live="polite" aria-atomic="true" className="mt-5 space-y-5 border-t border-white/10 pt-5"><div className="flex justify-between gap-3 text-sm"><span className="text-white/50">Tickets / {seats.length}</span><span>JOD {ticketsTotal.toFixed(2)}</span></div><div className="flex justify-between gap-3 text-sm"><span className="text-white/50">Food and drinks</span><span>JOD {foodTotal.toFixed(2)}</span></div><div className="flex justify-between text-sm font-semibold"><span>Total</span><span>JOD {total.toFixed(2)}</span></div></div>{cart.length > 0 && <div className="mt-6"><p className="text-[11px] uppercase text-white/40">Food & drinks</p><ul className="mt-2 space-y-2 text-xs leading-5 text-white/65">{cart.map((item) => <li key={item.key}>{item.quantity} x {item.name}{item.size && <span className="block text-white/40">{item.size} / {item.flavor}</span>}</li>)}</ul></div>}<div className="mt-6">{children}</div></aside>;
}
