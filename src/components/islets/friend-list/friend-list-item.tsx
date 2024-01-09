"use client";
import React, { ComponentProps, MouseEvent } from "react";
import Avatar from "@/components/ui/avatar";
import RoundedButton from "@/components/ui/button/with-tooltip";
import { ListItem } from "@/components/ui/list";
import { BsChatLeftFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { User, UserStatuses } from "@prisma/client";
import { useRouter } from "next/navigation";
interface FriendListItemBase {
  friend: User;
  variant: "base";
}
export type FriendListItemInvite = Omit<FriendListItemBase, "variant"> & {
  variant: "invite";
  onInviteSubmitted: (userId: string, accepted: boolean) => void;
};
export type FriendListItemBlocked = Omit<FriendListItemBase, "variant"> & {
  variant: "blocked";
  onUnblock: (userId: string) => void;
};
export type FriendListItemProps =
  | FriendListItemBase
  | FriendListItemInvite
  | FriendListItemBlocked;

export type FriendListItemVariant = FriendListItemProps["variant"];

export default function FriendListItem(props: FriendListItemProps) {
  const router = useRouter();
  const { variant, friend } = props;
  const currentVariantValue = getFriendListItemVariantsMap(props)[variant];
  return (
    <ListItem
      onClick={() => router.push(`/users/${friend.id}/private`)}
      className="group justify-between border-t-[1px] border-gray-800 py-2.5 pr-3"
      noVerticalPadding
    >
      <div className="flex items-center gap-3">
        <Avatar
          src={friend.avatar}
          alt={friend.username}
          className="flex-none"
          status={friend.status!}
        />
        <div className="flex-1 leading-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-200">
            <span className="font-semibold">{friend.username}</span>
            <span className="hidden text-xs text-gray-400 group-hover:block">
              {friend.username}
            </span>
          </div>
          <div className="text-[13px] text-gray-300">
            {UserStatuses["ONLINE"]}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        {currentVariantValue.map((props, idx) => (
          <RoundedButton
            key={idx}
            {...props}
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              props.onClick?.(e);
            }}
          />
        ))}
      </div>
    </ListItem>
  );
}

function getFriendListItemVariantsMap(
  props: FriendListItemProps,
): Record<FriendListItemVariant, ComponentProps<typeof RoundedButton>[]> {
  const { variant, friend } = props;
  return {
    base:
      variant === "base"
        ? [
            {
              tooltipContent: "Message",
              children: <BsChatLeftFill />,
            },
            {
              tooltipContent: "More",
              children: <BsThreeDotsVertical />,
            },
          ]
        : [],
    blocked:
      variant === "blocked"
        ? [
            {
              tooltipContent: "Unblock",
              onClick: () => props.onUnblock(friend.id),
              children: <ImCancelCircle />,
            },
          ]
        : [],
    invite:
      variant === "invite"
        ? [
            {
              tooltipContent: "Accept",
              children: <FaCheck />,
              onClick: () => props.onInviteSubmitted(friend.id, true),
            },
            {
              tooltipContent: "Decline",
              children: <ImCancelCircle />,
              onClick: () => props.onInviteSubmitted(friend.id, false),
            },
          ]
        : [],
  };
}
