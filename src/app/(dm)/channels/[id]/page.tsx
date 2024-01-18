import ChannelDM from "@/components/islets/dm-channel";
import { Page } from "@/components/layout/page";
import { delay } from "@/lib/utils";
import { MOCK_DELAY, generateRandomFakeChannels } from "@/lib/utils/mock";

const getChannelByID = async (id: string) => {
  if (!id) throw new Error("Invalid ID");
  const channel = generateRandomFakeChannels(1)[0];
  await delay(MOCK_DELAY);
  return { channel };
};

export default async function ChannelPage({
  params,
}: {
  params: { id: string };
}) {
  const { channel } = await getChannelByID(params.id);
  return (
    <Page>
      <ChannelDM user={channel} />
    </Page>
  );
}
