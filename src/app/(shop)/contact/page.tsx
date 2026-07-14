import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/ui/container"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { FAQSection } from "@/components/contact/faq-section"
import { contactContent } from "@/lib/data/content"
import { Store, Truck, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tullia Tea. Reach out via email, phone, WhatsApp, or our contact form.",
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: "Get in touch with Tullia Tea.",
  },
}

function getDirections(location: string) {
  return `https://www.google.com/maps/search/${encodeURIComponent(location)}`
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
            <div className="lg:col-span-3">
              <h2 className="font-heading text-2xl font-semibold mb-2 text-primary">
                Send us a Message
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                {`Fill out the form below and we'll get back to you within 24`}
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

      {/* Stockists */}
      <section className="bg-soft-sage py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-primary text-center mb-2">
              Where to Find Tullia Tea
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Visit our official stockists across Nairobi.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {contactContent.stockists.map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl border bg-card p-5 flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Store className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{s.name}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        {s.location}
                      </p>
                    </div>
                  </div>
                  <a
                    href={getDirections(s.location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-primary/20 px-4 py-2 text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
                  >
                    Get Directions <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border bg-card p-4 flex items-center gap-3">
              <Truck className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold">
                  {contactContent.delivery.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {contactContent.delivery.body}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FAQSection />
          </div>
        </Container>
      </section>
    </>
  )
}
