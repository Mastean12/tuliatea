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
    "Get in touch with Tullia Tea. Reach out via email, phone, WhatsApp, or our contact form.",
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: "Get in touch with Tullia Tea.",
  },
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      {/* Contact form + info */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
            <div className="lg:col-span-3">
              <h2 className="font-heading text-2xl font-semibold mb-2">
                Send us a Message
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                Fill out the form below and we&apos;ll get back to you within 24
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

      {/* FAQ */}
      <section className="bg-muted/50 py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FAQSection />
          </div>
        </Container>
      </section>
    </>
  )
}
