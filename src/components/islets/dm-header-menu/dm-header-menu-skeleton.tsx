import { List, ListItem } from "@/components/ui/list";
import { clsx } from "@/lib/utils";

const HeaderMenuListItemSkeleton = () => (
  <ListItem className={clsx("my-0.5 animate-pulse gap-3 !bg-foreground")}>
    <div className="h-5 w-5 rounded-full bg-white/5"></div>
    <div className="h-4 w-3/4 rounded-sm bg-white/5"></div>
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
