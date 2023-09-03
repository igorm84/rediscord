import { StaticUserStatuses } from "../entities/user";

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
  status?: StaticUserStatuses[];
  empty: {
    imageSrc: string;
    imageAlt: string;
    text: string;
  };
};
const FRIENDS_EMPTY_PROP = {
  imageSrc: "/NotFoundSearching.svg",
  imageAlt: "No friends found",
  text: "we can't find anyone with that name :(",
};

export const friendsTabsProps: Record<
  FriendsTabEnum,
  Readonly<FriendsTab>
> = Object.freeze({
  [FriendsTabEnum.Available]: {
    key: FriendsTabEnum.Available,
    title: "Online",
    status: [
      StaticUserStatuses.Online,
      StaticUserStatuses.DND,
      StaticUserStatuses.Mobile,
      StaticUserStatuses.Idle,
    ],
    empty: FRIENDS_EMPTY_PROP,
  },
  [FriendsTabEnum.All]: {
    key: FriendsTabEnum.All,
    title: "All your Friends",
    name: "All",
    status: Object.values(StaticUserStatuses),
    empty: FRIENDS_EMPTY_PROP,
  },
  [FriendsTabEnum.Pending]: {
    key: FriendsTabEnum.Pending,
    title: "Pending",
    empty: {
      imageSrc: "/Waiting.svg",
      imageAlt: "No friend requests",
      text: "Looks like no one requested to be your friend :(",
    },
  },
  [FriendsTabEnum.Blocked]: {
    key: FriendsTabEnum.Blocked,
    title: "Blocked",
    empty: {
      imageSrc: "/Waiting.svg",
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
