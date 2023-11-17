import { MOCK_CHATS, generateRandomFakeChats } from "@/lib/utils/mock";
import { Chat } from "@/lib/entities/chat";
import DMChatListContent from "./dm-chat-list-content";
import { cache, memo } from "react";

export const getData = cache(async (): Promise<{ channels: Chat[] }> => {
  const channels: Chat[] = generateRandomFakeChats(MOCK_CHATS);
  return { channels };
});

async function DMChatList() {
  const { channels } = await getData();
  return <DMChatListContent channels={channels} />;
}

export default memo(DMChatList);
