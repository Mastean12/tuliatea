import { Hero } from "@/components/home/hero"
import { FeaturedProducts } from "@/components/home/featured-products"
import { Features } from "@/components/home/features"
import { BestSellers } from "@/components/home/best-sellers"
import { OurPromise } from "@/components/home/our-promise"
import { Testimonials } from "@/components/home/testimonials"
import { HomeCTA } from "@/components/home/cta"

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Features />
      <BestSellers />
      <OurPromise />
      <Testimonials />
      <HomeCTA />
    </>
  )
}
