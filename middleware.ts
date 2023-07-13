import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const userToken = req.cookies.get("token")?.value;
  // Skip if the request is for the login, signup or forgot-password pages
  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password"
  ) {
    if (!userToken) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
  // Redirect to login if no user token
  if (!userToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // User logged in, redirect to dashboard if trynna go to login page
  // TODO: Add user token validation
  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (image files)
     * - icons (icon files)
     * - locales (locales files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|icons|locales).*)",
  ],
};
