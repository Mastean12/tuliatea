"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Leaf, Sun, Star } from "lucide-react"
import { ingredientsContent } from "@/lib/data/content"

const iconMap: Record<string, React.ReactNode> = {
  leaf: <Leaf className="h-5 w-5" />,
  sun: <Sun className="h-5 w-5" />,
  star: <Star className="h-5 w-5" />,
}

export function IngredientsSection() {
  return (
    <section className="bg-soft-sage py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-primary"
          >
            {ingredientsContent.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-3 text-sm text-muted-foreground"
          >
            {ingredientsContent.subtitle}
          </motion.p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ingredientsContent.items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="flex items-center gap-4 rounded-xl border bg-card p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                {iconMap[item.icon] || (
                  <Leaf className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
