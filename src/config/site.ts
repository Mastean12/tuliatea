export const siteConfig = {
  name: "Tullia Tea",
  legalName: "Rectangular Foods",
  tagline: "Elevating Everyday Wellness",
  description:
    "Tullia Tea is a woman-led enterprise inspired by a rich, tea-loving heritage and fascination with different teas. Tullia Tea is a signature brand of Rectangular Foods; a Kenyan-based agribusiness established in 2022. We craft specialty tea and herbal infusions through value-addition of natural and preservative-free ingredients, as we build a trusted brand that empowers Kenyan farmers, creates jobs and prioritizes sustainability.",
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
    instagram: "Tullia_tea",
    whatsapp: "+254793509510",
    email: "rectangularfoods@gmail.com",
    facebook: "",
    twitter: "",
    linkedin: "",
  },
  contact: {
    email: "rectangularfoods@gmail.com",
    phone: "+254 793 509 510",
    whatsapp: "+254793509510",
    address: "Nairobi, Kenya",
  },
} as const

export type SiteConfig = typeof siteConfig
