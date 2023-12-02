import clsx from "@/lib/clsx";
import { useSidebarStatus } from "@/state/sidebar-status";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsDiscord, BsPeople, BsSearch } from "react-icons/bs";
import { motion } from "framer-motion";
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
type NavItemProps = (typeof routes)[0] & {
  active?: boolean;
};
function NavItem({ path, icon, onClick, active }: NavItemProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center rounded-xl py-4",
        active && "bg-gray-800",
      )}
    >
      <Link href={path} className="0-2xl text-white">
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
  const pathname = usePathname();
  return (
    <motion.div
      transition={{ ease: "easeInOut", duration: 0.4 }}
      animate={{translateX: ["-100vw", "0vw"]}}
      exit={{ translateX: "-100vw" }}
      className="sticky bottom-0 left-0 z-[60] grid h-10 w-full grid-flow-col gap-4 bg-foreground"
    >
      {routes.map((route) => (
        <NavItem
          key={route.name}
          active={pathname === route.path}
          onClick={() => setSidebarStatus("closed")}
          {...route}
        />
      ))}
    </motion.div>
  );
}
