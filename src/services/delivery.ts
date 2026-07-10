export const KENYAN_COUNTIES = [
  "Baringo",
  "Bomet",
  "Bungoma",
  "Busia",
  "Elgeyo Marakwet",
  "Embu",
  "Garissa",
  "Homa Bay",
  "Isiolo",
  "Kajiado",
  "Kakamega",
  "Kericho",
  "Kiambu",
  "Kilifi",
  "Kirinyaga",
  "Kisii",
  "Kisumu",
  "Kitui",
  "Kwale",
  "Laikipia",
  "Lamu",
  "Machakos",
  "Makueni",
  "Mandera",
  "Marsabit",
  "Meru",
  "Migori",
  "Mombasa",
  "Muranga",
  "Nairobi",
  "Nakuru",
  "Nandi",
  "Narok",
  "Nyamira",
  "Nyandarua",
  "Nyeri",
  "Samburu",
  "Siaya",
  "Taita Taveta",
  "Tana River",
  "Tharaka Nithi",
  "Trans Nzoia",
  "Turkana",
  "Uasin Gishu",
  "Vihiga",
  "Wajir",
  "West Pokot",
] as const

export type County = (typeof KENYAN_COUNTIES)[number]

export type DeliveryOption = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  estimatedDays: string
}

export const DEFAULT_DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: "standard",
    name: "Standard Delivery",
    slug: "standard",
    description: "Delivered to your doorstep within Nairobi or upcountry",
    price: 350,
    estimatedDays: "1—3 days (Nairobi) / 3—7 days (Upcountry)",
  },
  {
    id: "express",
    name: "Express Delivery",
    slug: "express",
    description: "Priority handling and faster shipping within Nairobi",
    price: 700,
    estimatedDays: "Same day — 1 day (Nairobi only)",
  },
  {
    id: "pickup",
    name: "Store Pickup",
    slug: "pickup",
    description: "Pick up your order from our Nairobi location at no charge",
    price: 0,
    estimatedDays: "1—2 business days for processing",
  },
]

export function getDeliveryPrice(slug: string, _county?: string): number {
  const option = DEFAULT_DELIVERY_OPTIONS.find((o) => o.slug === slug)
  if (!option) return 0

  if (slug === "standard" && _county && _county === "Nairobi") {
    return 250
  }

  return option.price
}
