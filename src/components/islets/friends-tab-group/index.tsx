"use client";

import Badge from "@/components/ui/badge";
import TabGroup from "@/components/ui/tab-group";
import TabGroupButton from "@/components/ui/tab-group/tab-group-button";
import { FriendsTabEnum, friendsTabsProps } from "@/lib/types/friend-tab-prop";
import { useFriendsTabStore } from "@/state/friends-tab";
export default function FriendsTabGroup({
  friendRequestsCount,
}: {
  friendRequestsCount: number;
}) {
  const { currentTab, setCurrentTab } = useFriendsTabStore();
  const PendingBadge = <Badge className="ml-1" count={friendRequestsCount} />;

  return (
    <TabGroup data-testid="tab-group">
      {Object.values(friendsTabsProps).map((item) => (
        <TabGroupButton
          active={currentTab === item.key}
          key={item.key}
          tabType={item.key}
          onClick={() => setCurrentTab(item.key)}
          data-testid={
            currentTab === item.key ? "active-tab" : `tab-group-btn-${item.key}`
          }
        >
          {item.name || item.title}
          {item.key === FriendsTabEnum.Pending && PendingBadge}
        </TabGroupButton>
      ))}
    </TabGroup>
  );
}
