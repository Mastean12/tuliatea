"use client"

import { MessageCircle } from "lucide-react"
import { siteConfig } from "@/config/site"

type WhatsAppButtonProps = {
  productName: string
}

export function WhatsAppButton({ productName }: WhatsAppButtonProps) {
  const phone = siteConfig.contact.whatsapp.replace(/\D/g, "")
  const message = encodeURIComponent(
    `Hello Tullia Tea,\n\nI am interested in purchasing ${productName}. Please assist me.`
  )

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center rounded-lg border border-input bg-background px-6 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-muted hover:text-foreground"
    >
      <MessageCircle className="mr-2 h-4 w-4 text-green-600" />
      Enquire via WhatsApp
    </a>
  )
}
