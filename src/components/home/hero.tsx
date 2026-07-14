"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { routes } from "@/config/routes"
import { homeContent } from "@/lib/data/content"
import { Leaf } from "lucide-react"

export function Hero() {
  const { hero } = homeContent

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1600&h=1000&fit=crop&auto=format"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />

      <Container className="relative z-10 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 flex items-center justify-center gap-2"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
              <Leaf className="h-3 w-3 text-white" />
            </span>
            <span className="text-[11px] font-semibold text-white/90 uppercase tracking-[0.2em]">
              Premium Kenyan Wellness Tea
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href={routes.products}>
              <Button
                size="lg"
                className="px-8 bg-white text-primary hover:bg-white/90 shadow-xl border-0"
              >
                {hero.ctaPrimary}
              </Button>
            </Link>
            <Link href={routes.static.about}>
              <Button
                size="lg"
                variant="outline"
                className="px-8 border-2 border-white/40 text-white hover:bg-white/15 bg-transparent"
              >
                {hero.ctaSecondary}
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
