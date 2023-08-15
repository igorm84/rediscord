export default function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
