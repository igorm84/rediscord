import { clsx } from "@/lib/utils";
import { UserStatuses } from "@prisma/client";
import { IoMdPhonePortrait } from "react-icons/io";
interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: UserStatuses | "skeleton";
}

export default function StatusBadge({
  status,
  className,
  ...props
}: StatusBadgeProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full border-[3px]",
        status === "ONLINE" && "bg-green-600",
        status === "OFFLINE" && "bg-gray-500",
        status === "DONT_DISTURB" && "bg-red-600",
        status === "IDLE" && "bg-yellow-600",
        status === "skeleton"
          ? "border-gray-900 bg-gray-900"
          : "border-midground",
        status !== UserStatuses.MOBILE && "h-[15px] w-[15px]",
        status === UserStatuses.MOBILE &&
          "h-[18px] w-3.5 rounded-sm bg-midground text-green-600",
        className,
      )}
      data-testid={status}
      {...props}
    >
      {status === "OFFLINE" && (
        <div className="h-1.5 w-1.5 rounded-full bg-midground"></div>
      )}
      {status === "DONT_DISTURB" && (
        <div className="h-0.5 w-1.5 rounded-sm bg-midground"></div>
      )}
      {status === "IDLE" && (
        <div className="absolute -left-0.5 -top-0.5 h-2 w-2 rounded-full bg-midground"></div>
      )}
      {status === UserStatuses.MOBILE && (
        <IoMdPhonePortrait fontSize={15} className="flex-none" />
      )}
    </div>
  );
}
