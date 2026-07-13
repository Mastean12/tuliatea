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
    <section className="relative flex min-h-[75vh] items-center overflow-hidden bg-gradient-to-b from-background via-primary/[0.03] to-background">
      <Container className="relative z-10 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 flex items-center justify-center gap-2"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
              <Leaf className="h-3.5 w-3.5 text-primary" />
            </span>
            <span className="text-xs font-medium text-primary uppercase tracking-widest">
              Premium Kenyan Wellness Tea
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href={routes.products}>
              <Button size="lg" className="px-8">
                {hero.ctaPrimary}
              </Button>
            </Link>
            <Link href={routes.static.about}>
              <Button size="lg" variant="outline" className="px-8">
                {hero.ctaSecondary}
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
