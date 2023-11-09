"use client";
import BorderedBadge from "@/components/ui/badge/bordered-badge";
import { clsx } from "@/lib/utils";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import React from "react";

type SideMenuItemProps = {
  isActive?: boolean;
  tooltipContent?: React.ReactNode;
  notificationCount?: number;
  image?: {
    url: string;
    alt: string;
  };
} & React.ComponentPropsWithoutRef<typeof Link>;

const SideTip = ({ isActive }: { isActive?: boolean }) => (
  <div
    className={clsx(
      "absolute -left-4 w-[9px] rounded-lg bg-white",
      "transition-all group-hover:scale-100",
      isActive ? "bottom-1 top-1" : "top-1/2 -mt-3 h-6 scale-0",
    )}
  ></div>
);

export default function SideMenuItem({
  isActive,
  tooltipContent,
  notificationCount,
  image,
  children,
  className,
  ...props
}: SideMenuItemProps) {
  const roundClasses = isActive
    ? "rounded-[15px]"
    : "rounded-[100%] hover:rounded-[15px]";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          className={clsx(
            "group relative block h-12 w-12 bg-foreground bg-cover transition-all hover:shadow-xl",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "focus-visible:ring-offset-background active:translate-y-[1px]",
            roundClasses,
            className,
          )}
          {...props}
          data-testid={isActive ? "side-menu-active-item" : "side-menu-item"}
        >
          <SideTip isActive={isActive} />
          <BorderedBadge
            className="pointer-events-none z-10"
            count={notificationCount}
          />
          {image && (
            <Image
              src={image.url}
              alt={image.alt}
              width={48}
              height={48}
              unoptimized
              priority
              loader={({ src }) => `${src}`}
              className={clsx("absolute inset-0 transition-all", roundClasses)}
            />
          )}
          {children}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={15} className="text-sm">
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  );
}
