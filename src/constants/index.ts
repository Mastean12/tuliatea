export const SITE = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Tullia Tea",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Premium Kenyan wellness teas crafted for your daily ritual.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "en-KE",
} as const

export const SHIPPING = {
  freeThreshold: 2500,
  standardRate: 350,
  regions: [{ code: "KE", name: "Kenya", currency: "KES" }] as const,
} as const

export const PAGINATION = {
  pageSize: 12,
  maxPageSize: 48,
} as const

export const ORDER_STATUS = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
} as const
