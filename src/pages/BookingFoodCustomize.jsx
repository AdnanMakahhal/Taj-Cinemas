import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookingFlow, MissingBooking, bookingButton, bookingCard } from "../components/BookingFlow";
import FoodArt from "../components/FoodArt";
import { changeCartQuantity, foodMenu, getBookingOrder, getCustomization, makeFoodItem } from "../services/bookingOrder";

export default function BookingFoodCustomize() {
  const { state, key } = useLocation();
  return <Customization key={key} state={state} />;
}

function Customization({ state }) {
  const navigate = useNavigate();
  const item = foodMenu.find((product) => product.id === state?.productId && product.customize);
  const [size, setSize] = useState("Regular");
  const [flavor, setFlavor] = useState(item?.id === "drink" ? "Cola" : "Salted");
  const [quantity, setQuantity] = useState(1);
  const order = getBookingOrder(state);
  if (!order || !item) return <MissingBooking />;
  const option = getCustomization(item.id, size, flavor);
  const popcorn = item.id === "popcorn";
  return <BookingFlow step={3} title={popcorn ? "Make your popcorn perfect." : "Make your drink your own."} subtitle="Choose your size and flavor before adding it to your order.">
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
      <div><div className={`${bookingCard} flex min-h-72 items-center justify-center sm:min-h-96`}><FoodArt type={item.art} className="size-64 sm:size-80" /></div><h2 className="mt-6 text-2xl font-semibold">{item.name}</h2><p className="mt-3 text-sm text-white/50">{popcorn ? "Freshly popped. Made for sharing, or keeping." : "A refreshing drink for your movie night."}</p></div>
      <section className={bookingCard}><h2 className="text-xl font-semibold">1. Choose your size</h2><div className="mt-5 grid grid-cols-3 gap-3">{["Small", "Regular", "Large"].map((value) => <button key={value} aria-pressed={size === value} onClick={() => setSize(value)} className={`min-h-16 rounded-xl border px-2 py-3 text-sm focus-visible:outline-2 focus-visible:outline-white ${size === value ? "border-white bg-white text-black" : "border-white/15 bg-white/5 text-white/75"}`}>{value}<span className="mt-1 block text-xs opacity-55">JOD {getCustomization(item.id, value, popcorn ? "Salted" : "Cola").price.toFixed(2)}</span></button>)}</div>
        <h2 className="mt-7 text-xl font-semibold">2. Choose your flavor</h2><div className="mt-5 grid grid-cols-3 gap-3">{(popcorn ? ["Salted", "Caramel", "Cheese"] : ["Cola", "Lemon", "Orange"]).map((value) => <button key={value} aria-pressed={flavor === value} onClick={() => setFlavor(value)} className={`min-h-13 rounded-xl border px-2 text-sm focus-visible:outline-2 focus-visible:outline-white ${flavor === value ? "border-white bg-white text-black" : "border-white/15 bg-white/5 text-white/75"}`}>{value}</button>)}</div>
        {popcorn && <p className="mt-5 text-xs text-white/40">Caramel or cheese: + JOD 0.50</p>}
        <div className="mt-7 flex items-center justify-between gap-3"><p>Quantity</p><div className="flex h-11 items-center rounded-xl border border-white/15 bg-white/5"><button aria-label="Decrease quantity" disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)} className="flex size-11 items-center justify-center disabled:opacity-25"><Minus size={14} /></button><span className="min-w-5 text-center text-sm">{quantity}</span><button aria-label="Increase quantity" disabled={quantity >= 10} onClick={() => setQuantity(quantity + 1)} className="flex size-11 items-center justify-center disabled:opacity-25"><Plus size={14} /></button></div></div>
        <div className="mt-6 border-t border-white/10 pt-6"><p className="mb-5 text-sm text-white/65">{size} / {flavor}</p><button className={bookingButton} onClick={() => { const product = makeFoodItem(item.id, size, flavor); const existing = order.cart.find((entry) => entry.key === product.key)?.quantity || 0; navigate("/BookingFood", { state: { ...state, cart: changeCartQuantity(order.cart, product, existing + quantity) } }); }}>Add to order / JOD {(option.price * quantity).toFixed(2)}</button></div>
      </section>
    </div>
  </BookingFlow>;
}
