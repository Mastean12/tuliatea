"use client"

import Link from "next/link"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CartItemRow } from "@/components/cart/cart-item"
import { useCart } from "@/hooks/use-cart"
import { routes } from "@/config/routes"

export function CartPageClient() {
  const { items, updateQuantity, removeItem, getSubtotal, clearCart } =
    useCart()
  const subtotal = getSubtotal()

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-heading text-3xl font-semibold tracking-tight mb-8">
        Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground/20" />
          <h2 className="font-heading text-xl font-semibold mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link href={routes.products}>
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="rounded-xl border bg-card p-4 sm:p-6">
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="mt-6 rounded-xl border bg-card p-4 sm:p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-muted-foreground">
                  Calculated at checkout
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="text-muted-foreground">
                  Calculated at checkout
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <span className="font-heading text-lg font-semibold">Total</span>
              <span className="font-heading text-xl font-semibold">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={routes.checkout} className="flex-1">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
              <Link href={routes.products}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Button variant="ghost" size="sm" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
