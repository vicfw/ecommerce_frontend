import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define your protected routes
const protectedRoutes = ["/payment", "profile", "shipping"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the requested path is in the protectedRoutes array
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // Check for the existence of the userInfo cookie
    const userInfo = request.cookies.get("userInfo");

    // If the userInfo cookie doesn't exist, redirect to the login page
    if (!userInfo) {
      return NextResponse.redirect(new URL("/register", request.url));
    }
  }

  // If it's not a protected route or the userInfo cookie exists, continue to the requested page
  return NextResponse.next();
}

// Optional: Configure on which routes the middleware should run
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
