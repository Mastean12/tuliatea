"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { homeContent } from "@/lib/data/content"
import { Leaf } from "lucide-react"

export function OurPromise() {
  const { promise } = homeContent

  return (
    <section className="border-t bg-primary/[0.02] py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex justify-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
          </motion.div>

          <SectionHeading title={promise.title} subtitle={promise.subtitle} />

          <div className="space-y-5 text-left sm:text-center">
            {promise.paragraphs.map((paragraph, i) => (
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
        </div>
      </Container>
    </section>
  )
}
