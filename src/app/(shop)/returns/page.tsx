import type { Metadata } from "next"
import { Container } from "@/components/ui/container"

export const metadata: Metadata = {
  title: "Returns Policy",
  description:
    "Tullia Tea returns and refunds policy — how to return products and get a refund.",
}

export default function ReturnsPage() {
  return (
    <Container className="py-12 sm:py-16 max-w-3xl">
      <nav className="mb-6 text-xs text-muted-foreground/60">
        <span className="hover:text-foreground transition-colors cursor-default">
          Home
        </span>
        <span className="mx-1.5">/</span>
        <span className="text-foreground/80">Returns & Refunds</span>
      </nav>
      <h1 className="font-heading text-3xl font-semibold mb-8">
        Returns & Refunds
      </h1>
      <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
            Return Policy
          </h2>
          <p>
            If you are not satisfied with your purchase, contact us within 14
            days of delivery for a full refund or exchange.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
            Conditions
          </h2>
          <p>
            Products must be unopened and in their original packaging. We
            reserve the right to refuse returns that do not meet these
            conditions.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
            How to Return
          </h2>
          <p>
            Contact our customer service team via email or WhatsApp to initiate
            a return. We will guide you through the process.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
            Refunds
          </h2>
          <p>
            Refunds will be processed within 5-7 business days after we receive
            and inspect the returned product.
          </p>
        </div>
      </div>
    </Container>
  )
}
