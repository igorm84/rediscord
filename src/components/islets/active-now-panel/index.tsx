"use client";
import ActiveNowList from "./active-now-list";
import { FriendsTabEnum } from "../friend-list/friend-tabs";
import useGetFriendList from "@/lib/hooks/friend-list/useGetFriendList";

export default function ActiveNowPanel() {
  const { friends } = useGetFriendList({
    currentTab: FriendsTabEnum.Available,
  });
  return (
    <div className="flex-1 border-l-[1px] border-gray-800">
      <div className="sticky top-0 z-[10] p-4">
        <h1 className=" mb-4 text-lg  font-extrabold">Active Now</h1>
        <ActiveNowList friends={friends || []} />
      </div>
    </div>
  );
}
