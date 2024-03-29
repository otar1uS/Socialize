import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, isToday } from "date-fns";
import { User } from "@/TS/ActionTypes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(time: any) {
  const date: Date = new Date(String(time));
  let formattedDate;

  if (isToday(date)) {
    formattedDate = formatDistanceToNow(date, { addSuffix: true });
  } else {
    formattedDate = "";
  }

  return formattedDate;
}

export const getTimeOfLastMessage = (user: User, userId: string) => {
  const time = user.chats
    .find((chat) => chat.partner.toString() === userId)
    ?.messages.sort((a, b) => {
      return (
        new Date(a?.timestamp || 0).getTime() -
        new Date(b?.timestamp || 0).getTime()
      );
    });

  if (!time || time.length === 0) {
    return {
      time: "",
      lastMessage: "",
    };
  }

  const lastMessage = time[time.length - 1];

  return {
    time: formatTime(lastMessage.timestamp || ""),
    lastMessage: lastMessage.content || "",
  };
};
