import { faker } from "@faker-js/faker";
import { User, StaticUserStatuses } from "@/lib/entities/user";
import { Activity, ActivityTypes } from "@/lib/entities/activity";
import { ListedServer } from "../entities/server";
import { ListedDMChannel } from "../entities/channel";

export const MOCK_DELAY = 2000;
export const MOCK_FRIENDS = 18;
export const MOCK_CHANNELS = 18;
export const MOCK_SERVERS = 18;

const generateRandomDiscordID = () =>
  faker.number.int({ min: 100000000000000, max: 999999999999999 }).toString();

export const generateFakeCurrentUser = () => ({
  id: generateRandomDiscordID(),
  name: "Repeep",
  avatar: "https://avatars.githubusercontent.com/u/16727448?v=4",
  status: StaticUserStatuses.DND,
  username: "Reepep",
});

const generatePastHoursDate = (hours: number) =>
  new Date(Date.now() - hours * 60 * 60 * 1000);

const currentActivity: Activity = {
  type: ActivityTypes.Playing,
  name: "Dead by Daylight",
  since: generatePastHoursDate(5),
};

export const generateRandomFakeChannels = (length: number): ListedDMChannel[] =>
  Array.from({ length }, (_, i) => ({
    id: generateRandomDiscordID(),
    status:
      i === 0
        ? StaticUserStatuses.Online
        : faker.helpers.arrayElement(Object.values(StaticUserStatuses)),
    name: faker.person.fullName(),
    avatar: i === 6 ? undefined : faker.image.avatarGitHub(),
    activity: i === 0 ? currentActivity : undefined,
    username: faker.internet.userName().toLowerCase(),
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
  Array.from({ length }, (_, i) => ({
    id: generateRandomDiscordID(),
    name: faker.person.fullName(),
    username: faker.internet.userName().toLowerCase(),
    bio: faker.lorem.paragraph(),
    avatar: faker.image.avatarGitHub(),
    status: faker.helpers.arrayElement(Object.values(StaticUserStatuses)),
    activity: i === 0 ? currentActivity : undefined,
    type: "user",
  }));

export const getRandomUserById = (id: string) => {
  return { ...generateRandomFakeUsers(1)[0], id };
};
