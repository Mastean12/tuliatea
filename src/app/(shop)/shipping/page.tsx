import type { Metadata } from "next"
import { Container } from "@/components/ui/container"

export const metadata: Metadata = {
  title: "Shipping Information",
  description:
    "Tullia Tea shipping policy — delivery times, costs, and coverage areas.",
}

export default function ShippingPage() {
  return (
    <Container className="py-12 sm:py-16 max-w-3xl">
      <nav className="mb-6 text-xs text-muted-foreground/60">
        <span className="hover:text-foreground transition-colors cursor-default">
          Home
        </span>
        <span className="mx-1.5">/</span>
        <span className="text-foreground/80">Shipping Information</span>
      </nav>
      <h1 className="font-heading text-3xl font-semibold mb-8">
        Shipping Information
      </h1>
      <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
            Delivery Options
          </h2>
          <p>
            We offer three delivery options: Standard Delivery (KES 350),
            Express Delivery (KES 700), and Free Store Pickup.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
            Delivery Times
          </h2>
          <p>
            <strong>Nairobi:</strong> 1-3 business days for standard, same day
            to 1 day for express.
          </p>
          <p>
            <strong>Upcountry:</strong> 3-7 business days for standard delivery.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
            Order Processing
          </h2>
          <p>
            Orders are processed within 24-48 hours of placement. You will
            receive a confirmation email once your order ships.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
            International Shipping
          </h2>
          <p>Contact us for international shipping rates and delivery times.</p>
        </div>
      </div>
    </Container>
  )
}
