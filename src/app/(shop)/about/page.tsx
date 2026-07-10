import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { AboutHero } from "@/components/about/about-hero"
import { StorySection } from "@/components/about/story-section"
import { ValuesSection } from "@/components/about/values-section"
import { AboutCTA } from "@/components/about/about-cta"

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover the story behind Tullia Tea — premium Kenyan wellness teas handcrafted with care. Learn about our mission, values, and commitment to quality.",
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description:
      "Discover the story behind Tullia Tea — premium Kenyan wellness teas handcrafted with care.",
  },
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <ValuesSection />
      <AboutCTA />
    </>
  )
}
