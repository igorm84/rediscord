import { clsx } from "@/lib/utils";
import * as React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = "md", onBlur, onKeyUp, ...props }, ref) => {
    const [showFocusRing, setShowFocusRing] = React.useState(false);
    return (
      <input
        {...props}
        type={type}
        // Compose with the caller's handlers instead of letting {...props}
        // override the focus-ring logic.
        onBlur={(event) => {
          setShowFocusRing(false);
          onBlur?.(event);
        }}
        onKeyUp={(event) => {
          if (event.key === "Tab") {
            setShowFocusRing(true);
          }
          onKeyUp?.(event);
        }}
        className={clsx(
          "placeholder:text-gray-400",
          "flex w-full rounded-md border-0 bg-background",
          "file:bg-transparent file:text-sm file:font-medium ",
          "disabled:cursor-not-allowed disabled:opacity-50",
          size === "sm" && "px-1.5 py-1.5 text-sm",
          size === "md" && "px-2.5 py-1.5 text-base",
          size === "lg" && "px-4 py-5 text-lg",
          showFocusRing ? "focus:ring-2 focus:ring-primary" : "focus:ring-0",
          className,
        )}
        ref={ref}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
