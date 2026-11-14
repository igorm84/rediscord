import { useRouter } from "next/navigation";
import { useChannelStore } from "@/state/channel-list";
import { User } from "@/lib/entities/user";
import React from "react";

export const useAddChannel = () => {
  const [selectedFriend, setSelectedFriend] = React.useState<User | null>(null);
  const { channels, setChannels } = useChannelStore();
  const router = useRouter();

  /** Adds a DM channel for the friend unless one already exists. */
  const addChannel = (friend: User) => {
    const isFriendAlreadyAdded = channels.some(
      (channel) => channel.id === friend.id,
    );
    if (!isFriendAlreadyAdded) {
      setChannels([friend, ...channels]);
    }
  };

  /** Adds a DM channel for the friend and navigates to it. */
  const handleAddChannel = (friend = selectedFriend) => {
    if (friend) {
      addChannel(friend);
      router.push(`/channels/${friend.id}`);
    }
  };

  return { addChannel, handleAddChannel, selectedFriend, setSelectedFriend };
};
