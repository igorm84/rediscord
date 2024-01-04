import { FC } from "react";
import AddFriendTab from "./add-friend-tab";
import FilterFriendsAllTab, {
  FilterFriendsBlockedTab,
  FilterFriendsInviteTab,
} from "./filter-friends-tab";
import { User } from "@prisma/client";

export enum FriendsTabEnum {
  Available = "Available",
  All = "All",
  Pending = "Pending",
  Blocked = "Blocked",
  AddFriend = "AddFriend",
}

export type FriendsTab = {
  key: FriendsTabEnum;
  name: string;
  component: FC<{ initialUsers: User[] }>;
};

// const NO_FRIENDS_PROP = {
//   imageSrc: "/zero-friends.svg",
//   imageAlt: "No friends found",
//   text: "Oops seems you don't have any friends :(",
// };

export const friendsTabsProps = Object.freeze<
  Record<FriendsTabEnum, FriendsTab>
>({
  [FriendsTabEnum.Available]: {
    key: FriendsTabEnum.Available,
    name: "Online",
    component: (props) => (
      <FilterFriendsAllTab
        {...props}
        {...{
          title: "Online",
          empty: {
            imageSrc: "/zero-friends.svg",
            imageAlt: "No friends online",
            text: "Looks nobody form your friend list is online :(",
          },
        }}
      />
    ),
  },
  [FriendsTabEnum.All]: {
    key: FriendsTabEnum.All,
    name: "All",
    component: (props) => (
      <FilterFriendsAllTab
        {...props}
        title="All"
        empty={{
          imageSrc: "/zero-friends.svg",
          imageAlt: ":(",
          text: "Seems you don't have any friends :(",
        }}
      />
    ),
  },
  [FriendsTabEnum.Pending]: {
    key: FriendsTabEnum.Pending,
    name: "Pending",
    component: (props) => (
      <FilterFriendsInviteTab
        {...props}
        title="Pending"
        empty={{
          imageSrc: "/zero-friends.svg",
          imageAlt: "No friend requests",
          text: "Looks like no one requested to be your friend :(",
        }}
      />
    ),
  },
  [FriendsTabEnum.Blocked]: {
    key: FriendsTabEnum.Blocked,
    name: "Blocked",
    component: (props) => (
      <FilterFriendsBlockedTab
        {...props}
        title="Blocked"
        empty={{
          imageSrc: "/zero-friends.svg",
          imageAlt: "No blocked friends",
          text: "You haven't blocked anyone :)",
        }}
      />
    ),
  },
  [FriendsTabEnum.AddFriend]: {
    key: FriendsTabEnum.AddFriend,
    name: "Add friend",
    component: () => <AddFriendTab />,
  },
});