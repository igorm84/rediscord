"use client";

import clsx from "@/lib/clsx";
import { useSidebarStatus } from "@/state/sidebar-status";
import { BsArrowLeft } from "react-icons/bs";

interface GoBackBtnProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  containerClassName?: string;
  buttonClassName?: string;
  routeUrl?: string;
}
export function GoBackWideBtn() {
  const { setSidebarStatus } = useSidebarStatus();
  return (
    <GoBackBtn
      containerClassName="fixed top-[40%] left-1"
      buttonClassName="h-20"
      onClick={() => setSidebarStatus("open")}
    />
  );
}

export default function GoBackBtn({
  containerClassName,
  buttonClassName,
  routeUrl,
  onClick,
  ...props
}: GoBackBtnProps) {
  return (
    <div
      className={containerClassName}
      onClick={onClick}
      data-testid="go-back-btn"
      {...props}
    >
      <button
        className={clsx(
          "flex items-center justify-center rounded-md bg-gray-900 p-1 text-xl text-white",
          buttonClassName,
        )}
      >
        <BsArrowLeft />
      </button>
    </div>
  );
}
