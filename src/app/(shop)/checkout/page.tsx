import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { routes } from "@/config/routes"
import { Construction } from "lucide-react"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order.",
  openGraph: { title: `Checkout | ${siteConfig.name}` },
}

export default function CheckoutPage() {
  return (
    <Container className="flex flex-col items-center justify-center py-20 text-center">
      <Construction className="mb-6 h-16 w-16 text-muted-foreground/30" />
      <h1 className="font-heading text-3xl font-semibold mb-3">
        Checkout Coming Soon
      </h1>
      <p className="max-w-md text-muted-foreground mb-8">
        The checkout experience is currently under development. Your cart items
        are saved and will be ready when checkout is available.
      </p>
      <div className="flex gap-4">
        <Link href={routes.cart}>
          <Button variant="outline">Back to Cart</Button>
        </Link>
        <Link href={routes.products}>
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </Container>
  )
}
