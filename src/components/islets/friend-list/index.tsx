"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import InputField from "@/components/ui/input/input-field";
import { List } from "@/components/ui/list";
import { TooltipProvider } from "@/components/ui/tooltip";
import { User, UserStatuses } from "@/lib/entities/user";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import { useFriendsTabStore } from "@/state/friends-tab";
import FriendListItem from "./friend-list-item";
import { normalizedCompare } from "@/lib/utils/string";
import { useFriendStore } from "@/state/friend-list";
import { EmptyBox } from "../empty-box-image";

const tabProps: Record<
  string,
  {
    title: string;
    status: UserStatuses[];
  }
> = {
  Available: {
    title: "ONLINE",
    status: [
      UserStatuses.Online,
      UserStatuses.DND,
      UserStatuses.Mobile,
      UserStatuses.Idle,
    ],
  },
  All: {
    title: "ALL YOUR FRIENDS",
    status: Object.values(UserStatuses),
  },
  Pending: {
    title: "PENDING",
    status: [],
  },
  Blocked: {
    title: "BLOCKED",
    status: [],
  },
};

export default function FriendList({ friends }: { friends: User[] }) {
  const [search, setSearch] = React.useState("");
  const { currentTab } = useFriendsTabStore();
  const { setFriends } = useFriendStore();

  React.useEffect(() => {
    setFriends(friends);
  }, [friends, setFriends]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const currentTabProp = tabProps[currentTab];

  const filteredList = friends.filter((friend) => {
    const isMatchingName = !search || normalizedCompare(friend.name, search);
    return (
      (currentTab === "Available" &&
        friend.status !== UserStatuses.Offline &&
        isMatchingName) ||
      (currentTabProp.status.includes(friend.status) && isMatchingName)
    );
  });

  return (
    <div className="overflow-y-auto md:w-3/4">
      {currentTab === "Pending" || currentTab === "Blocked" ? null : (
        <div className="px-2 pb-5">
          <InputField endIcon={<BsSearch />}>
            <Input placeholder="Search" onChange={handleSearchChange} />
          </InputField>
          <div className="mt-6 text-xs font-semibold text-gray-400">
            {currentTabProp.title} — {filteredList.length}
          </div>
        </div>
      )}
      <TooltipProvider>
        <List className="flex-1  overflow-y-scroll pb-4 md:h-[83vh]">
          {currentTab === "Pending" && (
            <EmptyBox
              src="/Waiting.svg"
              alt="Pending photo"
              text="No Pending Invitations"
            />
          )}
          {currentTab === "Blocked" && (
            <EmptyBox
              src="/Joyride.svg"
              alt="Blocked photo"
              text="No Blocked Users"
            />
          )}

          {currentTab === "Pending" || currentTab === "Blocked" ? null : (
            <>
              {!!filteredList.length ? (
                filteredList.map((friend) => (
                  <FriendListItem key={friend.id} friend={friend} />
                ))
              ) : (
                <EmptyBox
                  src="/NotFoundSearching.svg"
                  alt="Not Found friends"
                  text="we can't find anyone with that name :("
                />
              )}
            </>
          )}
        </List>
      </TooltipProvider>
    </div>
  );
}
