import { clsx } from "@/lib/utils";

export default function Sidebar({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "fixed left-[70px] z-10 h-screen w-60 bg-midground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
