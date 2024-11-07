import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const auth = request.cookies.get("sheetUrl");
  const geo = request.geo;

  if (geo === null || geo === undefined) {
    return NextResponse.next();
  }

  if (auth === null || auth === undefined) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("X-Geo-Country", geo.country || "unknown");
  response.headers.set("X-Geo-Region", geo.region || "unknown");
  response.headers.set("X-Geo-City", geo.city || "unknown");

  return response;
}

export const config = {
  matcher: ["/dashboard", "/metrics", "/settings"],
};
