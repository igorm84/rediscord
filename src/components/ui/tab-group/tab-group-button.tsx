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
        "rounded px-2 py-0.5 text-sm hover:bg-gray-800/50",
        "active:bg-gray-800 active:text-gray-100 whitespace-nowrap",
        active
          ? "cursor-default bg-gray-800 text-gray-100"
          : "text-gray-300 hover:text-gray-200",
        className,
      )}
      {...props}
    />
  );
}
