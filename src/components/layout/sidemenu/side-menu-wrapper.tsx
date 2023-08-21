import { clsx } from "@/lib/utils";

export default function SideMenuWrapper({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "hidden-scrollbar fixed z-50 h-screen w-[70px] gap-3 overflow-y-auto pt-3",
        "bg-gradient-to-b from-semibackground to-background",
        className,
      )}
    >
      <div className="pointer-events-none fixed bottom-0 z-10 h-32 w-[70px] bg-gradient-to-b from-transparent to-black/20"></div>
      {children}
    </div>
  );
}
