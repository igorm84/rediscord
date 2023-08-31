import FriendsTabGroup from "@/components/islets/friends-tab-group";
import Divider from "@/components/ui/divider";
import { BsPersonFill } from "react-icons/bs";
import { Page, PageContent, PageHeader } from "@/components/layout/page";
import FriendList from "@/components/islets/friend-list";
import { delay } from "@/lib/utils";
import {
  MOCK_DELAY,
  MOCK_FRIENDS,
  generateRandomFakeUsers,
} from "@/lib/utils/mock";
import { User } from "@/lib/entities/user";
import ActiveNowPanel from "@/components/islets/active-now-panel";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/db/database.types";
import { Friend } from "@/lib/entities/friends";

interface FriendFetchData {
  friends: Friend[];
  friendRequests: Friend[];
  blockedFriends: Friend[];
}
const getData = async (): Promise<FriendFetchData> => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: friendships, error } = await supabase
    .from("friendships")
    .select("user_1_id, user_2_id, status");

  if (error) throw new Error(error.message);

  const friends: Friend[] = friendships.filter(
    (friend) => friend.status === "accepted",
  );
  const friendRequests: Friend[] = friendships.filter(
    (friend) => friend.status === "requested",
  );
  const blockedFriends: Friend[] = [];

  await delay(MOCK_DELAY);
  return { friends, friendRequests, blockedFriends };
};

export default async function MePage() {
  const data = await getData();
  return (
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
  );
}
