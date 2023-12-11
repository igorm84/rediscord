import AvatarSkeleton from "@/components/ui/avatar/avatar-skeleton";
import TextSkeleton from "@/components/ui/text/text-skeleton";
import clsx from "@/lib/clsx";
import { Fragment, PropsWithChildren } from "react";

interface Props {
  container?: boolean;
  modal?: boolean;
}
function Wrapper({ children }: PropsWithChildren) {
  return (
    <div className="grid min-h-[460px] grid-cols-[minmax(0px_660px)] grid-rows-[100px_1fr]">
      {children}
    </div>
  );
}
export default function UserSettingsModalSkeleton({ container, modal }: Props) {
  const Container = container ? Wrapper : Fragment;
  return (
    <Container>
      {modal && (
        <div className="absolute left-0 top-0 h-[64px] w-full rounded-t-lg bg-foreground"></div>
      )}
      <div
        className={clsx(
          "relative flex items-end justify-between",
          "pb-4 pl-12 pr-4 sm:pl-[90px]",
          modal ? "pt-12" : "pt-4",
        )}
      >
        <AvatarSkeleton
          size="lg"
          className="absolute left-0 top-[40%]  z-10 h-[50px] w-[50px] cursor-pointer rounded-full border-[8px] border-midground 
        p-2 sm:top-4 sm:h-20 sm:w-20"
        />
        {/* Username */}
        <TextSkeleton fontSize="xs" length={20} />
        {/* Button */}
        <TextSkeleton fontSize="lg" length={15} />
      </div>
      {/* Rest modal content */}
      <div className="mt-4 rounded-xl bg-foreground p-2">
        <div className="flex flex-col gap-4 p-4">
          {Array(4)
            .fill(0)
            .map((_, idx) => {
              return (
                <div
                  className="flex h-[50px] items-end justify-between"
                  key={idx}
                >
                  <div className="grid">
                    {/* Label */}
                    <TextSkeleton fontSize="xs" length={15} />
                    {/* Input field skeleton */}
                    <TextSkeleton fontSize="lg" length={20} className="mt-2" />
                  </div>
                  <div className="grid items-end justify-end">
                    {/* Edit button */}
                    <TextSkeleton fontSize="lg" length={15} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Container>
  );
}
