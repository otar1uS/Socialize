import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, isToday } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(time: any) {
  const date: Date = new Date(String(time));
  let formattedDate;

  if (isToday(date)) {
    formattedDate = formatDistanceToNow(date, { addSuffix: true });
  } else {
    formattedDate = formatDistanceToNow(date, { addSuffix: true });
  }

  return formattedDate;
}
