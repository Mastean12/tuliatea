"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { aboutContent } from "@/lib/data/content"

const TEA_FIELDS =
  "https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&h=600&fit=crop&auto=format"

export function StorySection() {
  const { story, mission, vision } = aboutContent

  return (
    <>
      {/* Story — image right + text */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                {story.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground mb-6">
                {story.subtitle}
              </p>
              <div className="space-y-4">
                {story.paragraphs.slice(0, 2).map((p, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src={TEA_FIELDS}
                alt="Kenyan tea fields"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission + Vision — full-width brand gradient background, no image */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              {story.paragraphs.slice(2).map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="text-sm leading-relaxed text-muted-foreground text-center"
                >
                  {p}
                </motion.p>
              ))}
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-xl border bg-card/80 backdrop-blur-sm p-6"
              >
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {mission.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {mission.body}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-xl border bg-card/80 backdrop-blur-sm p-6"
              >
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {vision.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {vision.body}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
