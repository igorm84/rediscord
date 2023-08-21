import TextSkeleton from "@/components/ui/text/text-skeleton";
import { ActiveNowListItemSkeleton } from "./active-now-list";

export default function ActiveNowPanelSkeleton() {
  return (
    <div className="flex-1 border-l-[1px] border-gray-800 p-4">
      <h1 className="mb-4">
        <TextSkeleton length={10} fontSize="lg" />
      </h1>
      <ActiveNowListItemSkeleton />
    </div>
  );
}
