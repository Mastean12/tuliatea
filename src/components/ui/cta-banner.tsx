"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "./button"

type CTABannerProps = {
  title: string
  subtitle: string
  primaryCta: {
    label: string
    href: string
  }
  secondaryCta?: {
    label: string
    href: string
  }
  variant?: "default" | "simple"
  className?: string
}

export function CTABanner({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  variant: _variant = "default",
  className,
}: CTABannerProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-6 py-16 text-center sm:px-12 sm:py-20",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-2xl space-y-6"
      >
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="text-base leading-relaxed text-primary-foreground/80">
          {subtitle}
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={primaryCta.href}>
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              {primaryCta.label}
            </Button>
          </Link>
          {secondaryCta && (
            <Link href={secondaryCta.href}>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                {secondaryCta.label}
              </Button>
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  )
}
