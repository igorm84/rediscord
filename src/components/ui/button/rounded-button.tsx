"use client";

import clsx from "@/lib/clsx";
import HybridButton, {
  HybridButtonProps,
  HybridButtonRef,
} from "../hybrid/hybrid-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
import { forwardRef } from "react";

type RoundedButtonProps = HybridButtonProps & {
  tooltipContent?: React.ReactNode;
};

const RoundedButton = forwardRef<HybridButtonRef, RoundedButtonProps>(
  ({ className, tooltipContent, ...props }, ref) => {
    const buttonProps: HybridButtonProps = {
      className: clsx(
        "rounded-full bg-midground p-2.5 hover:bg-background",
        "text-gray-400 hover:text-gray-100",
        className,
      ),
      ...props,
    };
    if (tooltipContent) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <HybridButton ref={ref} {...buttonProps} />
          </TooltipTrigger>
          <TooltipContent className="text-xs">{tooltipContent}</TooltipContent>
        </Tooltip>
      );
    }

    return <HybridButton ref={ref} {...buttonProps} />;
  },
);
export default RoundedButton;
