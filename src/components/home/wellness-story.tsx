"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Leaf, Shield, Sun, Heart } from "lucide-react"

const values = [
  {
    icon: Leaf,
    title: "Pure Ingredients",
    desc: "Every blend starts with single-origin Kenyan tea leaves and herbs, grown in rich volcanic soil at high altitude for superior flavor and potency.",
  },
  {
    icon: Shield,
    title: "No Preservatives",
    desc: "We never use artificial additives, flavors, or preservatives. Just pure, natural ingredients — exactly as nature intended.",
  },
  {
    icon: Sun,
    title: "Sun-Kissed Highlands",
    desc: "Our tea gardens benefit from abundant equatorial sunshine and rainfall, producing leaves with exceptional antioxidant profiles.",
  },
  {
    icon: Heart,
    title: "Wellness First",
    desc: "Each blend is designed to nourish both body and mind — from calming evening infusions to energizing morning brews.",
  },
]

export function WellnessStory() {
  return (
    <section className="bg-soft-sage/50 py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Crafted from Nature, Made for Wellness
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto"
          >
            Every cup of Tullia Tea tells a story of Kenyan craftsmanship, pure
            ingredients, and a commitment to your well-being.
          </motion.p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border bg-card p-5"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-heading text-base font-semibold mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
