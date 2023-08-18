import DMLayoutSkeleton from "@/components/islets/dm-layout/dm-layout-skeleton";
import FriendListSkeleton from "@/components/islets/friend-list/friend-list-skeleton";
import {
  Page,
  PageContent,
  PageHeaderSkeleton,
} from "@/components/layout/page";

export default function SkeletonPage() {
  return (
    <DMLayoutSkeleton>
      <Page>
        <PageHeaderSkeleton />
        <PageContent>
          <FriendListSkeleton />
        </PageContent>
      </Page>
    </DMLayoutSkeleton>
  );
}
