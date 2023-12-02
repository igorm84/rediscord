import { Suspense } from "react";
import SideMenuSkeleton from "./sidemenu/side-menu-skeleton";
import SideMenu from "./sidemenu";
import SearchModal from "../islets/search-modal";
import SideMenuWrapper from "./sidemenu/side-menu-wrapper";

export default function CommonLayout() {
  return (
    <>
      <SideMenuWrapper>
        <Suspense fallback={<SideMenuSkeleton />}>
          <SideMenu />
        </Suspense>
      </SideMenuWrapper>
      <SearchModal />
    </>
  );
}
