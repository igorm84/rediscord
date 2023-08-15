import { clsx } from "@/lib/utils";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  spacingX?: string;
}

export default function Header({
  spacingX = "4",
  className,
  ...props
}: HeaderProps) {
  return (
    <div
      className={clsx(
        `px-${spacingX} flex h-12 items-center shadow-md`,
        className,
      )}
      {...props}
    />
  );
}
