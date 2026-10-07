import { useRef, useState } from "react";
import { CreditCard, LockKeyhole, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { BookingFlow, BookingSummary, MissingBooking, bookingButton, bookingCard } from "../components/BookingFlow";
import { getBookingOrder } from "../services/bookingOrder";

export default function BookingCheckout() {
  const { state, key } = useLocation();
  return <Checkout key={key} state={state} />;
}

function Checkout({ state }) {
  const [contact, setContact] = useState(state?.contact || { name: "", email: "", phone: "" });
  const [method, setMethod] = useState("card");
  const [reviewed, setReviewed] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const confirmation = useRef(null);
  const order = getBookingOrder(state);
  if (!order) return <MissingBooking />;
  const inputClass = "mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-[#202226] px-3 text-sm text-white placeholder:text-white/30 focus-visible:outline-2 focus-visible:outline-white disabled:opacity-45";
  function update(field, value) { setContact({ ...contact, [field]: value }); }
  return <BookingFlow step={4} title="You're one step from movie night.">
    <form onSubmit={(event) => { event.preventDefault(); confirmation.current.showModal(); }} className="grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-6">
        <section className={bookingCard}><h2 className="text-xl font-semibold">Contact details</h2><p className="mt-4 text-sm text-white/45">Your details stay in this preview. No tickets or receipt will be sent.</p><div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="text-sm text-white/75">Full name<input required maxLength={100} autoComplete="name" value={contact.name} onChange={(event) => update("name", event.target.value)} placeholder="Enter your name" className={inputClass} /></label><label className="text-sm text-white/75">Email address<input required type="email" maxLength={254} autoComplete="email" value={contact.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" className={inputClass} /></label><label className="text-sm text-white/75 sm:col-span-2">Phone number<input type="tel" maxLength={30} autoComplete="tel" value={contact.phone} onChange={(event) => update("phone", event.target.value)} placeholder="+962 7X XXX XXXX" className={inputClass} /><span className="mt-2 block text-xs text-white/40">Optional, for booking updates.</span></label></div></section>
        <section className={bookingCard}><h2 className="text-xl font-semibold">Payment method</h2><div aria-label="Payment method" className="mt-5 grid gap-3 sm:grid-cols-2"><button type="button" aria-pressed={method === "card"} onClick={() => setMethod("card")} className={`flex min-h-15 items-center justify-center gap-3 rounded-xl border px-3 text-sm ${method === "card" ? "border-white/65 bg-white/10" : "border-white/15 bg-white/5"}`}><CreditCard size={19} />Credit / debit card<span className="text-[10px] font-bold italic text-blue-400">VISA</span><span aria-hidden="true" className="flex -space-x-2"><span className="size-4 rounded-full bg-red-500" /><span className="size-4 rounded-full bg-amber-400/90" /></span></button><button type="button" aria-pressed={method === "apple"} onClick={() => setMethod("apple")} className={`min-h-15 rounded-xl border px-3 text-sm ${method === "apple" ? "border-white/65 bg-white/10" : "border-white/15 bg-white/5"}`}>Apple Pay</button></div>
          <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-white/45"><LockKeyhole className="mt-0.5 size-4 shrink-0" />Payment is not connected. Card details cannot be entered in this preview.</p>
          {method === "card" ? <fieldset disabled aria-label="Card details unavailable in preview" className="mt-5 grid gap-5 sm:grid-cols-2"><label className="text-sm text-white/60 sm:col-span-2">Cardholder name<input placeholder="Name on card" className={inputClass} /></label><label className="text-sm text-white/60 sm:col-span-2">Card number<input placeholder="0000  0000  0000  0000" className={inputClass} /></label><label className="text-sm text-white/60">Expiry date<input placeholder="MM / YY" className={inputClass} /></label><label className="text-sm text-white/60">Security code<input placeholder="CVV" className={inputClass} /></label></fieldset> : <div className="mt-5 rounded-xl border border-white/10 p-5 text-sm leading-6 text-white/50">Apple Pay will be available on supported devices once secure payments are connected.</div>}
        </section>
        <section className={bookingCard}><label className="text-sm text-white/75" htmlFor="booking-promo">Have a promo code?</label><div className="mt-2 flex flex-col gap-3 sm:flex-row"><input id="booking-promo" value={promo} maxLength={30} onChange={(event) => { setPromo(event.target.value); setPromoMessage(""); }} placeholder="Enter code" className={`${inputClass} mt-0 flex-1`} /><button type="button" disabled={!promo.trim()} onClick={() => setPromoMessage("Promo codes are not available in this preview. Your total is unchanged.")} className="min-h-12 rounded-xl border border-white/15 bg-white/5 px-7 text-sm disabled:opacity-35">Apply</button></div><p role="status" className="mt-3 text-xs text-white/50">{promoMessage}</p></section>
      </div>
      <BookingSummary order={order} movie={state?.movie}><label className="mb-5 flex cursor-pointer items-start gap-3 text-xs leading-5 text-white/55"><input required checked={reviewed} onChange={(event) => setReviewed(event.target.checked)} type="checkbox" className="mt-0.5 size-4 shrink-0 accent-white" />I have reviewed my date, seats and order.</label><button type="submit" disabled={!reviewed} className={bookingButton}>Review checkout / JOD {order.total.toFixed(2)}</button><p className="mt-5 text-xs leading-5 text-white/40">Preview only. No payment will be taken and no reservation will be made.</p></BookingSummary>
    </form>
    <dialog ref={confirmation} aria-labelledby="checkout-review-title" className="fixed inset-0 m-auto w-[calc(100%-2.5rem)] max-w-md rounded-2xl border border-white/15 bg-[#15171c] p-6 text-white shadow-2xl backdrop:bg-black/75"><div className="flex items-center justify-between gap-3"><h2 id="checkout-review-title" className="text-xl font-semibold">Checkout preview</h2><button type="button" aria-label="Close checkout review" onClick={() => confirmation.current.close()} className="flex size-10 items-center justify-center rounded-lg hover:bg-white/10"><X size={18} /></button></div><p className="mt-5 font-medium">{order.draft.movieTitle}</p><p className="mt-3 text-sm leading-6 text-white/55">{order.draft.cinema} / {order.room.name}<br />{order.draft.showDate}, {order.draft.showTime}<br />Seats: {order.seats.map((seat) => seat.id).join(", ")}</p><p className="mt-4 font-semibold">Total: JOD {order.total.toFixed(2)}</p><p className="mt-4 text-sm leading-6 text-white/50">Your selections are ready to review. Live reservations, payment and ticket delivery still need to be connected.</p><button type="button" onClick={() => confirmation.current.close()} className={`${bookingButton} mt-6`}>Back to checkout</button></dialog>
  </BookingFlow>;
}
