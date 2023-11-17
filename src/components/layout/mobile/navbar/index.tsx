import { useSidebarStatus } from "@/state/sidebar-status";
import Image from "next/image";
import Link from "next/link";
import { BsDiscord, BsPeople, BsSearch } from "react-icons/bs";

const routes: {
  name: string;
  path: string;
  icon: string | JSX.Element;
  onClick?: () => void;
}[] = [
  {
    name: "Home",
    path: "/",
    icon: <BsDiscord />,
  },
  {
    name: "Search",
    path: "/search",
    icon: <BsSearch />,
  },
  {
    name: "Profile",
    path: "/me",
    icon: <BsSearch />,
  },
  {
    name: "Friend requests",
    path: "/",
    icon: <BsPeople />,
  },
];
function NavItem({ path, icon, onClick }: (typeof routes)[0]) {
  return (
    <div onClick={onClick} className="flex items-center justify-center">
      <Link  href={path} className="0-2xl text-white">
        {typeof icon === "string" ? (
          <Image width={25} height={25} src={icon} alt="avatar" />
        ) : (
          icon
        )}
      </Link>
    </div>
  );
}
export default function NavBar() {
  const { setSidebarStatus } = useSidebarStatus();
  return (
    <div className="sticky bottom-0 left-0 z-[60] grid h-10 w-full grid-flow-col gap-4 bg-foreground py-[15px]">
      {routes.map((route) => (
        <NavItem
          key={route.name}
          onClick={() => setSidebarStatus("closed")}
          {...route}
        />
      ))}
    </div>
  );
}
