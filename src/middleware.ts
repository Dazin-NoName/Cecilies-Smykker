import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_request: NextRequest) {
  return new NextResponse("This site has been taken down.", {
    status: 410,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "x-robots-tag": "noindex, nofollow, noarchive"
    }
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon-|logo-small-round.png).*)"]
};
