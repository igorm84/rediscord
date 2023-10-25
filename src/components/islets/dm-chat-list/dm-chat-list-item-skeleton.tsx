import AvatarSkeleton from "@/components/ui/avatar/avatar-skeleton";
import TextSkeleton from "@/components/ui/text/text-skeleton";
import clsx from "@/lib/clsx";
interface Props {
  even: boolean;
}
export default function DMChatListItemSkeleton({ even }: Props) {
  return (
    <div className="my-1 flex w-full items-center gap-2 rounded-md bg-foreground px-2 py-2">
      <AvatarSkeleton />
      <div className="flex h-8 flex-1 flex-col gap-1">
        <TextSkeleton
          fontSize="sm"
          place="midground"
          className={clsx(even ? "w-5/6" : "w-3/4")}
        />
        <TextSkeleton
          fontSize="xs"
          place="midground"
          className={clsx(even ? "w-3/4" : "w-2/3")}
        />
      </div>
    </div>
  );
}
