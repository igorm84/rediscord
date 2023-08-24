"use client";
import React from "react";
import Avatar from "@/components/ui/avatar";
import RoundedButton from "@/components/ui/button/rounded-button";
import { ListItem } from "@/components/ui/list";
import { User } from "@/lib/entities/user";
import { t } from "@/lib/i18n";
import {
  BsChatLeftFill,
  BsCheck2,
  BsThreeDotsVertical,
  BsX,
} from "react-icons/bs";
import { FriendsTab, FriendsTabEnum } from "@/lib/types/friend-tab-prop";
import { useFriendStore } from "@/state/friend-list";
import { useFriendRequestStore } from "@/state/friendRequest-list";
import { useChannelStore } from "@/state/channel-list";

interface FriendListItemProps {
  friend: User;
  tab: FriendsTab;
}

export default function FriendListItem({ friend, tab }: FriendListItemProps) {
  const { friends, setFriends } = useFriendStore();
  const { friendRequest, setFriendRequests } = useFriendRequestStore();
  const { channels, setChannels } = useChannelStore();

  const handleAcceptFriends = () => {
    if (friends !== null && friendRequest !== null) {
      setFriendRequests(friendRequest.filter((item) => item.id !== friend.id));
      setFriends([...friends, friend]);
    }
  };

  const handleDeclineFriends = () => {
    if (friendRequest !== null) {
      setFriendRequests(friendRequest.filter((item) => item.id !== friend.id));
    }
  };
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
    <ListItem
      href={tab.key === FriendsTabEnum.Pending ? "" : `/channels/${friend.id}`}
      className={`group justify-between border-t-[1px] border-gray-800 py-2.5 pr-3 `}
      noVerticalPadding
    >
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
            <span className="font-semibold">{friend.name}</span>
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
              onClick={handleAcceptFriends}
              tooltipContent="Accept"
            >
              <BsCheck2 size={23} />
            </RoundedButton>
            <RoundedButton
              onClick={handleDeclineFriends}
              className="!p-1.5"
              tooltipContent="Decline"
            >
              <BsX size={23} />
            </RoundedButton>
          </>
        ) : (
          <>
            <RoundedButton onClick={handleAddChannel} tooltipContent="Message">
              <BsChatLeftFill />
            </RoundedButton>
            <RoundedButton tooltipContent="More">
              <BsThreeDotsVertical />
            </RoundedButton>
          </>
        )}
      </div>
    </ListItem>
  );
}
