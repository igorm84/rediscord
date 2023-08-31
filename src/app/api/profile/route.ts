import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Database } from "@/lib/db/database.types";
import supabaseAdmin from "@/lib/supabase/admin";
import { profileSchema } from "@/lib/validation/profile";

export async function PATCH(request: Request) {
  try {
    const res = await request.json();
    const supabase = createServerComponentClient<Database>({ cookies });
    const user = await supabase.auth.getUser();

    if (user?.data?.user?.id) {
      const parsed = profileSchema.partial().safeParse(res);

      if (parsed.success) {
        // check username before patch
        if (parsed.data.username) {
          const { data: isUsernameAvailable } = await supabase.rpc(
            "is_username_available",
            {
              new_username: parsed.data.username,
              ignored_id: user.data.user.id,
            },
          );
          if (!isUsernameAvailable) {
            return NextResponse.json(
              { error: "Username is not available" },
              { status: 400 },
            );
          }
        }

        // patch directly using supabase admin
        const result = await supabaseAdmin
          .from("profiles")
          .update({ ...parsed.data, updated_at: new Date().toISOString() })
          .eq("id", user.data.user.id);
        if (result.error) {
          throw result.error;
        } else {
          return NextResponse.json({});
        }
      } else {
        return NextResponse.json(
          {
            error: parsed.error,
          },
          { status: 400 },
        );
      }
    } else {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 },
    );
  }
}
