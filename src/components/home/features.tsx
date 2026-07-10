"use client"

import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { FeatureCard } from "@/components/ui/feature-card"
import { homeContent } from "@/lib/data/content"

export function Features() {
  const { features } = homeContent

  return (
    <section className="border-t bg-muted/30 py-20 sm:py-28">
      <Container>
        <SectionHeading title={features.title} subtitle={features.subtitle} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.items.map((item, i) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon as "leaf" | "heart" | "globe" | "shield"}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
