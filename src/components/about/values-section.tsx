"use client"

import { motion } from "framer-motion"
import { Leaf, Shield, Heart, Globe } from "lucide-react"
import { aboutContent } from "@/lib/data/content"

const icons = [Shield, Globe, Heart, Leaf]

export function ValuesSection() {
  const { values, sustainability } = aboutContent

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-primary">
            {values.title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {values.subtitle}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl border bg-card p-5 hover:shadow-sm transition-shadow"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading text-base font-semibold mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 rounded-xl bg-primary/5 border border-primary/10 p-6 sm:p-8 text-center"
        >
          <h3 className="font-heading text-xl font-semibold mb-2">
            {sustainability.title}
          </h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {sustainability.body}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
