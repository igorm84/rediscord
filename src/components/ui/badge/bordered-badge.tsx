import { clsx } from "@/lib/utils";

type BorderedBadgeProps = {
  count?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export default function BorderedBadge({
  count,
  className,
  ...props
}: BorderedBadgeProps) {
  return (
    <div
      className={clsx(
        "middle absolute -bottom-1 -right-1 align-bottom transition-all",
        "min-w-[25px] text-center",
        "rounded-full px-[4px] py-[0px] text-[11px] font-bold",
        "border-4 border-background bg-red-500 text-white",
        count ? "scale-100 opacity-100" : "scale-0 opacity-0",
        className,
      )}
      {...props}
    >
      {count && (count > 99 ? "99+" : count)}
    </div>
  );
}
