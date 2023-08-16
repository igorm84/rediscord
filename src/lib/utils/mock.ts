import { faker } from "@faker-js/faker";
import { User, UserStatuses } from "@/lib/entities/user";
import { ActivityTypes } from "@/lib/entities/activity";
import { ListedServer } from "../entities/server";
import { ListedDMChannel } from "../entities/channel";

export const MOCK_DELAY = 2000;

const generateRandomDiscordID = () =>
  faker.number
    .int({ min: 100000000000000000, max: 999999999999999999 })
    .toString();

export const generateFakeCurrentUser = () => ({
  name: "Repeep",
  avatar: "https://avatars.githubusercontent.com/u/16727448?v=4",
  status: UserStatuses.DND,
});

export const generateRandomFakeChannels = (length: number): ListedDMChannel[] =>
  Array.from({ length }, (_, i) => ({
    id: generateRandomDiscordID(),
    status:
      i === 0
        ? UserStatuses.Online
        : faker.helpers.arrayElement(Object.values(UserStatuses)),
    name: faker.person.fullName(),
    avatar: i === 6 ? undefined : faker.image.avatarGitHub(),
    activity:
      i === 0
        ? {
            type: ActivityTypes.Playing,
            name: "Dead by Daylight",
          }
        : undefined,
  }));

export const generateRandomFakeServers = (length: number): ListedServer[] =>
  Array.from({ length }, (_, i) => ({
    id: generateRandomDiscordID(),
    name: faker.animal.cow(),
    photo: faker.image.urlPicsumPhotos({
      width: 64,
      height: 64,
    }),
    messages: i === 0 ? 3 : undefined,
  }));

export const generateRandomFakeUsers = (length: number): User[] =>
  Array.from({ length }, () => ({
    id: generateRandomDiscordID(),
    name: faker.person.fullName(),
    username: faker.internet.userName().toLowerCase(),
    bio: faker.lorem.paragraph(),
    avatar: faker.image.avatarGitHub(),
    status: faker.helpers.arrayElement(Object.values(UserStatuses)),
    type: "user",
  }));
