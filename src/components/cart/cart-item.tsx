"use client"

import { Trash2 } from "lucide-react"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { QuantitySelector } from "@/components/products/quantity-selector"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import { routes } from "@/config/routes"
import type { CartItem as CartItemType } from "@/hooks/use-cart"

type CartItemProps = {
  item: CartItemType
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex gap-4 py-4 border-b last:border-b-0">
      <Link href={routes.product(item.slug)} className="shrink-0">
        <PlaceholderImage label={item.name} className="h-20 w-20 rounded-lg" />
      </Link>

      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={routes.product(item.slug)}
            className="text-sm font-medium hover:text-primary transition-colors line-clamp-1"
          >
            {item.name}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0"
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.name}`}
          >
            <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        </div>

        {item.weight && (
          <p className="text-xs text-muted-foreground">{item.weight}</p>
        )}

        <div className="flex items-center justify-between">
          <QuantitySelector
            value={item.quantity}
            onChange={(q) => onUpdateQuantity(item.id, q)}
          />
          <span className="text-sm font-semibold tabular-nums">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  )
}
