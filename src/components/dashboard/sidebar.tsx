"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import Image from "next/image"
import {
  LayoutDashboard,
  User,
  Package,
  MapPin,
  Lock,
  Heart,
  LogOut,
  X,
  Menu,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { routes } from "@/config/routes"

const sidebarLinks = [
  { label: "Dashboard", href: routes.account.root, icon: LayoutDashboard },
  { label: "My Profile", href: `${routes.account.root}/profile`, icon: User },
  { label: "My Orders", href: routes.account.orders, icon: Package },
  { label: "Addresses", href: routes.account.addresses, icon: MapPin },
  {
    label: "Change Password",
    href: `${routes.account.root}/password`,
    icon: Lock,
  },
  { label: "Wishlist", href: `${routes.account.root}/wishlist`, icon: Heart },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-20 z-30 flex h-9 w-9 items-center justify-center rounded-lg border bg-background shadow-sm lg:hidden"
        aria-label="Open dashboard menu"
      >
        <Menu className="h-4 w-4" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 border-r bg-background transition-all duration-300 lg:sticky lg:top-16 lg:z-0 lg:h-[calc(100vh-4rem)]",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          <div
            className={cn(
              "flex items-center border-b",
              collapsed
                ? "justify-center px-0 py-4"
                : "justify-between px-4 py-4"
            )}
          >
            {!collapsed && (
              <Link
                href={routes.account.root}
                className="flex items-center gap-2 font-heading font-semibold"
              >
                <Image
                  src="/images/Tulliatealogo.png"
                  alt="Tullia Tea"
                  width={22}
                  height={22}
                  className="h-5 w-5 shrink-0"
                />
                <span>Dashboard</span>
              </Link>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/50 hover:text-foreground hover:bg-muted transition-colors"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <PanelLeft className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex lg:hidden h-7 w-7 items-center justify-center rounded-md text-muted-foreground/50 hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-2">
            {sidebarLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg text-sm font-medium transition-colors",
                    collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                  title={collapsed ? link.label : undefined}
                >
                  <link.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{link.label}</span>}
                </Link>
              )
            })}
          </nav>

          <div className={cn("border-t", collapsed ? "p-2" : "p-3")}>
            <button
              onClick={async () => {
                await signOut({ redirect: false })
                window.location.href = routes.home
              }}
              className={cn(
                "flex items-center gap-3 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted w-full",
                collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5"
              )}
              title={collapsed ? "Sign Out" : undefined}
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {!collapsed && <span>Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
