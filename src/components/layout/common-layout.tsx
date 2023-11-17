import { Suspense } from "react";
import SideMenuSkeleton from "./sidemenu/side-menu-skeleton";
import SideMenu from "./sidemenu";
import SearchModal from "../islets/search-modal";

export default function CommonLayout() {

  return (
    <>
      <Suspense fallback={<SideMenuSkeleton />}>
        <SideMenu />
      </Suspense>

      <SearchModal />
    </>
  );
}
