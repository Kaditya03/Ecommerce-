import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token)
    return NextResponse.redirect(new URL("/login", req.url));

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    decoded.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
