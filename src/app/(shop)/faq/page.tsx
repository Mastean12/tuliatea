import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/ui/container"

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Tullia Tea products, ordering, shipping, and more.",
}

const faqs = [
  {
    q: "Where do you source your tea?",
    a: "Our tea is sourced directly from local farmers across Kenya's premium tea-growing regions, including the Rift Valley, Nyeri, and the central Kenyan highlands.",
  },
  {
    q: "How should I prepare Tullia Tea?",
    a: "For the best flavor, use freshly boiled water and steep your tea for 3-5 minutes depending on the variety. Green and herbal teas typically require lower temperatures (80-85°C) while black teas can be brewed at full boil. Each package includes specific brewing instructions.",
  },
  {
    q: "Are your products organic?",
    a: "We prioritize organic farming practices and recommend checking individual product descriptions for specific certifications. All our teas are grown without synthetic pesticides.",
  },
  {
    q: "How are deliveries made?",
    a: "We use trusted courier services for both local and international deliveries. Orders are processed within 24-48 hours.",
  },
  {
    q: "Where can I buy Tullia Tea?",
    a: "Tullia Tea is available through our online store and select retail outlets across Kenya.",
  },
  {
    q: "How long does delivery take?",
    a: "Local deliveries within Nairobi typically arrive within 1-3 business days. Other Kenyan counties take 3-7 business days.",
  },
  {
    q: "What is your return policy?",
    a: "If you are not satisfied with your purchase, contact us within 14 days of delivery for a full refund or exchange.",
  },
  {
    q: "Do you offer wholesale?",
    a: "Yes, we offer wholesale pricing for businesses, cafes, and retailers. Please contact us with your requirements.",
  },
]

export default function FAQPage() {
  return (
    <Container className="py-12 sm:py-16 max-w-3xl">
      <nav className="mb-6 text-xs text-muted-foreground/60">
        <span className="hover:text-foreground transition-colors cursor-default">
          Home
        </span>
        <span className="mx-1.5">/</span>
        <span className="text-foreground/80">FAQ</span>
      </nav>
      <h1 className="font-heading text-3xl font-semibold mb-2">
        Frequently Asked Questions
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        Quick answers to common questions about Tullia Tea.
      </p>

      <div className="space-y-0 divide-y rounded-xl border">
        {faqs.map((faq, i) => (
          <details key={i} className="group">
            <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-foreground hover:text-primary transition-colors">
              {faq.q}
              <span className="ml-2 shrink-0 text-muted-foreground/40 group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>

      <div className="mt-12">
        <p className="text-sm text-muted-foreground mb-4">
          Still have questions? Reach out to us.
        </p>
        <div className="max-w-sm">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-sm text-primary hover:underline"
          >
            {siteConfig.contact.email}
          </a>
        </div>
      </div>
    </Container>
  )
}
