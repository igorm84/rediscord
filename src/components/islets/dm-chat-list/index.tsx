import {
  MOCK_CHATS,
  MOCK_DELAY,
  generateRandomFakeChats,
} from "@/lib/utils/mock";
import { delay } from "@/lib/utils";
import { Chat } from "@/lib/entities/chat";
import DMChatListContent from "./dm-chat-list-content";
export const getData = async (): Promise<{ channels: Chat[] }> => {
  const channels: Chat[] = generateRandomFakeChats(MOCK_CHATS);
  await delay(MOCK_DELAY + 1000);
  return { channels };
};
export default async function DMChatList() {
  const { channels } = await getData();
  return <DMChatListContent channels={channels} />;
}
