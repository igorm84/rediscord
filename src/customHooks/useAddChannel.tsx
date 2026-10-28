import { useRouter } from "next/navigation";
import { useChannelStore } from "@/state/channel-list";
import { User } from "@/lib/entities/user";
import React from "react";

export const useAddChannel = () => {
  const [selectedFriend, setSelectedFriend] = React.useState<User | null>(null);
  const { channels, setChannels } = useChannelStore();
  const router = useRouter();

  const handleAddChannel = (friend = selectedFriend) => {
    if (friend && channels !== null) {
      const isFriendAlreadyAdded = channels.some(
        (channel) => channel.id === friend.id,
      );
      if (!isFriendAlreadyAdded) {
        setChannels([friend, ...channels]);
      }
      router.push(`/channels/${friend.id}`);
    }
  };

  return { handleAddChannel, selectedFriend, setSelectedFriend };
};
