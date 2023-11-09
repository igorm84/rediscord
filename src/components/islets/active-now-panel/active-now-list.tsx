"use client";

import Avatar from "@/components/ui/avatar";
import { List, ListItem } from "@/components/ui/list";
import { ActivityTypes } from "@/lib/entities/activity";
import { User } from "@/lib/entities/user";
import { useFriendStore } from "@/state/friend-list";

export const ActiveNowListItemSkeleton = () => (
  <div className="h-[70px] animate-pulse rounded-md bg-gray-900"></div>
);
interface ActiveNowListItemProps {
  friends: User[] | null;
}
export default function ActiveNowList({ friends }: ActiveNowListItemProps) {
  if (friends === null) {
    return <ActiveNowListItemSkeleton />;
  }
  const filteredList = friends.filter(
    (friend) =>
      friend.activity && friend.activity.type === ActivityTypes.Playing,
  );
  return filteredList.length ? (
    <List>
      {filteredList.map((friend) => (
        <ListItem
          key={friend.id}
          noVerticalPadding
          href={`/users/${friend.id}/private`}
          className="group gap-3 border-[1px] border-gray-800  bg-midground p-4"
        >
          <Avatar
            src={friend.avatar}
            alt={friend.name}
            status={friend.status}
            className="w-8 flex-none"
          />
          <div className="flex-1 truncate text-sm">
            <span className="text-gray-100">{friend.name}</span>
            {friend.activity && (
              <div className="h-4 truncate text-xs leading-3">
                {friend.activity.name} - 5 hours
              </div>
            )}
          </div>
        </ListItem>
      ))}
    </List>
  ) : (
    <div className="w-full p-4 text-center">
      <div className=" mb-4 font-bold">quiet for now...</div>
      <span className="text-sm">
        When friends start some activity - like playing games or spending time
        on the voice channel - we will show it here
      </span>
    </div>
  );
}
