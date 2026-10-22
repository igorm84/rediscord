import { clsx } from "@/lib/utils";

export default function Sidebar({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "fixed bottom-0 left-[70px] top-demo-banner z-10 w-60 bg-midground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
