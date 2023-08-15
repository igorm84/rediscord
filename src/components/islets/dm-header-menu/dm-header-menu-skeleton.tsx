import { List, ListItem } from "@/components/ui/list";
import { clsx } from "@/lib/utils";

const HeaderMenuListItemSkeleton = () => (
  <ListItem
    noVerticalPadding
    className={clsx("my-0.5 animate-pulse gap-3 !bg-foreground py-2.5")}
  >
    <div className="h-5 w-5 rounded-full bg-gray-700/40"></div>
    <div className="h-4 w-3/4 rounded-sm bg-gray-700/40"></div>
    &nbsp;
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
