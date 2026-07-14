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
      {/* Background image */}
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
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <Container className="relative z-10 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 flex items-center justify-center gap-2"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
              <Leaf className="h-3.5 w-3.5 text-white" />
            </span>
            <span className="text-xs font-medium text-white/80 uppercase tracking-widest">
              Premium Kenyan Wellness Tea
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-white"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base"
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
              <Button
                size="lg"
                className="px-8 bg-white text-primary hover:bg-white/90 shadow-lg"
              >
                {hero.ctaPrimary}
              </Button>
            </Link>
            <Link href={routes.static.about}>
              <Button
                size="lg"
                variant="outline"
                className="px-8 border-white/30 text-white hover:bg-white/10"
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
