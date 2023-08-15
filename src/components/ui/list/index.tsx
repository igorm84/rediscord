import { clsx } from "@/lib/utils";
import React from "react";
import HybridButton, { HybridButtonProps } from "../hybrid/hybrid-button";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {}
const List = ({ children, className, ...props }: ListProps) => {
  return (
    <ul className={clsx(className)} {...props}>
      {children}
    </ul>
  );
};

export type ListItemProps = {
  active?: boolean;
} & HybridButtonProps;
const ListItem = ({ active, className, ...props }: ListItemProps) => {
  const cls = clsx(
    "flex items-center rounded-md pl-3 pr-2 py-2 text-[15px] hover:bg-white/5",
    "w-full text-left hover:text-gray-100 active:text-white active:bg-white/10",
    "focus-visible:ring-0 focus-visible:bg-white/5 focus-visible:text-gray-100",
    active ? "text-gray-100 bg-white/5" : "text-gray-400",
    className,
  );

  return (
    <li>
      <HybridButton className={cls} {...props} />
    </li>
  );
};

export { List, ListItem };
