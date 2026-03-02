import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("admin_session");
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/block")) {
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/block", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
