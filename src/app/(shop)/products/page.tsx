import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { ProductsPageClient } from "./products-page-client"

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse our collection of premium Kenyan wellness teas and herbal infusions. Discover green tea, purple tea, herbal blends, and pure honey.",
  openGraph: {
    title: `Shop | ${siteConfig.name}`,
    description:
      "Browse our collection of premium Kenyan wellness teas and herbal infusions.",
  },
}

export default function ProductsPage() {
  return (
    <div>
      <section className="relative border-b bg-gradient-to-b from-background to-primary/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <nav className="mb-4 text-xs text-muted-foreground/60">
            <span className="hover:text-foreground transition-colors cursor-default">
              Home
            </span>
            <span className="mx-1.5">/</span>
            <span className="text-foreground/80">Shop</span>
          </nav>
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Our Collection
          </h1>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground leading-relaxed">
            Discover handcrafted Kenyan specialty teas and herbal infusions.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <ProductsPageClient />
      </div>
    </div>
  )
}
