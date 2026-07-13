"use client"

import { useState } from "react"
import { Check, Leaf, Truck, RotateCcw, Shield, Heart } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import { ProductGallery } from "@/components/products/product-gallery"
import { QuantitySelector } from "@/components/products/quantity-selector"
import { AddToCartButton } from "@/components/products/add-to-cart-button"
import { BuyNowButton } from "@/components/products/buy-now-button"
import { WhatsAppButton } from "@/components/products/whatsapp-button"
import { ShareProduct } from "@/components/products/share-product"
import { RelatedProducts } from "@/components/products/related-products"
import { siteConfig } from "@/config/site"
import { routes } from "@/config/routes"

type ProductDetailProduct = {
  id: string
  name: string
  slug: string
  description: string
  ingredients: string | null
  benefits: string | null
  brewingGuide: string | null
  deliveryInfo: string | null
  returnInfo: string | null
  tags: string | null
  price: number
  comparePrice: number | null
  stock: number
  weight: string | null
  servings: string | null
  isFeatured: boolean
  category: { id: string; name: string; slug: string }
  images: Array<{ url: string; alt: string | null }>
}

type Props = {
  product: ProductDetailProduct
  related: Array<{
    id: string
    name: string
    slug: string
    description: string
    price: number
    comparePrice: number | null
    weight: string | null
    stock: number
    isFeatured: boolean
    category: { id: string; name: string; slug: string }
    images: Array<{ url: string; alt: string | null }>
  }>
}

export function ProductDetailClient({ product, related }: Props) {
  const [quantity, setQuantity] = useState(1)
  const inStock = product.stock > 0
  const discount =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(
          (1 - Number(product.price) / Number(product.comparePrice)) * 100
        )
      : 0

  const cartItem = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: Number(product.price),
    image: product.images[0]?.url || "",
    weight: product.weight || "",
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href={routes.home}
          className="hover:text-foreground transition-colors"
        >
          Home
        </Link>
        <span>/</span>
        <Link
          href={routes.products}
          className="hover:text-foreground transition-colors"
        >
          Products
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <ProductGallery images={product.images} name={product.name} />

        {/* Info */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="secondary">{product.category.name}</Badge>
              {product.isFeatured && <Badge variant="default">Featured</Badge>}
              {discount > 0 && (
                <Badge
                  variant="default"
                  className="bg-accent text-accent-foreground"
                >
                  {discount}% OFF
                </Badge>
              )}
            </div>

            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-semibold">
                {formatPrice(Number(product.price))}
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(Number(product.comparePrice))}
                </span>
              )}
              {product.weight && (
                <span className="text-sm text-muted-foreground">
                  / {product.weight}
                </span>
              )}
            </div>
          </div>

          <p className="leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Stock status */}
          <div className="flex items-center gap-2 text-sm">
            {inStock ? (
              <>
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">In Stock</span>
              </>
            ) : (
              <span className="text-destructive font-medium">Out of Stock</span>
            )}
          </div>

          <Separator />

          {/* Storytelling: Ingredients */}
          {product.ingredients && (
            <div className="rounded-xl bg-primary/[0.03] border border-primary/5 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">What&apos;s Inside</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.ingredients}
              </p>
              <p className="text-xs text-muted-foreground/60 flex items-center gap-1.5">
                <Shield className="h-3 w-3" />
                100% natural, preservative-free ingredients sourced from Kenya
              </p>
            </div>
          )}

          {/* Storytelling: Benefits */}
          {product.benefits && (
            <div className="rounded-xl bg-accent/[0.03] border border-accent/5 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-semibold">Wellness Benefits</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.benefits}
              </p>
            </div>
          )}

          <Separator />

          {/* Quantity + Buttons */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity</span>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={Math.min(product.stock, 99)}
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <AddToCartButton
                product={cartItem}
                quantity={quantity}
                disabled={!inStock}
                className="flex-1"
              />
              <BuyNowButton
                product={cartItem}
                quantity={quantity}
                disabled={!inStock}
              />
            </div>

            <WhatsAppButton productName={product.name} />
          </div>

          {/* Delivery & Returns */}
          <div className="space-y-3 rounded-xl border bg-card p-4">
            {product.deliveryInfo && (
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {product.deliveryInfo}
                </p>
              </div>
            )}
            {product.returnInfo && (
              <div className="flex items-start gap-3">
                <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {product.returnInfo}
                </p>
              </div>
            )}
          </div>

          {/* Brewing Guide */}
          {product.brewingGuide && (
            <div className="rounded-xl bg-primary/5 p-4">
              <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold">
                <Leaf className="h-4 w-4 text-primary" />
                Brewing Guide
              </h3>
              <p className="text-sm text-muted-foreground">
                {product.brewingGuide}
              </p>
            </div>
          )}

          {/* Share */}
          <div className="flex items-center justify-between">
            <ShareProduct
              name={product.name}
              url={`${siteConfig.url}/products/${product.slug}`}
            />
            <div className="flex flex-wrap gap-1">
              {product.tags?.split(",").map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-[10px] capitalize"
                >
                  {tag.replace(/-/g, " ")}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts products={related} />
    </div>
  )
}
