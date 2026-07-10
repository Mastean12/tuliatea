import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function proxy(request: Request) {
  const session = await auth()
  const { pathname } = new URL(request.url)

  // Protect account routes
  if (pathname.startsWith("/account") && !session?.user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect authenticated users away from auth pages
  if (session?.user && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|icons|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest).*)",
  ],
}
