"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

type AlternatingSectionProps = {
  imageUrl: string
  imageAlt: string
  title: string
  subtitle?: string
  children: React.ReactNode
  reverse?: boolean
  className?: string
}

export function AlternatingSection({
  imageUrl,
  imageAlt,
  title,
  subtitle,
  children,
  reverse,
  className,
}: AlternatingSectionProps) {
  return (
    <section className={cn("py-12 sm:py-16", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid items-center gap-8 sm:gap-12 lg:grid-cols-2",
            reverse && "lg:direction-rtl"
          )}
        >
          <motion.div
            initial={{ opacity: 0, x: reverse ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className={cn(reverse && "lg:order-1")}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reverse ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={cn(reverse && "lg:order-0")}
          >
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm text-muted-foreground max-w-lg">
                  {subtitle}
                </p>
              )}
              <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
