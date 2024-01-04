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
import { User } from "@prisma/client";

interface FriendFetchData {
  friends: User[];
}
const getData = async (): Promise<FriendFetchData> => {
  const friends: User[] = generateRandomFakeUsers(MOCK_FRIENDS);

  await delay(MOCK_DELAY);
  return { friends};
};

export default async function MePage() {
  const data = await getData();
  return (
    <Page className="duration-[200ms] transition-all ease-in-out sm:ml-[310px]">
      <PageHeader>
        <div className="relative flex items-center w-full gap-4">
          <div className="flex flex-none items-center gap-2 pb-2 text-sm font-semibold sm:pb-0">
            <BsPersonFill className="text-gray-500" fontSize={22} />
            Friends
          </div>
          <Divider vertical className="pb-2 sm:pb-0" />
          <FriendsTabGroup friendRequestsCount={data.friends.length} />
        </div>
      </PageHeader>
      <PageContent className="flex-col lg:flex-row" padding="none">
        <div className="flex flex-1 px-6 pt-4">
          <FriendList {...data} />
        </div>
      </PageContent>
    </Page>
  );
}