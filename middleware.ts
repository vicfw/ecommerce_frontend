import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

// Define your protected routes
const protectedRoutes = ["/payment", "/profile", "/shipping"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";

  let response: NextResponse;

  // Check if the requested path is in the protectedRoutes array
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // Check for the existence of the userInfo cookie
    const userInfo = request.cookies.get("userInfo");

    // If the userInfo cookie doesn't exist, redirect to the login page
    if (!userInfo) {
      response = NextResponse.redirect(new URL("/register", request.url));
    } else {
      response = NextResponse.next();
    }
  } else {
    // If it's not a protected route, continue to the requested page
    response = NextResponse.next();
  }

  // Set the viewport cookie on the response
  response.cookies.set("viewport", viewport);

  return response;
}

// Optional: Configure on which routes the middleware should run
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
