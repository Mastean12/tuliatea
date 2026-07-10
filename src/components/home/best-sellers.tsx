"use client"

import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { ProductCard } from "@/components/ui/product-card"
import { bestSellers } from "@/lib/data/products"

export function BestSellers() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          title="Best Sellers"
          subtitle="Discover the teas our customers love most."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              variant="compact"
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
