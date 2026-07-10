"use client"

import Link from "next/link"
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CartItemRow } from "@/components/cart/cart-item"
import { useCart } from "@/hooks/use-cart"
import { routes } from "@/config/routes"

export function CartPageClient() {
  const { items, updateQuantity, removeItem, getSubtotal, clearCart } =
    useCart()
  const subtotal = getSubtotal()

  return (
    <div className="max-w-3xl mx-auto">
      <nav className="mb-6 text-xs text-muted-foreground/60">
        <Link
          href={routes.home}
          className="hover:text-foreground transition-colors"
        >
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-foreground/80">Cart</span>
      </nav>

      <h1 className="font-heading text-3xl font-semibold tracking-tight mb-8">
        Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
            <ShoppingBag className="h-7 w-7 text-muted-foreground/30" />
          </div>
          <h2 className="font-heading text-xl font-semibold mb-2">
            Your cart is empty
          </h2>
          <p className="text-sm text-muted-foreground/70 mb-6">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link href={routes.products}>
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-4 sm:p-6">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </Card>
            <div className="flex items-center justify-between">
              <Link href={routes.products}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-1.5 h-4 w-4" /> Continue Shopping
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="mr-1.5 h-4 w-4" /> Clear Cart
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="font-heading text-lg font-semibold mb-4">
                Order Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-muted-foreground">
                    Calculated at checkout
                  </span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between mb-6">
                <span className="font-heading text-lg font-semibold">
                  Total
                </span>
                <span className="font-heading text-xl font-semibold tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <Link href={routes.checkout}>
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
