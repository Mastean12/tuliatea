import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  const session = await auth()
  const { pathname } = new URL(request.url)

  // ── Admin routes — ADMIN / SUPER_ADMIN only ──────────
  if (pathname.startsWith("/admin")) {
    // Allow access to admin login page without auth
    if (pathname === "/admin/login") {
      // But redirect already-authenticated admins away from login
      if (
        session?.user &&
        (session.user.role === "ADMIN" || session.user.role === "SUPER_ADMIN")
      ) {
        return NextResponse.redirect(new URL("/admin", request.url))
      }
      return NextResponse.next()
    }

    // All other admin routes require ADMIN role
    if (!session?.user) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
    if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/account", request.url))
    }
    return NextResponse.next()
  }

  // ── Account routes — CUSTOMER only ──────────────────
  if (pathname.startsWith("/account")) {
    // Allow access to login/register pages without auth
    if (pathname === "/account/login" || pathname === "/account/register") {
      // Redirect already-authenticated customers away from auth pages
      if (session?.user && session.user.role === "CUSTOMER") {
        return NextResponse.redirect(new URL("/account", request.url))
      }
      return NextResponse.next()
    }

    // All other account routes require CUSTOMER role
    if (!session?.user) {
      return NextResponse.redirect(new URL("/account/login", request.url))
    }
    // Admins cannot access customer account pages
    if (session.user.role !== "CUSTOMER") {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
    return NextResponse.next()
  }

  // ── Legacy auth pages — redirect to new paths ──────
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/account/login", request.url))
  }
  if (pathname === "/register") {
    return NextResponse.redirect(new URL("/account/register", request.url))
  }

  // ── Customer auth pages — redirect if already authed ──
  if (
    session?.user &&
    (pathname === "/account/login" || pathname === "/account/register")
  ) {
    return NextResponse.redirect(
      session.user.role === "CUSTOMER"
        ? new URL("/account", request.url)
        : new URL("/admin", request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|icons|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest).*)",
  ],
}
