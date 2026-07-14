"use client"

import { AlternatingSection } from "./alternating-section"

const FARM_IMAGE =
  "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop&auto=format"
const CUP_IMAGE =
  "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=800&h=600&fit=crop&auto=format"
const HIGHLANDS_IMAGE =
  "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&h=600&fit=crop&auto=format"

export function OurPromise() {
  return (
    <AlternatingSection
      imageUrl={FARM_IMAGE}
      imageAlt="Premium Kenyan tea leaves"
      title="Our Promise"
      subtitle="Quality, Wellness, Sustainability"
    >
      <p>
        At Tullia Tea, we believe wellness begins with what you consume. That is
        why every blend we create starts with the finest ingredients sourced
        directly from Kenyan farmers who share our commitment to quality.
      </p>
      <p>
        Our teas are handcrafted in small batches to preserve their natural
        goodness, ensuring you receive the freshest, most flavorful experience
        with every cup.
      </p>
      <p>
        We are committed to sustainable practices that protect our environment
        and empower local communities. By choosing Tullia Tea, you are
        supporting a brighter future for Kenyan farmers and their families.
      </p>
    </AlternatingSection>
  )
}

export function FarmToCup() {
  return (
    <AlternatingSection
      imageUrl={CUP_IMAGE}
      imageAlt="Pouring premium Kenyan tea"
      title="From the Highlands to Your Cup"
      reverse
      className="bg-gradient-to-b from-soft-sage/50 to-background"
    >
      <p>
        Our journey begins in the lush, fertile highlands of Kenya, where our
        tea gardens benefit from rich volcanic soil, abundant rainfall, and the
        perfect altitude for growing exceptional tea.
      </p>
      <p>
        Working alongside local farmers who have cultivated these lands for
        generations, we select only the finest leaves for our blends. Every step
        — from hand-picking to small-batch processing — is done with care.
      </p>
    </AlternatingSection>
  )
}

export function Craftsmanship() {
  return (
    <AlternatingSection
      imageUrl={HIGHLANDS_IMAGE}
      imageAlt="Kenyan highlands tea plantation"
      title="Handcrafted with Care"
    >
      <p>
        Every blend at Tullia Tea is handcrafted in small batches to preserve
        its natural goodness. From the bold notes of our breakfast blends to the
        soothing aroma of our herbal infusions, each cup tells a story of Kenyan
        craftsmanship.
      </p>
      <p>
        No artificial additives, no shortcuts — just pure, natural ingredients
        grown in Kenya&apos;s fertile highlands and carefully blended to create
        moments of tranquility and nourishment.
      </p>
    </AlternatingSection>
  )
}
