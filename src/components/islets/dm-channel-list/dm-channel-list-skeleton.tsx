import AvatarSkeleton from "@/components/ui/avatar/avatar-skeleton";

export default function DMChannelListSkeleton() {
  return (
    <div className="pt-4">
      <div className="h-4 w-full animate-pulse rounded-sm bg-foreground"></div>
      <div className="mt-1">
        {Array.from({ length: 18 }, (_, i) => i).map((i) => (
          <div
            key={i}
            className="my-1 flex h-11 w-full animate-pulse items-center gap-2 rounded-md bg-foreground px-2 py-1"
          >
            <AvatarSkeleton />
            <div className="flex h-8 flex-1 flex-col gap-1">
              <div className="h-3 w-full animate-pulse rounded-sm bg-gray-700/50" />
              <div className="h-3 w-3/4 animate-pulse rounded-sm bg-gray-700/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
