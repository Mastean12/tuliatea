import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  const session = await auth()
  const { pathname } = new URL(request.url)

  // Protect admin routes — must be ADMIN or SUPER_ADMIN
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      if (
        session?.user &&
        (session.user.role === "ADMIN" || session.user.role === "SUPER_ADMIN")
      ) {
        return NextResponse.redirect(new URL("/admin", request.url))
      }
      return NextResponse.next()
    }

    if (!session?.user) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
    if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

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
