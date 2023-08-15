import { clsx } from "@/lib/utils";

type BadgeProps = { count?: number } & React.HTMLAttributes<HTMLDivElement>;

export default function Badge({ count, className, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        "rounded-full bg-red-500 px-1 text-[11px] font-bold text-white transition-all",
        count ? "scale-100 opacity-100" : "hidden scale-0 opacity-0",
        className,
      )}
      {...props}
    >
      {count && (count > 99 ? "99+" : count)}
    </span>
  );
}
