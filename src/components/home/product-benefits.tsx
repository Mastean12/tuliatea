"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Droplets, Leaf, Heart, Sun, Star, Gift } from "lucide-react"
import { productBenefits, productOfferings } from "@/lib/data/content"

const benefitIcons: Record<string, React.ReactNode> = {
  droplets: <Droplets className="h-5 w-5" />,
  leaf: <Leaf className="h-5 w-5" />,
  heart: <Heart className="h-5 w-5" />,
}

const offeringIcons = [
  <Leaf key="1" className="h-5 w-5" />,
  <Sun key="2" className="h-5 w-5" />,
  <Star key="3" className="h-5 w-5" />,
  <Gift key="4" className="h-5 w-5" />,
]

export function ProductBenefitsSection() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-primary"
          >
            {productBenefits.title}
          </motion.h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 max-w-lg mx-auto">
          {productBenefits.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="text-center"
            >
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                {benefitIcons[item.icon] || (
                  <Heart className="h-5 w-5 text-accent" />
                )}
              </div>
              <h3 className="text-sm font-semibold mb-0.5">{item.title}</h3>
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

export function ProductOfferingsSection() {
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
            {productOfferings.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-2 text-sm text-muted-foreground"
          >
            {productOfferings.subtitle}
          </motion.p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {productOfferings.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="rounded-xl border bg-card p-5 text-center"
            >
              <div className="mb-3 flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  {offeringIcons[i]}
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
