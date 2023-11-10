"use client";

import { BsInboxFill, BsPersonFill, BsStars } from "react-icons/bs";
import { List, ListItem } from "@/components/ui/list";
import Badge from "@/components/ui/badge";
import { clsx } from "@/lib/utils";
import { usePathname } from "next/navigation";

type HeaderMenuListItemProps = {
  icon: React.ReactNode;
  name: React.ReactNode;
  rightContent?: React.ReactNode;
  children?: never;
} & React.ComponentProps<typeof ListItem>;

const HeaderMenuListItem = ({
  icon,
  name,
  rightContent,
  className,
  ...props
}: HeaderMenuListItemProps) => (
  <ListItem
    noVerticalPadding
    className={clsx("my-0.5 justify-between py-2.5", className)}
    {...props}
  >
    <span className="inline-flex items-center gap-3">
      {icon}
      {name}
    </span>
    {rightContent}
  </ListItem>
);
export default function DMHeaderMenu() {
  const pathname = usePathname();
  return (
    <List className="w-full">
      <HeaderMenuListItem
        href="/me"
        active={pathname === "/me"}
        icon={<BsPersonFill fontSize={20} />}
        name="Friends"
        rightContent={<Badge count={1} />}
      />
      <HeaderMenuListItem
        href="/nitro"
        active={pathname === "/nitro"}
        icon={<BsStars fontSize={20} />}
        name="Nitro"
        rightContent={<Badge count={0} />}
      />
      <HeaderMenuListItem
        href="/message-requests"
        active={pathname === "/message-requests"}
        icon={<BsInboxFill fontSize={20} />}
        name="Message requests"
        rightContent={<Badge count={0} />}
      />
    </List>
  );
}
