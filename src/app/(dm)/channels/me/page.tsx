import FriendsTabGroup from "@/components/islets/friends-tab-group";
import Divider from "@/components/ui/divider";
import { BsPersonFill } from "react-icons/bs";
import { Page, PageContent, PageHeader } from "@/components/layout/page";
import FriendList from "@/components/islets/friend-list";
import { delay } from "@/lib/utils";
import { MOCK_DELAY } from "@/lib/utils/mock";
import { User } from "@/lib/entities/user";

const getData = async (): Promise<{ friends: User[] }> => {
  /*
   * TODO: Get friend list
   */

  const friends: User[] = [];

  await delay(MOCK_DELAY);
  return { friends };
};

export default async function MePage() {
  await getData();
  return (
    <Page>
      <PageHeader>
        <div className="flex gap-5">
          <div className="flex flex-none items-center gap-2 text-sm font-bold">
            <BsPersonFill className="text-gray-500" fontSize={22} />
            Friends
          </div>
          <Divider vertical />
          <FriendsTabGroup />
          <button className="rounded-sm bg-green-700 px-2 py-0.5 text-sm font-semibold text-gray-100 hover:bg-green-800">
            Add a Friend
          </button>
        </div>
      </PageHeader>
      <PageContent>
        <FriendList />
      </PageContent>
    </Page>
  );
}
