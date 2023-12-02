import { clsx } from "@/lib/utils";
import * as React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  state?: "normal" | "error" | "success";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = "md", state, ...props }, ref) => {
    const [showFocusRing, setShowFocusRing] = React.useState(false);
    return (
      <input
        type={type}
        onBlur={(event) => {
          setShowFocusRing(false);
          props.onBlur?.(event);
        }}
        onFocus={(event) => {
            setShowFocusRing(true);
        }}
        className={clsx(
          "placeholder:text-gray-400",
          "flex w-full rounded-md border-0 bg-background",
          "file:bg-transparent file:text-sm file:font-medium ",
          "disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          size === "sm" && "px-1.5 py-1.5 text-sm",
          size === "md" && "px-2.5 py-1.5 text-base",
          size === "lg" && "px-4 py-5 text-lg",
          showFocusRing
            ? "focus:ring-2 focus:ring-primary"
            : state !== "error" && "focus:ring-0",
          state === "error" && "ring-2 focus:ring-red-500 focus:ring-2 ring-red-500",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
