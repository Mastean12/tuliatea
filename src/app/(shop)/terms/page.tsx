import type { Metadata } from "next"
import { Container } from "@/components/ui/container"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Tullia Tea terms of service — conditions governing the use of our website and purchase of products.",
}

export default function TermsPage() {
  return (
    <Container className="py-12 sm:py-16 max-w-3xl">
      <nav className="mb-6 text-xs text-muted-foreground/60">
        <span className="hover:text-foreground transition-colors cursor-default">
          Home
        </span>
        <span className="mx-1.5">/</span>
        <span className="text-foreground/80">Terms of Service</span>
      </nav>
      <h1 className="font-heading text-3xl font-semibold mb-8">
        Terms of Service
      </h1>
      <div className="prose prose-sm prose-gray max-w-none space-y-4 text-muted-foreground">
        <p>
          By using the Tullia Tea website and purchasing our products, you agree
          to the following terms and conditions.
        </p>
        <h2 className="font-heading text-lg font-semibold text-foreground mt-8">
          Account Registration
        </h2>
        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activities under your account.
        </p>
        <h2 className="font-heading text-lg font-semibold text-foreground mt-8">
          Product Information
        </h2>
        <p>
          We strive to ensure all product descriptions, images, and pricing are
          accurate. However, we reserve the right to correct any errors.
        </p>
        <h2 className="font-heading text-lg font-semibold text-foreground mt-8">
          Pricing & Payment
        </h2>
        <p>
          All prices are listed in Kenyan Shillings (KES). We reserve the right
          to modify prices at any time.
        </p>
        <h2 className="font-heading text-lg font-semibold text-foreground mt-8">
          Limitation of Liability
        </h2>
        <p>
          Tullia Tea shall not be liable for any indirect, incidental, or
          consequential damages arising from the use of our products or website.
        </p>
      </div>
    </Container>
  )
}
