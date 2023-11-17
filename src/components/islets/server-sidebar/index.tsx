import {
  generateRandomChannelGroup,
  generateRandomFakeServers,
} from "@/lib/utils/mock";
import ServerGroup from "./server-group";
import { BsArrowDown } from "react-icons/bs";
import VoiceStatusFooter from "../voice-status-footer";
import GoBackBtn from "./server-sidebar-back-btn";

const getData = async () => {
  const server = generateRandomFakeServers(1)[0];
  const groups = generateRandomChannelGroup(40);
  return { server, groups };
};
export default async function ServerSidebar() {
  const { server, groups } = await getData();
  return (
    <>
      <div
        className="relative grid min-h-[48px] cursor-pointer items-center justify-between px-3 
       text-[16px] font-bold text-white shadow-md hover:bg-white/20 sm:max-w-[240px] grid-cols-[40px_1fr_20px] sm:grid-cols-[1fr_20px]"
      >
        <GoBackBtn />
        <span>{server.name}</span>
        <BsArrowDown width="20px" height="20px" />
      </div>
      <div className="hover-scrollbar grid gap-5 overflow-y-auto px-3 pt-5">
        {groups.map(({ id, title, channels }) => (
          <ServerGroup key={id} groupTitle={title} channelList={channels} />
        ))}
      </div>
      <VoiceStatusFooter />
    </>
  );
}
