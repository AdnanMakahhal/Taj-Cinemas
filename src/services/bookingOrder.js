import { getCinemaRoom, getSeatRows, getPreviewUnavailableSeats, getSeatTotal } from "./cinemaRooms.js";
import { isBookingDateAvailable } from "./bookingDates.js";

export const foodMenu = [
  { id: "combo", name: "Movie-night combo", category: "Combos", description: "Popcorn + 2 regular drinks", price: 7.5, art: "combo" },
  { id: "popcorn", name: "Classic popcorn", category: "Popcorn", description: "Freshly popped, lightly salted", price: 3.5, art: "popcorn", customize: true },
  { id: "drink", name: "Soft drink", category: "Drinks", description: "Choose your favorite flavor", price: 2.5, art: "drink", customize: true },
  { id: "nachos", name: "Loaded nachos", category: "Snacks", description: "Crunchy chips with cheese dip", price: 4.5, art: "nachos" },
  { id: "water", name: "Still water", category: "Drinks", description: "500 ml bottled water", price: 1.5, art: "water" },
  { id: "chocolate", name: "Chocolate bites", category: "Snacks", description: "A sweet cinema classic", price: 2, art: "chocolate" },
];

export function getCustomization(itemId, size = "Regular", flavor = "Salted") {
  const popcorn = itemId === "popcorn";
  const sizes = popcorn ? { Small: 3, Regular: 3.5, Large: 4.5 } : { Small: 2, Regular: 2.5, Large: 3 };
  const flavors = popcorn ? ["Salted", "Caramel", "Cheese"] : ["Cola", "Lemon", "Orange"];
  const chosenSize = Object.hasOwn(sizes, size) ? size : "Regular";
  const chosenFlavor = flavors.includes(flavor) ? flavor : flavors[0];
  return { size: chosenSize, flavor: chosenFlavor, price: sizes[chosenSize] + (popcorn && chosenFlavor !== "Salted" ? 0.5 : 0) };
}

export function makeFoodItem(id, size, flavor) {
  const item = foodMenu.find((product) => product.id === id);
  if (!item) return null;
  const option = item.customize ? getCustomization(id, size, flavor) : {};
  return { ...item, ...option, key: item.customize ? `${id}/${option.size}/${option.flavor}` : id };
}

export function normalizeCart(cart = []) {
  if (!Array.isArray(cart)) return [];
  const result = [];
  for (const entry of cart) {
    const item = entry && makeFoodItem(entry.id, entry.size, entry.flavor);
    const quantity = Math.min(10, Math.max(0, Math.floor(Number(entry?.quantity) || 0)));
    if (!item || !quantity) continue;
    const existing = result.find((product) => product.key === item.key);
    if (existing) existing.quantity = Math.min(10, existing.quantity + quantity);
    else result.push({ ...item, quantity });
  }
  return result;
}

export function changeCartQuantity(cart, item, quantity) {
  const normalized = normalizeCart(cart).filter((product) => product.key !== item.key);
  return normalizeCart([...normalized, { ...item, quantity }]);
}

export function getBookingOrder(state) {
  const draft = state?.draft;
  const room = draft && getCinemaRoom(draft.cinema, draft.roomId);
  if (!room || !isBookingDateAvailable(new Date(`${draft.showDate}T00:00:00`), state?.bookingMode === "future") || !room.times.includes(draft.showTime)) return null;
  const unavailable = getPreviewUnavailableSeats(room, `${draft.cinema}/${draft.roomId}/${draft.showDate}/${draft.showTime}`);
  const seats = getSeatRows(room).flatMap((row) => row.blocks.flat()).filter((seat) => state?.selectedSeats?.includes(seat.id) && !unavailable.has(seat.id)).slice(0, 8);
  if (!seats.length) return null;
  const cart = normalizeCart(state?.cart);
  const ticketsTotal = getSeatTotal(seats);
  const foodTotal = cart.reduce((sum, item) => sum + Math.round(item.price * 100) * item.quantity, 0) / 100;
  return { draft, room, seats, cart, ticketsTotal, foodTotal, total: ticketsTotal + foodTotal };
}
