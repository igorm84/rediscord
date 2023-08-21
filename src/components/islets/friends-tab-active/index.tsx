"use client";
import { useFriendStore } from "@/state/friend-list";
import { ActivityTypes } from "@/lib/entities/activity";
import { ListItem } from "@/components/ui/list";
import Avatar from "@/components/ui/avatar";
import { UserStatuses } from "@/lib/entities/user";

function ActiveNowSide() {
  const { friends } = useFriendStore();
  const filteredList = friends.filter(
    (friend) =>
      friend.activity &&
      friend.activity.type === ActivityTypes.Playing &&
      friend.status !== UserStatuses.Offline,
  );

  return (
    <div className="hidden w-1/4 flex-col border-l-[1px] border-[#3b3d43] p-4  md:flex">
      <div className=" mb-4  font-extrabold">Active now</div>
      {filteredList.length ? (
        <>
          {filteredList.map((friend) => (
            <ListItem
              key={friend.id}
              noVerticalPadding
              href={`/friends/${friend.id}`}
              className=" group gap-3 border-[1px] border-[#3b3d43]  bg-[#2b2d31] p-4  "
            >
              <Avatar
                src={friend.avatar}
                alt={friend.name}
                status={friend.status}
                className="w-8 flex-none"
              />
              <div className="flex-1 truncate text-sm">
                {friend.name}
                {friend.activity && (
                  <div className="h-4 truncate text-xs leading-3">
                    {friend.activity?.name} - 5 hours
                  </div>
                )}
              </div>
            </ListItem>
          ))}
        </>
      ) : (
        <div className="w-full p-4 text-center">
          <div className=" mb-4 font-bold">quiet for now...</div>
          <span className="text-sm">
            When friends start some activity - like playing games or spending
            time on the voice channel - we will show it here
          </span>
        </div>
      )}
    </div>
  );
}

export default ActiveNowSide;
