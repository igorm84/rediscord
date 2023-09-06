"use client";
import { BsChatRightFill, BsGithub, BsInboxFill } from "react-icons/bs";
import Header from "../header";
import Divider from "@/components/ui/divider";
import React from "react";
import clsx from "@/lib/clsx";
import HybridButton, {
  HybridButtonProps,
  HybridButtonRef,
} from "@/components/ui/hybrid/hybrid-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import DMChannelPopover from "@/components/islets/dm-channel-list/dm-channel-popover";

type PageHeaderButtonProps = HybridButtonProps;

const PageHeaderButton = React.forwardRef(
  (
    { children, className, ...props }: PageHeaderButtonProps,
    ref: React.Ref<HybridButtonRef>,
  ) => (
    <HybridButton
      ref={ref}
      className={clsx("text-gray-300 hover:text-gray-200", className)}
      {...props}
    >
      {children}
    </HybridButton>
  ),
);
PageHeaderButton.displayName = "PageHeadeButton";

const headerIcons = [
  {
    icon: <BsChatRightFill size={18} />,
    tooltip: "Create  private Message",
    href: "",
  },
  { icon: <BsInboxFill size={20} />, tooltip: "Inbox", href: "" },
  {
    icon: <BsGithub size={20} />,
    href: "https://github.com/igorm84/rediscord",
    tooltip: "Author github",
  },
];

export default function PageHeader({ children }: React.PropsWithChildren) {
  const [open, setOpen] = React.useState(false);
  return (
    <Header className="flex-none justify-between">
      {children}
      <div className="flex items-center gap-6">
        <TooltipProvider>
          <Popover open={open} onOpenChange={setOpen}>
            {headerIcons.map((icon, index) => {
              const messageIconIndex = index === 0;
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild={messageIconIndex}>
                      <PageHeaderButton
                        className={`${
                          messageIconIndex ? "hidden md:block" : null
                        }`}
                        href={icon.href}
                        key={index}
                      >
                        {icon.icon}
                      </PageHeaderButton>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  {messageIconIndex && (
                    <Divider
                      className={`${
                        messageIconIndex ? "hidden md:block" : null
                      }`}
                      vertical
                    />
                  )}
                  <TooltipContent
                    side="bottom"
                    className="z-[51] !text-sm"
                    sideOffset={0}
                  >
                    {icon.tooltip}
                  </TooltipContent>
                </Tooltip>
              );
            })}
            <DMChannelPopover setOpen={setOpen} position="right-20" />
          </Popover>
        </TooltipProvider>
      </div>
    </Header>
  );
}
