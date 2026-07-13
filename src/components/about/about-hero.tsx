"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { aboutContent } from "@/lib/data/content"

export function AboutHero() {
  const { hero } = aboutContent

  return (
    <section className="relative border-b bg-gradient-to-b from-background via-primary/[0.02] to-background">
      <Container className="py-10 sm:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </Container>
    </section>
  )
}
