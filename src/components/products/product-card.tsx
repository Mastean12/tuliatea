"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { cn, formatPrice } from "@/lib/utils"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { routes } from "@/config/routes"
import { useCart } from "@/hooks/use-cart"

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
  variant?: "default" | "compact"
}

export function ProductCard({
  product,
  index = 0,
  variant = "default",
}: ProductCardProps) {
  const isCompact = variant === "compact"
  const addItem = useCart((s) => s.addItem)
  const inStock = product.stock > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div
        className={cn(
          "group relative block rounded-xl border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
          isCompact ? "flex items-center gap-4 p-3" : ""
        )}
      >
        <Link
          href={routes.product(product.slug)}
          className={cn(isCompact ? "shrink-0" : "block")}
        >
          <div
            className={cn(
              "relative overflow-hidden",
              isCompact ? "h-24 w-24 rounded-lg" : "rounded-t-xl"
            )}
          >
            <PlaceholderImage
              label={product.name}
              className={cn(
                "transition-transform duration-500 group-hover:scale-105",
                isCompact ? "h-24" : ""
              )}
            />
            {!inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                <span className="text-xs font-medium text-muted-foreground">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </Link>

        <div
          className={cn("space-y-1.5", isCompact ? "flex-1 min-w-0" : "p-4")}
        >
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {product.category.name}
            </Badge>
            {product.comparePrice && product.comparePrice > product.price && (
              <Badge
                variant="default"
                className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0"
              >
                Sale
              </Badge>
            )}
          </div>

          <Link href={routes.product(product.slug)}>
            <h3 className="font-heading font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {!isCompact && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}

          {product.weight && !isCompact && (
            <p className="text-xs text-muted-foreground/70">{product.weight}</p>
          )}

          <div
            className={cn(
              "flex items-center gap-2",
              isCompact ? "mt-auto" : ""
            )}
          >
            <span className="font-medium text-sm">
              {formatPrice(Number(product.price))}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(Number(product.comparePrice))}
              </span>
            )}
          </div>

          <div
            className={cn("flex items-center gap-2", isCompact ? "" : "pt-2")}
          >
            <Button
              size="sm"
              disabled={!inStock}
              onClick={() =>
                addItem({
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: Number(product.price),
                  image: product.images[0]?.url || "",
                  weight: product.weight || "",
                })
              }
              className="flex-1"
            >
              <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
              {inStock ? "Add to Cart" : "Sold Out"}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
