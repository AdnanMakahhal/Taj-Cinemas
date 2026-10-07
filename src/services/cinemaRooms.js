// Preview configurations. Replace these with verified cinema inventory before checkout.
const layouts = {
  large: { name: "Large room", rows: 12, blocks: [8, 8], wideRows: 2, wideBlocks: [5, 5], description: "Center aisle. Wide seats in the last two rows." },
  compact: { name: "Small room", rows: 8, blocks: [5, 5], wideRows: 0, description: "An intimate room with a center aisle." },
  panoramic: { name: "Panoramic room", rows: 10, blocks: [4, 8, 4], wideRows: 0, description: "Three seating sections with two aisles." },
  lounge: { name: "Lounge room", rows: 6, blocks: [4, 4], wideRows: 6, wideBlocks: [4, 4], description: "Spacious wide seats throughout, with a center aisle." },
};

const venues = [
  ["Amman", "TAJ Cinemas", "large", "panoramic"],
  ["Amman", "Mecca Mall", "panoramic", "compact"],
  ["Amman", "Abdali Mall", "compact", "lounge"],
  ["Amman", "City Mall", "panoramic", "large"],
  ["Amman", "Baraka Mall", "compact", "lounge"],
  ["Irbid", "Irbid City Center", "compact", "large"],
  ["Aqaba", "Aqaba City Center", "lounge", "compact"],
  ["Zarqa", "Zarqa Cinemas", "large", "compact"],
  ["Madaba", "Madaba Cinemas", "compact", "lounge"],
];

export const cinemaVenues = venues.map(([city, name, first, second]) => ({
  city, name,
  rooms: [first, second].map((layout, index) => ({
    id: index === 0 ? "03" : "01",
    layout,
    format: layout === "lounge" ? "Premium 2D" : "Standard 2D",
    price: layout === "lounge" ? 12 : 9,
    times: index === 0 ? ["13:30", "16:15", "19:00", "21:45"] : ["15:00", "18:00", "21:00"],
    ...layouts[layout],
    // The room number and layout title are deliberately separate.
    label: layouts[layout].name,
    name: `Room ${index === 0 ? "03" : "01"}`,
  })),
}));

export function getCinemaRoom(cinema, roomId) {
  return cinemaVenues.find((venue) => venue.name === cinema)?.rooms.find((room) => room.id === roomId);
}

export function getSeatRows(room) {
  return Array.from({ length: room.rows }, (_, index) => {
    const wide = index >= room.rows - room.wideRows;
    const blocks = wide ? room.wideBlocks : room.blocks;
    const label = String.fromCharCode(65 + index);
    let number = 0;
    return { label, wide, blocks: blocks.map((count) => Array.from({ length: count }, () => {
      number += 1;
      return { id: `${label}${number}`, number, wide, price: room.price + (wide && room.layout !== "lounge" ? 2 : 0) };
    })) };
  });
}

export function getPreviewUnavailableSeats(room, showKey) {
  const seed = [...showKey].reduce((sum, letter) => sum + letter.charCodeAt(0), 0);
  return new Set(getSeatRows(room).flatMap((row) => row.blocks.flat()).filter((_, index) => (index * 7 + seed) % 23 < 3).map((seat) => seat.id));
}

export function getSeatTotal(seats) {
  return seats.reduce((total, seat) => total + seat.price, 0);
}
