import FriendsTabGroup from "@/components/islets/friends-tab-group";
import Divider from "@/components/ui/divider";
import { BsPersonFill } from "react-icons/bs";
import { Page, PageContent, PageHeader } from "@/components/layout/page";
import FriendList from "@/components/islets/friend-list";
import {
  PREVIEW_FRIEND_REQUESTS,
  PREVIEW_FRIENDS,
} from "@/lib/utils/mock";
import { User } from "@/lib/entities/user";
import ActiveNowPanel from "@/components/islets/active-now-panel";
import DemoLoadingGate from "@/components/islets/demo-loading-gate";
import MePageSkeleton from "./loading";

export const dynamic = "error";

interface FriendFetchData {
  friends: User[];
  friendRequests: User[];
  blockedFriends: User[];
}
const getData = (): FriendFetchData => {
  const friends: User[] = PREVIEW_FRIENDS;
  const friendRequests: User[] = PREVIEW_FRIEND_REQUESTS;
  const blockedFriends: User[] = [];
  return { friends, friendRequests, blockedFriends };
};

export default function MePage() {
  const data = getData();
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
            <FriendList {...data} />
          </div>
          <div className="flex md:w-[360px]">
            <ActiveNowPanel />
          </div>
        </PageContent>
      </Page>
    </DemoLoadingGate>
  );
}
