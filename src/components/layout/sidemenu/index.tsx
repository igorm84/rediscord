import { ListedServer } from "@/lib/entities/server";
import SideMenuTrack from "./side-menu-track";
import SideMenuWrapper from "./side-menu-wrapper";
import { PREVIEW_SERVERS } from "@/lib/utils/mock";

export const getData = (): { servers: ListedServer[] } => {
  const servers: ListedServer[] = PREVIEW_SERVERS;
  return { servers };
};

export default function SideMenu() {
  const { servers } = getData();
  return (
    <SideMenuWrapper>
      <SideMenuTrack servers={servers} />
    </SideMenuWrapper>
  );
}
