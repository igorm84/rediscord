import { clsx } from "@/lib/utils";

interface TabGroupButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export default function TabGroupButton({
  active,
  className,
  ...props
}: TabGroupButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-sm px-2 py-0.5 text-sm hover:bg-white/5 ",
        "active:bg-white/10 active:text-gray-100",
        active
          ? "cursor-default bg-white/10 text-gray-100"
          : "text-gray-400 hover:text-gray-300",
        className,
      )}
      {...props}
    />
  );
}
