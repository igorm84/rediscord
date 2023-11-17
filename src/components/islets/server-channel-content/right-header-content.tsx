"use client";

import FindSomethingButton from "@/components/islets/find-chat-button";
import { PageHeaderButton } from "@/components/layout/page/page-header";
import RoundedButton from "@/components/ui/button/rounded-button";
import Divider from "@/components/ui/divider";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { useViewportType } from "@/state/viewport-type";
import { AiOutlineSearch } from "react-icons/ai";
import { BsChatRightFill, BsGithub, BsInboxFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { motion } from "framer-motion";

export function HeaderMenuPopover() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <RoundedButton
          key={+isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="animate-[pulse-rotate_0.5s] text-sm transition-all sm:text-[16px]"
        >
          {isOpen ? <IoClose /> : <RxHamburgerMenu />}
        </RoundedButton>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="center"
        asChild
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{delay: 0.2,  ease: "linear" }}
          className="grid gap-2 bg-midground p-4 rounded-lg"
        >
          <PageHeaderButton>
            <BsChatRightFill fontSize={18} />
          </PageHeaderButton>
          <Divider className="my-1 h-[2px] w-full" />
          <PageHeaderButton>
            <BsInboxFill fontSize={20} />
          </PageHeaderButton>
          <PageHeaderButton
            href="https://github.com/igorm84/rediscord"
            target="_blank"
          >
            <BsGithub fontSize={20} />
          </PageHeaderButton>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}
export function MobileHeaderMenu() {
  return (
    <div className="flex items-center gap-2">
      <FindSomethingButton
        className="rounded-full text-sm sm:text-[16px]"
        icon={<AiOutlineSearch />}
      />
      <HeaderMenuPopover />
    </div>
  );
}
export default function RightHeaderContent() {
  const { type } = useViewportType();
  const isNotDesktop = type !== "desktop";

  if (isNotDesktop) {
    return <MobileHeaderMenu />;
  }
  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-5">
        <PageHeaderButton>
          <BsChatRightFill fontSize={18} />
        </PageHeaderButton>
        <Divider vertical />
        <PageHeaderButton>
          <BsInboxFill fontSize={20} />
        </PageHeaderButton>
        <PageHeaderButton
          href="https://github.com/igorm84/rediscord"
          target="_blank"
        >
          <BsGithub fontSize={20} />
        </PageHeaderButton>
      </div>
      <div className="w-[144px]">
        <FindSomethingButton text="Search" icon={<AiOutlineSearch />} />
      </div>
      <div className="flex items-center gap-5">
        <PageHeaderButton>
          <BsInboxFill fontSize={20} />
        </PageHeaderButton>
        <PageHeaderButton
          href="https://github.com/igorm84/rediscord"
          target="_blank"
        >
          <BsGithub fontSize={20} />
        </PageHeaderButton>
      </div>
    </div>
  );
}
