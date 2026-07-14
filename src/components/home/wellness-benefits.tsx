"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Sun, Shield, Heart, Moon } from "lucide-react"
import { wellnessBenefits } from "@/lib/data/content"

const iconMap: Record<string, React.ReactNode> = {
  sun: <Sun className="h-5 w-5" />,
  shield: <Shield className="h-5 w-5" />,
  heart: <Heart className="h-5 w-5" />,
  star: <Moon className="h-5 w-5" />,
  moon: <Moon className="h-5 w-5" />,
}

export function WellnessBenefitsSection() {
  return (
    <section className="bg-gradient-to-b from-soft-sage/30 via-background to-soft-sage/30 py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-primary"
          >
            {wellnessBenefits.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-3 text-sm text-muted-foreground"
          >
            {wellnessBenefits.subtitle}
          </motion.p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wellnessBenefits.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="rounded-xl border bg-card p-5 text-center"
            >
              <div className="mb-3 flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  {iconMap[item.icon] || (
                    <Heart className="h-5 w-5 text-accent" />
                  )}
                </div>
              </div>
              <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
