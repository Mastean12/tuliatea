"use client"

import { motion } from "framer-motion"
import { aboutContent } from "@/lib/data/content"

export function AboutHero() {
  const { hero } = aboutContent

  return (
    <section className="relative overflow-hidden min-h-[50vh] sm:min-h-[55vh] flex items-center">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&h=900&fit=crop&auto=format"
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.45)" }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl text-white"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-xl text-base sm:text-lg text-white/80 leading-relaxed"
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
