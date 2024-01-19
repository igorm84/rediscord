import { ListItem } from "@/components/ui/list";
import Avatar from "@/components/ui/avatar";
import { PopoverContent } from "@/components/ui/popover";
import Divider from "@/components/ui/divider";
import { useFriendStore } from "@/state/friend-list";
import { useAddChannel } from "@/customHooks/useAddChannel";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { normalizedCompare } from "@/lib/utils/string";
import InputField from "@/components/ui/input/input-field";
interface DMChannelPopoverProps {
  position: string;
  setOpen: (open: boolean) => void;
}

function DMChannelPopover({ position, setOpen }: DMChannelPopoverProps) {
  const [search, setSearch] = useState("");
  const { friends } = useFriendStore();
  const partFriends = friends?.slice(0, 6);
  const { handleAddChannel, setSelectedFriend, selectedFriend } =
    useAddChannel();

  const filteredFriends = partFriends?.filter((user) => {
    return normalizedCompare(user.name, search);
  });

  return (
    <PopoverContent
      className={`relative ${position}
      } !w-full border-[1px] border-[#242628] bg-[#313338] !px-0 md:min-w-[400px]`}
    >
      <>
        <div className="flex flex-col px-4">
          <h2 className="font-bold">Choose friends</h2>
          <p className="text-[12px] text-gray-300">
            you can add more {partFriends?.length}
          </p>
        </div>
        <InputField className="mt-4 px-4">
          <Input
            className=" placeholder:text-[14px]"
            placeholder="Enter your friend's username"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </InputField>
        <Divider className="mt-4 h-[1px] w-full bg-[#242628]" />
        <div className="h-[200px] max-w-[400px]  overflow-y-auto px-2">
          {filteredFriends?.length === 0 ? (
            <p className="w-full text-gray-400">
              No friends found who are currently not in this private
              conversation.
            </p>
          ) : (
            filteredFriends?.map((friend, index) => (
              <ListItem
                className={` ${
                  selectedFriend?.id === friend.id ? "bg-gray-800/50" : ""
                }`}
                onClick={() => setSelectedFriend(friend)}
                key={index}
              >
                <Avatar
                  alt={friend.name}
                  src={friend.avatar}
                  status={friend.status}
                />
                <p className=" ml-2 mr-1 whitespace-nowrap text-[14px]  text-white">
                  {friend.name}
                </p>
                <p className="text-xs  text-gray-500">{friend.username}</p>
              </ListItem>
            ))
          )}
        </div>

        <div className="px-4">
          <Divider className="mb-4 h-[1px]" />
          <button
            onClick={() => {
              handleAddChannel();
              setOpen(false);
            }}
            className="w-full rounded bg-primary p-2 text-sm font-semibold transition-colors duration-300 ease-in-out hover:bg-[#4750b8]"
          >
            Create private messsage
          </button>
        </div>
      </>
    </PopoverContent>
  );
}

export default DMChannelPopover;
