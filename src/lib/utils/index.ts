export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
