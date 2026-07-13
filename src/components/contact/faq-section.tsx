"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { contactContent } from "@/lib/data/content"

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  const [measuredHeight, setMeasuredHeight] = useState(0)
  const contentRef = useCallback((node: HTMLDivElement | null) => {
    if (node) setMeasuredHeight(node.scrollHeight)
  }, [])

  return (
    <div
      className={cn(
        "rounded-xl border bg-card transition-all duration-200 hover:shadow-sm hover:border-primary/10",
        isOpen && "border-primary/20 shadow-sm"
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium">{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform duration-200",
            isOpen && "rotate-180 text-primary"
          )}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? measuredHeight : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div ref={contentRef}>
          <div className="px-5 pb-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {answer}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Quick answers to common questions. Can&apos;t find what you&apos;re
          looking for? Reach out to us directly.
        </p>
      </div>

      <div className="space-y-3">
        {contactContent.faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
          >
            <FAQItem
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
