import { List, ListItem } from "@/components/ui/list";
import TextSkeleton from "@/components/ui/text/text-skeleton";
import { clsx } from "@/lib/utils";

const HeaderMenuListItemSkeleton = () => (
  <ListItem
    noVerticalPadding
    className={clsx("my-1 animate-pulse gap-3 !bg-foreground py-2.5")}
  >
    <div className="h-5 w-5 rounded-full bg-gray-700/40"></div>
    <TextSkeleton place="midground" className={"my-0.5 w-3/4"} />
  </ListItem>
);
export default function DMHeaderMenuSkeleton() {
  return (
    <List className="w-full">
      <HeaderMenuListItemSkeleton />
      <HeaderMenuListItemSkeleton />
      <HeaderMenuListItemSkeleton />
    </List>
  );
}
