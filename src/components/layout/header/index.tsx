import { clsx } from "@/lib/utils";

// Static class names so Tailwind can detect them at build time.
const horizontalPaddingClasses = {
  "2": "px-2",
  "4": "px-4",
} as const;

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Horizontal padding (Tailwind `px-*` step), despite the prop name. */
  verticalPadding?: keyof typeof horizontalPaddingClasses;
}

export default function Header({
  verticalPadding = "4",
  className,
  ...props
}: HeaderProps) {
  return (
    <div
      className={clsx(
        horizontalPaddingClasses[verticalPadding],
        "flex h-12 items-center shadow-md",
        className,
      )}
      {...props}
    />
  );
}
