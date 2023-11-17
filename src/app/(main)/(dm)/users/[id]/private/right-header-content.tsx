import { PageHeaderButton } from "@/components/layout/page/page-header";
import Divider from "@/components/ui/divider";
import { BsChatRightFill, BsGithub, BsInboxFill } from "react-icons/bs";

export default function RightHeaderContent({className, ...props}: React.HTMLAttributes<HTMLDivElement> ) {
  return (
    <>
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
    </>
  );
}
