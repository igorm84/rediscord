import { clsx } from "@/lib/utils";
interface TabGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: string;
}

export default function TabGroup({
  gap = "4",
  className,
  children,
  ...props
}: TabGroupProps) {
  return (
    <div
      className="h-full max-h-[25px] w-full overflow-y-hidden"
      {...props}
    >
      <div
        className={clsx(
          `flex gap-${gap}`,
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
