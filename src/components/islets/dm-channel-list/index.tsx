import { ListedDMChannel } from "@/lib/entities/channel";
import DMChannelListContent from "./dm-channel-list-content";
import {
  MOCK_CHANNELS,
  MOCK_DELAY,
  generateRandomFakeChannels,
} from "@/lib/utils/mock";
import { delay } from "@/lib/utils";
export const getData = async (): Promise<{ channels: ListedDMChannel[] }> => {
  /*
   * Generate fake channels for testing
   */
  const channels: ListedDMChannel[] = generateRandomFakeChannels(MOCK_CHANNELS);
  await delay(MOCK_DELAY);
  return { channels };
};
export default async function DMChannelList() {
  const { channels } = await getData();
  return <DMChannelListContent channels={channels} />;
}
