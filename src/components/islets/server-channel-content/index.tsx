import { generateRandomFakeMegssages } from "@/lib/utils/mock";
import MessageList from "../message-list";
import InputMessageBox from "../input-message-box";
import EmptyChannel from "./empty-channel";
import { Channel } from "@/lib/entities/channel";
import { GoBackWideBtn } from "../go-back-btn";

interface ServerChannelContentProps {
  channel: Channel;
}

export default async function ServerChannelContent({
  channel,
}: ServerChannelContentProps) {
  const messages = generateRandomFakeMegssages(10);

  return (
    <>
      <MessageList
        greetingMessageElement={
          <EmptyChannel icon={channel?.type} channelTitle={channel.title} />
        }
        messageList={messages}
      />
      <div className="sticky bottom-0 z-[1] flex flex-grow items-end bg-[#313338] px-4">
        <InputMessageBox />
      </div>
      <GoBackWideBtn />
    </>
  );
}
