import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/ui/container"
import { ProductDetailClient } from "./product-detail-client"
import { getProductBySlug, getRelatedProducts } from "@/lib/api/products"
import type { ProductListItem } from "@/lib/api/products"

type Props = { params: Promise<{ slug: string }> }

async function getProduct(slug: string) {
  const product = await getProductBySlug(slug)
  if (!product) return null
  const related = await getRelatedProducts(product.id, product.categoryId)
  return { product, related }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await getProduct(slug)
  if (!data) return { title: "Product Not Found" }
  const { product } = data
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    alternates: { canonical: `${siteConfig.url}/products/${slug}` },
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.description.slice(0, 160),
      images: [
        {
          url: `${siteConfig.url}/images/og-default.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const data = await getProduct(slug)
  if (!data) notFound()

  const { product, related } = data

  const serialized = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    ingredients: product.ingredients,
    benefits: product.benefits,
    brewingGuide: product.brewingGuide,
    deliveryInfo: product.deliveryInfo,
    returnInfo: product.returnInfo,
    tags: product.tags,
    price: Number(product.price),
    comparePrice: product.comparePrice ? Number(product.comparePrice) : null,
    stock: product.stock,
    weight: product.weight,
    servings: product.servings,
    isFeatured: product.isFeatured,
    category: {
      id: product.category.id,
      name: product.category.name,
      slug: product.category.slug,
    },
    images: product.images.map((img) => ({ url: img.url, alt: img.alt })),
  }

  const relatedSerialized = related.map((r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    description: r.description,
    price: Number(r.price),
    comparePrice: r.comparePrice ? Number(r.comparePrice) : null,
    weight: r.weight,
    stock: r.stock,
    isFeatured: r.isFeatured,
    category: {
      id: r.category.id,
      name: r.category.name,
      slug: r.category.slug,
    },
    images: r.images.map((img) => ({ url: img.url, alt: img.alt })),
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images[0]?.url || undefined,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      price: serialized.price,
      priceCurrency: "KES",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="py-8 sm:py-12">
        <ProductDetailClient product={serialized} related={relatedSerialized} />
      </Container>
    </>
  )
}
