import { FriendsTabEnum } from "@/components/islets/friend-list/friend-tabs";
import { clsx } from "@/lib/utils";

interface TabGroupButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  tabType: FriendsTabEnum;
}
const tabGroupVariants = {
  primary: {
    base: `rounded px-2 py-0.5 text-sm hover:bg-gray-800/50 
        active:bg-gray-800 active:text-gray-100 whitespace-nowrap`,
    active: "cursor-default bg-gray-800 text-gray-100",
    unactive: "text-gray-300 hover:text-gray-200",
  },
  addFriend: {
    base: `px-2 py-0.5 text-sm font-semibold`,
    active: "text-green-500 bg-transparent",
    unactive: "rounded-lg bg-green-700 text-gray-100 hover:bg-green-800",
  },
};

export default function TabGroupButton({
  active,
  tabType,
  className,
  ...props
}: TabGroupButtonProps) {
  const variantKey: keyof typeof tabGroupVariants =
    tabType === FriendsTabEnum.AddFriend ? "addFriend" : "primary";
  const variant = tabGroupVariants[variantKey];
  const variantClassName = clsx(
    variant.base,
    active ? variant.active : variant.unactive,
  );
  return <button className={clsx(variantClassName, className)} {...props} />;
}
