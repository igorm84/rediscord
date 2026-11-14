import { clsx } from "@/lib/utils";

// Static class names so Tailwind can detect them at build time.
const gapClasses = {
  "4": "gap-4",
} as const;

interface TabGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: keyof typeof gapClasses;
}

export default function TabGroup({
  gap = "4",
  className,
  ...props
}: TabGroupProps) {
  return (
    <div className={clsx("flex", gapClasses[gap], className)} {...props} />
  );
}
