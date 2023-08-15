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
      <PageContent>
        <FriendListSkeleton />
      </PageContent>
    </Page>
  );
}
