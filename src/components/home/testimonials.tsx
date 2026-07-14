"use client"

import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import { testimonials } from "@/lib/data/testimonials"

export function Testimonials() {
  return (
    <section className="bg-warm-sand py-12 sm:py-16">
      <Container>
        <SectionHeading
          title="What Our Customers Say"
          subtitle="Hear from tea lovers who have made Tullia Tea part of their daily ritual."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.id}
              name={t.name}
              location={t.location}
              avatar={t.avatar}
              rating={t.rating}
              text={t.text}
              isSample={t.isSample}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
