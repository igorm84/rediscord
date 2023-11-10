import { Page, PageContent, PageHeader } from "@/components/layout/page";
import { BsInboxFill } from "react-icons/bs";
export default function MessageRequestsPage() {
  return (
    <Page>
      <PageHeader>
        <div className="flex gap-4">
          <div className="flex flex-none items-center gap-2 text-sm font-semibold">
            <BsInboxFill className="text-gray-500" fontSize={22} />
            Message requests
          </div>
        </div>
      </PageHeader>
      <PageContent>Looks like nothing by here yet</PageContent>
    </Page>
  );
}
