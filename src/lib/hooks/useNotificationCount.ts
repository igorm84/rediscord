import { FriendsTabEnum } from "@/components/islets/friend-list/friend-tabs";
import { useQueries } from "@tanstack/react-query";

export default function useNotificationCount() {
  // Select all data which can notificate user
  const totalNotificationsCount = useQueries({
    queries: [
      { queryKey: ["friends-list", FriendsTabEnum.Pending], enabled: false },
    ],
    combine: (res) => {
        return res.reduce((acc, v) => {
            if (Array.isArray(v.data)) {
                return acc + v.data.length
            }
            return acc+0;
        }, 0)
    }
  });
  return totalNotificationsCount;
}
