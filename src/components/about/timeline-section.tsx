"use client"

import { motion } from "framer-motion"
import { timelineEvents } from "@/lib/data/content"

export function TimelineSection() {
  return (
    <section className="bg-soft-sage py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-center mb-10 text-primary">
          Our Journey
        </h2>
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-primary/20" />
            <div className="space-y-8">
              {timelineEvents.map((event, i) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative flex items-start gap-5"
                >
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-card text-xs font-bold text-primary">
                    {i + 1}
                  </div>
                  <div className="flex-1 pt-1.5">
                    <span className="text-xs font-semibold text-primary">
                      {event.year}
                    </span>
                    <h3 className="text-sm font-semibold mt-0.5">
                      {event.label}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {event.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
