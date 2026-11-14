import ChannelDM from "@/components/islets/dm-channel";
import { Page } from "@/components/layout/page";
import { notFound } from "next/navigation";
import {
  PREVIEW_SERVERS,
  PREVIEW_STATIC_PARAMS,
  getPreviewChannelById,
} from "@/lib/utils/mock";
import DemoLoadingGate from "@/components/islets/demo-loading-gate";
import ChannelPageSkeleton from "./loading";

export const dynamic = "error";
export const dynamicParams = false;

export function generateStaticParams() {
  return PREVIEW_STATIC_PARAMS;
}

const getChannelByID = (id: string) => {
  const channel = getPreviewChannelById(id);
  return { channel };
};

export default async function ChannelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { channel } = getChannelByID(id);
  if (!channel) {
    notFound();
  }
  // Server icons link here too; there is no server view in the demo, so the
  // chat is shown without person-only actions (friend, block, call).
  const isServer = PREVIEW_SERVERS.some((server) => server.id === id);

  return (
    <DemoLoadingGate fallback={<ChannelPageSkeleton />}>
      <Page>
        <ChannelDM user={channel} isServer={isServer} />
      </Page>
    </DemoLoadingGate>
  );
}
