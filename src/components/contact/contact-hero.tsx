"use client"

import { motion } from "framer-motion"
import { contactContent } from "@/lib/data/content"

export function ContactHero() {
  const { hero } = contactContent

  return (
    <section className="bg-gradient-to-b from-secondary/15 via-background to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto"
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
