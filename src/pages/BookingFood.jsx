import { useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookingFlow, BookingSummary, MissingBooking, bookingButton, bookingCard } from "../components/BookingFlow";
import FoodArt from "../components/FoodArt";
import { changeCartQuantity, foodMenu, getBookingOrder, makeFoodItem, normalizeCart } from "../services/bookingOrder";

function Quantity({ name, quantity, onChange }) {
  return <div className="inline-flex h-10 shrink-0 items-center rounded-lg border border-white/15 bg-white text-black"><button aria-label={`Remove one ${name}`} disabled={!quantity} onClick={() => onChange(quantity - 1)} className="flex size-10 items-center justify-center rounded-lg disabled:opacity-30"><Minus size={14} /></button><span className="min-w-5 text-center text-sm tabular-nums" aria-live="polite">{quantity}</span><button aria-label={`Add one ${name}`} disabled={quantity >= 10} onClick={() => onChange(quantity + 1)} className="flex size-10 items-center justify-center rounded-lg disabled:opacity-30"><Plus size={14} /></button></div>;
}

export default function BookingFood() {
  const { state, key } = useLocation();
  return <FoodSelection key={key} state={state} />;
}

function FoodSelection({ state }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState(() => normalizeCart(state?.cart));
  const order = getBookingOrder({ ...state, cart });
  if (!order) return <MissingBooking />;
  const nextState = { ...state, cart };
  function change(item, quantity) { setCart((current) => changeCartQuantity(current, item, quantity)); }
  return <BookingFlow step={3} title="A little extra for your movie." subtitle="Add popcorn, drinks, or a combo. You can also skip this step.">
    <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        <div aria-label="Food categories" className="mb-6 flex flex-wrap gap-2">{["All", "Combos", "Popcorn", "Drinks", "Snacks"].map((name) => <button key={name} aria-pressed={category === name} onClick={() => setCategory(name)} className={`min-h-10 rounded-xl border px-5 text-sm transition focus-visible:outline-2 focus-visible:outline-white ${category === name ? "border-white bg-white text-black" : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10"}`}>{name}</button>)}</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{foodMenu.filter((item) => category === "All" || item.category === category).map((item) => {
          const product = makeFoodItem(item.id);
          const quantity = cart.find((entry) => entry.key === product.key)?.quantity || 0;
          return <article key={item.id} className="flex flex-col rounded-2xl border border-white/15 bg-[#141619] p-4"><FoodArt type={item.art} className="mx-auto h-40 w-40" /><h2 className="mt-2 text-base font-semibold">{item.name}</h2><p className="mb-4 mt-2 flex-1 text-xs leading-5 text-white/45">{item.description}</p><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm">JOD {item.price.toFixed(2)}</p>{item.customize ? <button onClick={() => navigate("/BookingFoodCustomize", { state: { ...nextState, productId: item.id } })} className="min-h-10 rounded-lg border border-white/15 bg-white/5 px-4 text-sm hover:bg-white/10">Customize</button> : quantity ? <Quantity name={item.name} quantity={quantity} onChange={(value) => change(product, value)} /> : <button onClick={() => change(product, 1)} className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-4 text-sm hover:bg-white/10"><Plus size={14} />Add</button>}</div></article>;
        })}</div>
        {cart.length > 0 && <section aria-label="Edit food order" className={`${bookingCard} mt-6`}><h2 className="mb-4 font-semibold">Your food & drinks</h2><div className="divide-y divide-white/10">{cart.map((item) => <div key={item.key} className="flex flex-wrap items-center justify-between gap-3 py-3"><div><p className="text-sm font-medium">{item.name}</p><p className="mt-1 text-xs text-white/45">{item.size ? `${item.size} / ${item.flavor} / ` : ""}JOD {item.price.toFixed(2)} each</p></div><Quantity name={`${item.name}${item.size ? ` ${item.size} ${item.flavor}` : ""}`} quantity={item.quantity} onChange={(value) => change(item, value)} /></div>)}</div></section>}
      </div>
      <BookingSummary order={order} movie={state?.movie}><button onClick={() => navigate("/BookingCheckout", { state: nextState })} className={bookingButton}>Continue to checkout<ArrowRight size={16} /></button><button onClick={() => navigate("/BookingCheckout", { state: { ...nextState, cart: [] } })} className="mt-3 min-h-11 w-full rounded-xl border border-white/15 bg-white/5 text-sm text-white/70 hover:bg-white/10">Skip food & drinks</button><p className="mt-5 text-xs leading-5 text-white/40">Preview menu and prices. No order has been placed.</p></BookingSummary>
    </div>
  </BookingFlow>;
}
