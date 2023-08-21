import clsx from "@/lib/clsx";

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { clsx };
