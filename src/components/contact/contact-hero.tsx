"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { contactContent } from "@/lib/data/content"

export function ContactHero() {
  const { hero } = contactContent

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {hero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-2 text-sm text-muted-foreground max-w-md"
            >
              {hero.subtitle}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative aspect-[4/3] sm:aspect-[4/3] rounded-xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&h=600&fit=crop&auto=format"
              alt="Premium Kenyan tea served in a glass teapot"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
