
export function timeStamp(minutes) {
  if (!minutes) return "N/A";
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}
