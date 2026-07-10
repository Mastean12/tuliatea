import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/ui/container"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { FAQSection } from "@/components/contact/faq-section"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tullia Tea. Reach out via email, phone, WhatsApp, or our contact form. We would love to hear from you.",
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description:
      "Get in touch with Tullia Tea. Reach out via email, phone, WhatsApp, or our contact form.",
  },
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="font-heading mb-2 text-2xl font-semibold">
                Send us a Message
              </h2>
              <p className="mb-8 text-sm text-muted-foreground">
                Fill out the form below and we will get back to you within 24
                hours.
              </p>
              <ContactForm />
            </div>

            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t bg-muted/30 py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FAQSection />
          </div>
        </Container>
      </section>
    </>
  )
}
