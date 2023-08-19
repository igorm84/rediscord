"use client";
import React from "react";
import { ListedDMChannel } from "@/lib/entities/channel";
import { List } from "@/components/ui/list";
import DMChannelListHeader from "./dm-channel-list-header";
import DMChannelListItem from "./dm-channel-list-item";

interface DMChannelListrops {
  channels: ListedDMChannel[];
}
export default function DMChannelList({ channels }: DMChannelListrops) {
  const [currentChannels, setCurrentChannels] = React.useState(channels);

  const handleChannelDelete = (channelId: string) => {
    const updatedChannels = currentChannels.filter(
      (channel) => channel.id !== channelId,
    );
    setCurrentChannels(updatedChannels);
  };

  return (
    <div className="pt-4">
      <DMChannelListHeader />
      <List className="mt-1">
        {currentChannels.map((channel) => (
          <DMChannelListItem
            key={channel.id}
            channel={channel}
            onDelete={() => handleChannelDelete(channel.id)}
          />
        ))}
      </List>
    </div>
  );
}
