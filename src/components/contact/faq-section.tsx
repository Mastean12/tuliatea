"use client"

import { useState, useRef, useCallback } from "react"
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
    if (node) {
      setMeasuredHeight(node.scrollHeight)
    }
  }, [])

  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-primary"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium">{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? measuredHeight : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div ref={contentRef}>
          <p className="pb-4 text-sm leading-relaxed text-muted-foreground">
            {answer}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div>
      <h3 className="font-heading mb-2 text-xl font-semibold">
        Frequently Asked Questions
      </h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Quick answers to common questions. Can&apos;t find what you&apos;re
        looking for? Reach out to us directly.
      </p>

      <div className="rounded-xl border bg-card">
        {contactContent.faqs.map((faq, i) => (
          <FAQItem
            key={i}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  )
}
