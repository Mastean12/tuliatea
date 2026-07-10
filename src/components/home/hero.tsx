"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { routes } from "@/config/routes"
import { homeContent } from "@/lib/data/content"
import { Leaf } from "lucide-react"

export function Hero() {
  const { hero } = homeContent

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-gradient-to-b from-background via-primary/[0.03] to-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,106,79,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(45,106,79,0.05)_0%,transparent_50%)]" />

      <Container className="relative z-10 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 flex items-center justify-center gap-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Leaf className="h-4 w-4 text-primary" />
            </span>
            <span className="text-sm font-medium text-primary uppercase tracking-widest">
              Premium Kenyan Wellness Tea
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href={routes.products}>
              <Button size="lg" className="px-8 text-base">
                {hero.ctaPrimary}
              </Button>
            </Link>
            <Link href={routes.static.about}>
              <Button size="lg" variant="outline" className="px-8 text-base">
                {hero.ctaSecondary}
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>

      <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
