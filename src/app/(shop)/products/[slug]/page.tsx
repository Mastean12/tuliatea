import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/ui/container"
import { ProductDetailClient } from "./product-detail-client"
import { getProductBySlug, getRelatedProducts } from "@/lib/api/products"

type Props = {
  params: Promise<{ slug: string }>
}

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images[0]?.url || undefined,
    sku: product.sku || undefined,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      price: Number(product.price),
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
        <ProductDetailClient
          product={product as unknown as ProductDetailProduct}
          related={related as unknown as ProductDetailProduct[]}
        />
      </Container>
    </>
  )
}

type ProductDetailProduct = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice: number | null
  weight: string | null
  servings: string | null
  stock: number
  isFeatured: boolean
  ingredients: string | null
  benefits: string | null
  brewingGuide: string | null
  deliveryInfo: string | null
  returnInfo: string | null
  tags: string | null
  category: { id: string; name: string; slug: string }
  images: Array<{ url: string; alt: string | null }>
}
