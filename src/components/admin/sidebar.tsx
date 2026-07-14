"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import Image from "next/image"
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Menu,
  X,
  LogOut,
  FileText,
  Settings,
  Image as ImageIcon,
  ChevronDown,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { routes } from "@/config/routes"

const mainLinks = [
  { label: "Dashboard", href: routes.admin.root, icon: LayoutDashboard },
  { label: "Orders", href: routes.admin.orders, icon: ShoppingCart },
  { label: "Products", href: routes.admin.products, icon: Package },
  { label: "Categories", href: routes.admin.categories, icon: Tags },
]

const cmsLinks = [
  { label: "Homepage", href: "/admin/cms/homepage", icon: FileText },
  { label: "About", href: "/admin/cms/about", icon: FileText },
  { label: "Contact", href: "/admin/cms/contact", icon: FileText },
  { label: "Footer", href: "/admin/cms/footer", icon: FileText },
  { label: "Settings", href: "/admin/cms/settings", icon: Settings },
  { label: "Media", href: "/admin/cms/media", icon: ImageIcon },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [cmsOpen, setCmsOpen] = useState(pathname.startsWith("/admin/cms"))

  const isActive = (href: string) =>
    pathname === href || (href !== "/admin" && pathname.startsWith(href + "/"))

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-lg border bg-background shadow-sm lg:hidden"
        aria-label="Open admin menu"
      >
        <Menu className="h-4 w-4" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 border-r bg-background transition-all duration-300 lg:sticky lg:top-0 lg:z-0 lg:h-screen",
          collapsed ? "w-16" : "w-64",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
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
                href={routes.admin.root}
                className="flex items-center gap-2 font-heading text-lg font-semibold"
              >
                <Image
                  src="/images/TulliaTeaLogo.png"
                  alt="Tullia Tea"
                  width={22}
                  height={22}
                  className="h-5 w-5 shrink-0"
                />{" "}
                Admin
              </Link>
            )}
            {collapsed && (
              <Link
                href={routes.admin.root}
                className="flex items-center justify-center"
              >
                <Image
                  src="/images/TulliaTeaLogo.png"
                  alt="Tullia Tea"
                  width={22}
                  height={22}
                  className="h-5 w-5 shrink-0"
                />
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
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-7 w-7"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-2">
            {mainLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
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

            {!collapsed && (
              <div className="pt-3">
                <button
                  onClick={() => setCmsOpen(!cmsOpen)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <FileText className="h-4 w-4" /> Content
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      cmsOpen && "rotate-180"
                    )}
                  />
                </button>
                {cmsOpen && (
                  <div className="ml-3 mt-1 space-y-1 border-l pl-3">
                    {cmsLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive(link.href)
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <link.icon className="h-3.5 w-3.5" /> {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>

          <div
            className={cn(
              "border-t",
              collapsed ? "p-2 space-y-1" : "p-3 space-y-1"
            )}
          >
            {collapsed && (
              <Link
                href="/admin/cms/homepage"
                className="flex items-center justify-center rounded-lg py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title="Content"
              >
                <FileText className="h-4 w-4" />
              </Link>
            )}
            <Link
              href={routes.home}
              className={cn(
                "flex items-center gap-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5"
              )}
              title={collapsed ? "View Site" : undefined}
            >
              <Image
                src="/images/TulliaTeaLogo.png"
                alt=""
                width={16}
                height={16}
                className="h-4 w-4 shrink-0"
              />{" "}
              {!collapsed && <span>View Site</span>}
            </Link>
            <button
              onClick={async () => {
                await signOut({ redirect: false })
                window.location.href = routes.home
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5"
              )}
              title={collapsed ? "Sign Out" : undefined}
            >
              <LogOut className="h-4 w-4 shrink-0" />{" "}
              {!collapsed && <span>Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
