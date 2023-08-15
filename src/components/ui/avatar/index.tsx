import { clsx } from "@/lib/utils";
import { UserStatuses } from "@/lib/entities/user";
import Image from "next/image";
import { BsDiscord } from "react-icons/bs";
import StatusBadge from "@/components/ui/badge/status-badge";

type AvatarProps = {
  status?: UserStatuses;
  src?: string | null;
  alt: string;
  className?: string;
};

export default function Avatar({ status, src, alt, className }: AvatarProps) {
  return (
    <div
      className={clsx(
        "relative flex h-8 w-8 items-center justify-center rounded-full text-white",
        src ? "bg-white/5" : "bg-orange-400",
        className,
      )}
    >
      {src ? (
        <Image
          className={"rounded-full"}
          src={src}
          width={32}
          height={32}
          alt={alt}
        />
      ) : (
        <BsDiscord fontSize={18} />
      )}
      {status && (
        <StatusBadge className="absolute -bottom-1 -right-1" status={status} />
      )}
    </div>
  );
}
