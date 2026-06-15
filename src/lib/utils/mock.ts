import { User, StaticUserStatuses } from "@/lib/entities/user";
import { ActivityTypes } from "@/lib/entities/activity";
import { ListedServer } from "../entities/server";
import { ListedDMChannel } from "../entities/channel";

export const MOCK_DELAY = 1000;
export const MOCK_FRIENDS = 18;
export const MOCK_CHANNELS = 18;
export const MOCK_SERVERS = 18;

const previewActivity = {
  type: ActivityTypes.Playing,
  name: "Dead by Daylight",
  since: new Date("2026-01-01T12:00:00.000Z"),
};

export const PREVIEW_CURRENT_USER: User = {
  id: "100000000000000001",
  name: "Repeep",
  avatar: "https://avatars.githubusercontent.com/u/16727448?v=4",
  status: StaticUserStatuses.DND,
  username: "Reepep",
};

export const PREVIEW_CHANNELS: ListedDMChannel[] = [
  {
    id: "100000000000000101",
    name: "Avery Stone",
    username: "avery",
    avatar: "https://i.pravatar.cc/96?img=1",
    status: StaticUserStatuses.Online,
    activity: previewActivity,
  },
  {
    id: "100000000000000102",
    name: "Maya Chen",
    username: "maya",
    avatar: "https://i.pravatar.cc/96?img=5",
    status: StaticUserStatuses.Idle,
  },
  {
    id: "100000000000000103",
    name: "Theo Brooks",
    username: "theob",
    avatar: "https://i.pravatar.cc/96?img=8",
    status: StaticUserStatuses.DND,
  },
  {
    id: "100000000000000104",
    name: "Noah Silva",
    username: "noah",
    avatar: "https://i.pravatar.cc/96?img=12",
    status: StaticUserStatuses.Online,
  },
  {
    id: "100000000000000105",
    name: "Iris Morgan",
    username: "iris",
    avatar: "https://i.pravatar.cc/96?img=16",
    status: StaticUserStatuses.Offline,
  },
  {
    id: "100000000000000106",
    name: "Kai Rivera",
    username: "kai",
    avatar: null,
    status: StaticUserStatuses.Mobile,
  },
  {
    id: "100000000000000107",
    name: "Lena Park",
    username: "lena",
    avatar: "https://i.pravatar.cc/96?img=21",
    status: StaticUserStatuses.Online,
  },
  {
    id: "100000000000000108",
    name: "Sam Taylor",
    username: "sam",
    avatar: "https://i.pravatar.cc/96?img=24",
    status: StaticUserStatuses.Idle,
  },
  {
    id: "100000000000000109",
    name: "Nora Fields",
    username: "nora",
    avatar: "https://i.pravatar.cc/96?img=28",
    status: StaticUserStatuses.Online,
  },
  {
    id: "100000000000000110",
    name: "Ezra King",
    username: "ezra",
    avatar: "https://i.pravatar.cc/96?img=31",
    status: StaticUserStatuses.Offline,
  },
  {
    id: "100000000000000111",
    name: "Piper Lane",
    username: "piper",
    avatar: "https://i.pravatar.cc/96?img=35",
    status: StaticUserStatuses.DND,
  },
  {
    id: "100000000000000112",
    name: "Miles Reed",
    username: "miles",
    avatar: "https://i.pravatar.cc/96?img=38",
    status: StaticUserStatuses.Online,
  },
  {
    id: "100000000000000113",
    name: "June Carter",
    username: "june",
    avatar: "https://i.pravatar.cc/96?img=41",
    status: StaticUserStatuses.Mobile,
  },
  {
    id: "100000000000000114",
    name: "Owen Price",
    username: "owen",
    avatar: "https://i.pravatar.cc/96?img=44",
    status: StaticUserStatuses.Idle,
  },
  {
    id: "100000000000000115",
    name: "Sage Bell",
    username: "sage",
    avatar: "https://i.pravatar.cc/96?img=47",
    status: StaticUserStatuses.Offline,
  },
  {
    id: "100000000000000116",
    name: "Rowan Hart",
    username: "rowan",
    avatar: "https://i.pravatar.cc/96?img=50",
    status: StaticUserStatuses.Online,
  },
  {
    id: "100000000000000117",
    name: "Tessa Vale",
    username: "tessa",
    avatar: "https://i.pravatar.cc/96?img=53",
    status: StaticUserStatuses.DND,
  },
  {
    id: "100000000000000118",
    name: "Cole Nash",
    username: "cole",
    avatar: "https://i.pravatar.cc/96?img=56",
    status: StaticUserStatuses.Idle,
  },
];

export const PREVIEW_SERVERS: ListedServer[] = Array.from(
  { length: MOCK_SERVERS },
  (_, index) => ({
    id: `200000000000000${String(index + 1).padStart(3, "0")}`,
    name: [
      "Design Dock",
      "Pixel Lab",
      "Night Shift",
      "Shipyard",
      "Arcade",
      "Frontend Guild",
      "Studio",
      "Launch Pad",
      "Makers",
      "Music Room",
      "Game Night",
      "Workspace",
      "Study Hall",
      "Dev Lounge",
      "Creators",
      "Watch Party",
      "Cafe",
      "Archive",
    ][index],
    photo: `https://picsum.photos/seed/rediscord-server-${index + 1}/64/64`,
    messages: index === 0 ? 3 : undefined,
  }),
);

export const PREVIEW_FRIENDS: User[] = PREVIEW_CHANNELS.map((channel) => ({
  ...channel,
  bio: `${channel.name} is part of the static Rediscord preview dataset.`,
  type: "user",
}));

export const PREVIEW_FRIEND_REQUESTS: User[] = [
  {
    id: "300000000000000001",
    name: "Quinn Frost",
    username: "quinn",
    avatar: "https://i.pravatar.cc/96?img=59",
    status: StaticUserStatuses.Online,
    bio: "Waiting on your reply.",
    type: "user",
  },
  {
    id: "300000000000000002",
    name: "Riley Fox",
    username: "riley",
    avatar: "https://i.pravatar.cc/96?img=62",
    status: StaticUserStatuses.Idle,
    bio: "Sent a friend request.",
    type: "user",
  },
  {
    id: "300000000000000003",
    name: "Alex Moon",
    username: "alex",
    avatar: "https://i.pravatar.cc/96?img=65",
    status: StaticUserStatuses.DND,
    bio: "Sent a friend request.",
    type: "user",
  },
  {
    id: "300000000000000004",
    name: "Harper West",
    username: "harper",
    avatar: "https://i.pravatar.cc/96?img=68",
    status: StaticUserStatuses.Offline,
    bio: "Sent a friend request.",
    type: "user",
  },
  {
    id: "300000000000000005",
    name: "Finley Lake",
    username: "finley",
    avatar: "https://i.pravatar.cc/96?img=70",
    status: StaticUserStatuses.Mobile,
    bio: "Sent a friend request.",
    type: "user",
  },
  {
    id: "300000000000000006",
    name: "Sky Blake",
    username: "sky",
    avatar: "https://i.pravatar.cc/96?img=72",
    status: StaticUserStatuses.Online,
    bio: "Sent a friend request.",
    type: "user",
  },
];

export const PREVIEW_SERVER_CHANNELS: ListedDMChannel[] = PREVIEW_SERVERS.map(
  (server, index) => ({
    id: server.id,
    name: server.name,
    username: server.name.toLowerCase().replaceAll(" ", "-"),
    avatar: server.photo,
    status:
      index % 3 === 0
        ? StaticUserStatuses.Online
        : index % 3 === 1
          ? StaticUserStatuses.Idle
          : StaticUserStatuses.Offline,
    activity: index === 0 ? previewActivity : undefined,
  }),
);

export const PREVIEW_STATIC_PARAMS = [
  ...PREVIEW_CHANNELS,
  ...PREVIEW_SERVER_CHANNELS,
].map((channel) => ({ id: channel.id }));

export const getPreviewChannelById = (id: string) =>
  [...PREVIEW_CHANNELS, ...PREVIEW_SERVER_CHANNELS].find(
    (channel) => channel.id === id,
  );

export const generateFakeCurrentUser = () => PREVIEW_CURRENT_USER;

export const generateRandomFakeChannels = (length: number): ListedDMChannel[] =>
  PREVIEW_CHANNELS.slice(0, length);

export const generateRandomFakeServers = (length: number): ListedServer[] =>
  PREVIEW_SERVERS.slice(0, length);

export const generateRandomFakeUsers = (length: number): User[] =>
  PREVIEW_FRIENDS.slice(0, length);

export const getRandomUserById = (id: string) => getPreviewChannelById(id);
