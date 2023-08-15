"use client";

import Avatar from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import InputField from "@/components/ui/input/input-field";
import { List, ListItem } from "@/components/ui/list";
import { User } from "@/lib/entities/user";
import { BsSearch } from "react-icons/bs";

export default function FriendList({ friends }: { friends: User[] }) {
  return (
    <>
      <div className="px-2 pb-5">
        <InputField endIcon={<BsSearch />}>
          <Input placeholder="Search" />
        </InputField>
        <div className="mt-6 text-xs font-semibold text-gray-400">
          ONLINE — {friends.length}
        </div>
      </div>
      <List className="flex-1 overflow-y-auto pb-4">
        {friends.map((friend) => (
          <ListItem
            key={friend.id}
            className="group justify-between border-t-[1px] border-gray-800 py-2.5"
            noVerticalPadding
          >
            <div className="flex items-center gap-3">
              <Avatar
                src={friend.avatar}
                alt={friend.name}
                className="flex-none"
                status={friend.status}
              />
              <div className="flex-1 leading-4">
                <div className="flex items-center gap-1.5 text-sm text-gray-200">
                  <span className="font-semibold">{friend.name}</span>
                  <span className="hidden text-xs text-gray-400 group-hover:block">
                    {friend.username}
                  </span>
                </div>
                <div className="text-[13px] text-gray-300">
                  Don&apos;t disturb
                </div>
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    </>
  );
}
