import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/ui/container"
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
    <div className="py-8 sm:py-12">
      <Container>
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Our Collection
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover premium Kenyan wellness teas and herbal infusions.
          </p>
        </div>

        <ProductsPageClient />
      </Container>
    </div>
  )
}
