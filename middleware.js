import { NextResponse } from "next/server";
import { auth } from "./auth";


export async function middleware(req) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  if (pathname === "/login" && session?.user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/account") && !session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname === "/cabins/thankyou" && !session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/account/:path*", "/cabins/thankyou"],
};
