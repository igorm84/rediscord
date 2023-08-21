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
import ActiveNowSide from "@/components/islets/friends-tab-active";

const getData = async (): Promise<{ friends: User[] }> => {
  /*
   * Generating fake users for test
   */
  const friends: User[] = generateRandomFakeUsers(MOCK_FRIENDS);

  await delay(MOCK_DELAY);
  return { friends };
};

export default async function MePage() {
  const { friends } = await getData();
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
      <PageContent className="h-full overflow-y-auto ">
        <div className="flex flex-row">
          <FriendList friends={friends} />
          <ActiveNowSide />
        </div>
      </PageContent>
    </Page>
  );
}
