"use client";
import React from "react";
import Avatar from "@/components/ui/avatar";
import RoundedButton from "@/components/ui/button/rounded-button";
import { Input } from "@/components/ui/input";
import InputField from "@/components/ui/input/input-field";
import { List, ListItem } from "@/components/ui/list";
import { TooltipProvider } from "@/components/ui/tooltip";
import { User } from "@/lib/entities/user";
import { t } from "@/lib/i18n";
import { BsChatLeftFill, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";

interface FriendListItemProps {
  friend: User;
}
const FriendListItem = ({ friend }: FriendListItemProps) => (
  <ListItem
    href={`/channels/${friend.id}`}
    className="group justify-between border-t-[1px] border-gray-800 py-2.5 pr-3"
    noVerticalPadding
  >
    <div className="flex items-center gap-3">
      <Avatar
        src={friend.avatar}
        alt={friend.name}
        className="flex-none"
        status={friend.status}
      />
      <div className="flex-1 leading-4">
        <div className="flex items-center gap-1.5 text-sm text-gray-200">
          <span className="font-semibold">{friend.name}</span>
          <span className="hidden text-xs text-gray-400 group-hover:block">
            {friend.username}
          </span>
        </div>
        <div className="text-[13px] text-gray-300">
          {t(`user.status.${friend.status}`)}
        </div>
      </div>
    </div>
    <div className="flex items-center gap-2.5">
      <RoundedButton tooltipContent="Message">
        <BsChatLeftFill />
      </RoundedButton>
      <RoundedButton tooltipContent="More">
        <BsThreeDotsVertical />
      </RoundedButton>
    </div>
  </ListItem>
);

export default function FriendList({ friends }: { friends: User[] }) {
  const [search, setSearch] = React.useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredList =
    search.length === 0
      ? friends
      : friends.filter((friend) =>
          friend.name.toLowerCase().includes(search.toLowerCase()),
        );

  return (
    <>
      <div className="px-2 pb-5">
        <InputField endIcon={<BsSearch />}>
          <Input placeholder="Search" onChange={handleSearchChange} />
        </InputField>
        <div className="mt-6 text-xs font-semibold text-gray-400">
          ONLINE — {filteredList.length}
        </div>
      </div>
      <TooltipProvider>
        <List className="flex-1 overflow-y-auto pb-4">
          {!!filteredList.length ? (
            <>
              {filteredList.filter((friend) => friend.status !== "offline")
            .map((friend) => (
              <FriendListItem key={friend.id} friend={friend} />
            ))}
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <Image
                width={300}
                height={300}
                src="/NotFoundSearching.svg"
                alt="Not Found friends"
              />
              <div className="mt-4 text-gray-400">
                we cat&apos;t find anyone with that name :(
              </div>
            </div>
          )}
        </List>
      </TooltipProvider>
    </>
  );
}
