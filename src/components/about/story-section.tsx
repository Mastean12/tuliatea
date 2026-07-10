"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { aboutContent } from "@/lib/data/content"

export function StorySection() {
  const { story, mission, vision } = aboutContent

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading title={story.title} subtitle={story.subtitle} />

          <div className="space-y-5">
            {story.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border bg-card p-8"
            >
              <h3 className="font-heading mb-3 text-xl font-semibold">
                {mission.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {mission.body}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border bg-card p-8"
            >
              <h3 className="font-heading mb-3 text-xl font-semibold">
                {vision.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {vision.body}
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
