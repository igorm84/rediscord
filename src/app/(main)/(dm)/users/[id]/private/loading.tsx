import DMChatListItemSkeleton from "@/components/islets/dm-chat-list/dm-chat-list-item-skeleton";
import {
  Page,
  PageContent,
  PageHeaderSkeleton,
} from "@/components/layout/page";

export default function MePageSkeleton() {
  return (
    <Page className="ml-0 sm:ml-[310px] transition-all">
      <PageHeaderSkeleton gap="4" boxSkeletonType="avatar" />
      <PageContent className="grid max-w-md gap-3">
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <DMChatListItemSkeleton even={i % 2 === 0} />
          ))}
      </PageContent>
    </Page>
  );
}
