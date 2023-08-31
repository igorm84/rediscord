import { clsx } from "@/lib/utils";
import { UserStatuses } from "@/lib/entities/user";
import Image from "next/image";
import { BsDiscord } from "react-icons/bs";
import StatusBadge from "@/components/ui/badge/status-badge";
import LoadingIcon from "../icon/loading-icon";

interface AvatarProps {
  status?: UserStatuses | null;
  size?: "sm" | "md" | "lg" | "xl";
  src?: string | null;
  alt: string;
  loading?: boolean;
  className?: string;
}

const iconSizes = { sm: 16, md: 18, lg: 24, xl: 32 };

export default function Avatar({
  status,
  size = "md",
  src,
  alt,
  loading,
  className,
}: AvatarProps) {
  return (
    <div
      className={clsx(
        "relative inline-flex items-center justify-center rounded-full text-white",
        size === "sm" && "h-6 w-6",
        size === "md" && "h-8 w-8",
        size === "lg" && "h-12 w-12",
        size === "xl" && "h-16 w-16",
        src ? "bg-white/5" : "bg-orange-400",
        loading && "opacity-30",
        className,
      )}
    >
      {src ? (
        <Image
          className={"rounded-full"}
          unoptimized
          priority
          fill={true}
          objectFit="cover"
          src={src}
          alt={alt}
        />
      ) : (
        <BsDiscord fontSize={iconSizes[size]} />
      )}
      {loading && <LoadingIcon style={{ fontSize: iconSizes[size] }} />}
      {status && (
        <StatusBadge className="absolute -bottom-1 -right-1" status={status} />
      )}
    </div>
  );
}
