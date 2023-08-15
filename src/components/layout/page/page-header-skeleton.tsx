import TextSkeleton from "@/components/ui/text/text-skeleton";
import Header from "../header";

export default function PageHeaderSkeleton() {
  return (
    <Header className="justify-between">
      <div className="flex  animate-pulse items-center gap-2">
        <div className="h-5 w-5 rounded-full bg-gray-800" />
        <TextSkeleton fontSize="sm" length={7} />
      </div>
    </Header>
  );
}
