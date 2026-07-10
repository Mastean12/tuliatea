"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react"
import { contactContent } from "@/lib/data/content"
import Link from "next/link"

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: contactContent.info.email,
    href: `mailto:${contactContent.info.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: contactContent.info.phone,
    href: `tel:${contactContent.info.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Address",
    value: contactContent.info.address,
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: contactContent.info.hours,
  },
]

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <h3 className="font-heading text-xl font-semibold">
        Contact Information
      </h3>
      <p className="text-sm text-muted-foreground">
        We&apos;d love to hear from you. Choose your preferred way to reach us.
      </p>

      <div className="space-y-4">
        {contactItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-start gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{item.label}</p>
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.value}
                </Link>
              ) : (
                <p className="text-sm text-muted-foreground">{item.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium">WhatsApp</p>
            <p className="text-xs text-muted-foreground">
              Quick responses during business hours
            </p>
          </div>
          <Link
            href={`https://wa.me/${contactContent.info.phone.replace(/\D/g, "")}`}
            className="inline-flex h-7 items-center justify-center rounded-lg border border-input bg-background px-2.5 text-[0.8rem] font-medium text-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground"
          >
            Chat Now
          </Link>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="h-48 rounded-xl bg-muted flex items-center justify-center text-sm text-muted-foreground">
        <div className="text-center">
          <MapPin className="mx-auto mb-2 h-6 w-6 text-muted-foreground/50" />
          <span>Map — {contactContent.info.address}</span>
        </div>
      </div>
    </div>
  )
}
