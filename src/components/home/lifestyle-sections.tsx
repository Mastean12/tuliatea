"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Leaf, Heart, Shield } from "lucide-react"

const cards = [
  {
    icon: Leaf,
    title: "Our Promise",
    subtitle: "Quality, Wellness, Sustainability",
    body: "At Tullia Tea, we believe wellness begins with what you consume. Every blend starts with the finest ingredients sourced directly from Kenyan farmers who share our commitment to quality.",
  },
  {
    icon: Heart,
    title: "From the Highlands to Your Cup",
    subtitle: "Rooted in Kenya, crafted with care",
    body: "Our journey begins in the fertile highlands of Kenya, where rich volcanic soil and abundant rainfall create the perfect conditions for growing exceptional tea.",
  },
  {
    icon: Shield,
    title: "Handcrafted with Care",
    subtitle: "Pure ingredients, no shortcuts",
    body: "Every blend is handcrafted in small batches to preserve its natural goodness. No artificial additives — just pure ingredients grown in Kenya's fertile highlands.",
  },
]

export function StoryCards() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-primary">
            Why Tullia Tea
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Handcrafted Kenyan specialty teas and herbal infusions.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col rounded-xl border bg-card p-5 hover:shadow-sm transition-shadow"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                <card.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-heading text-base font-semibold mb-1">
                {card.title}
              </h3>
              <p className="text-xs text-muted-foreground/70 mb-2">
                {card.subtitle}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
