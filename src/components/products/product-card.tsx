"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import { Badge } from "@/components/ui/badge"
import { routes } from "@/config/routes"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"

type ProductCardProps = {
  product: {
    id: string
    name: string
    slug: string
    description: string
    price: number
    comparePrice?: number | null
    weight?: string | null
    stock: number
    isFeatured?: boolean
    category: { name: string; slug: string }
    images: Array<{ url: string; alt?: string | null }>
  }
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem)
  const inStock = product.stock > 0
  const discount =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round((1 - product.price / product.comparePrice) * 100)
      : 0

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: Number(product.price),
      image: product.images[0]?.url || "",
      weight: product.weight || "",
    })
    toast.success(`${product.name} added to cart`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <div className="group relative flex flex-col rounded-2xl border bg-card transition-all duration-400 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 overflow-hidden">
        {/* Image */}
        <Link
          href={routes.product(product.slug)}
          className="relative overflow-hidden bg-muted/20 aspect-[1/1]"
        >
          {product.images[0]?.url ? (
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-all duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <PlaceholderImage
              label={product.name}
              className="absolute inset-0 h-full w-full transition-all duration-700 group-hover:scale-110"
            />
          )}
          {!inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/70">
              <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Currently Unavailable
              </span>
            </div>
          )}
          {/* Top badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.category && (
              <Badge
                variant="secondary"
                className="text-[10px] px-2.5 py-0.5 font-medium uppercase tracking-wider bg-white/90 backdrop-blur-sm shadow-sm"
              >
                {product.category.name}
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-warm text-warm-foreground text-[10px] px-2.5 py-0.5 font-semibold shadow-sm">
                -{discount}%
              </Badge>
            )}
          </div>
          {/* Quick add button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              handleAdd()
            }}
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary/90"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </Link>

        {/* Info */}
        <div className="flex flex-1 flex-col p-3.5 sm:p-4">
          <Link href={routes.product(product.slug)}>
            <h3 className="font-heading text-sm sm:text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <div className="mt-auto pt-2.5 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-semibold tabular-nums">
                {formatPrice(Number(product.price))}
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-xs text-muted-foreground/50 line-through tabular-nums">
                  {formatPrice(Number(product.comparePrice))}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {product.weight && (
                <span className="text-[10px] text-muted-foreground/50">
                  {product.weight}
                </span>
              )}
              {!inStock && (
                <span className="text-[10px] font-medium text-destructive">
                  Sold Out
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
