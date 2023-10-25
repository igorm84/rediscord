import {
  MOCK_CHATS,
  MOCK_DELAY,
  generateRandomFakeChats,
} from "@/lib/utils/mock";
import { delay } from "@/lib/utils";
import { ListedDMChat } from "@/lib/entities/chat";
import DMChatListContent from "./dm-chat-list-content";
export const getData = async (): Promise<{ channels: ListedDMChat[] }> => {
  const channels: ListedDMChat[] = generateRandomFakeChats(MOCK_CHATS);
  await delay(MOCK_DELAY + 1000);
  return { channels };
};
export default async function DMChatList() {
  const { channels } = await getData();
  return <DMChatListContent channels={channels} />;
}
