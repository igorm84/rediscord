"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import InputField from "@/components/ui/input/input-field";
import { List } from "@/components/ui/list";
import { TooltipProvider } from "@/components/ui/tooltip";
import { User } from "@/lib/entities/user";
import { BsSearch } from "react-icons/bs";
import { useFriendsTabStore } from "@/state/friends-tab";
import FriendListItem from "./friend-list-item";
import { normalizedCompare } from "@/lib/utils/string";
import { EmptyBox } from "../empty-box-image";
import {
  FriendsTabEnum,
  FriendsTab,
  friendsTabsProps,
} from "@/lib/types/friend-tab-prop";
import { useFriendStore } from "@/state/friend-list";

interface ListDataProps {
  tab: FriendsTab;
  data: User[];
}
const ListData = ({ tab, data }: ListDataProps) => {
  const [search, setSearch] = React.useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredList = data.filter((user) => {
    const isMatchingName = !search || normalizedCompare(user.name, search);
    return (
      (tab.status ? tab.status.includes(user.status) : true) && isMatchingName
    );
  });

  return (
    <>
      {!!data.length && (
        <div className="px-2 pb-5">
          <InputField endIcon={<BsSearch />}>
            <Input placeholder="Search" onChange={handleSearchChange} />
          </InputField>
          <div className="mt-6 text-xs font-semibold uppercase text-gray-400">
            {tab.title} — {filteredList.length}
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-scroll">
        {!!filteredList.length ? (
          <List>
            {filteredList.map((friend) => (
              <FriendListItem tab={tab} key={friend.id} friend={friend} />
            ))}
          </List>
        ) : (
          <EmptyBox
            src={tab.empty.imageSrc}
            alt={tab.empty.imageAlt}
            text={
              search ? "Whooaps! No one found with this name" : tab.empty.text
            }
          />
        )}
      </div>
    </>
  );
};
interface FriendListProps {
  friends: User[];
  friendRequests: User[];
  blockedFriends: User[];
}
export default function FriendList({
  friends,
  friendRequests,
  blockedFriends,
}: FriendListProps) {
  const { currentTab } = useFriendsTabStore();
  const { setFriends } = useFriendStore();

  useEffect(() => {
    setFriends(friends);
  }, [friends, setFriends]);

  const tab = friendsTabsProps[currentTab];
  const isAllOrAvailableTab = [
    FriendsTabEnum.All,
    FriendsTabEnum.Available,
  ].includes(currentTab);

  const data = isAllOrAvailableTab
    ? friends
    : currentTab === FriendsTabEnum.Pending
    ? friendRequests
    : blockedFriends;
  return (
    <div className="flex flex-1 flex-col">
      <TooltipProvider>
        <ListData key={currentTab} tab={tab} data={data || []} />
      </TooltipProvider>
    </div>
  );
}
