import Link from "next/link"
import { Leaf, Mail, Phone, MapPin } from "lucide-react"
import { Container } from "@/components/ui/container"
import { siteConfig } from "@/config/site"
import { routes } from "@/config/routes"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t bg-muted/30">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link
              href={routes.home}
              className="flex items-center gap-2 font-heading text-lg font-semibold"
            >
              <Leaf className="h-5 w-5 text-primary" />
              {siteConfig.name}
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Premium Kenyan wellness teas crafted for your daily ritual.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href={routes.home}
                  className="transition-colors hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={routes.products}
                  className="transition-colors hover:text-foreground"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href={routes.static.about}
                  className="transition-colors hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={routes.static.contact}
                  className="transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href={routes.static.blog}
                  className="transition-colors hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href={routes.legal.shipping}
                  className="transition-colors hover:text-foreground"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href={routes.legal.returns}
                  className="transition-colors hover:text-foreground"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href={routes.legal.privacy}
                  className="transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href={routes.legal.terms}
                  className="transition-colors hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href={routes.static.faq}
                  className="transition-colors hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="transition-colors hover:text-foreground"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                {siteConfig.contact.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href={routes.legal.privacy}
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href={routes.legal.terms}
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
