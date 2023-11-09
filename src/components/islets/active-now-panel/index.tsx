"use client";
import { useFriendStore } from "@/state/friend-list";
import ActiveNowList from "./active-now-list";

export default function ActiveNowPanel() {
  const {friends} = useFriendStore();
  return (
    <div className="flex-1 border-l-[1px] border-gray-800">
      <div className="sticky top-0 z-[10] p-4">
        <h1 className=" mb-4 text-lg  font-extrabold">Active Now</h1>
        <ActiveNowList friends={friends} />
      </div>
    </div>
  );
}
