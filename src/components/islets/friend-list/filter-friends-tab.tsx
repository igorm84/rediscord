import { User } from "@prisma/client";
import { ComponentProps, FC, useState } from "react";
import { normalizedCompare } from "@/lib/utils/string";
import FriendsFilterInput from "./friends-filter-input";
import { List } from "@/components/ui/list";
import FriendListItem, {
  FriendListItemBlocked,
  FriendListItemInvite,
} from "./friend-list-item";
import NotFound from "./not-found";
import { EmptyBox } from "../empty-box-image";

interface FilterFriendsTabProps {
  loading?: boolean;
  title: string;
  empty: {
    imageSrc: string;
    imageAlt: string;
    text: string;
  };
  initialUsers: User[];
  friendListItemComponent: FC<
    Omit<ComponentProps<typeof FriendListItem>, "variant">
  >;
}

const FilterFriendsTab = ({
  initialUsers,
  title,
  empty,
  friendListItemComponent,
}: FilterFriendsTabProps) => {
  const [search, setSearch] = useState("");

  const filteredFriends = initialUsers.filter((user) => {
    const isMatchingName = !search || normalizedCompare(user.username, search);
    return isMatchingName;
  });

  const FriendListItemComponent = friendListItemComponent;

  if (initialUsers.length) {
    return (
      <>
        <FriendsFilterInput
          filterValue={search}
          setFilterValue={setSearch}
          filteredUserCount={filteredFriends.length}
          tabTitle={title}
        />
        <div className="flex-1 overflow-y-scroll">
          {filteredFriends.length ? (
            <List>
              {filteredFriends.map((friend) => (
                <FriendListItemComponent key={friend.id} friend={friend} />
              ))}
            </List>
          ) : (
            <NotFound />
          )}
        </div>
      </>
    );
  }
  return (
    <EmptyBox
      src={empty.imageSrc}
      alt={empty.imageAlt}
      text={search ? "Whooaps! No one found with this name" : empty.text}
    />
  );
};

export const FilterFriendsInviteTab = (
  props: Omit<FilterFriendsTabProps, "friendListItemComponent">,
) => {
  const onInviteSubmitted: FriendListItemInvite["onInviteSubmitted"] = (
    id,
    accepted,
  ) => {
    console.log("Invite form user ", id, accepted);
  };
  return (
    <FilterFriendsTab
      {...props}
      friendListItemComponent={(listItemProps) => (
        <FriendListItem
          {...listItemProps}
          onInviteSubmitted={onInviteSubmitted}
          variant="invite"
        />
      )}
    />
  );
};

export const FilterFriendsBlockedTab = (
  props: Omit<FilterFriendsTabProps, "friendListItemComponent">,
) => {
  const onUnblock: FriendListItemBlocked["onUnblock"] = (id) => {
    console.log(`user with id - ${id} has been ublocked`);
  };
  return (
    <FilterFriendsTab
      {...props}
      friendListItemComponent={(listItemProps) => (
        <FriendListItem
          {...listItemProps}
          onUnblock={onUnblock}
          variant="blocked"
        />
      )}
    />
  );
};
export default function FilterFriendsAllTab(
  props: Omit<FilterFriendsTabProps, "friendListItemComponent">,
) {
  return (
    <FilterFriendsTab
      {...props}
      friendListItemComponent={(listItemProps) => (
        <FriendListItem {...listItemProps} variant="base" />
      )}
    />
  );
}