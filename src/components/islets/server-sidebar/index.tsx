import { delay } from "@/lib/utils";
import {
  generateRandomChannelGroup,
  generateRandomFakeServers,
} from "@/lib/utils/mock";
import ServerGroup from "./server-group";
import { BsArrowDown } from "react-icons/bs";
import Sidebar from "@/components/layout/sidebar";
import VoiceStatusFooter from "../voice-status-footer";

const getData = async () => {
  const server = generateRandomFakeServers(1)[0];
  const groups = generateRandomChannelGroup(40);
  await delay(2000);
  return { server, groups };
};
export default async function ServerSidebar() {
  const { server, groups } = await getData();
  return (
    <Sidebar className="grid grid-rows-[minmax(44px,max-content)_1fr_52px]">
      <div
        className="min-h-12 grid max-w-[240px] cursor-pointer grid-cols-[1fr_20px] items-center 
       justify-between px-3 text-[16px] font-bold text-white shadow-md hover:bg-white/20"
      >
        <span>{server.name}</span>
        <BsArrowDown width="20px" height="20px" />
      </div>
      <div className="hover-scrollbar grid gap-5 overflow-y-auto px-3 pt-5">
        {groups.map(({ id, title, channels }) => (
          <ServerGroup key={id} groupTitle={title} channelList={channels} />
        ))}
      </div>
      <VoiceStatusFooter />
    </Sidebar>
  );
}
