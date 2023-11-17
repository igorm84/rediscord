import InputMessageBox from "@/components/islets/input-message-box";
import MessageList from "@/components/islets/message-list";
import { Page, PageContent, PageHeader } from "@/components/layout/page";
import Avatar from "@/components/ui/avatar";
import Divider from "@/components/ui/divider";
import { delay } from "@/lib/utils";
import {
  generateRandomFakeMegssages,
  getRandomUserById,
} from "@/lib/utils/mock";
import RightHeaderContent from "./right-header-content";
import { GoBackWideBtn } from "@/components/islets/go-back-btn";

const getData = async (id: string) => {
  /*
   * Generate fake user for testing
   */
  const user = getRandomUserById(id);
  const messages = generateRandomFakeMegssages(30);
  user.id = id;

  await delay(1000);
  return { user, messages };
};

export default async function ChannelPage({
  params,
}: {
  params: { id: string };
}) {
  const { user, messages } = await getData(params.id);
  return (
    <Page className="ml-0 transition-all sm:ml-[310px]">
      <PageHeader
        className="horizontal-scroll sticky top-0 z-[10]"
        rightContent={<RightHeaderContent />}
      >
        <div className="flex items-center gap-4">
          <div className="flex flex-none items-center gap-3 text-sm font-semibold">
            <Avatar
              size="sm"
              src={user.avatar}
              alt="ewqwqe"
              status={user.status}
            />
            {user.name}
          </div>
          <Divider vertical />
          <div className="text-xs text-gray-400">{user.username}</div>
        </div>
      </PageHeader>
      <PageContent className="hover-scrollbar relative grid">
        <MessageList messageList={messages} />
        <div className="sticky bottom-0 z-[1] flex flex-grow items-end bg-[#313338] px-4">
          <InputMessageBox />
        </div>
        <GoBackWideBtn />
      </PageContent>
    </Page>
  );
}
