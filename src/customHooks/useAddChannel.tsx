import { useRouter } from "next/navigation";
import { useChannelStore } from "@/state/channel-list";
import { User } from "@/lib/entities/user";
import React from "react";

export const useAddChannel = () => {
  const [selectedFriend, setSelectedFriend] = React.useState<User | null>(null);
  const { channels, setChannels } = useChannelStore();
  const router = useRouter();

  const handleAddChannel = () => {
    if (selectedFriend && channels !== null) {
      const isFriendAlreadyAdded = channels.some(
        (channel) => channel.id === selectedFriend.id,
      );
      if (!isFriendAlreadyAdded) {
        setChannels([selectedFriend, ...channels]);
      }
      router.push(`/channels/${selectedFriend.id}`);
    }
  };

  return { handleAddChannel, selectedFriend, setSelectedFriend };
};
