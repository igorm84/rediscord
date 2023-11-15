import clsx from "@/lib/clsx";

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function calculateHoursBetweenDates(date1: Date, date2: Date) {
  return Math.floor(Math.abs(date1.getTime() - date2.getTime()) / 3600000);
}

export { clsx };
