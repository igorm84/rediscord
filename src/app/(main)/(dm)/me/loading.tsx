import FriendListSkeleton from "@/components/islets/friend-list/friend-list-skeleton";
import {
  Page,
  PageContent,
  PageHeaderSkeleton,
} from "@/components/layout/page";

export default function MePageSkeleton() {
  return (
    <Page className="ml-[310px]">
      <PageHeaderSkeleton />
      <PageContent className="flex-col lg:flex-row" padding="none">
        <div className="flex flex-1 px-6 pt-4">
          <FriendListSkeleton />
        </div>
      </PageContent>
    </Page>
  );
}
