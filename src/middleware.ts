import { auth } from "@/auth";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/driver/register", "/login", "/post-login"];

export default auth((req) => {
  const { nextUrl } = req;
  const path = nextUrl.pathname;
  const isLoggedIn = !!req.auth;
  const role = (req.auth?.user as { role?: string } | undefined)?.role;

  if (PUBLIC_PATHS.some((p) => path === p || path.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  if ((path === "/" || path.startsWith("/driver")) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (path.startsWith("/driver") && role !== "driver" && role !== "admin") {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icons|manifest.json|sw.js|offline.html).*)"],
};
