import FriendsTabGroup from "@/components/islets/friends-tab-group";
import Divider from "@/components/ui/divider";
import { BsPersonFill } from "react-icons/bs";
import { Page, PageContent, PageHeader } from "@/components/layout/page";
import FriendList from "@/components/islets/friend-list";


export default async function MePage() {
  return (
    <Page className="duration-[200ms] transition-all ease-in-out sm:ml-[310px]">
      <PageHeader>
        <div className="relative flex w-full items-center gap-4">
          <div className="flex flex-none items-center gap-2 pb-2 text-sm font-semibold sm:pb-0">
            <BsPersonFill className="text-gray-500" fontSize={22} />
            Friends
          </div>
          <Divider vertical className="pb-2 sm:pb-0" />
          <FriendsTabGroup friendRequestsCount={10} />
        </div>
      </PageHeader>
      <PageContent className="flex-col lg:flex-row" padding="none">
        <div className="flex flex-1 px-6 pt-4">
          <FriendList  />
        </div>
      </PageContent>
    </Page>
  );
}
