"use client";

import clsx from "@/lib/clsx";
import { sendSearchModalEvent } from "@/lib/events/searchModalEvent";

export const FindChatButtonSkeleton = () => {
  return (
    <button className="flex w-full animate-pulse justify-between rounded-sm bg-foreground p-1.5 text-left text-xs text-gray-400">
      &nbsp;
    </button>
  );
};
interface FindSomethingButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: React.ReactNode;
}
export default function FindSomethingButton({
  text,
  icon,
  className,
  ...props
}: FindSomethingButtonProps) {
  const handleClick = () => {
    sendSearchModalEvent("open");
  };
  return (
    <button
      onClick={handleClick}
      className={clsx(
        "flex w-full items-center justify-between gap-2 rounded-sm bg-background p-1.5 text-left text-[13px] text-gray-400 hover:bg-background/70",
        className,
      )}
    >
      {text}
      {icon}
    </button>
  );
}
