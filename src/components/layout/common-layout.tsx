import SideMenuSkeleton from "./sidemenu/side-menu-skeleton";
import SideMenu from "./sidemenu";
import SearchModal from "../islets/search-modal";
import DemoLoadingGate from "../islets/demo-loading-gate";

export default function CommonLayout() {
  return (
    <>
      <DemoLoadingGate fallback={<SideMenuSkeleton />}>
        <SideMenu />
      </DemoLoadingGate>
      <SearchModal />
    </>
  );
}
