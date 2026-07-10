"use client"

import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { ProductCard } from "@/components/ui/product-card"
import { featuredProducts } from "@/lib/data/products"

export function FeaturedProducts() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          title="Featured Teas"
          subtitle="Our carefully curated selection of premium Kenyan wellness teas."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
