"use client";

import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useFriendsTabStore } from "@/state/friends-tab";
import { useFriendStore } from "@/state/friend-list";
import { friendsTabsProps } from "./friend-tabs";
import { User } from "@prisma/client";
import { generateRandomFakeUsers } from "@/lib/utils/mock";

export interface FriendListProps {
  friends: User[];
}
export default function FriendList({ friends }: FriendListProps) {
  const { currentTab } = useFriendsTabStore();
  const { setFriends } = useFriendStore();

  useEffect(() => {
    setFriends(friends);
  }, [friends, setFriends]);

  const tab = friendsTabsProps[currentTab];
  const initialUsers = generateRandomFakeUsers(10);
  const CurrentTab = tab.component;
  return (
    <div className="flex flex-1 flex-col">
      <TooltipProvider>
        <CurrentTab initialUsers={initialUsers} />
      </TooltipProvider>
    </div>
  );
}
