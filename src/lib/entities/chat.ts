import { UserStatuses } from "@prisma/client";
import { Activity } from "./activity";

export type Chat = {
  id: string;
  name: string;
  status: UserStatuses;
  activity?: Activity | null;
  avatar?: string | null;
};
