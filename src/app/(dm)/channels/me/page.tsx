import FriendsTabGroup from "@/components/islets/friends-tab-group";
import Divider from "@/components/ui/divider";
import { BsPersonFill } from "react-icons/bs";
import { Page, PageContent, PageHeader } from "@/components/layout/page";
import FriendList from "@/components/islets/friend-list";
import ActiveNowPanel from "@/components/islets/active-now-panel";
import DemoLoadingGate from "@/components/islets/demo-loading-gate";
import MePageSkeleton from "./loading";

export const dynamic = "error";

export default function MePage() {
  return (
    <DemoLoadingGate fallback={<MePageSkeleton />}>
      <Page>
        <PageHeader>
          <div className="flex gap-4">
            <div className="flex flex-none items-center gap-2 text-sm font-semibold">
              <BsPersonFill className="text-gray-500" fontSize={22} />
              Friends
            </div>
            <Divider vertical />
            <FriendsTabGroup />
          </div>
        </PageHeader>
        <PageContent className="flex-col lg:flex-row" padding="none">
          <div className="flex flex-1 px-6 pt-4">
            <FriendList blockedFriends={[]} />
          </div>
          <div className="flex md:w-[360px]">
            <ActiveNowPanel />
          </div>
        </PageContent>
      </Page>
    </DemoLoadingGate>
  );
}
