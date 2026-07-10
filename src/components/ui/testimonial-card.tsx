"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

type TestimonialCardProps = {
  name: string
  location: string
  avatar: string
  rating: number
  text: string
  index?: number
}

export function TestimonialCard({
  name,
  location,
  avatar,
  rating,
  text,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-md"
    >
      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < rating
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted"
            )}
          />
        ))}
      </div>

      <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{text}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3 border-t pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {avatar}
        </div>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{location}</p>
        </div>
      </div>
    </motion.div>
  )
}
