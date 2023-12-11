import clsx from "@/lib/clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navRoutes: {
  name: string;
  path: string;
  onClick?: () => void;
}[] = [
  {
    name: "Home",
    path: "/user-settings",
  },
];

export default function SettingsLayoutNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block bg-secondary h-full pl-5 pr-2 pt-[60px]">
      <div className="flex flex-col items-end justify-start gap-2">
        <div className="w-[192px] text-left">
          <span className="text-sm font-bold uppercase text-gray-400">
            USER SETTINGS
          </span>
        </div>
        <div className="grid grid-cols-[192px] gap-2">
          {navRoutes.map(({ name, path }) => (
            <Link
            key={path}
              className={clsx(
                "rounded-md px-[10px] py-[6px] font-semibold",
                path === pathname && "bg-selected",
              )}
              href={path}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
