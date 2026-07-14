import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/ui/container"
import { CheckoutClient } from "./checkout-client"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order.",
  robots: { index: false, follow: false },
  openGraph: { title: `Checkout | ${siteConfig.name}` },
}

export default function CheckoutPage() {
  return (
    <Container className="py-8 sm:py-12">
      <h1 className="font-heading mb-8 text-2xl font-semibold sm:text-3xl text-primary">
        Checkout
      </h1>
      <CheckoutClient />
    </Container>
  )
}
