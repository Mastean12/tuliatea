"use client"

import { motion } from "framer-motion"
import { Leaf, Heart, Globe, Shield } from "lucide-react"

const iconMap = {
  leaf: Leaf,
  heart: Heart,
  globe: Globe,
  shield: Shield,
}

type FeatureCardProps = {
  title: string
  description: string
  icon: keyof typeof iconMap
  index?: number
}

export function FeatureCard({
  title,
  description,
  icon,
  index = 0,
}: FeatureCardProps) {
  const Icon = iconMap[icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-heading mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  )
}
