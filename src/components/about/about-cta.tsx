"use client"

import { Container } from "@/components/ui/container"
import { CTABanner } from "@/components/ui/cta-banner"
import { aboutContent } from "@/lib/data/content"
import { routes } from "@/config/routes"

export function AboutCTA() {
  const { cta } = aboutContent

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <CTABanner
          title={cta.title}
          subtitle={cta.subtitle}
          primaryCta={{ label: cta.ctaPrimary, href: routes.products }}
        />
      </Container>
    </section>
  )
}
