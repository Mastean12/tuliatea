"use client"

import { Container } from "@/components/ui/container"
import { CTABanner } from "@/components/ui/cta-banner"
import { homeContent } from "@/lib/data/content"
import { routes } from "@/config/routes"

export function HomeCTA() {
  const { cta } = homeContent

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <CTABanner
          title={cta.title}
          subtitle={cta.subtitle}
          primaryCta={{ label: cta.ctaPrimary, href: routes.products }}
          secondaryCta={{
            label: cta.ctaSecondary,
            href: routes.static.contact,
          }}
        />
      </Container>
    </section>
  )
}
