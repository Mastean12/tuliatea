"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MessageCircle, MapPin, Clock, Camera } from "lucide-react"
import { siteConfig } from "@/config/site"
import { GoogleMaps } from "@/components/ui/google-maps"
import Link from "next/link"

const contactGroup = [
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
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.contact.whatsapp,
    href: `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`,
  },
]

const visitGroup = [
  { icon: MapPin, label: "Address", value: siteConfig.contact.address },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Monday — Friday: 8:00 AM — 5:00 PM (EAT)",
  },
]

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact */}
      <div>
        <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-accent mb-4">
          Contact
        </h3>
        <div className="space-y-3">
          {contactGroup.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Link
                href={item.href}
                target={item.label === "WhatsApp" ? "_blank" : undefined}
                rel={
                  item.label === "WhatsApp" ? "noopener noreferrer" : undefined
                }
                className="flex items-center gap-3 rounded-xl border bg-card p-3.5 hover:bg-muted transition-all hover:border-primary/20 group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium truncate">{item.value}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Visit */}
      <div>
        <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-accent mb-4">
          Visit
        </h3>
        <div className="space-y-3">
          {visitGroup.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="flex items-center gap-3 rounded-xl border bg-card p-3.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/5">
                <item.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            </motion.div>
          ))}
          <GoogleMaps address={siteConfig.contact.address} />
        </div>
      </div>

      {/* Follow Us */}
      <div>
        <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-accent mb-4">
          Follow Us
        </h3>
        <div className="flex gap-3">
          {siteConfig.social.instagram && (
            <Link
              href={`https://instagram.com/${siteConfig.social.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center gap-3 rounded-xl border bg-card p-3.5 hover:bg-muted transition-all hover:border-accent/30 group"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/5 group-hover:bg-accent/10 transition-colors">
                <Camera className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Instagram</p>
                <p className="text-sm font-medium">
                  {siteConfig.social.instagram}
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
