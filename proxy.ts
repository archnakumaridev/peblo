import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;

  const isProtected = pathname.startsWith("/dashboard") || pathname.startsWith("/notes");
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  let valid = false;
  if (token) {
    try {
      await jwtVerify(token, SECRET);
      valid = true;
    } catch {}
  }

  if (isProtected && !valid) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthPage && valid) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/notes/:path*", "/login", "/signup"],
};