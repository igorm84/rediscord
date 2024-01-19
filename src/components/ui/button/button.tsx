import clsx from "@/lib/clsx";
import React, { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  bg?: true | false;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, bg = true, ...props }, ref) => {
    return (
      <button
        className={clsx(
          bg ? "rounded bg-primary hover:bg-[#4751be]" : "hover:underline",
          " my-4 px-4 py-2.5",
          "text-white",
          className,
        )}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
export default Button;
