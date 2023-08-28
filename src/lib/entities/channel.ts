import { UserStatuses } from "./user";
import { Activity } from "./activity";

export type ListedDMChannel = {
  id: string;
  name: string;
  status: UserStatuses;
  activity?: Activity | null;
  avatar?: string | null;
  username?: string | null;
};
