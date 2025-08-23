import { format } from "date-fns";

export function formatTime(isoString) {
  if (!isoString) return "-"; // null handling

  const date = new Date(isoString);
  return format(date, "hh:mm a"); // e.g., "12:02 PM"
}
