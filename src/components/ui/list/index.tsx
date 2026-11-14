import { clsx } from "@/lib/utils";
import React from "react";
import HybridButton, {
  HybridButtonProps,
  HybridButtonRef,
} from "../hybrid/hybrid-button";

export type ListProps = React.HTMLAttributes<HTMLUListElement>;
const List = ({ children, className, ...props }: ListProps) => {
  return (
    <ul className={clsx(className)} {...props}>
      {children}
    </ul>
  );
};

export type ListItemProps = {
  active?: boolean;
  noVerticalPadding?: boolean;
  /**
   * Interactive content rendered next to (not inside) the item's link or
   * button, e.g. a delete button. Interactive elements can't be nested.
   */
  trailing?: React.ReactNode;
} & HybridButtonProps;
/**
 * The ref (and any props from a Radix `asChild` trigger) go to the inner
 * button or link, so focus can return to it when a dialog or popover closes.
 */
const ListItem = React.forwardRef(
  (
    { active, noVerticalPadding, className, trailing, ...props }: ListItemProps,
    ref: React.Ref<HybridButtonRef>,
  ) => {
    const cls = clsx(
      "flex items-center rounded-md pl-3 pr-2 text-[15px] hover:bg-gray-800/50",
      "w-full text-left hover:text-gray-100 active:text-white active:bg-gray-800/50",
      "focus-visible:ring-0 focus-visible:bg-gray-800/50 focus-visible:text-gray-100",
      noVerticalPadding ? "" : "py-2",
      active ? "text-gray-100 bg-gray-700/60" : "text-gray-400",
      className,
    );

    return (
      <li
        className={clsx(
          "list-none",
          trailing != null && "group/list-item relative",
        )}
      >
        <HybridButton className={cls} {...props} ref={ref} />
        {trailing}
      </li>
    );
  },
);

ListItem.displayName = "ListItem";

export { List, ListItem };
