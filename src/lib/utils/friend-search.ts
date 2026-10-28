import { User } from "@/lib/entities/user";
import { normalizedCompare } from "./string";

export function searchFriends(friends: User[], search: string, limit = 6) {
  const query = search.trim();
  return friends
    .filter(
      (friend) =>
        !query ||
        normalizedCompare(friend.name, query) ||
        normalizedCompare(friend.username ?? "", query),
    )
    .slice(0, limit);
}
