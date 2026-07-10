"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, MessageCircle, Camera } from "lucide-react"
import { contactContent } from "@/lib/data/content"
import { siteConfig } from "@/config/site"
import { GoogleMaps } from "@/components/ui/google-maps"
import Link from "next/link"

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Address",
    value: siteConfig.contact.address,
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
        Reach out to us through any of the channels below.
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

      <div className="space-y-3">
        <Link
          href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:bg-muted"
        >
          <MessageCircle className="h-5 w-5 text-green-600" />
          <div className="flex-1">
            <p className="text-sm font-medium">WhatsApp</p>
            <p className="text-xs text-muted-foreground">
              Quick responses during business hours
            </p>
          </div>
          <span className="text-xs font-medium text-primary">Chat Now</span>
        </Link>

        {siteConfig.social.instagram && (
          <Link
            href={`https://instagram.com/${siteConfig.social.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:bg-muted"
          >
            <Camera className="h-5 w-5 text-pink-600" />
            <div className="flex-1">
              <p className="text-sm font-medium">Instagram</p>
              <p className="text-xs text-muted-foreground">
                Follow us for updates and tea inspiration
              </p>
            </div>
            <span className="text-xs font-medium text-primary">Follow</span>
          </Link>
        )}
      </div>

      <GoogleMaps address={siteConfig.contact.address} />
    </div>
  )
}
