export function getBookingDate(daysFromToday, now = new Date()) {
  const date = new Date(now);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + daysFromToday);
  return date;
}

export function isBookingDateAvailable(date, futureOnly, now = new Date()) {
  return date instanceof Date &&
    Number.isFinite(date.getTime()) &&
    date.getTime() >= getBookingDate(futureOnly ? 1 : 0, now).getTime();
}
