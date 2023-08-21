import AvatarSkeleton from "@/components/ui/avatar/avatar-skeleton";
import InputSkeleton from "@/components/ui/input/input-skeleton";
import TextSkeleton from "@/components/ui/text/text-skeleton";
import { MOCK_FRIENDS } from "@/lib/utils/mock";

export default function FriendListSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="animate-pulse px-2 pb-3.5">
        <InputSkeleton />
        <div className="mt-6">
          <TextSkeleton fontSize="xs" length={8} />
        </div>
      </div>
      <div className="flex-1 animate-pulse overflow-y-hidden pb-4">
        {Array.from({ length: MOCK_FRIENDS }).map((_, i) => (
          <div
            key={i}
            className="group justify-between rounded-md border-t-[1px] border-gray-800 py-2.5 pl-3 pr-2"
          >
            <div className="flex items-center gap-3">
              <AvatarSkeleton />
              <div className="flex-1 leading-4">
                <div className="flex items-center gap-1.5 text-sm">
                  <TextSkeleton fontSize="sm" length={i % 2 ? 14 : 20} />
                </div>
                <TextSkeleton
                  fontSize="xs"
                  length={i % 2 ? 12 : 18}
                  className="mt-0.5"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
