"use client"

import { formatPrice } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

type OrderSummaryProps = {
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image?: string
  }>
  subtotal: number
  shipping: number
  total: number
}

export function OrderSummary({
  items,
  subtotal,
  shipping,
  total,
}: OrderSummaryProps) {
  if (items.length === 0) return null

  return (
    <div className="rounded-xl border bg-card p-4 sm:p-6">
      <h3 className="font-heading mb-4 text-lg font-semibold">Order Summary</h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                Qty: {item.quantity}
              </p>
            </div>
            <span className="shrink-0 tabular-nums">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="tabular-nums">
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex items-center justify-between">
        <span className="font-heading text-lg font-semibold">Total</span>
        <span className="font-heading text-xl font-semibold tabular-nums">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  )
}
