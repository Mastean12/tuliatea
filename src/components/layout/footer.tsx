import Link from "next/link"
import { Leaf, Mail, Phone, MapPin, Camera, MessageCircle } from "lucide-react"
import { Container } from "@/components/ui/container"
import { siteConfig } from "@/config/site"
import { routes } from "@/config/routes"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t bg-gradient-to-b from-primary/[0.04] via-secondary/[0.03] to-background">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link
              href={routes.home}
              className="flex items-center gap-2 font-heading text-lg font-semibold"
            >
              <Leaf className="h-5 w-5 text-primary" />
              {siteConfig.name}
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground/80">
              {siteConfig.tagline}
            </p>
            <div className="flex gap-2.5 pt-1">
              {siteConfig.social.instagram && (
                <a
                  href={`https://instagram.com/${siteConfig.social.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/5 text-primary/70 hover:bg-primary hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <Camera className="h-4 w-4" />
                </a>
              )}
              {siteConfig.social.whatsapp && (
                <a
                  href={`https://wa.me/${siteConfig.social.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/5 text-primary/70 hover:bg-primary hover:text-white transition-all"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              )}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/5 text-primary/70 hover:bg-primary hover:text-white transition-all"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide text-foreground/80">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground/70">
              <li>
                <Link
                  href={routes.home}
                  className="hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={routes.products}
                  className="hover:text-primary transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href={routes.static.about}
                  className="hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={routes.static.contact}
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide text-foreground/80">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground/70">
              <li>
                <Link
                  href={routes.legal.shipping}
                  className="hover:text-primary transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href={routes.legal.returns}
                  className="hover:text-primary transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href={routes.legal.privacy}
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href={routes.legal.terms}
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide text-foreground/80">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground/70">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary/60" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary/60" />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="hover:text-primary transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-primary/60" />
                {siteConfig.contact.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary/5 flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground/50 sm:flex-row">
          <p>
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href={routes.legal.privacy}
              className="hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href={routes.legal.terms}
              className="hover:text-primary transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
