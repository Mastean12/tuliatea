"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { FeatureCard } from "@/components/ui/feature-card"
import { aboutContent } from "@/lib/data/content"

export function ValuesSection() {
  const { values, sustainability } = aboutContent

  return (
    <section className="border-t bg-muted/30 py-20 sm:py-28">
      <Container>
        <SectionHeading title={values.title} subtitle={values.subtitle} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.items.map((item, i) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={
                ["shield", "globe", "heart", "leaf"][i] as
                  "shield" | "globe" | "heart" | "leaf"
              }
              index={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-16 max-w-2xl rounded-2xl border bg-card p-8 text-center"
        >
          <h3 className="font-heading mb-3 text-xl font-semibold">
            {sustainability.title}
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            {sustainability.body}
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
