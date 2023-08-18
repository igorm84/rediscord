"use client";

import Badge from "@/components/ui/badge";
import TabGroup from "@/components/ui/tab-group";
import TabGroupButton from "@/components/ui/tab-group/tab-group-button";
import { UserStatuses } from "@/lib/entities/user";
import { FriendsTabOption, useFriendsTabStore } from "@/state/friends-tab";

interface TabListItem {
  name: FriendsTabOption;
  status: UserStatuses[];
  count?: number;
}
const tabList: TabListItem[] = [
  {
    name: "Available",
    status: [
      UserStatuses.Online,
      UserStatuses.DND,
      UserStatuses.Mobile,
      UserStatuses.Idle,
    ],
  },
  {
    name: "All",
    status: Object.values(UserStatuses),
  },
  {
    name: "Pending",
    count: 1,
    status: [],
  },
  {
    name: "Blocked",
    status: [],
  },
];
export default function FriendsTabGroup() {
  const { currentTab, setCurrentTab } = useFriendsTabStore();
  return (
    <TabGroup>
      {tabList.map((item) => (
        <TabGroupButton
          active={currentTab === item.name}
          onClick={() => setCurrentTab(item.name)}
          key={item.name}
        >
          {item.name} <Badge className="ml-1" count={item.count} />
        </TabGroupButton>
      ))}
    </TabGroup>
  );
}
