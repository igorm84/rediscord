import clsx from "@/lib/clsx";
import StatusBadge from "../badge/status-badge";
interface AvatarSkeletonProps {
  size?: "sm" | "md" | "lg";
}

export default function AvatarSkeleton({ size = "md" }: AvatarSkeletonProps) {
  return (
    <div
      className={clsx(
        "relative animate-pulse rounded-full bg-gray-700/50",
        size === "sm" && "h-6 w-6",
        size === "md" && "h-8 w-8",
        size === "lg" && "h-12 w-12",
      )}
    >
      <StatusBadge
        className="absolute -bottom-1 -right-1"
        status={"skeleton"}
      />
    </div>
  );
}
