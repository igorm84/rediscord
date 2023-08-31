import clsx from "@/lib/clsx";
import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "default" | "transparent";
  size?: "sm" | "md" | "lg" | "xl";
}
export default function Button({
  color = "primary",
  size = "md",
  className = "",
  type,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={clsx(
        "border-2 outline-none transition-all duration-75",
        color === "primary" &&
          "hover:bg-primary-muted-accent focus-visible:bg-primary-muted-accent hover:border-primary-muted-accent border-primary-muted bg-primary-muted",
        color === "default" &&
          "border-gray-950 bg-gray-950 hover:border-gray-900 hover:bg-gray-900",
        color === "transparent" && "border-transparent",
        {
          sm: "rounded px-2 py-1 text-sm",
          md: "rounded-md px-2.5 py-1.5 text-sm",
          lg: "rounded-lg px-2.5 py-1.5",
          xl: "rounded-lg px-2.5 py-1.5 text-lg",
        }[size],
        className,
      )}
      type={type === "submit" ? "submit" : "button"}
      {...props}
    ></button>
  );
}
