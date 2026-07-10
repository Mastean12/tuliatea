import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/ui/container"
import { CartPageClient } from "./cart-page-client"

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your cart and proceed to checkout.",
  openGraph: { title: `Cart | ${siteConfig.name}` },
}

export default function CartPage() {
  return (
    <Container className="py-8 sm:py-12">
      <CartPageClient />
    </Container>
  )
}
