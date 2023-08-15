import { ListedDMChannel } from "@/lib/entities/channel";
import { List } from "@/components/ui/list";
import DMChannelListHeader from "./dm-channel-list-header";
import DMChannelListItem from "./dm-channel-list-item";

interface DMChannelListrops {
  channels: ListedDMChannel[];
}
export default async function DMChannelList({ channels }: DMChannelListrops) {
  return (
    <div className="pt-4">
      <DMChannelListHeader />
      <List className="mt-1">
        {channels.map((channel) => (
          <DMChannelListItem key={channel.id} channel={channel} />
        ))}
      </List>
    </div>
  );
}
