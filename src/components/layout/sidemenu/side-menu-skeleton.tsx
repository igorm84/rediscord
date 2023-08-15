import Divider from "@/components/ui/divider";
import SideMenuWrapper from "./side-menu-wrapper";
import { clsx } from "@/lib/utils";

const SideMenuItemSkeleton = ({ className }: { className: string }) => (
  <a
    href="#"
    className={clsx(
      "relative block h-12 w-12 bg-foreground bg-cover transition-all",
      "group animate-pulse rounded-[100%] hover:shadow-xl focus:outline-none",
      className,
    )}
  />
);
export default function SideMenuSkeleton() {
  return (
    <SideMenuWrapper>
      <SideMenuItemSkeleton className="mx-auto mb-2" />
      <Divider className="w-8" />
      {Array.from({ length: 18 }, (_, i) => (
        <SideMenuItemSkeleton key={i} className="mx-auto my-2" />
      ))}
    </SideMenuWrapper>
  );
}
