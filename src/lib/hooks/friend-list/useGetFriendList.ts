import getFriendsTabUsers from "@/app/(actions)/general/getFriendsTabUsers";
import { FriendsTabEnum } from "@/components/islets/friend-list/friend-tabs";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetFriendList({
  currentTab,
}: {
  currentTab: FriendsTabEnum;
}) {
  const { data, isFetching } = useQuery({
    queryKey: ["friends-list", currentTab],
    queryFn: () => getFriendsTabUsers({ tab: currentTab }),
    placeholderData: keepPreviousData,
  });
  return {
    friends: Array.isArray(data) ? data : [],
    isFetching,
  };
}