import { clsx } from "@/lib/utils";
import { UserStatuses } from "@/lib/entities/user";
import { MdPhoneAndroid } from "react-icons/md";

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
        status === UserStatuses.online && "bg-green-600",
        status === UserStatuses.offline && "bg-gray-500",
        status === UserStatuses.dnd && "bg-red-600",
        status === UserStatuses.idle && "bg-yellow-600",
        status === "skeleton"
          ? "border-gray-900 bg-gray-900"
          : "border-midground",
        status !== UserStatuses.mobile && "h-[15px] w-[15px]",
        status === UserStatuses.mobile &&
          "h-[18px] w-3.5 rounded-sm bg-midground text-green-600",
        className,
      )}
      {...props}
    >
      {status === UserStatuses.offline && (
        <div className="h-1.5 w-1.5 rounded-full bg-midground"></div>
      )}
      {status === UserStatuses.dnd && (
        <div className="h-0.5 w-1.5 rounded-sm bg-midground"></div>
      )}
      {status === UserStatuses.idle && (
        <div className="absolute -left-0.5 -top-0.5 h-2 w-2 rounded-full bg-midground"></div>
      )}
      {status === UserStatuses.mobile && (
        <MdPhoneAndroid fontSize={15} className="flex-none" />
      )}
    </div>
  );
}
