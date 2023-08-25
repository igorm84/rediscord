import Avatar from "@/components/ui/avatar";
import { User } from "@/lib/entities/user";
import React from "react";

interface UserProfileInfoProps {
  user: User;
  handleAddDelete: () => void;
  isFriend: boolean | undefined;
}
export function UserProfileInfo({
  user,
  handleAddDelete,
  isFriend,
}: UserProfileInfoProps) {
  return (
    <div className="flex flex-col ">
      <Avatar
        className=" relative left-4 top-4 mb-12 scale-[2]"
        src={user?.avatar}
        alt="avatar"
      />
      <p className="text-3xl font-bold"> {user?.name}</p>
      <p className="my-3 text-xl font-semibold"> {user?.username}</p>
      <span className="text-base text-gray-300">
        this is the beginning of your story with
        <span className="ml-1 font-semibold text-gray-200">{user?.name}</span>
      </span>
      <div className="my-4 flex h-fit items-center gap-4 text-[14px]">
        <p>no shared servers</p>
        <button
          onClick={() => {
            handleAddDelete();
          }}
          className={`duration-400 ${
            isFriend
              ? "bg-gray-600 hover:bg-gray-500"
              : "bg-blue-500 hover:bg-blue-600"
          } rounded px-3 py-0.5 transition-colors ease-in-out `}
        >
          {isFriend ? " Delete Friend" : "Add Friend"}
        </button>
        <button className="duration-400 rounded bg-gray-600 px-3 py-0.5 transition-colors ease-in-out hover:bg-gray-500">
          Block
        </button>
      </div>
    </div>
  );
}
