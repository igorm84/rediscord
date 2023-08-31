import ActiveNowPanelSkeleton from "@/components/islets/active-now-panel/active-now-panel-skeleton";
import FriendListSkeleton from "@/components/islets/friend-list/friend-list-skeleton";
import {
  Page,
  PageContent,
  PageHeaderSkeleton,
} from "@/components/layout/page";

export default function MePageSkeleton() {
  return (
    <Page>
      <PageHeaderSkeleton />
      <PageContent className="flex-col lg:flex-row" padding="none">
        <div className="flex flex-1 px-6 pt-4">
          <FriendListSkeleton />
        </div>
        <div className="flex md:w-[360px]">
          <ActiveNowPanelSkeleton />
        </div>
      </PageContent>
    </Page>
  );
}
