"use client";

import { PageHeaderButton } from "@/components/layout/page/page-header";
import BurgerMenu from "@/components/ui/burger";
import Divider from "@/components/ui/divider";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { Fragment } from "react";
import { BsChatRightFill, BsGithub, BsInboxFill } from "react-icons/bs";

export default function RightHeaderContent() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const Container = isMobile ?  BurgerMenu : Fragment;
  
  return (
    <Container>
      <PageHeaderButton>
        <BsChatRightFill fontSize={18} />
      </PageHeaderButton>
      <Divider vertical={!isMobile} className="w-full sm:w-[2px]" />
      <PageHeaderButton>
        <BsInboxFill fontSize={20} />
      </PageHeaderButton>
      <PageHeaderButton
        href="https://github.com/igorm84/rediscord"
        target="_blank"
      >
        <BsGithub fontSize={20} />
      </PageHeaderButton>
    </Container>
  );
}
