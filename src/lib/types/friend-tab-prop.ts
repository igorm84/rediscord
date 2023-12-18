import { UserStatuses } from "../entities/user";

export enum FriendsTabEnum {
  Available = "Available",
  All = "All",
  Pending = "Pending",
  Blocked = "Blocked",
  AddFriend = "AddFriend",
}

export type FriendsTab = {
  key: FriendsTabEnum;
  title: string;
  name?: string;
  status?: UserStatuses[];
  empty: {
    imageSrc: string;
    imageAlt: string;
    text: string;
  };
};
const FRIENDS_EMPTY_PROP = {
  imageSrc: "/zero-friends.svg",
  imageAlt: "No friends found",
  text: "Oops seems you don't have any friends :(",
};

export const friendsTabsProps: Record<
  FriendsTabEnum,
  Readonly<FriendsTab>
> = Object.freeze({
  [FriendsTabEnum.Available]: {
    key: FriendsTabEnum.Available,
    title: "Online",
    status: [
      UserStatuses.Online,
      UserStatuses.DND,
      UserStatuses.Mobile,
      UserStatuses.Idle,
    ],
    empty: FRIENDS_EMPTY_PROP,
  },
  [FriendsTabEnum.All]: {
    key: FriendsTabEnum.All,
    title: "All your Friends",
    name: "All",
    status: Object.values(UserStatuses),
    empty: FRIENDS_EMPTY_PROP,
  },
  [FriendsTabEnum.Pending]: {
    key: FriendsTabEnum.Pending,
    title: "Pending",
    empty: {
      imageSrc: "/zero-friends.svg",
      imageAlt: "No friend requests",
      text: "Looks like no one requested to be your friend :(",
    },
  },
  [FriendsTabEnum.Blocked]: {
    key: FriendsTabEnum.Blocked,
    title: "Blocked",
    empty: {
      imageSrc: "/zero-friends.svg",
      imageAlt: "No blocked friends",
      text: "You haven't blocked anyone :)",
    },
  },
  [FriendsTabEnum.AddFriend]: {
    key: FriendsTabEnum.AddFriend,
    title: "Add a Friend",
    empty: FRIENDS_EMPTY_PROP,
  },
});
