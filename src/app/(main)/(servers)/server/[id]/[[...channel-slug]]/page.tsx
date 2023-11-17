import getQueryClient from "@/app/getQueryClient";
import ServerChannelContent from "@/components/islets/server-channel-content";
import RightHeaderContent from "@/components/islets/server-channel-content/right-header-content";
import { Page, PageContent, PageHeader } from "@/components/layout/page";
import Divider from "@/components/ui/divider";
import { channelIcons } from "@/lib/entities/channel";
import { generateRandomChannels } from "@/lib/utils/mock";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

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
  await queryClient.prefetchQuery({queryKey: ['channel', channel.id], queryFn: () => channel});

  const ChannelIcon = channelIcons[channel.type];
  return (
    <Page className="sm:ml-[310px]">
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
      <PageContent className="hover-scrollbar relative grid pl-7 sm:px-4">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ServerChannelContent channel={channel} />
        </HydrationBoundary>
      </PageContent>
    </Page>
  );
}
