"use client";

import FindSomethingButton from "@/components/islets/find-chat-button";
import { PageHeaderButton } from "@/components/layout/page/page-header";
import Divider from "@/components/ui/divider";
import { useViewportType } from "@/state/viewport-type";
import { AiOutlineSearch } from "react-icons/ai";
import { BsChatRightFill, BsGithub, BsInboxFill } from "react-icons/bs";
import BurgerMenu from "@/components/ui/burger";

export function MobileHeaderMenu() {
  return (
    <div className="flex items-center gap-2">
      <FindSomethingButton
        className="rounded-full text-sm sm:text-[16px]"
        icon={<AiOutlineSearch />}
      />
      <BurgerMenu>
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
      </BurgerMenu>
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
