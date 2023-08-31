import { createClient } from "@supabase/supabase-js";
import { Database } from "../db/database.types";

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string,
);

export default supabaseAdmin;
