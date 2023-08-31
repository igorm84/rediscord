import { Database } from "../db/database.types";
import { User } from "./user";

export type Friend = Partial<
  Database["public"]["Tables"]["friendships"]["Row"]
> & {
  user?: User;
};
