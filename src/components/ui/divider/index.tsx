import { clsx } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
}

export default function Divider({
  vertical,
  className,
  ...props
}: DividerProps) {
  return (
    <div
      className={clsx(
        " bg-white/10",
        vertical ? "h-4 w-0.5" : "mx-auto h-0.5",
        className,
      )}
      {...props}
    ></div>
  );
}
