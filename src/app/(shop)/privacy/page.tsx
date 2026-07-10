import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/ui/container"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Tullia Tea privacy policy — how we collect, use, and protect your personal information.",
}

export default function PrivacyPage() {
  return (
    <Container className="py-12 sm:py-16 max-w-3xl">
      <nav className="mb-6 text-xs text-muted-foreground/60">
        <span className="hover:text-foreground transition-colors cursor-default">
          Home
        </span>
        <span className="mx-1.5">/</span>
        <span className="text-foreground/80">Privacy Policy</span>
      </nav>
      <h1 className="font-heading text-3xl font-semibold mb-8">
        Privacy Policy
      </h1>
      <div className="prose prose-sm prose-gray max-w-none space-y-4 text-muted-foreground">
        <p>
          At Tullia Tea, we take your privacy seriously. This policy describes
          how we collect, use, and protect your personal information.
        </p>
        <h2 className="font-heading text-lg font-semibold text-foreground mt-8">
          Information We Collect
        </h2>
        <p>
          We collect information you provide when creating an account, placing
          an order, or contacting us. This includes your name, email address,
          phone number, and shipping address.
        </p>
        <h2 className="font-heading text-lg font-semibold text-foreground mt-8">
          How We Use Your Information
        </h2>
        <p>
          We use your information to process orders, communicate with you about
          your purchases, and improve our services. We do not sell your personal
          information to third parties.
        </p>
        <h2 className="font-heading text-lg font-semibold text-foreground mt-8">
          Data Security
        </h2>
        <p>
          We implement industry-standard security measures to protect your
          personal information. However, no method of electronic storage is 100%
          secure.
        </p>
        <h2 className="font-heading text-lg font-semibold text-foreground mt-8">
          Contact
        </h2>
        <p>
          If you have questions about this policy, please contact us at{" "}
          {siteConfig.contact.email}.
        </p>
        <p className="text-xs pt-8">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-KE", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </Container>
  )
}
