"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag, Menu, X, Leaf } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { routes } from "@/config/routes"

const navLinks = [
  { title: "Home", href: routes.home },
  { title: "Shop", href: routes.products },
  { title: "About", href: routes.static.about },
  { title: "Contact", href: routes.static.contact },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href={routes.home}
            className="flex items-center gap-2 font-heading text-xl font-semibold tracking-tight"
          >
            <Leaf className="h-6 w-6 text-primary" />
            Tullia Tea
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.title}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={routes.cart}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-5 w-5" />
            </Link>

            {session?.user ? (
              <div className="hidden items-center gap-2 sm:flex">
                <Link href={routes.account.root}>
                  <Button variant="ghost" size="sm">
                    Account
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href={routes.auth.login} className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
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
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
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
                  <Link
                    href={routes.account.root}
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    Account
                  </Link>
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
  )
}
