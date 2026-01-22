import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }

    try {
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

      if (decoded.role !== "admin") {
        return NextResponse.redirect(
          new URL("/", req.url)
        );
      }
    } catch (err) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
