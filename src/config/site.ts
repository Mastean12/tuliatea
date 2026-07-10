export const siteConfig = {
  name: "Tullia Tea",
  legalName: "Rectangular Foods",
  tagline: "Elevating Everyday Wellness",
  description:
    "Premium Kenyan specialty teas and herbal infusions. Tullia Tea offers handcrafted, natural, preservative-free wellness teas sourced directly from Kenyan farmers.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "en-KE",
  currency: "KES",
  timezone: "Africa/Nairobi",
  keywords: [
    "Kenyan tea",
    "wellness tea",
    "herbal infusion",
    "Tullia Tea",
    "Rectangular Foods",
    "premium tea Kenya",
    "natural tea",
    "organic tea Kenya",
  ] as string[],
  social: {
    instagram: "@tulliatea",
    whatsapp: "+254700000000",
    email: "info@tulliatea.com",
    facebook: "",
    twitter: "",
    linkedin: "",
  },
  contact: {
    email: "info@tulliatea.com",
    phone: "+254 700 000 000",
    whatsapp: "+254700000000",
    address: "Nairobi, Kenya",
  },
} as const

export type SiteConfig = typeof siteConfig
