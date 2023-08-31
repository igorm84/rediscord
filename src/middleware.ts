import { Database } from "@/lib/db/database.types";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const session = await supabase.auth.getSession();

  console.warn("middleware", req.nextUrl.pathname);
  if (
    req.nextUrl.pathname === "/logout" ||
    (session.data.session && !session.data.session.user)
  ) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!session.data.session) {
    return NextResponse.redirect(new URL("/login?f=" + req.url, req.url));
  }

  return res;
}
export const config = {
  matcher: ["/", "/channels/me", "/channels/:path", "/logout"],
};

// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   async function middleware(req) {
//     const token = req.nextauth.token;
//     if (token) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   },
//   {
//     callbacks: {
//       async authorized() {
//         return true;
//       },
//     },
//   },
// );

// export const config = {
//   matcher: ["/channels/:param", "/channels/me"],
// };
