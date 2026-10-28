"use client";
import React from "react";
import Avatar from "@/components/ui/avatar";
import RoundedButton from "@/components/ui/button/rounded-button";
import Link from "next/link";
import { User } from "@/lib/entities/user";
import { t } from "@/lib/i18n";
import {
  BsChatLeftFill,
  BsCheck2,
  BsThreeDotsVertical,
  BsX,
} from "react-icons/bs";
import { FriendsTab, FriendsTabEnum } from "@/lib/types/friend-tab-prop";
import { useFriendRequestStore } from "@/state/friendRequest-list";
import { useChannelStore } from "@/state/channel-list";

interface FriendListItemProps {
  friend: User;
  tab: FriendsTab;
}

export default function FriendListItem({ friend, tab }: FriendListItemProps) {
  const { acceptRequest, declineRequest } = useFriendRequestStore();
  const { channels, setChannels } = useChannelStore();

  const handleAddChannel = () => {
    if (channels !== null) {
      const isFriendAlreadyAdded = channels.some(
        (channel) => channel.id === friend.id,
      );
      if (!isFriendAlreadyAdded) {
        setChannels([friend, ...channels]);
      }
    }
  };
  return (
    <li className="group flex items-center justify-between border-t border-gray-800 py-2.5 pl-3 pr-3">
      <div className="flex items-center gap-3">
        <Avatar
          src={friend.avatar}
          alt={friend.name}
          className="flex-none"
          status={
            tab.key === FriendsTabEnum.Pending ? undefined : friend.status
          }
        />
        <div className="flex-1 leading-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-200">
            {tab.key === FriendsTabEnum.Pending ? (
              <span className="font-semibold">{friend.name}</span>
            ) : (
              <Link
                href={`/channels/${friend.id}`}
                onClick={handleAddChannel}
                className="font-semibold hover:underline"
              >
                {friend.name}
              </Link>
            )}
            <span className="hidden text-xs text-gray-400 group-hover:block">
              {friend.username}
            </span>
          </div>
          <div className="text-[13px] text-gray-300">
            {tab.key === FriendsTabEnum.Pending
              ? "Incoming Friend Request"
              : t(`user.status.${friend.status}`)}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        {tab.key === FriendsTabEnum.Pending ? (
          <>
            <RoundedButton
              className="!p-1.5"
              onClick={() => acceptRequest(friend.id)}
              aria-label={`Accept ${friend.name}`}
              tooltipContent="Accept"
            >
              <BsCheck2 size={23} />
            </RoundedButton>
            <RoundedButton
              onClick={() => declineRequest(friend.id)}
              aria-label={`Decline ${friend.name}`}
              className="!p-1.5"
              tooltipContent="Decline"
            >
              <BsX size={23} />
            </RoundedButton>
          </>
        ) : (
          <>
            <RoundedButton
              href={`/channels/${friend.id}`}
              onClick={handleAddChannel}
              aria-label={`Message ${friend.name}`}
              tooltipContent="Message"
            >
              <BsChatLeftFill />
            </RoundedButton>
            <RoundedButton tooltipContent="More">
              <BsThreeDotsVertical />
            </RoundedButton>
          </>
        )}
      </div>
    </li>
  );
}
