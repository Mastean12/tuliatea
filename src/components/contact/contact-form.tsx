"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-xl border bg-card p-10 sm:p-14 text-center"
      >
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <Send className="h-8 w-8 text-accent" />
        </div>
        <h3 className="font-heading mb-2 text-xl font-semibold">
          Message Sent!
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Thank you for reaching out. We&apos;ll get back to you within 24
          hours.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-medium">
            Full Name
          </Label>
          <Input id="name" placeholder="Your name" required className="h-11" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            required
            className="h-11"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="subject" className="text-xs font-medium">
          Subject
        </Label>
        <Input id="subject" placeholder="How can we help?" className="h-11" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-xs font-medium">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us more about your inquiry..."
          rows={5}
          required
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full h-11 text-sm gap-2"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
