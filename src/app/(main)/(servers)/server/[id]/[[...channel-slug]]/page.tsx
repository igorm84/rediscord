import getQueryClient from "@/app/getQueryClient";
import ServerChannelContent from "@/components/islets/server-channel-content";
import RightHeaderContent from "@/components/islets/server-channel-content/right-header-content";
import { Page, PageContent, PageHeader } from "@/components/layout/page";
import Divider from "@/components/ui/divider";
import { channelIcons } from "@/lib/entities/channel";
import { generateRandomChannels } from "@/lib/utils/mock";
import { Hydrate, dehydrate } from "@tanstack/react-query";

export default async function ServerChannelPage({
  params,
}: {
  params: {
    id: string;
    "channel-slug": string[];
  };
}) {
  const slug = params["channel-slug"]?.at(0) || "test";
  const channel = generateRandomChannels(1)[0];
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["server-channel", slug], () => channel);

  const ChannelIcon = channelIcons[channel.type];
  return (
    <Page>
      <PageHeader rightContent={<RightHeaderContent />}>
        <div className=" flex items-center gap-4">
          <div className="flex flex-none items-center gap-3 text-sm font-semibold text-white">
            <ChannelIcon />
            {channel.title}
          </div>
          <Divider vertical />
          <div className="text-xs text-gray-400">
            {"Some channel description"}
          </div>
        </div>
      </PageHeader>
      <PageContent className="hover-scrollbar grid px-0">
        <Hydrate state={dehydrate(queryClient)}>
          <ServerChannelContent channel={channel} />
        </Hydrate>
      </PageContent>
    </Page>
  );
}
