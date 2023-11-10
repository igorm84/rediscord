import FindSomethingButton from "@/components/islets/find-chat-button";
import { PageHeaderButton } from "@/components/layout/page/page-header";
import Divider from "@/components/ui/divider";
import { AiOutlineSearch } from "react-icons/ai";
import { BsChatRightFill, BsGithub, BsInboxFill } from "react-icons/bs";

export default function RightHeaderContent() {
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
