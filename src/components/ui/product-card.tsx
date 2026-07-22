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
          "group block rounded-2xl border bg-card transition-all duration-400 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 overflow-hidden",
          isCompact ? "flex items-center gap-3 p-2.5" : ""
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-muted/20",
            isCompact ? "h-20 w-20 shrink-0 rounded-xl" : "aspect-[1/1]"
          )}
        >
          {product.image &&
          (product.image.startsWith("http") ||
            product.image.startsWith("/")) ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-all duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <PlaceholderImage
              label={product.name}
              variant="product"
              className={cn(
                "transition-all duration-700 group-hover:scale-110",
                isCompact ? "h-20" : ""
              )}
            />
          )}
          {!isCompact && (
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
              {product.isBestSeller && (
                <Badge className="bg-[#C89B3C] text-white text-[10px] px-2.5 py-0.5 font-semibold shadow-sm rounded-full">
                  Bestseller
                </Badge>
              )}
              {product.comparePrice && (
                <Badge className="bg-[#B86A3A] text-white text-[10px] px-2.5 py-0.5 font-semibold shadow-sm rounded-full">
                  Sale
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className={cn(isCompact ? "flex-1 min-w-0" : "p-3.5 sm:p-4")}>
          <h3 className="font-heading text-sm sm:text-base font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          {!isCompact ? (
            <>
              <p className="mt-1 text-xs text-muted-foreground/70 line-clamp-1 leading-relaxed">
                {product.description}
              </p>
              <div className="mt-2.5 flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-semibold tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-xs text-muted-foreground/50 line-through tabular-nums">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>
                {product.weight && (
                  <span className="text-[10px] text-muted-foreground/50">
                    {product.weight}
                  </span>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
              >
                View Product
              </Button>
            </>
          ) : (
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-semibold tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-xs text-muted-foreground/50 line-through tabular-nums ml-1">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
