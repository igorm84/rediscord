import ChannelDM from "@/components/islets/dm-channel";
import { channelsData } from "@/components/islets/dm-layout";
import { Page } from "@/components/layout/page";
import { ListedDMChannel } from "@/lib/entities/channel";
import { User } from "@/lib/entities/user";
import { delay } from "@/lib/utils";
import { MOCK_DELAY } from "@/lib/utils/mock";

export const getChannelByID = async (
  id: string,
): Promise<{ channel: User | undefined }> => {
  if (!id) throw new Error("Invalid ID");
  const channel: ListedDMChannel | undefined = channelsData.find(
    (channel) => channel.id === id,
  );
  await delay(MOCK_DELAY);
  return { channel };
};
export default async function ChannelPage({
  params,
}: {
  params: { id: string };
}) {
  const { channel } = await getChannelByID(params.id);
  console.log(channel);
  return (
    <Page>
      <ChannelDM user={channel} />
    </Page>
  );
}
