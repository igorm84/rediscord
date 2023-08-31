"use client";
import Link from "next/link";
import * as React from "react";

export type HybridButtonProps =
  | React.ComponentPropsWithoutRef<typeof Link>
  | React.ComponentPropsWithoutRef<"button">;

export type HybridButtonRef = React.ElementRef<typeof Link> &
  React.ElementRef<"button">;

const HybridButton = React.forwardRef<HybridButtonRef, HybridButtonProps>(
  ({ children, ...props }, ref) => {
    if ("href" in props) {
      return (
        <Link {...props} passHref ref={ref}>
          {children}
        </Link>
      );
    } else {
      return (
        <button {...props} ref={ref}>
          {children}
        </button>
      );
    }
  },
);

HybridButton.displayName = "HybridButton";

export default HybridButton;
