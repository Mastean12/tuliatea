"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { aboutContent } from "@/lib/data/content"

const KENYA_HIGHLANDS =
  "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&h=600&fit=crop&auto=format"
const TEA_FARMING =
  "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop&auto=format"

export function StorySection() {
  const { story, mission, vision } = aboutContent

  return (
    <>
      {/* Story */}
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
                src={KENYA_HIGHLANDS}
                alt="Kenyan tea highlands"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Continued story + Mission/Vision */}
      <section className="bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden lg:order-2"
            >
              <Image
                src={TEA_FARMING}
                alt="Tea farming in Kenya"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="lg:order-1"
            >
              <div className="space-y-4">
                {story.paragraphs.slice(2).map((p, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border bg-card p-5">
                  <h3 className="font-heading text-base font-semibold mb-1">
                    {mission.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {mission.body}
                  </p>
                </div>
                <div className="rounded-xl border bg-card p-5">
                  <h3 className="font-heading text-base font-semibold mb-1">
                    {vision.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {vision.body}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
