"use client"

import { motion } from "framer-motion"
import { aboutContent } from "@/lib/data/content"

export function AboutHero() {
  const { hero } = aboutContent

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-secondary/5 to-background min-h-[50vh] flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(46,125,50,0.08)_0%,transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(198,155,60,0.06)_0%,transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
