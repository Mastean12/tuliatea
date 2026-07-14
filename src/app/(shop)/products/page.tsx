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
      <section className="border-b bg-gradient-to-b from-background to-primary/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <nav className="mb-3 text-xs text-muted-foreground/50">
            <span className="hover:text-foreground transition-colors cursor-default">
              Home
            </span>
            <span className="mx-1.5">/</span>
            <span className="text-foreground/70">Shop</span>
          </nav>
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-primary">
            Our Collection
          </h1>
          <p className="mt-1 max-w-lg text-sm text-muted-foreground/70 leading-relaxed">
            Discover handcrafted Kenyan specialty teas and herbal infusions.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <ProductsPageClient />
      </div>
    </div>
  )
}
