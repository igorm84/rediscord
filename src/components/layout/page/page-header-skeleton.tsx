import TextSkeleton from "@/components/ui/text/text-skeleton";
import Header from "../header";
import AvatarSkeleton from "@/components/ui/avatar/avatar-skeleton";
import clsx from "@/lib/clsx";

// Static class names so Tailwind can detect them at build time.
const gapClasses = {
  "2": "gap-2",
  "4": "gap-4",
} as const;

interface PageHeaderSkeletonProps {
  gap?: keyof typeof gapClasses;
  boxSkeletonType?: "icon" | "avatar";
}
export default function PageHeaderSkeleton({
  gap = "2",
  boxSkeletonType = "icon",
}: PageHeaderSkeletonProps) {
  return (
    <Header className="flex-none justify-between">
      <div className={clsx("flex animate-pulse items-center", gapClasses[gap])}>
        {boxSkeletonType === "icon" ? (
          <div className="h-5 w-5 rounded-full bg-gray-800" />
        ) : (
          <AvatarSkeleton />
        )}
        <TextSkeleton fontSize="sm" length={7} />
      </div>
    </Header>
  );
}
