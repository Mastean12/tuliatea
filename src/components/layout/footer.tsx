import Link from "next/link"
import Image from "next/image"
import { Mail, Camera, MessageCircle } from "lucide-react"
import { Container } from "@/components/ui/container"
import { siteConfig } from "@/config/site"
import { routes } from "@/config/routes"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t bg-gradient-to-b from-primary/[0.04] via-secondary/[0.03] to-background">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href={routes.home}
              className="flex items-center gap-3 font-heading"
            >
              <Image
                src="/images/Tulliatealogo.png"
                alt="Tullia Tea"
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="text-primary tracking-wider">
                <strong className="font-extrabold">Tullia</strong>{" "}
                <span className="font-normal">Tea</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-muted-foreground/80 max-w-sm">
              Tullia Tea is the signature brand of Rectangular Foods, crafting
              premium Kenyan specialty teas and herbal infusions using
              sustainably sourced, preservative-free ingredients to elevate
              everyday wellness.
            </p>
            <div className="flex gap-2.5 pt-1">
              <a
                href={`https://instagram.com/${siteConfig.social.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-primary/70 hover:bg-primary hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Camera className="h-3.5 w-3.5" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.social.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-primary/70 hover:bg-primary hover:text-white transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-primary/70 hover:bg-primary hover:text-white transition-all"
                aria-label="Email"
              >
                <Mail className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs text-muted-foreground/70">
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

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
              Support
            </h3>
            <ul className="space-y-2.5 text-xs text-muted-foreground/70">
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
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
              Products
            </h3>
            <ul className="space-y-2.5 text-xs text-muted-foreground/70">
              <li>
                <Link
                  href={`${routes.products}?category=green-tea`}
                  className="hover:text-primary transition-colors"
                >
                  Green Tea
                </Link>
              </li>
              <li>
                <Link
                  href={`${routes.products}?category=purple-tea`}
                  className="hover:text-primary transition-colors"
                >
                  Purple Tea
                </Link>
              </li>
              <li>
                <Link
                  href={`${routes.products}?category=herbal-infusion`}
                  className="hover:text-primary transition-colors"
                >
                  Herbal Infusions
                </Link>
              </li>
              <li>
                <Link
                  href={`${routes.products}?category=honey`}
                  className="hover:text-primary transition-colors"
                >
                  Honey
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact row */}
        <div className="mt-10 pt-6 border-t border-primary/5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground/60">
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-primary transition-colors"
              >
                {siteConfig.contact.email}
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="hover:text-primary transition-colors"
              >
                {siteConfig.contact.phone}
              </a>
              <span>{siteConfig.contact.address}</span>
            </div>
            <p>&copy; {year} Rectangular Foods. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
