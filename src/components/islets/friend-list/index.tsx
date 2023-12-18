"use client";

import { useEffect, useState } from "react";
import { List } from "@/components/ui/list";
import { TooltipProvider } from "@/components/ui/tooltip";
import { User } from "@/lib/entities/user";
import { useFriendsTabStore } from "@/state/friends-tab";
import FriendListItem from "./friend-list-item";
import { normalizedCompare } from "@/lib/utils/string";
import { useFriendStore } from "@/state/friend-list";
import { EmptyBox } from "../empty-box-image";
import {
  FriendsTabEnum,
  FriendsTab,
  friendsTabsProps,
} from "@/lib/types/friend-tab-prop";
import FriendsFilterInput from "./friends-filter-input";
import NotFound from "./not-found";
import AddFriendTab from "./add-friend-tab";

interface ListInitialUsersProps {
  tab: FriendsTab;
  initialUsers: User[];
}
const FilterUsersTab = ({ tab, initialUsers }: ListInitialUsersProps) => {
  const [search, setSearch] = useState("");

  const filteredList = initialUsers.filter((user) => {
    const isMatchingName = !search || normalizedCompare(user.name, search);
    return (
      (tab.status ? tab.status.includes(user.status) : true) && isMatchingName
    );
  });

  if (initialUsers.length) {
    return (
      <>
        <FriendsFilterInput
          filterValue={search}
          setFilterValue={setSearch}
          filteredUserCount={filteredList.length}
          tabTitle={tab.title}
        />
        <div className="flex-1 overflow-y-scroll">
          {filteredList.length ? (
            <List>
              {filteredList.map((friend) => (
                <FriendListItem tab={tab} key={friend.id} friend={friend} />
              ))}
            </List>
          ) : (
            <NotFound />
          )}
        </div>
      </>
    );
  }

  return (
    <EmptyBox
      src={tab.empty.imageSrc}
      alt={tab.empty.imageAlt}
      text={search ? "Whooaps! No one found with this name" : tab.empty.text}
    />
  );
};

export interface FriendListProps {
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

  const initialUsers = isAllOrAvailableTab
    ? friends
    : currentTab === FriendsTabEnum.Pending
      ? friendRequests
      : blockedFriends;

  if (tab.key === FriendsTabEnum.AddFriend) {
    return <AddFriendTab />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <TooltipProvider>
        <FilterUsersTab
          key={currentTab}
          tab={tab}
          initialUsers={initialUsers}
        />
      </TooltipProvider>
    </div>
  );
}
