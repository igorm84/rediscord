import { clsx } from "@/lib/utils";
import React, { ComponentProps, ComponentType } from "react";

type SidebarProps<
  T extends ComponentType<any> = React.FC<React.HTMLAttributes<HTMLDivElement>>,
> = {
  as?: T;
} & ComponentProps<T>;


export default function Sidebar<
  T extends ComponentType<any> = React.FC<React.HTMLAttributes<HTMLDivElement>>,
>({ children, className, as ,...props }: SidebarProps<T>) {
  const Component = as;
  const componentProps = {
    className: clsx(
      "fixed left-[70px] z-10 h-screen w-60 bg-midground",
      className,
    ),
    ...props,
  };
  return Component ? (
    <Component {...componentProps}>{children}</Component>
  ) : (
    <div {...componentProps}>{children}</div>
  );
}
