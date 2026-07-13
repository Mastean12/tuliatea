"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { cn, formatPrice } from "@/lib/utils"
import { PlaceholderImage } from "./placeholder-image"
import { Badge } from "./badge"
import { Button } from "./button"
import { routes } from "@/config/routes"

type ProductCardProps = {
  product: {
    id: string
    name: string
    slug: string
    description: string
    price: number
    comparePrice?: number
    image: string
    weight?: string
    ingredients?: string
    isFeatured?: boolean
    isBestSeller?: boolean
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={routes.product(product.slug)}
        className={cn(
          "group block rounded-xl border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
          isCompact ? "flex items-center gap-4 p-3" : ""
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            isCompact ? "h-24 w-24 shrink-0 rounded-lg" : "rounded-t-xl"
          )}
        >
          {product.image?.startsWith("http") ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <PlaceholderImage
              label={product.name}
              variant="product"
              className={cn(
                "transition-transform duration-500 group-hover:scale-105",
                isCompact ? "h-24" : ""
              )}
            />
          )}
          <div className="absolute right-2 top-2 flex flex-col gap-1">
            {product.isBestSeller && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">
                Bestseller
              </Badge>
            )}
            {product.comparePrice && (
              <Badge
                variant="default"
                className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0.5"
              >
                Sale
              </Badge>
            )}
          </div>
        </div>

        <div className={cn("space-y-1.5", isCompact ? "flex-1" : "p-4")}>
          <h3 className="font-heading font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          {!isCompact && (
            <>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {product.description}
              </p>
              {product.weight && (
                <p className="text-xs text-muted-foreground/70">
                  {product.weight}
                </p>
              )}
            </>
          )}
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
          {!isCompact && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2 w-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              View Product
            </Button>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
