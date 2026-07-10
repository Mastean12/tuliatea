"use client"

import { useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag, Menu, X, Leaf } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { CartSheet } from "@/components/cart/cart-sheet"
import { routes } from "@/config/routes"

const navLinks = [
  { title: "Home", href: routes.home },
  { title: "Shop", href: routes.products },
  { title: "About", href: routes.static.about },
  { title: "Contact", href: routes.static.contact },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const pathname = usePathname()
  const { data: session } = useSession()
  const itemCount = useCart((s) => s.getItemCount())

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/")

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link
              href={routes.home}
              className="flex items-center gap-2 font-heading text-xl font-semibold tracking-tight"
            >
              <Leaf className="h-6 w-6 text-primary" />
              <span className="hidden sm:inline">Tullia Tea</span>
              <span className="sm:hidden">Tullia</span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground/70 hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  {link.title}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground/70 transition-colors hover:text-foreground hover:bg-muted/60"
                aria-label={`Shopping cart${mounted ? ` with ${itemCount} items` : ""}`}
              >
                <ShoppingBag className="h-5 w-5" />
                {mounted && itemCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px] font-medium flex items-center justify-center bg-primary text-primary-foreground">
                    {itemCount > 99 ? "99+" : itemCount}
                  </Badge>
                )}
              </button>

              {session?.user ? (
                <div className="hidden items-center gap-1.5 sm:flex">
                  {session.user.role === "CUSTOMER" ? (
                    <Link href={routes.account.root}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground/70"
                      >
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link href={routes.admin.root}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground/70"
                      >
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="text-muted-foreground/70"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link
                  href={routes.auth.login}
                  className="hidden sm:inline-flex"
                >
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                  >
                    Sign In
                  </Button>
                </Link>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-muted-foreground/70"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </Container>

        {isOpen && (
          <div className="border-t md:hidden">
            <Container className="py-4">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const a = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        a
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {link.title}
                    </Link>
                  )
                })}
                <hr className="my-2" />
                {session?.user ? (
                  <>
                    {session.user.role === "CUSTOMER" ? (
                      <Link
                        href={routes.account.root}
                        onClick={() => setIsOpen(false)}
                        className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        href={routes.admin.root}
                        onClick={() => setIsOpen(false)}
                        className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                      >
                        Admin
                      </Link>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href={routes.auth.login}
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    Sign In
                  </Link>
                )}
              </nav>
            </Container>
          </div>
        )}
      </header>
      <CartSheet isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
