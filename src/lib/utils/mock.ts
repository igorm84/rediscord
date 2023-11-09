import { faker } from "@faker-js/faker";
import { User, UserStatuses } from "@/lib/entities/user";
import { ActivityTypes } from "@/lib/entities/activity";
import { ListedServer } from "../entities/server";
import {
  BsEmojiAngry,
  BsEmojiDizzy,
  BsEmojiKiss,
  BsEmojiNeutral,
  BsEmojiSmile,
  BsEmojiWink,
} from "react-icons/bs";
import { Message } from "../entities/message";
import { Chat } from "../entities/chat";
import { Channel, ChannelGroup } from "../entities/channel";

export const MOCK_DELAY = 2000;
export const MOCK_FRIENDS = 18;
export const MOCK_CHATS = 18;
export const MOCK_SERVERS = 18;

const generateRandomDiscordID = () =>
  faker.number.int({ min: 100000000000000, max: 999999999999999 }).toString();

export const generateFakeCurrentUser = () => ({
  name: "Repeep",
  avatar: "https://avatars.githubusercontent.com/u/16727448?v=4",
  status: UserStatuses.DND,
});

const currentActivity = {
  type: ActivityTypes.Playing,
  name: "Dead by Daylight",
};

export const generateRandomFakeChats = (length: number): Chat[] =>
  Array.from({ length }, (_, i) => ({
    id: generateRandomDiscordID(),
    status:
      i === 0
        ? UserStatuses.Online
        : faker.helpers.arrayElement(Object.values(UserStatuses)),
    name: faker.person.fullName(),
    avatar: i === 6 ? undefined : faker.image.avatarGitHub(),
    activity: i === 0 ? currentActivity : undefined,
  }));

export const generateRandomFakeServers = (length: number): ListedServer[] =>
  Array.from({ length }, (_, i) => ({
    id: generateRandomDiscordID(),
    name: faker.animal.cow(),
    photo: faker.image.urlPicsumPhotos({
      width: 64,
      height: 64,
    }),
    messages: !i ? 3 : undefined,
  }));
export const generateRandomFakeUsers = (length: number): User[] =>
  Array.from({ length }, (_, i) => ({
    id: generateRandomDiscordID(),
    name: faker.person.fullName(),
    username: faker.internet.userName().toLowerCase(),
    bio: faker.lorem.paragraph(),
    avatar: faker.image.avatarGitHub(),
    status: faker.helpers.arrayElement(Object.values(UserStatuses)),
    activity: i === 0 ? currentActivity : undefined,
    type: "user",
  }));

export const generateRandomChannels = (length: number): Channel[] =>
  // @ts-ignore
  Array.from({ length }, () => ({
    id: generateRandomDiscordID(),
    title: faker.word.noun(),
    slug: faker.word.verb(),
    type: Math.random() > 0.5 ? "text" : "voice",
  })).concat([
    {
      id: generateRandomDiscordID(),
      title: "My test",
      slug: "my-test",
      type: "voice",
    },
    {
      id: generateRandomDiscordID(),
      title: "My test 1",
      slug: "my-test-1",
      type: "voice",
    },
  ]);
export const generateRandomChannelGroup = (length: number): ChannelGroup[] =>
  Array.from({ length }, (_, i) => ({
    id: generateRandomDiscordID(),
    title: faker.word.verb(),
    channels: generateRandomChannels(2),
  }));
export const generateRandomFakeMegssages = (length: number): Message[] =>
  Array.from({ length }, (_, i) => ({
    id: generateRandomDiscordID(),
    message: faker.word.sample(),
    authorAvatar: faker.image.avatar(),
    timestamp: Date.now(),
    authorNickname: faker.person.fullName(),
  }));

export const getRandomUserById = (id: string) => {
  return { ...generateRandomFakeUsers(1)[0], id };
};
export const emojiList: React.FC<any>[] = [
  BsEmojiAngry,
  BsEmojiKiss,
  BsEmojiWink,
  BsEmojiSmile,
  BsEmojiNeutral,
  BsEmojiDizzy,
];
export const messageTypes = [
  { type: "emoji", text: "Emoji" },
  { type: "stickers", text: "Stickers" },
  { type: "gif", text: "GIF" },
];
