import { faker } from "@faker-js/faker";
import { UserStatuses } from "@/lib/entities/user";
import { ActivityTypes } from "@/lib/entities/activity";

export const MOCK_DELAY = 2000;
const generateRandomDiscordID = () =>
  faker.number
    .int({ min: 100000000000000000, max: 999999999999999999 })
    .toString();

export const generateFakeCurrentUser = () => ({
  name: "Repeep",
  avatar: faker.internet.avatar(),
  status: UserStatuses.DND,
});

export const generateRandomFakeChannels = (length: number) =>
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

export const generateRandomFakeServers = (length: number) =>
  Array.from({ length }, (_, i) => ({
    id: generateRandomDiscordID(),
    name: faker.animal.cow(),
    photo: faker.image.urlPicsumPhotos({
      width: 64,
      height: 64,
    }),
    messages: i === 0 ? 3 : undefined,
  }));
