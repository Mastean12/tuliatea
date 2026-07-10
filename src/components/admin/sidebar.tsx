"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Menu,
  X,
  Leaf,
  LogOut,
  FileText,
  Settings,
  Image,
  ChevronDown,
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
  { label: "Media", href: "/admin/cms/media", icon: Image },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [cmsOpen, setCmsOpen] = useState(pathname.startsWith("/admin/cms"))

  const isActive = (href: string) =>
    pathname === href || (href !== "/admin" && pathname.startsWith(href + "/"))

  const linkClass = (href: string) =>
    cn(
      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
      isActive(href)
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    )

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
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-4">
            <Link
              href={routes.admin.root}
              className="flex items-center gap-2 font-heading text-lg font-semibold"
            >
              <Leaf className="h-5 w-5 text-primary" />
              Admin
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={linkClass(link.href)}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}

            {/* CMS section */}
            <div className="pt-3">
              <button
                onClick={() => setCmsOpen(!cmsOpen)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <span className="flex items-center gap-3">
                  <FileText className="h-4 w-4" />
                  Content
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
                      <link.icon className="h-3.5 w-3.5" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="border-t p-3 space-y-1">
            <Link
              href={routes.home}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Leaf className="h-4 w-4" /> View Site
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: routes.home })}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
