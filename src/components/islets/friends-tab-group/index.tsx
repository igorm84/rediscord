"use client";

import Badge from "@/components/ui/badge";
import TabGroup from "@/components/ui/tab-group";
import TabGroupButton from "@/components/ui/tab-group/tab-group-button";
import { FriendsTabEnum, friendsTabsProps } from "@/lib/types/friend-tab-prop";
import { useFriendRequestStore } from "@/state/friendRequest-list";
import { useFriendsTabStore } from "@/state/friends-tab";

export default function FriendsTabGroup() {
  const { currentTab, setCurrentTab } = useFriendsTabStore();
  const { friendRequest } = useFriendRequestStore();
  const PendingBadge = <Badge className="ml-1" count={friendRequest?.length} />;
  return (
    <TabGroup>
      {Object.values(friendsTabsProps).map((item) => (
        <TabGroupButton
          active={currentTab === item.key}
          onClick={() => setCurrentTab(item.key)}
          key={item.key}
          className={`${
            item.key === FriendsTabEnum.AddFriend
              ? "rounded-lg bg-green-700 px-2 py-0.5 text-sm font-semibold !text-gray-100 hover:bg-green-800"
              : ""
          }`}
        >
          {item.name || item.title}
          {item.key === FriendsTabEnum.Pending && PendingBadge}
        </TabGroupButton>
      ))}
    </TabGroup>
  );
}
