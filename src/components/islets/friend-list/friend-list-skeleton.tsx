import AvatarSkeleton from "@/components/ui/avatar/avatar-skeleton";
import InputSkeleton from "@/components/ui/input/input-skeleton";
import clsx from "@/lib/clsx";

export default function FriendListSkeleton() {
  return (
    <>
      <div className="animate-pulse px-2 pb-5">
        <InputSkeleton />
        <div className="mt-6">
          <div className="h-3 w-16 bg-gray-800/50" />
        </div>
      </div>
      <div className="flex-1 animate-pulse overflow-y-hidden pb-4">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="group justify-between border-t-[1px] border-gray-800 py-2.5 pl-3 pr-2"
          >
            <div className="flex items-center gap-3">
              <AvatarSkeleton />
              <div className="flex-1 leading-4">
                <div className="flex items-center gap-1.5 text-sm">
                  <span
                    className={clsx(
                      "h-3.5 bg-gray-800 font-semibold",
                      i % 2 ? "w-32" : "w-40",
                    )}
                  >
                    &nbsp;
                  </span>
                </div>
                <div
                  className={clsx(
                    "mt-0.5 h-3 bg-gray-800/50",
                    i % 2 ? "w-28" : "w-36",
                  )}
                >
                  &nbsp;
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
