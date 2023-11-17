import { ListedServer } from "@/lib/entities/server";
import SideMenuTrack from "./side-menu-track";
import SideMenuWrapper from "./side-menu-wrapper";
import { delay } from "@/lib/utils";
import { MOCK_DELAY, generateRandomFakeServers } from "@/lib/utils/mock";

export const getData = async (): Promise<{ servers: ListedServer[] }> => {
  /*
   * Generate fake servers for testing
   */
  const servers: ListedServer[] = generateRandomFakeServers(18);
  await delay(MOCK_DELAY * 2);
  return { servers };
};

export default async function SideMenu() {
  const { servers } = await getData();
  return (
    <SideMenuWrapper>
      <SideMenuTrack servers={servers} />
    </SideMenuWrapper>
  );
}
