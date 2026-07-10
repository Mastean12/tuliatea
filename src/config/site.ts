export const siteConfig = {
  name: "Tullia Tea",
  legalName: "Rectangular Foods",
  tagline: "Premium Kenyan wellness teas crafted for your daily ritual.",
  description:
    "Discover premium Kenyan wellness teas and herbal infusions. Tullia Tea brings you the finest organic blends crafted for your daily ritual of wellness.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "en-KE",
  currency: "KES",
  timezone: "Africa/Nairobi",
  keywords: [
    "Kenyan tea",
    "wellness tea",
    "herbal tea",
    "organic tea",
    "premium tea",
    "Tullia Tea",
    "Rectangular Foods",
  ] as string[],
  social: {
    twitter: "@tulliatea",
    instagram: "@tulliatea",
    facebook: "tulliatea",
  },
  contact: {
    email: "hello@tulliatea.com",
    phone: "+254-XXX-XXX-XXX",
    address: "Nairobi, Kenya",
  },
} as const

export type SiteConfig = typeof siteConfig
