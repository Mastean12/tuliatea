"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { aboutContent } from "@/lib/data/content"
import { Leaf } from "lucide-react"

export function AboutHero() {
  const { hero } = aboutContent

  return (
    <section className="relative flex min-h-[50vh] items-center overflow-hidden border-b bg-gradient-to-b from-background via-primary/[0.02] to-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(45,106,79,0.06)_0%,transparent_60%)]" />

      <Container className="relative z-10 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex justify-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Leaf className="h-7 w-7 text-primary" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </Container>
    </section>
  )
}
