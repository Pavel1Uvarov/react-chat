import { type ClassValue, clsx } from "clsx"
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge"
import relativeTime from "dayjs/plugin/relativeTime"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  dayjs.extend(relativeTime)

  return dayjs(date).fromNow()
}